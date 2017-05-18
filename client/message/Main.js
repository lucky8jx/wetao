import React, { Component } from 'react';

import Add from './Add';

class Main extends Component {
	render() {

		let addItem = this.props.tags.map((tag) => (
			<div className="col-md-6" key={tag.id}>
				<Add src={tag.src} text={tag.text} />
			</div>
		));
		
		return (
			<div>
				<div className="container">
					<div className="panel panel-default">
						<div className="panel-heading">
							Create message
						</div>
						<div className="panel-body row">
							{addItem}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Main;