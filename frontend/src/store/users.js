// action constants and corresponding action creators
import csrfFetch from "./csrf"
import { RECEIVE_LISTINGS } from "./listings"

export const RECEIVE_USERS = "users/RECEIVE_USERS"
export const RECEIVE_USER = "users/RECEIVE_USER"

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users: users
})

export const receiveUser = (userPayload) => ({
  type: RECEIVE_USER,
  userPayload
})

export const getUsers = (store) => {
  if (store.users) {
    console.log(store.users)
    return Object.values(store.users)
  } else {
    return []
  }
}

export const getUser = (userId) => (store) => {
  if (store.users && store.users[userId]) {
    console.log("store.users[userId]", (store.users[userId]))
    console.log("======================")
    return store.users[userId]
  } else {
    return null;
  }
}


// thunk action creators
export const fetchUsers = () => async (dispatch) => {
  const response = await fetch(`/api/users`)
  if (response.ok) {
    const users = await response.json()
    dispatch(receiveUsers(users))
  }
}

export const fetchUser = (userId) => async (dispatch) => {
  console.log('hello????????????????')
  const response = await csrfFetch(`/api/users/${userId}`)
  if (response.ok) {
    console.log("HELLO!! HELLO!!???")
    const user = await response.json()
    console.log('user', user)
    dispatch(receiveUser(user))
    return user
  }
}
export const updateUser = (user) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${user.id}`, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  if (response.ok) {
    const updatedUser = await response.json();
    dispatch(receiveUser(updatedUser))
  }
}

export const updateUserCart = (user) => async (dispatch) => {
  console.log('user', user)
  const response = await csrfFetch(`/api/users/${user.id}/updatecart`, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  if (response.ok) {
    const updatedUserCart = await response.json()
    // dispatch(receiveUser(updatedUserCart))
    console.log('updated user cart', updatedUserCart)

  } else {
    console.log(response.json())
  }
}

export const updateUserWatchlist = (user) => async (dispatch) => {
  console.log(user)
  const response = await csrfFetch(`/api/users/${user.id}/updatewatchlist`, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  if (response.ok) {
    const updatedUserWatchlist = await response.json()
    dispatch(receiveUser(updatedUserWatchlist))
    console.log('UPDATED USER WATCHLIST', updatedUserWatchlist)
    return updatedUserWatchlist
  } else {
    console.log(response.json())
  }
}


const usersReducer = (state = {}, action) => {
    let newState = { ...state };
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...newState, ...action.users }
    case RECEIVE_USER:
      return { ...newState, [action.userPayload]: action.userPayload };
    case RECEIVE_LISTINGS:
      return { ...newState, ...action.listings.user}
    default:
      return state;
  }
}

export default usersReducer;