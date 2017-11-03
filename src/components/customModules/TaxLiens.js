import React, {Component} from 'react'

import {KeyValueModule} from "../DataDisplays";
import {monify} from "../../utils/dataUtils";

const TaxLiens = props => {
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

export default TaxLiens