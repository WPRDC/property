import React from 'react';

import {TableModule} from "../DataDisplays";
import {monify} from "../../utils/dataUtils";

const SalesTable = props=> {
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

export default SalesTable