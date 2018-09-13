export const testAPI = async (params) => {
  console.log('api', params);
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(params);
    }, 1000);
  }).then(res => res);
  return result;
};

export const forkAPI = async (params) => {
  console.log('api', params);
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(params);
    }, 1000);
  }).then(res => {
    return res;
  });
  return result;
};
