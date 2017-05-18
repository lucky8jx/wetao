import React, { Component } from 'react';
import ImageUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

class Edit extends Component {
	
	render() {
		
		return (
			<form className="form-horizontal">
				<div className="form-group">
					<label htmlFor="inputTitle" className="col-sm-2 control-label">Title</label>
					<div className="col-sm-10">
						<textarea className="form-control" id="inputTitle" placeholder="Title" rows="3"></textarea>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="inputDes" className="col-sm-2 control-label">Describe</label>
					<div className="col-sm-10">
						<textarea className="form-control" id="inputDes" placeholder="Describe" rows="3"></textarea>
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
									image="http://localhost:3000/img/test.jpg"
									onLoadEnd={(err, res) => {
										console.log(res);
										if (err) {
											console.error(err);
										}
									}}
									deleteImage={() => {
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

export default Edit;