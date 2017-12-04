import React from 'react';
import Typography from 'material-ui/Typography';
import SingleItemDisplay from "../dataDisplays/SingleItemDisplay";

import DataCard from '../DataCard'

import {dataSource} from '../../../utils/mapDefaults'
import {nl2br} from "../../../utils/dataUtils";

const style = {
    div: {
        margin: '6px 0',
        fontSize: '13px !important'
    },
};

const styleInfo = data => {
    const {
        CHANGENOTICEADDRESS1,
        CHANGENOTICEADDRESS2,
        CHANGENOTICEADDRESS3,
        CHANGENOTICEADDRESS4
    } = data.assessments[0];
    const address = CHANGENOTICEADDRESS1 + CHANGENOTICEADDRESS2 + CHANGENOTICEADDRESS3 + CHANGENOTICEADDRESS4;
    return {
        sql: `SELECT * FROM (
            SELECT ds.cartodb_id, pb.the_geom, pb.the_geom_webmercator, 
                (ds.changenoticeaddress1 || ds.changenoticeaddress2 || ds.changenoticeaddress3 || ds.changenoticeaddress4) as owner_address, ds.parid 
                FROM wprdc.allegheny_county_parcel_boundaries pb 
                JOIN "wprdc"."assessments" ds ON pb.pin = ds.parid) as subquery
            WHERE owner_address='${address}'`,
        css: `#owner{ polygon-opacity: 0.0; line-color: #000; line-opacity: 0; line-width: 1; [ owner_address = "${address}" ]{ polygon-opacity: 1.0; polygon-fill: red;}}`
    }
}

const dataset = dataSource.getDataset('assessment');

const OwnerAddress = props => {
    const {data} = props;
    const assessmentData = data.assessments[0];
    const {
        CHANGENOTICEADDRESS1, CHANGENOTICEADDRESS2, CHANGENOTICEADDRESS3, CHANGENOTICEADDRESS4
    } = assessmentData;

    // Format the address into several lines.  if a line doesn't exist (filter it out)
    const addressString = [CHANGENOTICEADDRESS1, CHANGENOTICEADDRESS2, CHANGENOTICEADDRESS3 + CHANGENOTICEADDRESS4]
        .filter(line => line.replace(/\s+/g, ''))
        .join('\n');

    return (
        <DataCard
            title="Owner Address"
            datasetId="assessment"
            map={{
                dataset,
                items: [
                    {field: 'Owner Address', value: addressString, formatter: nl2br, styleInfo: styleInfo(data)},
                    {field: 'Owner Address', value: addressString, formatter: e => e}
                ]
            }}
        >
            < SingleItemDisplay
                data={data}
                formatter={
                    data => {
                        return (<div style={style.div}>
                            <Typography type="body1">{CHANGENOTICEADDRESS1}</Typography>
                            <Typography type="body1">{CHANGENOTICEADDRESS2}</Typography>
                            <Typography
                                type="body1">{CHANGENOTICEADDRESS3} {CHANGENOTICEADDRESS4}</Typography>
                        </div>)

                    }
                }
            />
        </DataCard>
    );
};

export default OwnerAddress