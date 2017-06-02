import fetch from 'whatwg-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const TITLE_CHANGE = 'TITLE_CHANGE';
export const DESCRIBE_CHANGE = 'DESCRIBE_CHANGE';
export const IMAGE_CHANGE = 'IMAGE_CHANGE';

export const ACTIVE_CHANGE = 'ACTIVE_CHANGE';
export const ADD_NEW_POST = 'ADD_NEW_POST';

export const titleChange = (text, active) => {
	console.log(text, active);
	return {
		type: TITLE_CHANGE,
		text,
		active
	}
};

export const describeChange = (text, active) => {
	return {
		type: DESCRIBE_CHANGE,
		text,
		active
	}
};

export const imageChange = (url, active) => {
	return {
		type: IMAGE_CHANGE,
		url,
		active
	}
};

export const activeChange = (active) => {
	return {
		type: ACTIVE_CHANGE,
		active
	}

};

export const addNewPost = () => {
	return {
		type: ADD_NEW_POST,
		newData: {
			title: 'Your title',
			describe: 'Your describe',
			url: 'http://localhost:3000/img/test.jpg',
		}
	}

}
