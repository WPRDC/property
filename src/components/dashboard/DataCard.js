import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui/styles';
import Card, {CardHeader, CardContent, CardActions, CardMedia} from 'material-ui/Card'
import Button from 'material-ui/Button'

import {addStyleLayer, openHighlightMenu} from "../../actions/styleMenuActions";

import {dataSource, StyleMenuEditModes} from "../../utils/mapDefaults";

const style = {
    card: {
        margin: '6px',
    }
};

class DataCard extends Component {
    constructor(props) {
        super(props);
    }

    _makeMapDescription = mapInfo => () => {
        const {dispatch} = this.props;
        const {sql, css, dataset, field, valuesByField} = mapInfo;
        if (sql && css)
            dispatch(addStyleLayer(
                {
                    currentTab: 'Data Highlight',
                    dataset,
                    field,
                    styleInfo: {sql, css}
                }
                )
            )
            ;

    };

    render() {
        const {
            title,
            subtitle,
            children,
            datasetId,
            map,
            nextStyleLayerIndex,
            openHighlightMenu,
        } = this.props;
        const dataset = dataSource.getDataset(datasetId);
        const {datasetUrl} = dataset || {datasetUrl: ''};


        return (
            <Card raised style={style.card}>
                <CardHeader title={title} subheader={subtitle}/>
                <CardContent>
                    {children}
                </CardContent>
                <CardActions>
                    {datasetUrl
                        ? <Button dense color="primary" onClick={() => {
                            window.open(datasetUrl, '_blank')
                        }}>
                            Dataset
                        </Button>
                        : null
                    }

                    {map
                        ? <Button dense color="primary"
                                  onClick={openHighlightMenu(nextStyleLayerIndex, map.dataset, map.items)}
                        >
                            Highlight Similar
                        </Button>
                        : null
                    }

                </CardActions>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    const {styleLayers} = state;
    const nextStyleLayerIndex = styleLayers.length;
    return {nextStyleLayerIndex}
};

const mapDispatchToProps = dispatch => {
    return {
        openHighlightMenu: (nextStyleLayerIndex, dataset, items) => () => {
            dispatch(openHighlightMenu(StyleMenuEditModes.ADD, nextStyleLayerIndex, dataset, items))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataCard)