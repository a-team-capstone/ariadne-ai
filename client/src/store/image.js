import axios from 'axios'
import history from '../history'
/**
 * ACTION TYPES
 */

const UPLOAD_IMAGE = 'UPLOAD_IMAGE'

/**
 * ACTION CREATORS
 */
const uploadImage = image => ({
	type: UPLOAD_IMAGE,
	image
})

/**
 * THUNK CREATORS
 */
export const imageUpload = formData => {
	return async dispatch => {
		try {
			const { data } = await axios.post(`api/uploads/image-upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			console.log('Data', data)
			dispatch(uploadImage(data.Location))
			history.push('/flood-fill')
		} catch (err) {
			console.log('No data...')
		}
	}
}

/**
 * REDUCER
 */

const imageReducer = (state = {}, action) => {
	switch (action.type) {
		case UPLOAD_IMAGE:
			return action.image
		default:
			return state
	}
}

export default imageReducer
