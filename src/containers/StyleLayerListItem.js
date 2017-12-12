import React, {Component} from 'react';
import {connect} from 'react-redux'
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {removeStyleLayer} from "../actions";


const mapStateToProps = state => {
    const {styleLayers} = state;

    return {
        styleLayers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleDelete: index => {
            dispatch(removeStyleLayer(index))
        }
    }
}