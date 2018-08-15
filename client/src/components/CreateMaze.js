import React from 'react'
import UploadImage from './UploadImage'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const CreateMaze = ({ image }) => {
	return (
		<div>
			<h3>Get Creative</h3>
			<div>
				{Object.keys(image).length ? (
					<Link to="/flood-fill">
						<button type="button" className="btn btn-info">
							Check if it is solvable
						</button>
					</Link>
				) : (
					<UploadImage />
				)}
			</div>
		</div>
	)
}

const mapState = state => {
	return {
		image: state.image
	}
}

export default connect(
	mapState,
	null
)(CreateMaze)
