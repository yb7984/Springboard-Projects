import { combineReducers } from 'redux';
import posts from './posts';
import titles from './titles';
import loading from './loading';
import error from './error';
import form from './form';

const rootReducer = combineReducers({
    posts,
    titles,
    loading,
    error , 
    form
});

export default rootReducer;

