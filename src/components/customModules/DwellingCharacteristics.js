import React, {Component} from 'react'

import {KeyValueModule} from "../DataDisplays";

const DwellingCharacteristics =props => {
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

export default DwellingCharacteristics