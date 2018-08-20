import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { imageUpload } from '../store/image'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import 'wired-elements'

class Upload extends Component {
	constructor(props) {
		super(props)
		this.state = {
			src: '',
			cropResult: null
		}
		this.onChange = this.onChange.bind(this)
		this.saveToBucket = this.saveToBucket.bind(this)
		this.rotateLeft = this.rotateLeft.bind(this)
		this.rotateRight = this.rotateRight.bind(this)
	}

	onChange(e) {
		e.preventDefault()
		let files
		if (e.dataTransfer) {
			files = e.dataTransfer.files
		} else if (e.target) {
			files = e.target.files
		}
		const reader = new FileReader()
		reader.onload = () => {
			this.setState({ src: reader.result })
		}
		reader.readAsDataURL(files[0])
	}

	async saveToBucket() {
		if (this.state.src) {
			await this.setState({
				cropResult: this.cropper
					.getCroppedCanvas({ maxWidth: 800, maxHeight: 800 })
					.toDataURL('image/jpeg', 0.75)
			})

			let request = {
				imageBinary: this.state.cropResult
			}
			this.props.imageUpload(request)
		}
	}

	rotateLeft() {
		if (this.state.src) this.cropper.rotate(-90)
	}

	rotateRight() {
		if (this.state.src) this.cropper.rotate(90)
	}

	render() {
		return (
				<div
					id="crop-container"
					style={{ width: '90%', position: 'absolute', left: '5%' }}>
					<wired-button id="file">
						<div className="fileUpload">
							<span>Upload</span>
							<input type="file" className="upload" onChange={this.onChange} />
						</div>
					</wired-button>

					<div id="cropperButtons">
						<button
							type="button"
							className="create-btn"
							onClick={this.rotateLeft}>
							  <wired-button id="rotate-left">Rotate Left</wired-button>
						</button>

						<button
							type="button"
							className="create-btn"
							onClick={this.rotateRight}>
							<wired-button id="rotate-right">Rotate Right</wired-button>
						</button>
					</div>

					<Cropper
						style={{ height: 400, width: '100%' }}
						aspectRatio={3 / 4}
						guides={false}
						src={this.state.src}
						ref={cropper => {this.cropper = cropper}}/>

					<button
						type="button"
						className="create-btn"
						onClick={this.saveToBucket}>
						  <wired-button id="selection">Use Selection</wired-button>
					</button>
				</div>
		)
	}
}

const mapDispatch = dispatch => ({
	imageUpload: file => dispatch(imageUpload(file))
})

export default connect(
	null,
	mapDispatch
)(Upload)
