/**
 * Created by sds25 on 9/6/17.
 */
import React, {Component} from "react";
import {KeyValueModule, TableModule} from "../components/DataDisplays";

import Searchbar from '../components/SearchBar';


import Button from 'material-ui/Button';

import MyLocation from 'material-ui-icons/MyLocation'

import {blue} from 'material-ui/colors'
import Tooltip from 'material-ui/Tooltip';

import Card, {CardHeader, CardContent} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import {LinearProgress} from 'material-ui/Progress';
import TextField from 'material-ui/TextField';


import {monify, checkSearchQuery} from '../utils/dataUtils'

import {getStreetViewImage} from '../utils/apiUtils'

import ParcelSearch from './ParcelSearch'
const blue500 = blue[500];


//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
// Primary Container for Displaying Parcel Information
//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
export class PropertyDataContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parcelId: '',
            address: null,
            isLoaded: false,
            data: null
        };

        this.updateParcel = this.updateParcel.bind(this);
    }

    render() {
        let style = {
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


        if (this.state.isLoaded) {
            return (
                <Paper style={style}>
                    <ParcelSearch updateParcelId={this.props.updateParcel} style={style.search}/>

                    <PropertyHeader handlePanToRequest={this.props.handlePanToRequest} address={this.state.address} parcelId={this.state.parcelId}/>

                    {/*TODO: contain all this stuff in another div that has overflow scroll*/}
                    <PropertyDataSection name="home">
                        <ParcelChars data={this.state.data}/>
                        <br/>
                        <DwellingChars data={this.state.data}/>
                    </PropertyDataSection>

                    <PropertyDataSection name="assessment" title="Assessment">
                        <AssessmentTable data={this.state.data}/>
                        <br/>
                        <PropertyTaxReductions data={this.state.data}/>
                    </PropertyDataSection>

                    <PropertyDataSection name="sales" title="Sales">
                        <SalesTable data={this.state.data}/>
                    </PropertyDataSection>

                    <PropertyDataSection name="liens" title="Tax Liens">
                        <TaxLiens data={this.state.data}/>
                    </PropertyDataSection>
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

    componentDidMount() {
        this.updateParcel(this.props.parcelId);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isLoaded: false})
        this.updateParcel(nextProps.parcelId);
    }

    updateParcel(parcelId) {
        this.props.api.collectData(parcelId)
            .then((newData) => {
                    this.setState(
                        {
                            isLoaded: true,
                            parcelId: this.props.api.parcelId(),
                            data: newData,
                            address: this.props.api.address()
                        }
                    );
                    this.render();
                }
                , (err) => {
                    console.log("ERROR", err);
                }
            )
    }

}


//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
// Extra Modules
//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>




//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
// Individual Modules
//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
// These are named modules to plugin into the property data container.
// Defining them here makes organizing the views a lot easier.






