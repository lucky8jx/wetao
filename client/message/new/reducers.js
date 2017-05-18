import { combineReducers } from 'redux';
import update from 'react-addons-update';

import {
	REQUEST_POSTS, RECEIVE_POSTS,
	TITLE_CHANGE,DESCRIBE_CHANGE,IMAGE_CHANGE,
	ACTIVE_CHANGE,ADD_NEW_POST
} from './actions';

const changeActive = (state = 0, action) => {
	switch (action.type) {
		case ACTIVE_CHANGE:
			return action.active;
		default:
			return state
	}
};

const post = (state = {}, action) => {
	switch(action.type) {
		case TITLE_CHANGE:
			return update(state, {
				title: {$set: action.text}
			});
		case DESCRIBE_CHANGE:
			return update(state, {
				describe: {$set: action.text}
			});
		case IMAGE_CHANGE:
			return update(state, {
				url: {$set: action.url}
			});
		default:
			return state;
	}
}

const posts = (state = [], action) => {
	switch (action.type) {
		case TITLE_CHANGE:
		case DESCRIBE_CHANGE:
		case IMAGE_CHANGE:
			return state.map((value, index) => {
				if (action.active === index) {
					post(value, action);
				}
			});
		case ADD_NEW_POST:
			return update(state, {$push: action.newData});
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	changeActive,
	posts
});

export default rootReducer;