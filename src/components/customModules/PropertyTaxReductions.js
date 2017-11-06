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
};

export default PropertyTaxReductions