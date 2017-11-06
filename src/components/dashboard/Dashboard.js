import React from 'react';
import propTypes from 'prop-types'

/* Material UI Components */
import Paper from 'material-ui/Paper';
import {LinearProgress} from 'material-ui/Progress';

/* Material UI extras */
import {blue} from 'material-ui/colors'


/* Helper functions */
import {monify, extractAddressFromData} from '../../utils/dataUtils'


/*Project Components*/
import DashboardHeader from './DashboardHeader'
import DataSection from './DataSection'
/* Components that need to be moved */
// TODO MOVE THESE!
import {
    ParcelCharacteristics,
    DwellingCharacteristics,
    AssessmentTable,
    PropertyTaxReductions,
    SalesTable,
    TaxLiens
} from '../customModules/index'






/* Project Components */
import ParcelSearch from '../../containers/ParcelSearch'

const blue500 = blue[500];

const style = {
    position: 'relative',
    float: 'left',
    width: '480px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    margin: 0,
    template: {
        img: {
            height: '229px',
            width: '100%',
        },
        header: {
            height: '80px',
            backgroundColor: blue500
        }
    },
    search: {
        margin: '6px',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '454px'
    }
};

const Dashboard = props => {
    const {parcelId, data, isFetching, panMapToTarget} = props;

    if (data && !isFetching) {
        const address = extractAddressFromData(data); //todo: have address generated earlier in the stream (maybe at api server level?)

        return (
            <Paper style={style}>
                <ParcelSearch style={style.search}/>


                <DashboardHeader handlePanToRequest={props.panMapToTarget} address={address}
                                parcelId={parcelId}/>

                {/*TODO: contain all this stuff in another div that has overflow scroll*/}
                <DataSection name="home">
                    <ParcelCharacteristics data={data}/>
                    <br/>
                    <DwellingCharacteristics data={data}/>
                </DataSection>

                <DataSection name="assessment" title="Assessment">
                    <AssessmentTable data={data}/>
                    <br/>
                    <PropertyTaxReductions data={data}/>
                </DataSection>

                <DataSection name="sales" title="Sales">
                    <SalesTable data={data}/>
                </DataSection>

                <DataSection name="liens" title="Tax Liens">
                    <TaxLiens data={data}/>
                </DataSection>
            </Paper>
        );
    }
    else {
        return (
            <div style={style}>
                <div className="template">
                    <div style={style.template.img}/>
                    <LinearProgress mode="query"/>
                    <div style={style.template.header}/>
                </div>
            </div>
        );
    }


}

export default Dashboard;