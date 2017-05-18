import React, { Component } from 'react';
import update from 'react-addons-update';
import 'whatwg-fetch';

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
				conform: '',
			},
			feedback: {
				email: {
					status: 0,
					info: '',
				},
				password: {
					status: 0,
					info: '',
				},
				conform: {
					status: 0,
					info: '',
				}
			}
		}
	}

	// watch email input
	emailChange(event) {
		let newstate = update(this.state, {
			inputValue: {
				email: { $set: event.target.value }
			}
		});
		this.setState(newstate);
	}
	// check email
	checkEmail(event) {
		let inputValue = event.target.value;
		let checkStatus = true;
		let newstate;
		let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		const isExist = () => {
			// let flag = true;
			fetch(`${API_URL}/api/v1.0.0/isUserExist`, {
				method: 'post',
				headers: API_HEADERS,
				body: JSON.stringify({
					username: this.state.inputValue.email
				})
			})
			.then((response) => response.json())
			.then((responseData) => {
				console.log(responseData);
				if (responseData.ok) {
					this.setState(update(this.state, {
						feedback: {
							email: {
								status: { $set: 1},
								info: {$set: ''}
							}
						}
					}));
					// this.setState(newstate);
				} else {
					this.setState(update(this.state, {
						feedback: {
							email: {
								status: { $set: 2},
								info: {$set: 'Email already exist'}
							}
						}
					}));
					// this.setState(newstate);
				}
			});
		}
		if (!reg.test(inputValue)) {
			checkStatus = false;
			newstate = update(this.state, {
				feedback: {
					email: {
						status: { $set: 2},
						info: {$set: 'Incorrect email format'}
					}
				}
			});
			this.setState(newstate);
		} else {
			isExist();
		}
	}

	// watch password input
	passwordChange(event) {
		let newstate = update(this.state, {
			inputValue: {
				password: { $set: event.target.value }
			}
		});
		this.setState(newstate);
	}
	// check password
	checkPassword(event) {
		let inputValue = event.target.value;
		let newstate;
		let reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{4,16}$/;
		if (reg.test(inputValue)) {
			newstate = update(this.state, {
				feedback: {
					password: {
						status: { $set: 1},
						info: {$set: ''}
					}
				}
			});
		} else {
			newstate = update(this.state, {
				feedback: {
					password: {
						status: {$set: 2},
						info: {$set : 'some error'}
					}
				}
			});
		}
		this.setState(newstate);
	}

	// watch conform input
	conformChange(event) {
		let newstate = update(this.state, {
			inputValue: {
				conform: { $set: event.target.value }
			}
		});
		this.setState(newstate);
	}
	// check conform password
	checkConform(event) {
		let newstate;
		if (this.state.inputValue.password === this.state.inputValue.conform) {
			newstate = update(this.state, {
				feedback: {
					conform: {
						status: { $set: 1},
						info: { $set: ''}
					}
				}
			});
		} else {
			newstate = update(this.state, {
				feedback: {
					conform: {
						status: { $set: 2},
						info: { $set: 'password is not conform'}
					}
				}
			});
		}
		this.setState(newstate);
	}

	// handleSubmit(event) {
	// 	console.log("submit");
	// 	fetch(`${API_URL}/signUp`, {
	// 		method: 'post',
	// 		headers: API_HEADERS,
	// 		body: JSON.stringify({
	// 			username: this.state.inputValue.email,
	// 			password: this.state.inputValue.password
	// 		})
	// 	});
	// 	event.preventDefault();
	// }

	makeClass(feedbackStatus) {
		let i;
		for(i = 0; i < 3; i++) {
			let status = feedbackStatus[i].status;
			if (status === 0) {
				feedbackStatus[i].glyphiconClass = "glyphicon form-control-feedback";
			} else if (status === 1) {
				feedbackStatus[i].glyphiconClass = "glyphicon glyphicon-ok form-control-feedback";
				feedbackStatus[i].groupClass = "has-success"
			} else {
				feedbackStatus[i].glyphiconClass = "glyphicon glyphicon-remove form-control-feedback";
				feedbackStatus[i].groupClass = "has-error"
			}
		}
		
	}

	render() {
		let submitFlag = false;
		let feedbackStatus = [
			{
				status: this.state.feedback.email.status,
				glyphiconClass: '',
				groupClass: ''
			},
			{
				status: this.state.feedback.password.status,
				glyphiconClass: '',
				groupClass: ''
			},
			{
				status: this.state.feedback.conform.status,
				glyphiconClass: '',
				groupClass: ''
			}
		];
		if (this.state.inputValue.email && this.state.inputValue.password && this.state.inputValue.conform) {
			if ( this.state.feedback.email.status === 1 && this.state.feedback.password.status === 1 && this.state.feedback.conform.status === 1) {
				submitFlag = true;
			}
		}

		this.makeClass(feedbackStatus);
		return (
			<div>
				<div className="container">
					<form style={{width: 400}} className="center-block form-horizontal" action="/signUp" method="post">
						<div className={"form-group has-feedback " + feedbackStatus[0].groupClass}>
							<label htmlFor="email" className="col-sm-2 control-label">Email</label>
							<div className="col-sm-10">
								<input type="email"
										value={this.state.inputValue.email}
										className="form-control"
										id="email"
										name="username"
										placeholder="Email"
										onChange={this.emailChange.bind(this)}
										onBlur={this.checkEmail.bind(this)}
										aria-describedby="emailStatus" />
								<span className={feedbackStatus[0].glyphiconClass} aria-hidden="true"></span>
								<span id="emailStatus" className="help-block">{this.state.feedback.email.info}</span>
							</div>
						</div>
						<div className={"form-group has-feedback " + feedbackStatus[1].groupClass}>
							<label htmlFor="password" className="col-sm-2 control-label">Password</label>
							<div className="col-sm-10">
								<input type="password"
										value={this.state.inputValue.password}
										className="form-control"
										id="password"
										name="password"
										placeholder="Password"
										onChange={this.passwordChange.bind(this)}
										onBlur={this.checkPassword.bind(this)}
										aria-describedby="passwordStatus" />
								<span className={feedbackStatus[1].glyphiconClass} aria-hidden="true"></span>
								<span id="passwordStatus" className="help-block">{this.state.feedback.password.info}</span>
							</div>
						</div>
						<div className={"form-group has-feedback " + feedbackStatus[2].groupClass}>
							<label htmlFor="conform" className="col-sm-2 control-label">Password</label>
							<div className="col-sm-10">
								<input type="password"
										value={this.state.inputValue.passConform}
										className="form-control"
										id="conform"
										placeholder="Conform Password"
										onChange={this.conformChange.bind(this)}
										onBlur={this.checkConform.bind(this)}
										aria-describedby="conformStatus" />
								<span className={feedbackStatus[2].glyphiconClass} aria-hidden="true"></span>
								<span id="conformStatus" className="help-block">{this.state.feedback.conform.info}</span>
							</div>
						</div>
						<div className="form-group">
							<div className="col-sm-offset-2 col-sm-10">
								<button type="submit" 
										className="btn btn-default" 
										disabled={submitFlag ? '' : 'disabled'}>
									Sign up
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