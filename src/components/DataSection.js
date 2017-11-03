import React, {Component} from 'react';

import Card, {CardHeader, CardContent} from 'material-ui/Card';

const DataSection = props => {
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

export default DataSection