import React, { Component } from 'react';
import update from 'react-addons-update';

const API_URL = 'http://localhost:3000';
const API_HEADERS = {
	'Content-Type': 'application/json'
};

class Main extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			inputValue: {
				email: '',
				password: '',
			}
		};
	}
	// watch the user's email input
	emailChange(event) {
		console.log("change the email");
		let newState = update(this.state, {
			inputValue: {
				email: { $set: event.target.value}
			}
		});
		this.setState(newState);
	}
	// watch the user's password input
	passwordChange(event) {
		let newState = update(this.state, {
			inputValue: {
				password: { $set: event.target.value}
			}
		});
		this.setState(newState);
	}
	// submit input
	handleSubmit(event) {
		event.preventDefault();
		fetch(`${API_URL}/logIn`, {
			method: 'post',
			headers: API_HEADERS,
			body: JSON.stringify({
				username: this.state.inputValue.email,
				password: this.state.inputValue.password
			})
		});
	}

	render() {
		return (
			<div>
				<div className="container">
					
					<form style={{width: 400}} className="center-block form-horizontal" action="/logIn" method="post">
						<div className="form-group">
							<label htmlFor="email" className="col-sm-2 control-label">Email</label>
							<div className="col-sm-10">
								<input type="email"
										value={this.state.inputValue.email}
										className="form-control"
										id="email"
										name="username"
										placeholder="Email"
										onChange={this.emailChange.bind(this)}
										aria-describedby="emailStatus" />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="password" className="col-sm-2 control-label">Password</label>
							<div className="col-sm-10">
								<input type="password"
										value={this.state.inputValue.password}
										className="form-control"
										id="password"
										name="password"
										placeholder="Password"
										onChange={this.passwordChange.bind(this)}
										aria-describedby="passwordStatus" />
							</div>
						</div>
						<div className="form-group">
							<div className="col-sm-offset-2 col-sm-10">
								<button type="submit" 
										className="btn btn-default" 
										disabled={(this.state.inputValue.email && this.state.inputValue.password) ? '' : 'disabled'}>
									Sign in
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default Main;