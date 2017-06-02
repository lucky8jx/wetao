import React, { Component } from 'react';
import 'whatwg-fetch';
import serverConfig from '../../config/server.json';

const API_URL = 'http://' + serverConfig.host + ':' + serverConfig.port;
const API_HEADERS = {
	'Content-Type': 'application/json'
};

class Header extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			user: ''
		};
	}

	getUser() {
		fetch(`${API_URL}/api/v1.0.0/getUser`, {
			headers: API_HEADERS
		})
		.then((response) => response.json())
		.then((responseData) => {
			console.log(responseData);
			this.setState({user: responseData.user} || '');
		});
	}

	componentDidMount() {
		this.getUser();
	}

	render() {
		// let currentUser = false;
		let navLeft = (
			<ul className="nav navbar-nav navbar-right">
				<li><a href="/logIn">Log in</a></li>
				<li><a href="/signUp">Sign up</a></li>
			</ul>
		);
		if (this.state.user) {
			<ul className="nav navbar-nav navbar-right">
				<li><a href="#">Hello {this.state.user.name() }</a></li>
				<li><a href="/signUp">Sign up</a></li>
			</ul>
		}
		return (
			<nav className="navbar navbar-inverse">
				<div className="container">
				<div className="navbar-header">
					<a className="navbar-brand" href="/">We Tao</a>
				</div>
				<ul className="nav navbar-nav navbar-right">
					<li><a href="/logIn">Log in</a></li>
					<li><a href="/signUp">Sign up</a></li>
				</ul>
				</div>
			</nav>
		)
	}
}

export default Header;
