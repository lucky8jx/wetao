import React, { Component } from 'react';

import { connect } from 'react-redux';
import { activeChange, addNewPost } from './actions';

const mapStateToProps = (state, ownProps) => {
	return state;
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onAddNewPost: (active) => {
			dispatch(activeChange(active + 1));
			dispatch(addNewPost());
		},
		onItemClick: (index) => {
			dispatch(activeChange(index));
		},
	}
};

class Preview extends Component {
	handleAddNewPost(e) {
		e.preventDefault();
		this.props.onAddNewPost(this.props.changeActive);
	}
	handleItemClick(index) {
		// e.preventDefault();
		console.log(index);
		this.props.onItemClick(index);
	}
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
		let addDisplay = this.props.posts.length < 6 ? 'block' : 'none';
		let item = this.props.posts.map((value, index) => {
			if (index === 0) {
				return <li className="list-group-item"
										style={index === this.props.changeActive ? activeStyle : {}}
										key={index}
										onClick={this.handleItemClick.bind(this, index)}>
					<div style={{position: 'relative', width: '100%'}}>
						<img src={value.url} className="img-responsive" alt="image" />
						<div style={titleStyle}>
							<span>{value.title}</span>
						</div>
					</div>
				</li>
			} else {
				return <li className="list-group-item"
										style={index === this.props.changeActive ? activeStyle : {}}
										key={index}
										onClick={this.handleItemClick.bind(this, index)}>
					<div className="media">
						<div className="media-body">
							<span className="media-heading">
								{value.title}
							</span>
						</div>
						<div className="media-right">
							<img className="media-object"
									src={value.url}
									alt="test"
									style={{width: '85px'}} />
						</div>
					</div>
				</li>
			}

		});
		return (
			<ul className="list-group">
				{item}
				<li className="list-group-item" style={{
					borderStyle: 'dashed',
					display: addDisplay
				}}>
					<a href="#" style={{
						display: 'block',
						padding: '20px 0',
						textAlign: 'center'
					}} onClick={this.handleAddNewPost.bind(this)}>
						<span className="glyphicon glyphicon-plus" style={{fontSize: '25px'}}></span>
					</a>
				</li>
			</ul>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Preview);

// export default Preview;
