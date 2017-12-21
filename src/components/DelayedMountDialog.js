import React from 'react'
import Dialog from 'material-ui/Dialog'
import { CircularProgress } from 'material-ui/Progress';

const DelayedMountDialog = props => {
    const {children, open, ...otherProps} = props;

    return (
        <Dialog {...otherProps}>
            {
                open
                    ? children
                    : <CircularProgress color="accent"/>
                }
        </Dialog>

    )
}

export default DelayedMountDialog;