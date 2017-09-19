/**
 * Created by sds25 on 9/6/17.
 */
import React, {Component} from "react";
import {KeyValueModule, TableModule} from "../components/DataDisplays";


import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

import MyLocation from 'material-ui-icons/MyLocation'

import {blue} from 'material-ui/colors'
import Tooltip from 'material-ui/Tooltip';

import Card, {CardHeader, CardContent} from 'material-ui/Card';


import {monify} from '../utils/dataUtils'

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
            float: 'right',
            width: '480px',
            overflowY: 'scroll',
            overflowX: 'hidden',
            margin: 0,
            boxShadow: '-10px 0px 10px 1px black'
        };

        if (this.state.isLoaded) {
            return (
                <div style={style}>
                    {/* <ParcelIdSearch handleParcelIdChange={this.updateParcel}/>*/}

                    <PropertyHeader address={this.state.address} parcelId={this.state.parcelId}/>

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
                </div>
            );
        }
        else {
            return (
                <div style={style}>
                    <div className="loader"/>
                </div>
            );

        }
    }

    componentDidMount() {
        this.updateParcel(this.props.parcelId)
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
                    console.log(err);
                }
            )
    }

}


//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
// Extra Modules
//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
export function PropertyDataSection(props) {
    const style = {
        base: {
            margin: '8px',
            padding: '8px 8px'
        },
    };
    return (
        <Card style={style.base} className="pdata-section" id={"pdata-section-" + props.name}>
            {props.title && <CardHeader title={props.title}/>}
            <CardContent>
                {props.children}
            </CardContent>
        </Card>
    );
}


function PropertyHeader(props) {
    let img = <PropertyImageContainer address={props.address}/>;
    let address = props.address;
    let addrLine = `${address.number} ${address.street.toLowerCase()} ${address.city.toLowerCase()} ${address.state} ${address.zip}`;

    const style = {
        base: {
            color: 'white',
            backgroundColor: blue500,
            position: 'relative',
            padding: '16px 24px 20px 24px'
        },
        addr: {
            margin: '0',
            fontSize: '18px',
            textTransform: 'capitalize'
        },
        parcelId: {
            margin: '0',
            paddingTop: '6px',
            fontsize: '13px'
        },
        button: {
            position: 'absolute',
            top: '-28px',
            right: '16px',
        }
    };

    return (
        <div>
            {img}
            <div style={style.base}>
                <Button fab style={style.button}>
                    <MyLocation color={blue500}/>
                </Button>
                <h1 style={style.addr}>{addrLine}</h1>

                <div style={style.parcelId}>
                    <Tooltip title="Parcel ID">
                        <span style={style.parcelId}>{props.parcelId}</span>
                    </Tooltip>
                </div>

            </div>
        </div>
    );
}


//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
// Individual Modules
//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
// These are named modules to plugin into the property data container.
// Defining them here makes organizing the views a lot easier.

function ParcelChars(props) {
    return (
        <KeyValueModule title="Property Characteristics"
                        sourceData={props.data}
                        fields={[
                            {resource: 'assessments', id: 'CLASSDESC', title: 'Use Class'},
                            {resource: 'assessments', id: 'OWNERDESC', title: 'Owner Type'},
                            {resource: 'assessments', id: 'USEDESC', title: 'Land Use'},
                            {
                                resource: 'assessments', id: 'LOTAREA', title: 'Lot Size', formatter: (input) => {
                                return [`${input} ft`,
                                    <sup style={{verticalAlign: 'baseline', position: 'relative', bottom: '1ex'}}
                                         key="1">2</sup>]
                            }

                            }
                        ]}
        />
    );
}

function DwellingChars(props) {
    return (
        <KeyValueModule title="Dwelling  Characteristics"
                        sourceData={props.data}
                        missingDataMsg="Dwelling characteristics are only available for residential parcels."
                        fields={[
                            {resource: 'assessments', id: 'STYLEDESC', title: 'Style'},
                            {resource: 'assessments', id: 'STORIES', title: 'Stories'},
                            {resource: 'assessments', id: 'YEARBLT', title: 'Year Built'},
                            {resource: 'assessments', id: 'EXTFINISH_DESC', title: 'Exterior Finish'},
                            {resource: 'assessments', id: 'HEATINGCOOLINGDESC', title: 'Heating/Cooling'},
                            {resource: 'assessments', id: 'ROOFDESC', title: 'Roof'},
                            {resource: 'assessments', id: 'BASEMENTDESC', title: 'Basement'},
                            {resource: 'assessments', id: 'GRADE', title: 'Grade'},
                            {resource: 'assessments', id: 'CONDITIONDESC', title: 'Condition'},
                            {
                                resource: 'assessments',
                                id: 'CDUDESC',
                                title: 'CDU',
                                note: 'Condition/Desirability/Utility'
                            },
                        ]}
        />
    );
}

