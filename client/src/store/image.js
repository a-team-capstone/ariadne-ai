import axios from 'axios'
import history from '../history'

let initialState = {}


const UPLOAD_IMAGE = 'UPLOAD_IMAGE'


const uploadImage = image => ({
	type: UPLOAD_IMAGE,
	image
})


export const imageUpload = formData => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`api/uploads/image-upload`, formData)
      dispatch(uploadImage(data.Location))
      history.push('/flood-fill')
    } catch (err) {
      console.error('No data...', err)
    }
  }
}


const imageReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPLOAD_IMAGE:
			return action.image
		default:
			return state
	}
}

export default imageReducer
