import React from 'react';
import Typography from 'material-ui/Typography';
import SingleItemDisplay from "../dashboard/dataDisplays/SingleItemDisplay";

const style = {
    div: {
        margin: '6px 0',
        fontSize: '13px !important'
    },
}

const OwnerAddress = props => {
    console.log(props.data);
    return (
        <SingleItemDisplay title="Owner Address"
                           data={props.data}
                           formatter={
                               data => {
                                   const assessmentData = data.assessments[0];
                                   const {
                                       CHANGENOTICEADDRESS1,
                                       CHANGENOTICEADDRESS2,
                                       CHANGENOTICEADDRESS3,
                                       CHANGENOTICEADDRESS4
                                   } = assessmentData;
                                   return (<div style={style.div}>
                                       <Typography type="body1">{CHANGENOTICEADDRESS1}</Typography >
                                       <Typography type="body1">{CHANGENOTICEADDRESS2}</Typography >
                                       <Typography type="body1">{CHANGENOTICEADDRESS3} {CHANGENOTICEADDRESS4}</Typography >
                                   </div>)

                               }
                           }
        />
    );
};

export default OwnerAddress