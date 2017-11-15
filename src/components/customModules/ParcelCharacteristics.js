import React, {Component} from 'react'

import KeyValueListDisplay from "../dashboard/dataDisplays/KeyValueListDisplay";

const ParcelCharacteristics = props => {
    return (
        <KeyValueListDisplay title="Property Characteristics"
                        data={props.data}
                        fields={[
                            {resource: 'assessments', field: 'CLASSDESC', title: 'Use Class'},
                            {resource: 'assessments', field: 'OWNERDESC', title: 'Owner Type'},
                            {resource: 'assessments', field: 'USEDESC', title: 'Land Use'},
                            {
                                resource: 'assessments', field: 'LOTAREA', title: 'Lot Size', formatter: (input) => {
                                return [`${input} ft`,
                                    <sup style={{verticalAlign: 'baseline', position: 'relative', bottom: '1ex'}}
                                         key="1">2</sup>]
                            }

                            },

                        ]}
        />
    );
};

export default ParcelCharacteristics