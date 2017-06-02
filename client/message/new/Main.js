import React, { Component } from 'react';
import { connect } from 'react-redux';
import "whatwg-fetch";

import Preview from './Preview';
import Edit from './Edit';
import serverConfig from '../../../config/server.json';

const API_URL = 'http://' + serverConfig.host + ':' + serverConfig.port;

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSurePublish: (data) => {
			console.log(data);
			fetch(API_URL + '/api/v1.0.0/posts', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
		}
	}
};

class Main extends Component {
	handlePublish(e) {
		e.preventDefault();
		$('#surePublish').modal('show');
	}
	handleSurePublish(e) {
		e.preventDefault();

		this.props.onSurePublish(this.props.posts);
		$('#surePublish').modal('hide');
	}
	render() {
		return (
			<div>
				<div className="container">
					<div className="panel panel-default">
						<div className="panel-heading">
							New
						</div>
						<div className="panel-body">
							<div className="row">
								<div className="col-md-4">
									<Preview />
								</div>
								<div className="col-md-8">
									<Edit />
								</div>
							</div>
							<div>
								<button type="button"
												className="center-block btn btn-success"
												onClick={this.handlePublish.bind(this)}>Publish</button>
								<div id="surePublish" className="modal fade bs-example-modal-sm" tabIndex="-1" role="dialog">
									<div className="modal-dialog" role="document">
										<div className="modal-content">
											<div className="modal-header">
												<button type="button" className="close" data-dismiss="modal" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
												<h4 className="modal-title">Are you sure publish?</h4>
											</div>
											<div className="modal-body">
												<p>This operation cannot back!</p>
											</div>
											<div className="modal-footer">
												<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-primary" onClick={this.handleSurePublish.bind(this)}>Sure</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);

// export default Main;
