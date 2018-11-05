import React, { Component } from 'react'
import { connect } from 'react-redux'
import { imageUpload } from '../store/image'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

class Create extends Component {
  // took out props from constructor and super
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
		const { src } = this.state

		return (
			<div className="content create-maze">
				{src === '' ? (
          <div>
					<h3>Get Creative</h3>
						<p>Maze features are detected by their initials. Write in up to one of each!</p>
						<div className="key">
							<img alt="start" src="/shield.png" />
							<p>STA - Start</p>
							<img alt="end" src="/star.png" />
							<p>END - End</p>
							<img alt="extra time" src="/hourGlassYellow.png" />
							<p>XTM - Extra time</p>
							<img alt="bomb" src="/bomb.png" />
							<p>BMB - Bomb</p>
							<img alt="freeze" src="/freeze.png" />
							<p>FRZ - Freeze</p>
							<img alt="tele" src="/tele.png" />
							<p>TEL - Tele</p>
							<img alt="port" src="/port.png" />
							<p>PRT - port</p>
						</div>
						<button className="reg-btn">
							<div className="fileUpload">
								<span>Upload or Take Picture</span>
								<input
									type="file"
									className="upload"
									onChange={this.onChange}
								/>
							</div>
						</button>
            </div>
				) : (
					<div
						id="crop-container"
						style={{ width: '90%', position: 'absolute', left: '5%' }}>
						<Cropper
							style={{ height: 400, width: '100%' }}
							aspectRatio={3 / 4}
							guides={false}
							src={this.state.src}
							ref={cropper => {
								this.cropper = cropper
							}}/>

						<button
							type="button"
							className="reg-btn"
							onClick={this.rotateLeft}>
							⟲
						</button>


						<button
							type="button"
							className="reg-btn"
							onClick={this.saveToBucket}>
							Use to create Maze!
						</button>

            <button
							type="button"
							className="reg-btn"
							onClick={this.rotateRight}>
							⟳
						</button>

            <button className="reg-btn">
							<div className="fileUpload">
								<span>Choose New Image</span>
								<input
									type="file"
									className="upload"
									onChange={this.onChange}/>
							</div>
						</button>
					</div>
				)}
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
)(Create)
