import React, {Component} from 'react'

import KeyValueListDisplay from "../dashboard/dataDisplays/KeyValueListDisplay";

const ParcelCharacteristics = props => {
    return (
        <KeyValueListDisplay title="Property Characteristics"
                        data={props.data}
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
};

export default ParcelCharacteristics