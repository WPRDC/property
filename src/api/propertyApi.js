/**
 * Created by sds25 on 9/5/17.
 *
 * Functions for pull data from the WPRDC Property API
 *
 * https://tools.wprdc.org/property-api/v1/
 *
 */

import getJSON from '../utils/apiUtils'


const FRESHNESS = 60 * 60 * 1000;   // 1 Hour


function isFresh(time, delta) {
    if (typeof(delta) === 'undefine')
        delta = FRESHNESS;

    let now = new Date();

    return (now - time) > delta;
}


class DataSource {
    constructor() {
        if (new.target === DataSource) {
            throw new TypeError("Cannot construct DataSource instances directly.")
        }
    }

    /**
     * Pulls Key-Value pair data
     *
     * @param {Object} fieldMapping - a mapping of ids to human-readable names. e.g. {'zip_code': 'Zip Code', ...}
     */
    getKeyValueData(fieldMapping) {
        throw new Error('You have to implement the method getKeyValueData!');
    }

    getTableData() {
        throw new Error('You have to implement the method getKeyValueData!');
    }

}

export class WPRDCPropertyAPI extends DataSource {
    constructor(url) {
        super();
        this.url = url;                 // url of api including endpoint
        this.cache = {};                // cache of response data. useful until filters are added to property api
        this.cachedParcelId = '';       // PIN of parcel with data in `cache`
        this.cacheTime = new Date(0);   //
    }

    /**
     * Extracts requested key-value data from API call and gives pretty Title if provided in `fieldMapping`
     *
     * @param {Object} sourceData - data from which subset is pulled
     * @param {Object} fieldMapping - fields (resource, id [, title) which constitute the subset
     * @return {{}} subset of data
     * @private
     */
    _getDataSubset(sourceData, fieldMapping) {
        let subData = {};
        for (let i in fieldMapping) {
            let field = fieldMapping[i];
            if (typeof(field.title) === 'undefined')
                field.title = field.id;
            subData[field.title] = sourceData['results'][0]['data'][field.resource][0][field.id]
        }
        return subData;
    }

    /**
     * Checks local cache to see if data should be pulled
     *
     * @param {number} freshness - max age (in ms) of data before being refreshed
     * @return {boolean} validity of cache
     * @private
     */
    _checkCache(parcelId, freshness) {
        if (typeof(freshness) === 'undefined')
            freshness = FRESHNESS;

        let isOld = (new Date() - this.cacheTime) > freshness;

        return parcelId === this.cachedParcelId && Object.keys(this.cache).length && !isOld;
    }

    /**
     * Updates cache with new data and updates its metadata.
     * @param {Object} data - data to load into cache
     * @private
     */
    _updateCache(data) {
        console.log(data);
        this.cache = data;
        this.cachedParcelId = data['results'][0]['parcel_id'];
        this.cacheTime = new Date();
        return true
    }

    /**
     * Collects data for parcel from API.
     *
     * @param {string} parcelId - ID of parcel
     * @returns (Promise) Promise object that resolves to an Object of parcel data
     * @private
     */
    _collectData(parcelId) {
        return new Promise((resolve, reject) => {
            // Check cache first
            if (this._checkCache(parcelId)) {
                resolve(this.cache);
            }
            // Request fresh data from API
            else {
                console.log(this.url);
                fetch(this.url + parcelId).then((response) => {
                    if (response.ok) {
                        // cache response before resolving
                        response.json()
                            .then((data) => {
                                this._updateCache(data);
                                resolve(this.cache);
                            }, (err) => {
                                console.log(err)
                            })

                    }
                    else {
                        reject(response.status);
                    }
                })
            }
        });
    }

    /**
     * Returns key value pair data for parcel identified by `parcelId` and matching fields from `fieldMapping`.
     *
     * @param {string} parcelId - parcel identifier (e.g. PIN)
     * @param {Array.<Object>} fieldMapping - array of objects representing field mappings {resource: '',
     * @returns {Promise} Promise object that resolves to Object of requested data in form of {title: data}
     */
    getKeyValueData(parcelId, fieldMapping) {
        console.log(fieldMapping);

        return new Promise((resolve, reject) => {
            this._collectData(parcelId)
                .then((data) => {
                    resolve(this._getDataSubset(data, fieldMapping));
                }, (error) => {
                    reject(error);
                });
        });
    }

    get(format, parcelId, options){
        if (format === 'keyValue') {
            if (typeof(options.fieldMapping) === 'undefined')
                throw new Error('Must provide "fieldMapping for KeyValue requests.')
            return this.getKeyValueData(parcelId, options.fieldMapping())
        }
    }
}