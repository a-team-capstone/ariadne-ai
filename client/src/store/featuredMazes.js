import axios from 'axios'

let initalState = []


const GET_FEATURED = 'GET_FEATURED'

 
const getFeatured = mazes => ({
  type: GET_FEATURED,
  mazes
})


export const loadFeatured = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('api/mazes/featured')
      dispatch(getFeatured(data))
    } catch (err) {
      console.error('Could not get featured mazes', err)
    }
  }
}


const featuredReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_FEATURED:
    return action.mazes
    default:
    return state
  }
}

export default featuredReducer