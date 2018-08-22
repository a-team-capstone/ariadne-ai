import React from 'react'

const Suggestions = props => {
	const { handleClick } = props
	const options = props.results.map(result => (
		<li onClick={() => handleClick(result)} key={result.id}>
			{result.userName}
		</li>
	))
	return <ul>{options}</ul>
}

export default Suggestions
