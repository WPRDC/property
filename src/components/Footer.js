import React, {Component} from 'react'
import {themeColors} from "../utils/settings"

const Footer = props => {
    const style = {
        borderTop: "3px solid black",
        background: themeColors.black,
        color: "white",
        padding: ".25rem"
    };

    return (
        <div style={style} className={props.className}>
            <p>&copy; 2017 WPRDC</p>
        </div>
    )
};

export default Footer