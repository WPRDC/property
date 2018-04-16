import React from 'react';
import {withStyles} from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styles = {
  root: {
    background: 'red',
    color: 'black'
  }
}

const AlertBox = props => {
  const {isOpen, handleClose, message} = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isOpen}
      autoHideDuration={2000}
      onRequestClose={handleClose}
      SnackbarContentProps={{
        'classes': {
          root: props.classes.root
        },
        'aria-describedby': 'alert-message',
      }}
      message={<span>{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon/>
        </IconButton>,
      ]}
    />
  );
};

export default withStyles(styles)(AlertBox);