import React, { Component } from 'react';

class Add extends Component {
	render() {
		return (
			<div style={{textAlign: 'center', border: '1px dashed #ccc'}}>
				<a href={this.props.src} style={{display: 'block', padding: '50px 0'}}>
					<p style={{fontSize: 30}}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></p>
						<span>{this.props.text}</span>
				</a>
			</div>
		)
	}
}

export default Add;