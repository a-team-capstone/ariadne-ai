import axios from 'axios'

/**
 * ACTION TYPES
 */

 const GET_FEATURED = 'GET_FEATURED'

 /**
 * ACTION CREATORS
 */

 const getFeatured = mazes => ({
   type: GET_FEATURED,
   mazes
 })

 /**
 * THUNK CREATORS
 */

 export const loadFeatured = () => {
   return async dispatch => {
     try {
       const { data } = await axios.get('api/mazes/featured')
       dispatch(getFeatured(data))
     } catch (err) {
       console.log('Error loading featured mazes', err)
     }
   }
 }

 /**
 * REDUCER
 */

 export default featuredReducer = (state = {}, action) => {
   switch (action.type) {
     case GET_FEATURED:
      return action.mazes
     default:
      return state
   }
 }