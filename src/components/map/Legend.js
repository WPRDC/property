import React from 'react'
import ChoroplethBar from "../ChoroplethBar";
import ChoroplethPicker from "./ChoroplethPicker";

import Card from 'material-ui/Card'
import {shortenNumber} from "../../utils/dataUtils";

const style = {
    base: {
        position: 'absolute',
        bottom: '12px',
        right: '12px',
        zIndex: '2000',
    },
    categoryLegend: {
        paddingLeft: '6px',
        paddingRight: '6px',
        listStyleType: 'none',
    },
    legendItem: {
    },
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
            marginRight: '2px'
        }}/>
    )
};

const LegendLabel = props => {
    const {text} = props;
    return (
        <span style={{paddingBottom: '2px', verticalAlign: 'middle', fontSize: '.8rem'}}>{text}</span>
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
    const {colorMapping, id} = props;
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

}


const Legend = props => {
    const {mapLayerList, mapLayersById} = props;

    return (
        <Card style={style.base}>
            {
                mapLayerList.slice().reverse().map(id => {
                        const layer = mapLayersById[id];
                        const legendInfo = layer.legendInfo;
                        return (
                            <div key={'legend-' + id}>
                                <h6>{layer.layerName}</h6>
                                {legendInfo.styleType === 'category'
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
                                        ? null
                                        : null
                                }
                            </div>
                        )
                    }
                )
            }
        </Card>
    );
};
export default Legend;