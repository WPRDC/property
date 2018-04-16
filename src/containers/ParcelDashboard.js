import {connect} from 'react-redux'
import Dashboard from '../components/dashboard/Dashboard'
import {changeViewport} from "../actions";
//import {} from "../actions/index";


const mapStateToProps = (state) => {
  const {currentParcelId, parcelDataById, parcelImagesById} = state;
  const {
    isFetching,
    lastUpdated,
    data,
    geo
  } = parcelDataById[currentParcelId] || {
    isFetching: true,
    data: null
  };
  const {imageUrl} = parcelImagesById[currentParcelId] || {imageUrl: null};

  return {
    parcelId:
    currentParcelId,
    data,
    geo,
    isFetching,
    lastUpdated,
    imageUrl
  }
};

const mapDispatchToProps = dispatch => {
  return {
    panMapToTarget: coords => () => {
      dispatch(changeViewport({center: [parseFloat(coords[1]), parseFloat(coords[0])], zoom: 16}));
    },
  }
};

const ParcelDashboard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

export default ParcelDashboard;