import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'cropperjs/dist/cropper.css'
import { imageUpload } from '../store/image'

import Cropper from 'react-cropper'

/* global FileReader */

// const src = 'img/child.jpg'

class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src: '',
      cropResult: null,
    };
    this.cropImage = this.cropImage.bind(this)
    this.onChange = this.onChange.bind(this)
    this.saveToBucket = this.saveToBucket.bind(this)
    this.rotateLeft = this.rotateLeft.bind(this)
    this.rotateRight = this.rotateRight.bind(this)
  }

  onChange(e) {
    e.preventDefault()
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    console.log('waaaaahhh', files)
    const reader = new FileReader()
    reader.onload = () => {
      this.setState({ src: reader.result })
    };
    reader.readAsDataURL(files[0])
    // console.log('reader result', reader.result)
    // console.log('src', this.state.src)
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas({ maxWidth: 800, maxHeight: 800 }) === 'undefined') {
      return
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas({ maxWidth: 800, maxHeight: 800 }).toDataURL('image/jpeg', 0.9)
      // CHANGED DATA URL TYPE IN PERENS
    })
  }

  saveToBucket () {
    console.log('saving to AWS bucket')
    // this.props.imageUpload(this.state.cropResult)
    this.cropper.getCroppedCanvas({
      fillColor: '#fff'
    }).toBlob((blob) => {
      const formData = new FormData()
      formData.append('croppedImage', blob)
      this.props.imageUpload(formData)
    }, 'image/jpeg', 0.9)
  }

  rotateLeft () {
    this.cropper.rotate(-90)
    this.setState({
      cropResult: this.cropper.getCroppedCanvas({ maxWidth: 800, maxHeight: 800 }).toDataURL('image/jpeg', 0.9)
    })
    console.log('croppy', this.state.cropResult)
    console.log('src', this.state.src)
  }

  rotateRight () {
    this.cropper.rotate(90)
    this.setState({
      cropResult: this.cropper.getCroppedCanvas({ maxWidth: 800, maxHeight: 800 }).toDataURL('image/jpeg', 0.9)
    })
  }

  render() {
    return (
      <div>
        {/* We can style crop-container in media queries to set the width of the cropper!! */}
        <div id="crop-container" style={{ width: '80%', position: 'absolute', left: '10%' }}>
          <input type="file" onChange={this.onChange} />
          <button onClick={this.saveToBucket}>Use Crop</button>
          <button onClick={this.rotateLeft}>RL</button>
          <button onClick={this.rotateRight}>RR</button>
          <br />
          <br />
          <Cropper
            style={{ height: 500, width: '100%' }}
            aspectRatio={3 / 4}
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper = cropper; }}
          />
        </div>
        <img style={{ width: '50%', position: 'absolute', left: '25%', top: '85%' }} src={this.state.cropResult} alt="cropped image" />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  imageUpload: file => dispatch(imageUpload(file))
})

export default connect(null, mapDispatch)(Upload)
