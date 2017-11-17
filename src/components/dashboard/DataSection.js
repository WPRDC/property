import React from 'react';

import Card, {CardHeader, CardContent} from 'material-ui/Card';

const style = {
    backgroundColor: '#D3D3D3'
};


const DataSection = props => {
    return (
        <div style={style}>
            {props.children}
        </div>
    );
}

export default DataSection