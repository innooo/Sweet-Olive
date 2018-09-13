const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html模板处理
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清除指定目录的文件
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // 分离css
const PurifyCssWebpack = require('purifycss-webpack'); // 去除冗余css
const glob = require('glob'); // 扫描路径
const autoprefixer = require('autoprefixer'); // 自动添加浏览器前缀插件

const distPath = path.resolve(__dirname, './dist');
const htmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, './src/templates/temp.html'), // 模板文件路径
  filename: 'index.html', // 输出文件名
});
const cleanDirPlugin = new CleanWebpackPlugin(['dist']);
const cssExtract = new ExtractTextWebpackPlugin({
  filename: '[name].css',
});

const purifycss = new PurifyCssWebpack({
  paths: glob.sync(path.join(__dirname, 'src/*.html')),
});

const config = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: distPath,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 处理css文件
        use: cssExtract.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: { plugins: [
              autoprefixer({ browsers: ['> 0.01%'] }),
            ] },
          }],
        }),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: cssExtract.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: { plugins: [
              autoprefixer({ browsers: ['> 0.01%'] }),
            ] },
          }],
        }),
        exclude: /src/,
      },
      {
        test: /\.less$/, // 处理less文件
        use: cssExtract.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]', // 使用css-modules功能，类名作用域化(将类名打乱成乱码), 第二个查询字段表示类名打乱的规则
          },
          {
            loader: 'postcss-loader',
            options: { plugins: [
              autoprefixer({ browsers: ['> 0.01%'] }),
            ] },
          },
          {
            loader: 'less-loader', // 处理less的顺序 less-loader --> postcss-loader --> css-loader --> style-loader
          }],
        }),
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500, // 小于500b的文件将转为base64
              outputPath: 'images/', // 输出目录
            },
          },
        ],
      },
    ],
  },
  plugins: [
    htmlPlugin,
    cleanDirPlugin, // 清空指定目录
    cssExtract, // 分离css
    purifycss, // 消除冗余css
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          name: '', // 打包后的文件名
          minChunks: 2, // 最小引用次数
          minSize: 0, // 最小尺寸，只要大于 0 b 就进行抽离
        },
        vendor: { // 抽离第三方插件
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor', // 打包后的文件名，随意
          priority: 10, // 优先级，避免和commons冲突
        },
      },
    },
  },
  devServer: { // 配置静态服务器
    inline: true,
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    host: '127.0.0.1',
    port: '8080',
    compress: true, // 是否启用gzip等压缩功能
    historyApiFallback: true, // 在使用browserHistory的时候，页面跳转请求的是真实的url，需要devServer进行相应配置
  },
};

module.exports = config;
