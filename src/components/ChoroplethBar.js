import React from 'react'


const ChoroplethBar = props => {
    const {colors, reverse, id} = props;
    let start = 0,
        stop = colors.length - 1;

    if (reverse) {
        start = stop;
        stop = 0;
    }
    return (
        <div style={{height: '24px', width: '80px', position: 'relative'}}>
            adsf
            <svg width="80" height="23" style={{position: 'absolute', top: '5px', left: '1px', overflow: 'visible'}}>
                <defs>
                    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={colors[start]}/>
                        <stop offset="100%" stopColor={colors[stop]}/>
                    </linearGradient>
                </defs>
                <rect width="80" height="16" fill={`url(#${id})`} stroke="black" strokeWidth="1" rx="2" ry="2"
                      style={{marginTop: '1px'}}
                      shapeRendering="geometricPrecision"/>
            </svg>
        </div>
    )
};

export default ChoroplethBar