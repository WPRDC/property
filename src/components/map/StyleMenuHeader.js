import React from 'react'
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';


const StyleMenuHeader = props => {
    const {currentTab, onChange, children} = props;
    return (
        <AppBar position="static" color="secondary">
            {children}
            <Tabs fullWidth
                  value={currentTab}
                  onChange={onChange}
                  indicatorColor="primary" textColor="primary"
            >
                <Tab value="category" label="Category"/>
                <Tab value="choropleth" label="Choropleth"/>
                <Tab value="range" label="Range"/>
            </Tabs>
        </AppBar>
    )
}

export default StyleMenuHeader