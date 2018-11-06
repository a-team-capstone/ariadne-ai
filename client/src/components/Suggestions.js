import React from 'react'

const Suggestions = props => {
	const { handleClick, results } = props
	const options = results.map(result => (
		<li className="friend-suggest" key={result.id}>
			<h5>{result.userName}</h5>
      <button className="reg-btn" onClick={evt => handleClick(evt, result)}>
        Add
      </button>
		</li>
  ))
  
	return (
    options.length ?
    <ul style={{ marginTop: '50px' }}>{options}</ul>
    : null
  )
}

export default Suggestions
