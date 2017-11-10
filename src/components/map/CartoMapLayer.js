import React, {Component} from 'react'
import {TileLayer} from 'react-leaflet'

import {getCartoTiles} from '../../utils/mapUtils'

class CartoMapLayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tiles: ''
        };
        this._setTiles = this._setTiles.bind(this);
    }

    componentDidMount() {
        this._setTiles(this.props.sql, this.props.css);
    }

    /**
     * Collects tiles from Carto and loads them into component
     */
    _setTiles(sql, css) {
        getCartoTiles(sql, css)
            .then((tileUrl) => {
                this.setState({tiles: tileUrl})
            }, (err) => {
                console.log(err);
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sql !== this.props.sql || nextProps.css !== this.props.css) {
            this._setTiles(nextProps.sql, nextProps.css)
        }
    }


    render() {
        const {tiles} = this.state;

        if (tiles === null)
            return null;

        return <TileLayer url={tiles}/>

    }
}


export default CartoMapLayer