function AssessmentTable(props) {
    return (
        <TableModule title="Assessment Values"
                     sourceData={props.data}
                     tableInfo={
                         {
                             showHeading: true,
                             showLabel: true,
                             heading: ['__label__', 'County', 'Local', 'Fair Market'],
                             rows: [
                                 {
                                     '__label__': 'Building',
                                     'County': {resource: 'assessments', id: 'COUNTYBUILDING', formatter: monify},
                                     'Local': {resource: 'assessments', id: 'LOCALBUILDING', formatter: monify},
                                     'Fair Market': {
                                         resource: 'assessments',
                                         id: 'FAIRMARKETBUILDING',
                                         formatter: monify
                                     }
                                 }, {
                                     '__label__': 'Land',
                                     'County': {resource: 'assessments', id: 'COUNTYLAND', formatter: monify},
                                     'Local': {resource: 'assessments', id: 'LOCALLAND', formatter: monify},
                                     'Fair Market': {resource: 'assessments', id: 'FAIRMARKETLAND', formatter: monify}
                                 }, {
                                     '__label__': 'Total',
                                     'County': {resource: 'assessments', id: 'COUNTYTOTAL', formatter: monify},
                                     'Local': {resource: 'assessments', id: 'LOCALTOTAL', formatter: monify},
                                     'Fair Market': {resource: 'assessments', id: 'FAIRMARKETTOTAL', formatter: monify}
                                 },
                             ]
                         }
                     }

        />
    );
}

function PropertyTaxReductions(props) {
    return (
        <KeyValueModule title="Tax Reductions"
                        sourceData={props.data}
                        fields={
                            [
                                {
                                    title: 'Homestead',
                                    id: 'HOMESTEADFLAG',
                                    resource: 'assessments',
                                    formatter: (data) => {
                                        return data ? "YES" : "NO"
                                    }
                                },
                                {
                                    title: 'Farmstead',
                                    id: 'FARMSTEADFLAG',
                                    resource: 'assessments',
                                    formatter: (data) => {
                                        return data ? "YES" : "NO"
                                    }
                                },
                                {
                                    title: 'Clean & Green',
                                    id: 'CLEANGREEN',
                                    resource: 'assessments',
                                    formatter: (data) => {
                                        return data ? "YES" : "NO"
                                    }
                                },
                                {
                                    title: 'Abatement',
                                    id: 'ABATEMENTFLAG',
                                    resource: 'assessments',
                                    formatter: (data) => {
                                        return data ? "YES" : "NO"
                                    }
                                },
                            ]
                        }
                        allowNulls={true}

        />
    );
}

function SalesTable(props) {
    return (
        <TableModule title="Previous Sales"
                     sourceData={props.data}
                     tableInfo={
                         {
                             showHeading: true,
                             showLabel: false,
                             heading: ['Sale Date', 'Price'],
                             rows: [
                                 {
                                     'Sale Date': {resource: 'assessments', id: 'PREVSALEDATE2'},
                                     'Price': {
                                         resource: 'assessments', id: 'PREVSALEPRICE2', formatter: (number) => {
                                             return monify(number, 0)
                                         }
                                     },
                                 }, {
                                     'Sale Date': {resource: 'assessments', id: 'PREVSALEDATE'},
                                     'Price': {
                                         resource: 'assessments', id: 'PREVSALEPRICE', formatter: (number) => {
                                             return monify(number, 0)
                                         }
                                     },
                                 }, {
                                     'Sale Date': {resource: 'assessments', id: 'SALEDATE'},
                                     'Price': {
                                         resource: 'assessments', id: 'SALEPRICE', formatter: (number) => {
                                             return monify(number, 0)
                                         }
                                     },
                                 },
                             ]
                         }
                     }

        />
    );
}


function TaxLiens(props) {
    return (
        <KeyValueModule sourceData={props.data}
                        title="Tax Liens Summary"
                        note="The information provided here is merely an estimate. Please refer to Allegheny County's Department of Court Records for official tax lien information."
                        fields={[
                            {title: 'Number of Liens', id: 'number', resource: 'tax_liens'},
                            {title: 'Total Amount', id: 'total_amount', resource: 'tax_liens', formatter: monify}
                        ]}
                        missingDataMsg="No tax liens were found for this property."
        />
    );
}


class ParcelIdSearch extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            parcelId: ''
        }


    }

    handleChange(event) {
        this.setState({parcelId: event.target.value});
    }

    handleSubmit(e) {
        this.props.handleParcelIdChange(this.state.parcelId);
        this.setState({parcelId: ''});
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input name='parcelId' type="text" value={this.state.parcelId} onChange={this.handleChange}
                           placeholder="PARCEL ID"/>
                    <input type="submit" value="Search"/>
                </label>
            </form>
        );
    }
}

class PropertyImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picIsLoaded: true,
            streetViewImg: null,
        }
    }

    render() {
        // TODO: clean this up, it's a mess!
        const streetViewUrl = "https://maps.googleapis.com/maps/api/streetview";
        let address = this.props.address;
        const params = {
            key: "AIzaSyCcLG-dRLxiRB22U9cSv1jaP6XxoOn5aSY",
            location: `${address.number} ${address.street} ${address.city} ${address.state} ${address.zip}`,
            size: "480x200"
        };
        let paramList = [];
        for (let p in params) {
            if (params.hasOwnProperty(p)) {
                paramList.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]))
            }
        }
        let paramStr = paramList.join('&');

        let img = null;
        if (this.state.picIsLoaded) {
            img = streetViewUrl + '?' + paramStr;
        } else {
            img = require('../img/svloading.png')
        }

        const defaultStyle = {
            maxWidth: '100%',
            display: 'block'
        }


        return (
            <img alt={params.location} style={{...defaultStyle, ...this.props.style}} src={img}/>
        );
    }


}