import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui/styles';
import Card, {CardHeader, CardContent, CardActions, CardMedia} from 'material-ui/Card'
import Button from 'material-ui/Button'

import {openHighlightStyleMenu} from "../../actions/layerEditorActions";

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
                      onClick={openHighlightMenu(StyleMenuEditModes.ADD,
                        map.dataset,
                        map.items
                      )}
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


const mapDispatchToProps = dispatch => {
  return {
    openHighlightMenu: (nextStyleLayerIndex, dataset, items) => () => {
      dispatch(openHighlightStyleMenu(StyleMenuEditModes.ADD, null, {menuState: {dataset, items}}))
    }
  }
}

export default connect(null, mapDispatchToProps)(DataCard)