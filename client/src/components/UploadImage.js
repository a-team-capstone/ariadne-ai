import React, { Component } from 'react';
import axios from 'axios';

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
    console.log('Form data', this.state.file[0]);
    console.log('Form data', formData);
    axios
      .post('api/uploads/image-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        // handle your response;
        console.log('Response', response.data);
        const { data } = response;
        console.log('Data location ', data.Location);
      })
      .catch(error => {
        // handle your error
        console.log('error', error);
      });
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
export default UploadImage;
