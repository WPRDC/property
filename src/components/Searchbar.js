import React, {Component} from 'react';
import Input from 'material-ui/Input'
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import SearchIcon from 'material-ui-icons/Search'

import injectSheet from 'react-jss';

const style = {
    container: {
        padding: '3px',
        display: 'flex'
    },
    icon: {
        padding: '6px 6px 0',
        flexGrow: '0'
    },
    input: {
        flexGrow: '1'
    }

};


const SearchBar = props => {
    return (
        <Paper style={style.container}>
            <SearchIcon style={style.icon}/>
            <form onSubmit={props.onSubmit} style={{width: '100%'}}>
                <Input fullWidth={true} style={style.input}
                       placeholder={props.placeholder}
                       onChange={props.onChange}

                />
            </form>
        </Paper>
    );
};


export default (SearchBar);