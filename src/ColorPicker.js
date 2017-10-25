import React, {Component} from 'react';
import { GithubPicker } from 'react-color';
import Button from 'material-ui/Button';

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
                width: '24px',
                height: '16px',
                borderRadius: '2px',
                background: this.state.color,
            },
            swatch: {
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
            base: this.props.style
        };



        return (
            <div style={styles.base}>
                <Button dense style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color}/>
                </Button>
                {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose}/>
                    <GithubPicker color={this.state.color}
                                   onChange={this.handleChange}
                                   onChangeComplete={this.handleChangeComplete}/>
                </div> : null}

            </div>
        )

    }

}

export default ColorPicker;