import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';


import {GithubPicker} from 'react-color';
import Button from 'material-ui/Button';

import Popover from 'material-ui/Popover';

class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            color: props.color || '#11f',
            anchorEl: null
        }
    }
    button = null;

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker, anchorEl: findDOMNode(this.button)})
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
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
            base: Object.assign({}, {position: 'relative'}, this.props.style)
        };

        console.log(this.state.anchorEl)

        return (
            <div style={styles.base}>
                <Button
                    ref={node => {
                        this.button = node;
                    }}
                    style={styles.button}
                    onClick={this.handleClick}>
                    <div style={styles.color}/>
                </Button>
                <Popover
                    open={this.state.displayColorPicker}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    onClose={this.handleClose}
                >
                    <GithubPicker color={this.state.color}
                                  triangle="hide"
                                  onChange={this.handleChange}
                                  onChangeComplete={this.handleChangeComplete}/>
                </Popover>
            </div>
        )

    }

}

export default ColorPicker;