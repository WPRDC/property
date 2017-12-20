import React from 'react';
import PropTypes from 'prop-types'

/* Material UI Components */
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card'
import {LinearProgress} from 'material-ui/Progress';

/* Material UI extras */
import {blue} from 'material-ui/colors'


/* Helper functions */
import {monify, extractAddressFromData} from '../../utils/dataUtils'


/*Project Components*/
import DashboardHeader from './DashboardHeader'
import DataSection from './DataSection'
/* Components that need to be moved */
import {
    ParcelCharacteristics,
    DwellingCharacteristics,
    AssessmentTable,
    PropertyTaxReductions,
    SalesTable,
    TaxLiens,
    OwnerAddress
} from './customModules/index'


/* Project Components */
import ParcelSearch from '../../containers/ParcelSearch'

const blue500 = blue[500];

const style = {
    base: {
        position: 'relative',
        float: 'left',
        width: '480px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        margin: 0,
    },
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
    const {parcelId, data, isFetching, imageUrl, panMapToTarget} = props;

    if (data && !isFetching) {
        const address = extractAddressFromData(data); //todo: have address generated earlier in the stream (maybe at api server level?)

        return (
            <Card style={style.base}>
                <DataSection>
                    <ParcelSearch style={style.search}/>
                    <DashboardHeader handlePanToRequest={props.panMapToTarget} imageUrl={imageUrl} address={address}
                                     parcelId={parcelId}/>

                    <ParcelCharacteristics data={data}/>

                    <OwnerAddress data={data} parcelId={parcelId}/>

                    <DwellingCharacteristics data={data}/>


                    <AssessmentTable data={data}/>

                    <PropertyTaxReductions data={data}/>


                    <SalesTable data={data}/>

                    <TaxLiens data={data}/>
                </DataSection>
            </Card>
        );
    }
    else {
        return (
            <div style={style}>
                <DataSection>
                    <div style={style.template.img}/>
                    <LinearProgress mode="query"/>
                    <div style={style.template.header}/>
                </DataSection>
            </div>
        );
    }
};

Dashboard.propTypes = {
    parcelId: PropTypes.string.isRequired,
    data: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string,
    panMapToTarget: PropTypes.func
}

export default Dashboard;