import {connect} from 'react-redux';
import LayerList from '../components/map/LayerList'
import {addMapLayer, removeMapLayer, updateMapLayer} from "../actions/mapLayerActions";
import {guid} from "../utils/dataUtils";
import {LayerTypes} from "../utils/mapDefaults";
import {openCustomStyleMenu} from "../actions/styleMenuActions";


const mapStateToProps = state => {
    const {
        mapLayerList,
        mapLayersById,
    } = state;
    return {mapLayerList, mapLayersById}

}

const mapDispatchToProps = dispatch => {
    return {
        handleDeleteLayer: (layerId) => () => {
            dispatch(removeMapLayer(layerId))
        },
        handleOpenEditMenu: (mode, layerType) => () => {
            dispatch(openCustomStyleMenu())
        }
    }
}

const MapLayerList = connect(mapStateToProps, mapDispatchToProps)(LayerList);

export default MapLayerList