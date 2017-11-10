import {connect} from 'react-redux'
import Dashboard from '../components/dashboard/Dashboard'
//import {} from "../actions/index";


const mapStateToProps = (state) => {
    const {currentParcelId, parcelDataById, parcelImagesById} = state;
    const {
        isFetching,
        lastUpdated,
        data
    } = parcelDataById[currentParcelId] || {
        isFetching: true,
        data: null
    };
    const {imageUrl} = parcelImagesById[currentParcelId] || {imageUrl: null};

    return {
        parcelId:
        currentParcelId,
        data,
        isFetching,
        lastUpdated,
        imageUrl
    }
};

const mapDispatchToProps = dispatch => {
    return {
        panMapToTarget: () => {
        } // noop TODO: implement new panToMapThing function
    }
};

const ParcelDashboard = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);

export default ParcelDashboard;