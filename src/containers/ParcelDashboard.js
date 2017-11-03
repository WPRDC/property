import {connect} from 'react-redux'
import Dashboard from '../components/Dashboard'
//import {} from "../actions/index";


const mapStateToProps = (state) => {
    const {currentParcelId, parcelDataById} = state;
    const {
        isFetching,
        lastUpdated,
        data
    } = parcelDataById[currentParcelId] || {
        isFetching: true,
        data: null
    };

    return {
        parcelId: currentParcelId,
        data,
        isFetching,
        lastUpdated
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