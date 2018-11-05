import React from 'react'

const Suggestions = props => {
	const { handleClick, results } = props
	const options = results.map(result => (
		<li className="list-friends" key={result.id}>
			{result.userName}{' '}
				<button
					className="reg-btn"
					onClick={evt => handleClick(evt, result)}>
					Add
				</button>
		</li>
	))
	return <ul>{options}</ul>
}

export default Suggestions
