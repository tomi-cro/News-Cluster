import axios from 'axios';

export const setPosts = (posts) => {
    return {
        type: 'SET_POSTS',
        posts: posts   
    };
};

export const fetchPosts = () => {
    return dispatch => {
        axios.get('http://localhost:8080/news')
            .then(response => {
            dispatch(setPosts(response.data.news));
    });
    };
};
