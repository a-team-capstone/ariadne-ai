import React from 'react'

const FriendSelect = ({ name, id, handleChange }) => {
  return (
    <div className="form-check" key={id}>
      <label className="form-check-label" htmlFor="defaultCheck1">
        {name}
      </label>
      <input
        className="form-check-input"
        type="checkbox"
        value={id}
        id="defaultCheck1"
        onChange={handleChange}/>
    </div>
  )
}

export default FriendSelect