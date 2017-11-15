import React from 'react';

import TableDisplay from "../dashboard/dataDisplays/DataTableDisplay";
import {monify} from "../../utils/dataUtils";

const AssessmentTable = props => {
    return (
        <TableDisplay title="Assessment Values"
                     data={props.data}
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
};

export default AssessmentTable