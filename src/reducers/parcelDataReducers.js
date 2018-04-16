import {
  SELECT_PARCEL,
  INVALIDATE_PARCEL,
  REQUEST_PARCEL_DATA,
  RECEIVE_PARCEL_DATA,
  REQUEST_PARCEL_IMAGE,
  RECEIVE_PARCEL_IMAGE
} from "../actions/index";
import {CLOSE_ALERT_MESSAGE, OPEN_ALERT_MESSAGE} from "../actions/parcelDataActions";


const DEFAULT_PARCEL = '0028F00194000000';

export const currentParcelId = (state = DEFAULT_PARCEL, action) => {
  switch (action.type) {
    case SELECT_PARCEL:
      return action.parcelId;
    default:
      return state
  }
};

const parcelData = (state = {isFetching: false, didInvalidate: false, data: {}}, action) => {
  switch (action.type) {
    case INVALIDATE_PARCEL:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_PARCEL_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_PARCEL_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.data,
        geo: action.geo,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

export const parcelDataById = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_PARCEL:
    case RECEIVE_PARCEL_DATA:
    case REQUEST_PARCEL_DATA:
      return Object.assign({}, state, {
        [action.parcelId]: parcelData(state[action.parcelId], action)
      });
    default:
      return state
  }
};


export const parcelImage = (state = {isFetching: false, imageUrl: null}, action) => {
  switch (action.type) {
    case REQUEST_PARCEL_IMAGE:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_PARCEL_IMAGE:
      return Object.assign({}, state, {
        isFetching: false,
        imageUrl: action.imageUrl
      });
    default:
      return state
  }
};


export const parcelImagesById = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PARCEL_IMAGE:
    case REQUEST_PARCEL_IMAGE:
      return Object.assign({}, state, {
        [action.parcelId]: parcelImage(state[action.parcelId], action)
      });
    default:
      return state;
  }
};

export const alertMessage = (state = {isOpen: false, message: ''}, action) => {
  switch (action.type) {
    case OPEN_ALERT_MESSAGE:
      return Object.assign({}, state, {isOpen: true, message: action.message});
    case CLOSE_ALERT_MESSAGE:
      return Object.assign({}, state, {isOpen: false, message: ''});
    default:
      return state;
  }
}