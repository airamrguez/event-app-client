import api from '../services/api';
import {createRequestActionTypes} from '.';

const SET_FEED = 'SET_FEED';
const APPEND_FEED = 'APPEND_FEED';

const {
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE
} = createRequestActionTypes('GET_FEED');
const {
  REFRESH_FEED_REQUEST,
  REFRESH_FEED_SUCCESS,
  // Failure of refresh is also modeled as "success"
  // REFRESH_FEED_FAILURE
} = createRequestActionTypes('REFRESH_FEED');
const DELETE_FEED_ITEM = 'DELETE_FEED_ITEM';

const fetchFeed = () => {
  return (dispatch) => {
    dispatch({ type: GET_FEED_REQUEST });

    api.fetchModels('feed')
      .then(items => {
        dispatch({
          type: SET_FEED,
          feed: items
        });

        dispatch({ type: GET_FEED_SUCCESS });
      })
      .catch(error => dispatch({ type: GET_FEED_FAILURE, error: true, payload: error }));
  };
};

const refreshFeed = () => {
  return (dispatch) => {

    dispatch({ type: REFRESH_FEED_REQUEST });
    api.fetchModels('feed')
      .then(items => {
        dispatch({
          type: SET_FEED,
          feed: items
        });
        dispatch({ type: REFRESH_FEED_SUCCESS });
        dispatch({ type: GET_FEED_SUCCESS });
      })
      .catch(error => dispatch({ type: REFRESH_FEED_SUCCESS, error: true, payload: error }));
  };
};

const loadMoreItems = (lastID) => {
  return (dispatch) => {

    dispatch({ type: REFRESH_FEED_REQUEST });
    api.fetchMoreFeed(lastID)
      .then(items => {
        dispatch({
          type: APPEND_FEED,
          feed: items
        });
        dispatch({ type: REFRESH_FEED_SUCCESS });
        dispatch({ type: GET_FEED_SUCCESS });
      })
      .catch(error => dispatch({ type: REFRESH_FEED_SUCCESS }));
  };
};

const removeFeedItem = (item) => {
  return dispatch => {
    api.deleteFeedItem(item)
      .then(() => dispatch({
        type: DELETE_FEED_ITEM,
        item
      }))
      .catch(error => console.log('Error when trying to delete feed item', error));
  };
};

export {
  SET_FEED,
  APPEND_FEED,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,
  REFRESH_FEED_REQUEST,
  REFRESH_FEED_SUCCESS,
  DELETE_FEED_ITEM,

  fetchFeed,
  refreshFeed,
  loadMoreItems,
  removeFeedItem
};
