import React, {Component} from 'react';
import { TwitterPicker } from 'react-color'


class ColorPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayColorPicker: false,
            color: '#11f'
        }
    }

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false})
    };

    handleChange = (color) => {
        console.log(color);
        this.setState({ color: color.hex })
    };


    handleChangeComplete = (color, event) =>{
        this.props.onChange(color.hex);
    };

    render() {
        const styles = {
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: this.state.color,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        };



        return (
            <div>
                <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color}/>
                </div>
                {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose}/>
                    <TwitterPicker color={this.state.color}
                                   onChange={this.handleChange}
                                   onChangeComplete={this.handleChangeComplete}/>
                </div> : null}

            </div>
        )

    }

}

export default ColorPicker;