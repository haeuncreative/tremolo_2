import csrfFetch from '../store/csrf'

// action constants and corresponding action creators
export const RECEIVE_LISTINGS = "listings/RECEIVE_LISTINGS"
export const RECEIVE_LISTING = "listings/RECEIVE_LISTING"
export const REMOVE_LISTING = "listings/REMOVE_LISTING"

export const receiveListings = (listings) => ({
  type: RECEIVE_LISTINGS,
  listings: listings.listings
})

export const receiveListing = (listingPayload) => ({
  type: RECEIVE_LISTING,
  listingPayload
})

export const removeListing = (listingId) => ({
  type: REMOVE_LISTING,
  listingId
})

// getListings that grabs all the listings in the store
// getListing that takes in a listing id and returns the specified listing from the store

export const getListings = (store) => {
  if (store.listings) { 
    return Object.values(store.listings); 
  } else {
  return [];
  }
}

export const getListing = (listingId) => (store) => {
  if (store.listings && store.listings[listingId]) {
    return store.listings[listingId]
  } else {
    return null;
  }
}

// thunk action creators
export const fetchListings = () => async (dispatch) => {
  const response = await fetch(`/api/listings`, {
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  if (response.ok) {
    const listings = await response.json();
    dispatch(receiveListings(listings))
  }
}

export const fetchListing = (listingId) => async (dispatch) => {
  const response = await fetch(`/api/listings/${listingId}`)
  if (response.ok) {
    const listing = await response.json()
    dispatch(receiveListing(listing))
  }
}

export const createListing = (listingData) => async (dispatch) => {
  const response = await csrfFetch(`/api/listings`, {
    method: "POST",
    body: JSON.stringify(listingData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  if (response.ok) {
    const newListing = await response.json();
    dispatch(receiveListing(newListing))
    return newListing;
  }
}

export const updateListing = (listing) => async (dispatch) => {
  const response = await csrfFetch(`/api/listings/${listing.id}`, {
    method: "PATCH",
    body: JSON.stringify(listing),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  if (response.ok) {
    const updatedListing = await response.json();
    dispatch(receiveListing(updatedListing))
    return updatedListing;
  }
}

export const deleteListing = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/listings/${id}`, {
    method: "DELETE"
  });
  if (response.ok) {
    dispatch(removeListing(id))
    window.location.href =`/`
  }
}

const listingsReducer = (state = {}, action) => {
    let newState = { ...state };
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return { ...newState, ...action.listings };
    case RECEIVE_LISTING:
      return { ...newState, [action.listingPayload.listing.id]: action.listingPayload.listing };
    case REMOVE_LISTING:
      delete newState[action.listingId];
      return newState;
    default:
      return state;
  }
}

export default listingsReducer;