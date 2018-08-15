import React, { Component } from 'react'
import 'cropperjs/dist/cropper.css'

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
    const reader = new FileReader()
    reader.onload = () => {
      this.setState({ src: reader.result })
    };
    reader.readAsDataURL(files[0])
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL('image/jpeg'),
      // CHANGED DATA URL TYPE IN PERENS
    })
  }

  saveToBucket () {
    console.log('saving to AWS bucket')
    // post route for uploading image to AWS
  }

  rotateLeft () {
    this.cropper.rotate(-90)
  }

  rotateRight () {
    this.cropper.rotate(90)
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
      </div>
    );
  }
}

// class Upload extends Component {
//   constructor () {
//     super()
//     this.state = {
//       src: ''
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleClear = this.handleClear.bind(this)
//   }

//   handleChange (evt) {
//     this.setState({
//       src: URL.createObjectURL(evt.target.files[0])
//     })
//   }

//   handleClear (evt) {
//     this.setState({
//       src: ''
//     })
//   }

//   render () {
//     return (
//       <Fragment>
//         <input type="file" onChange={this.handleChange} capture="environment"/>
//         <button onClick={this.handleClear}>Clear</button>
//         <img src={this.state.src} />
//       </Fragment>
//     )
//   }
// }

export default Upload
