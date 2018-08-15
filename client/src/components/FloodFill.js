import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const FloodFill = ({ image }) => {
	return (
		<div>
			<h3>Is it solvable?</h3>
			<img src={image} />
			{/* If solvable show save button to save it to db  */}
			<Link to="/play">
				<button type="button" className="btn btn-primary">
					Save
				</button>
			</Link>
			{/* If not solvable show try again sends back to create maze */}
			<Link to="/create-maze">
				<button type="button" className="btn btn-danger">
					Try Again
				</button>
			</Link>
		</div>
	)
}

const mapState = state => {
	return {
		image: state.image
	}
}

const mapDispatch = dispatch => {
	return {}
}

export default connect(
	mapState,
	mapDispatch
)(FloodFill)
