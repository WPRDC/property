import React, {component} from 'react'
import {themeColors} from "../utils/settings"

const Header = props => {
    const style = {
        padding: '10px 7px',
        backgroundColor: themeColors.black,
        color: themeColors.white,
        img: {
            height: '70px',
            display: 'block',
            float: 'left',
        },
        h1: {
            display: 'block',
            margin: '0',
            position: 'relative',
            top: '20px',
            left: '5px'
        }
    };

    return (
        <div style={style} className={props.className}>
            <img style={style.img}
                 src="http://www.wprdc.org/wp-content/themes/wprdc-redesign/assets/images/plain_logo_rbg_cropped.svg"/>
            <h1 style={style.h1}>Property Dashboard (beta)</h1>
        </div>
    )
};

export default Header