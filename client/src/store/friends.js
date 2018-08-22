import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_FRIENDS = 'GET_FRIENDS'

/**
 * ACTION CREATORS
 */

const getFriends = friends => ({
  type: GET_FRIENDS,
  friends
})

/**
 * THUNK CREATORS
 */

export const getUserFriends = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`api/user/${id}/friends`)
      dispatch(getFriends(data.friend))
    } catch (err) {
      console.log('Unable to get user friends', err)
    }
  }
}

/**
 * REDUCER
 */

 const initialState = []

 const friendsReducer = (state = initialState, action) => {
   switch (action.type) {
     case GET_FRIENDS:
      return action.friends
     default:
      return state
   }
 }


export default friendsReducer