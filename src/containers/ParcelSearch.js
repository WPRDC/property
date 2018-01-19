import {connect} from 'react-redux'
import {fetchParcelDataIfNeeded} from "../actions/index";
import SearchBar from '../components/SearchBar'
import {searchForParcel} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        placeholder: 'Search by Parcel ID or Address'
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleSubmit: query => {
            dispatch(searchForParcel(query))
        }
    }
};

const ParcelSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);


export default ParcelSearch