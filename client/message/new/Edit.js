import React, { Component } from 'react';
import ImageUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import { connect } from 'react-redux';
import { titleChange, describeChange, imageChange } from './actions';

const mapStateToProps = (state, ownProps) => {
	let post = {};
	state.posts.map((value, index) => {
		if (index === state.changeActive) {
			post = value;
		}
	});
	return {
		active: state.changeActive,
		post: post
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onTitleChange: (text, active) => {
			dispatch(titleChange(text, active));
		},
		onDescribeChange: (text, active) => {
			dispatch(describeChange(text, active));
		},
		onImageChange: (url, active) => {
			dispatch(imageChange(url, active));
		}
	}
}

class Edit extends Component {

	handleTitleChange(e) {
		console.log(this.props);
		this.props.onTitleChange(e.target.value, this.props.active);
	}
	handleDescribeChange(e) {
		this.props.onDescribeChange(e.target.value, this.props.active);
	}
	handleImageChange(url) {
		this.props.onImageChange(url, this.props.active);
	}
	render() {

		return (
			<form className="form-horizontal">
				<div className="form-group">
					<label htmlFor="inputTitle" className="col-sm-2 control-label">Title</label>
					<div className="col-sm-10">
						<textarea onChange={this.handleTitleChange.bind(this)}
											defaultValue={this.props.post.title}
											className="form-control"
											id="inputTitle"
											placeholder="Title"
											rows="3"></textarea>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="inputDes" className="col-sm-2 control-label">Describe</label>
					<div className="col-sm-10">
						<textarea onChange={this.handleDescribeChange.bind(this)}
											defaultValue={this.props.post.describe}
						 					className="form-control"
											id="inputDes"
											placeholder="Describe"
											rows="3"></textarea>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="inputImage" className="col-sm-2 control-label">Image</label>
					<div className="col-sm-10">
						<p className="well">
								<ImageUploader
									url="http://localhost:3000/message/upload"
									optimisticPreviews
									multiple={false}
									image={this.props.post.url}
									onLoadEnd={(err, res) => {
										console.log(res);
										this.handleImageChange(res);
										if (err) {
											console.error(err);
										}
									}}
									deleteImage={() => {
										this.handleImageChange("");
										console.log("delete image");
									}}
									label="Upload a picture" />
							</p>
					</div>

				</div>
			</form>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Edit);

// export default Edit;
