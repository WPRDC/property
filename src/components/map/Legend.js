import React from 'react'
import ChoroplethBar from "../ChoroplethBar";
import ChoroplethPicker from "./ChoroplethPicker";

import Card from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import {shortenNumber} from "../../utils/dataUtils";
import ShortenedText from "../../components/ShortenedText"


const style = {
  base: {
    position: 'absolute',
    bottom: '24px',
    right: '4px',
    zIndex: '2000',
    minWidth: '200px',
    padding: '6px'
  },
  title: {
    marginBottom: '6px'
  },
  categoryLegend: {
    paddingLeft: '6px',
    paddingRight: '6px',
    listStyleType: 'none',
    margin: '2px'
  },
  legendItem: {},
  singleColor: {}
}


/*=====================================================*/
/*== Small Components =================================*/
/*=====================================================*/
const SingleColor = props => {
  const {color} = props;
  return (

    <div style={{
      display: 'inline-block',
      height: '.7rem', width: '.7rem',
      background: color,
      border: 'none',
      borderRadius: '2px',
      marginRight: '2px',
      verticalAlign: 'middle'
    }}/>
  )
};

const LegendLabel = props => {
  const {text} = props;
  return (
    <span style={{verticalAlign: 'middle', fontSize: '.8rem'}}>{text}</span>
  )
}

/*=====================================================*/
/*== Legend Parts =====================================*/
/*=====================================================*/

const CategoryLegendPart = props => {
  const {colorMapping} = props;
  return (<ul style={style.categoryLegend}>
      {
        colorMapping.map((item, i) =>
          <li key={i.toString()} style={style.legendItem}>
            <SingleColor color={item.color}/>
            <LegendLabel text={item.value}/>
          </li>
        )
      }
    </ul>
  )
}

const ChoroplethLegendPart = props => {
  const {colorMapping} = props;
  const labels = {left: shortenNumber(colorMapping.min), right: shortenNumber(colorMapping.max)}
  return (
    <ul style={style.categoryLegend}>
      <li>
        <ChoroplethBar colors={colorMapping.colors[7]} width={'100%'} labels={labels}/>
      </li>
    </ul>

  )

}

const RangeLegendPart = props => {
  const {colorMapping} = props;
  const {color, range} = colorMapping;
  return (<ul style={style.categoryLegend}>
      <li style={style.legendItem}>
        <SingleColor color={color}/>
        <LegendLabel text={`${range[0]} - ${range[1]}`}/>
      </li>
    </ul>
  )
}


const Legend = props => {
  const {mapLayerList, mapLayersById} = props;
  if (typeof(mapLayerList) === 'undefined' || !mapLayerList.length) {
    return null;
  }
  return (
    <Card style={style.base}>
      {/*<Typography style={style.title} type="title">Legend</Typography>*/}
      {
        mapLayerList.slice().reverse().map(id => {
            const layer = mapLayersById[id];
            const legendInfo = layer.legendInfo;
            return (
              <div key={'legend-' + id}>
                <Typography type="subheading"><ShortenedText text={layer.layerName} length={30}/></Typography>
                {legendInfo.styleType === 'category' || legendInfo.styleType === 'highlight'
                  ? <CategoryLegendPart key={id} colorMapping={legendInfo.colorMapping}/>
                  : null
                }
                {
                  legendInfo.styleType === 'choropleth'
                    ? <ChoroplethLegendPart key={id} colorMapping={legendInfo.colorMapping}/>
                    : null
                }
                {
                  legendInfo.styleType === 'range'
                    ? <RangeLegendPart key={id} colorMapping={legendInfo.colorMapping}/>
                    : null
                }
                <br/>
              </div>
            )
          }
        )
      }
    </Card>
  );
};
export default Legend;