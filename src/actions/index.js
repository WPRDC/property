export const updateParcelID = parcelId => {
    return {type: 'SELECT_PARCEL', parcelId}
};


export const SELECT_PARCEL = 'SELECT_PARCEL';
export const INVALIDATE_PARCEL = 'INVALIDATE_PARCEL'
export const REQUEST_PARCEL_DATA = 'REQUEST_PARCEL_DATA';
export const RECEIVE_PARCEL_DATA = 'RECEIVE_PARCEL_DATA';


export const REQUEST_PARCEL_IMAGE = 'REQUEST_PARCEL_IMAGE'
export const RECEIVE_PARCEL_IMAGE = 'RECEIVE_PARCEL_IMAGE'

export const selectParcel = parcelId => {
    return {
        type: SELECT_PARCEL,
        parcelId
    }
};

export const invalidateParcel = parcelId => {
    return {
        type: INVALIDATE_PARCEL,
        parcelId
    }
}

export const requestPropertyData = parcelId => {
    return {
        type: REQUEST_PARCEL_DATA,
        parcelId
    }
}

export const receivePropertyData = (parcelId, data) => {
    return {
        type: RECEIVE_PARCEL_DATA,
        parcelId,
        data: data.results[0].data,  //TODO Maybe clean this up and have data.results be teh top data
        geo: data.results[0].geos,
        receivedAt: Date.now()
    }
};

export const fetchParcelData = (parcelId) => {
    // tell state that we're currently requesting the data

    return function (dispatch) {
        dispatch(requestPropertyData(parcelId));


        return fetch(`http://tools.wprdc.org/property-api/v1/parcels/${parcelId}`)
            .then(
                response => response.json(),
                error => console.log('ERROR', error)
            )
            .then(
                data => {
                    dispatch(receivePropertyData(parcelId, data));
                    dispatch(updateParcelID(parcelId));
                }
            )
    }
}


const shouldFetchParcelData = (state, parcelId) => {
    const parcelData = state.parcelDataById[parcelId];
    console.log("++++++++++++++++++++++++++++++++++", parcelData)
    if (!parcelData) {
        return true
    } else if (parcelData.isFetching) {
        return false
    } else {
        return parcelData.didInvalidate
    }

}

export const fetchParcelDataIfNeeded = parcelId => {
    console.log("FETCHIN PARCEL DATA")
    return (dispatch, getState) => {
        if (shouldFetchParcelData(getState(), parcelId)) {
            return dispatch(fetchParcelData(parcelId))
        } else {
            console.log("FETCH NOT NEEDED");
            // no need to wait
            return Promise.resolve()
        }
    }
}