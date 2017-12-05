import {connect} from 'react-redux'
import {fetchParcelDataIfNeeded} from "../actions/index";
import SearchBar from '../components/SearchBar'

const mapStateToProps = (state, ownProps) => {
    return {
        placeholder: 'Search by Parcel ID'
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleSubmit: parcelId => {
            dispatch(fetchParcelDataIfNeeded(parcelId))
        }
    }
};

const ParcelSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);


export default ParcelSearch