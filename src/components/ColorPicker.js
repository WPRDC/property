import React, {Component} from 'react';
import {GithubPicker} from 'react-color';
import Button from 'material-ui/Button';

class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            color: props.color || '#11f'
        }
    }

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false})
    };

    handleChange = (color) => {
        this.setState({color: color.hex});
        this.handleClose();
    };


    handleChangeComplete = (color, event) => {
        this.props.onChange(color.hex);
    };

    componentWillReceiveProps = ({color}) => {
        this.setState({color});
    };


    render() {
        const styles = {
            color: {
                width: '24px',
                height: '18px',
                borderRadius: '2px',
                background: this.state.color,
            },
            button: {
                height: '100%',
                marginBottom: '-8px'
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
            base: Object.assign({}, {position: 'relative'}, this.props.style)
        };


        return (
            <div style={styles.base}>
                <Button style={styles.button} onClick={this.handleClick}>
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