import React, { Component } from 'react';

class Preview extends Component {
	render() {
		let titleStyle = {
			position: 'absolute',
			left: 0,
			bottom: 0,
			backgroundColor: '#222',
			opacity: '0.7',
			padding: 5,
			color: '#fff',
			width: '100%'
		};
		let activeStyle = {
			border: '2px solid #43b548'
		};
		let itemStyle = {
			marginTop: 0
		};
		return (
			<ul className="list-group">
				<li className="list-group-item">
					<div style={{position: 'relative', width: '100%'}}>
						<img src="/img/test.jpg" className="img-responsive" alt="image" />
						<div style={titleStyle}>
							<span>title for first test test test</span>
						</div>
					</div>
				</li>
				<li className="list-group-item" style={activeStyle}>
					<div className="media">
						<div className="media-body">
							<span className="media-heading">
								test test test test
							</span>
						</div>
						<div className="media-right">
							<img className="media-object" 
									src="/img/test.jpg"
									alt="test"
									style={{width: '85px'}} />
						</div>
					</div>
				</li>
				<li className="list-group-item" style={{
					borderStyle: 'dashed'
				}}>
					<a href="#" style={{
						display: 'block',
						padding: '20px 0',
						textAlign: 'center'
					}}>
						<span className="glyphicon glyphicon-plus" style={{fontSize: '25px'}}></span>
					</a>
				</li>
			</ul>
		)
	}
}

export default Preview;