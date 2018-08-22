import React from 'react'

const Suggestions = props => {
	const { handleClick } = props
	const options = props.results.map(result => (
		<li className="list-friends" key={result.id}>
			{result.userName}{' '}
			<wired-button id="friends">
				<button
					className="friends-btn"
					onClick={evt => handleClick(evt, result)}
				>
					Add
				</button>
			</wired-button>
		</li>
	))
	return <ul>{options}</ul>
}

export default Suggestions
