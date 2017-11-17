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
        const {title, subtitle, children, mapInfo, datasetId, openHighlightMenu} = this.props;
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


                    <Button dense color="primary" onClick={openHighlightMenu}>
                        Add to Map
                    </Button>
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
        openHighlightMenu: () => {
            dispatch(openHighlightMenu())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataCard)