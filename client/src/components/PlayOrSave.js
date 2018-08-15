import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const PlayOrSave = () => {
	return (
		<div>
			<h3>Not Solvable</h3>
			{/* If solvable show save button to save it to db */}
			<div className="row">
				<Link to="/pixi">
					<button type="button" className="btn btn-primary">
						Play
					</button>
				</Link>
				{/* If not solvable show try again sends back to create maze */}
				<Link to="/create-maze">
					<button type="button" className="btn btn-primary">
						Send to a friend
					</button>
				</Link>
			</div>
			<div className="row">
				<Link to="/create-maze">
					<button type="button" className="btn btn-primary">
						Create new maze
					</button>
				</Link>
			</div>
		</div>
	)
}

const mapState = state => {
	return {}
}

const mapDispatch = dispatch => {
	return {}
}

export default connect(
	mapState,
	mapDispatch
)(PlayOrSave)
