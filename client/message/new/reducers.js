import { combineReducers } from 'redux';
import update from 'react-addons-update';

import {
	REQUEST_POSTS, RECEIVE_POSTS,
	TITLE_CHANGE,DESCRIBE_CHANGE,URL_CHANGE,IMAGE_CHANGE,
	ACTIVE_CHANGE,ADD_NEW_POST
} from './actions';
import serverConfig from '../../../config/server.json';

const API_URL = 'http://' + serverConfig.host + ':' + serverConfig.port;

const changeActive = (state = 0, action) => {
	switch (action.type) {
		case ACTIVE_CHANGE:
			return action.active;
		default:
			return state
	}
};

const post = (state = {
	title: 'Your title',
	description: 'Your describe',
	url: 'http://aiketao168.com',
	picurl: API_URL + '/img/test.jpg',
}, action) => {
	switch(action.type) {
		case TITLE_CHANGE:
			return update(state, {
				title: {$set: action.text}
			});
		case DESCRIBE_CHANGE:
			return update(state, {
				description: {$set: action.text}
			});
		case URL_CHANGE:
			return update(state, {
				url: {$set: action.text}
			});
		case IMAGE_CHANGE:
			return update(state, {
				picurl: {$set: action.url}
			});
		default:
			return state;
	}
}

const posts = (state = [
	{
		title: 'Your title',
		description: 'Your describe',
		url: 'http://aiketao168.com',
		picurl: API_URL + '/img/test.jpg',
	}
], action) => {
	switch (action.type) {
		case TITLE_CHANGE:
		case DESCRIBE_CHANGE:
		case URL_CHANGE:
		case IMAGE_CHANGE:
			console.log('at reducer posts' + state);
				return state.map((value, index) => {
					console.log(index, action.active);
					if (action.active === index) {
						return post(value, action);
					} else {
						return value;
					}
				});

		case ADD_NEW_POST:
			return update(state, {$push: [action.newData]});
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	changeActive,
	posts
});

export default rootReducer;
