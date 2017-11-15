import React, {Component} from 'react'

import KeyValueListDisplay from "../dashboard/dataDisplays/KeyValueListDisplay";

const PropertyTaxReductions =props => {
    return (
        <KeyValueListDisplay title="Tax Reductions"
                        data={props.data}
                        fields={
                            [
                                {
                                    title: 'Homestead',
                                    field: 'HOMESTEADFLAG',
                                    resource: 'assessments',
                                    formatter: (data) => {
                                        return data ? "YES" : "NO"
                                    }
                                },
                                {
                                    title: 'Farmstead',
                                    field: 'FARMSTEADFLAG',
                                    resource: 'assessments',
                                    formatter: (data) => {
                                        return data ? "YES" : "NO"
                                    }
                                },
                                {
                                    title: 'Clean & Green',
                                    field: 'CLEANGREEN',
                                    resource: 'assessments',
                                    formatter: (data) => {
                                        return data ? "YES" : "NO"
                                    }
                                },
                                {
                                    title: 'Abatement',
                                    field: 'ABATEMENTFLAG',
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
};

export default PropertyTaxReductions