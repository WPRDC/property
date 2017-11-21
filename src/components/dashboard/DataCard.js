import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui/styles';
import Card, {CardHeader, CardContent, CardActions, CardMedia} from 'material-ui/Card'
import Button from 'material-ui/Button'

import {addStyleLayer, OPEN_HIGHLIGHT_MENU, openHighlightMenu} from "../../actions/mapActions";

import {dataSource} from "../../utils/mapDefaults";

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
        const {title, subtitle, children, datasetId, openHighlightMenu, map} = this.props;
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
                                  onClick={openHighlightMenu(map.dataset, map.fields, map.values)}>
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
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        openHighlightMenu: (dataset, fields, values) => () => {
            console.log(dataset, fields, values)
            dispatch(openHighlightMenu(dataset, fields, values))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataCard)