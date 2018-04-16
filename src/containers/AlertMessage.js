import React from 'react'
import {connect} from 'react-redux'

import AlertBox from '../components/AlertBox'
import {closeAlertMessage} from "../actions/parcelDataActions";

const mapStateToProps = state => {
  const {isOpen, message} = state.alertMessage
  return {isOpen, message}
}

const mapDispatchToProps = dispatch => {
  return {
    handleClose: () => {
      console.log("CLOSING THAT SHIT")
      dispatch(closeAlertMessage())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertBox)