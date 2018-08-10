import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { imageUpload } from '../store/image';

class UploadImage extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.submitFile = this.submitFile.bind(this);
  }

  submitFile = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('file', this.state.file[0]);
    this.props.imageUpload(formData);
  };

  handleFileUpload = event => {
    this.setState({ file: event.target.files });
  };

  render() {
    return (
      <form onSubmit={this.submitFile}>
        <input
          label="upload file"
          type="file"
          onChange={this.handleFileUpload}
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}
const mapState = state => {
  return {
    image: state.image,
  };
};

const mapDispatch = dispatch => {
  return {
    imageUpload: file => dispatch(imageUpload(file)),
  };
};
export default connect(
  mapState,
  mapDispatch
)(UploadImage);
