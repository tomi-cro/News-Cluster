import _ from 'lodash';

const initialState = {
  posts: [],
  allPosts: [],
  age: true,
  checkBoxes: {
    index: true,
    jutarnji: true,
    dva4Sata: true,
  },
};

const filterPortal = (portalName, state) => {
  let postsIndex = [];
  let postsJutarnji = [];
  let posts24 = [];
  let returnPosts = [];
  returnPosts = [...state.posts];
  postsIndex = _.filter(state.allPosts, { portal: 'index' });
  postsJutarnji = _.filter(state.allPosts, { portal: 'jutarnji' });
  posts24 = _.filter(state.allPosts, { portal: '24sata' });
  switch (portalName) {
    case 'index':
      if (!state.checkBoxes.index) {
        returnPosts = [...returnPosts, ...postsIndex];
      } else {
        returnPosts = _.pullAllBy(returnPosts, [{ portal: 'index' }], 'portal');
      }
      break;
    case 'jutarnji':
      if (!state.checkBoxes.jutarnji) {
        returnPosts = [...returnPosts, ...postsJutarnji];       
      } else {
        returnPosts = _.pullAllBy(returnPosts, [{ portal: 'jutarnji' }], 'portal');
      }
      break;
    case 'dva4Sata':
      if (!state.checkBoxes.dva4Sata) {
        returnPosts = [...returnPosts, ...posts24];
      } else {
        returnPosts = _.pullAllBy(returnPosts, [{ portal: '24sata' }], 'portal');
      }
      break;
    default:
      returnPosts = state.allPosts;
  }
  if (state.age) {
    returnPosts = _.orderBy(returnPosts, ['date'], ['asc']);
  } else {
    returnPosts = _.orderBy(returnPosts, ['date'], ['desc']);
  }
  return returnPosts;
};

const reducer = (state = initialState, action) => {
  if (action.type === 'AGE_CHANGE') {
    let posts = [...state.posts];
    if (!state.age) {
      posts = _.orderBy(posts, ['date'], ['asc']);
    } else {
      posts = _.orderBy(posts, ['date'], ['desc']);
    }
    return {
      ...state,
      age: !state.age,
      posts,
    };
  }
  if (action.type === 'SET_POSTS') {
    let posts = [...action.posts];
    posts = _.orderBy(posts, ['date'], ['asc']);
    return {
      ...state,
      posts,
      allPosts: [...posts],
    };
  }
  if (action.type === 'PORTAL_CHANGE') {
    const filterPosts = filterPortal(action.portalName, state);
    return {
      ...state,
      posts: filterPosts,
      checkBoxes: {
        ...state.checkBoxes,
        [action.portalName]: !state.checkBoxes[action.portalName],
      },
    };
  }
  return state;
};

export default reducer;
