/**
 * Created by sds25 on 9/19/17.
 */
export class Layer {
    /**
     * Map Layer
     *
     * @param {string} name - identifier for layer
     * @param {string} title - human readable name of the layer to display on page
     * @param {string} type -
     * @param cartodbID
     * @param map
     * @param options
     */
    constructor(map, name, title, type, cartodbID, options) {
        this.name = name;
        this.title = title;
        this.geomType = type;
        this.cartodbID = cartodbID;
        this.map = map;
        this.options = options;
        if (options) {
            this.defaultOptions = JSON.parse(JSON.stringify(options));  // hack way to make a deep copy
        }
        this.z = null;
        this.layer = {}
    }

    addTo(map) {
        let self = this;
        let mapUrl = `https://wprdc.carto.com/api/v2/viz/${this.cartodbID}/viz.json`;

        cartodb.createLayer(map, mapUrl, {legends: true})
            .addTo(map)
            .on('done', function (layer) {
                self.layer = layer;
                if (typeof self.options != 'undefined') {
                    console.log('modifying');
                    self.modify(self.options);
                }
            });
    }

    reset() {
        modify(this.defaultOptions)
    }

    modify(options) {
        this.options = options;
        let layer = this.layer;
        let shape;
        if (typeof(options) != 'undefined') {
            if (options.hasOwnProperty('main_sublayer')) {
                shape = layer.getSubLayer(options.main_sublayer);
            } else {
                shape = layer.getSubLayer(0);
            }
            if (options.hasOwnProperty('sql')) {
                shape.setSQL(options.sql);
            }
            if (options.hasOwnProperty('css')) {
                shape.setCartoCSS(options.css);
            }
            if (options.hasOwnProperty('interactivity')) {
                shape.setInteractivity(options.interactivity);
            }
            if (options.hasOwnProperty('interaction')) {
                shape.setInteraction(options.ineraction);
            }
            if (options.hasOwnProperty('featureClick')) {
                layer.on('featureClick', options.featureClick);
            }
            if (options.hasOwnProperty('featureOver')) {
                layer.on('featureOver', options.featureOver);
            }
        }
    }

    setZIndex(z) {
        this.z = z;
        this.layer.setZIndex(z);
    }

    hide() {

    }
}

export class LayerList {
    constructor(map) {
        this.map = map;
        this.layers = []
    }

    getLayer(layerName) {
        for (let layer of this.layers) {
            if (layer.name == layerName) {
                return layer
            }
        }
        return undefined;
    }

    contains(layerName) {
        for (let layer of this.layers) {
            if (layer.name == layerName) {
                return true;
            }
        }
        return false
    }

    /**
     * Add layer to list and Map.
     * @param layer
     */
    add(layer) {

        if (!this.contains(layer.name)) {
            this.layers.push(layer);
            layer.addTo(map);
        } else {
            this.replace(layer.name, layer);
        }
    }

    remove(layer) {
        let l;
        if (typeof(layer) === 'string') {
            l = this.getLayer(layer);
        } else {
            l = layer
        }

        if (typeof(l) != 'undefined') {
            this.map.removeLayer(l.layer);
            let i = this.layers.indexOf(l);
            this.layers.splice(i, 1);
            return true;
        }
        return false
    }

    replace(layerName, layer) {
        if (this.contains(layerName)) {
            this.remove(layerName);
            this.add(layer);
        }
    }
}
