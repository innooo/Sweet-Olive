import { commonReducer as common } from './common';
import { homePageReducer as homePage } from './homePage';
import { entryReducer as entry } from './entry';

const reducers = {
  common,
  homePage,
  entry,
};

export default reducers;
