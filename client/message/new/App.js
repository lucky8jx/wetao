import React, { Component } from 'react';
import { connect } from 'react-redux';

import Main from './Main';

class App extends Component {
	render() {
		return (
			<Main />
		)
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddClick: () => {
			console.log("abc")
		}
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);