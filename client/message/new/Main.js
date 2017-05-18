import React, { Component } from 'react';

import Preview from './Preview';
import Edit from './Edit';

class Main extends Component {
	render() {
		return (
			<div>
				<div className="container">
					<div className="panel panel-default">
						<div className="panel-heading">
							New
						</div>
						<div className="panel-body row">
							<div className="col-md-4">
								<Preview />
							</div>
							<div className="col-md-8">
								<Edit />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Main;