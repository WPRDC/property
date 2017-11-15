import React, {Component} from 'react'

import KeyValueListDisplay from "../dashboard/dataDisplays/KeyValueListDisplay";
import {monify} from "../../utils/dataUtils";

const TaxLiens = props => {
    return (
        <KeyValueListDisplay data={props.data}
                        title="Tax Liens Summary"
                        note="The information provided here is merely an estimate. Please refer to Allegheny County's Department of Court Records for official tax lien information."
                        fields={[
                            {title: 'Number of Liens', field: 'number', resource: 'tax_liens'},
                            {title: 'Total Amount', field: 'total_amount', resource: 'tax_liens', formatter: monify}
                        ]}
                        missingDataMsg="No tax liens were found for this property."
        />
    );
}

export default TaxLiens