/**
 * Created by sds25 on 9/5/17.
 *
 * Functions for pull data from the WPRDC Property API
 *
 * https://tools.wprdc.org/property-api/v1/
 *
 */

const FRESHNESS = 60/*min*/ * 60/*sec*/ * 1000/*ms*/;  // 1 hour
/*

 Process
 1.  Get's all necessary date for parcel. And stores in object. (collect_data)
 2.  `get` functions check to make sure parcel ID is correct and then grab data from collected data.



 */


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
        this.cache = {};                // cache of response data.
        this.cachedParcelId = '';       // PIN of parcel with data in `cache`
        this.cachedAddress = null;
        this.cacheTime = new Date(0);   //
    }


    /**
     * Checks local cache to see if data should be pulled
     *
     * @param {string} parcelId - identifying string for parcel
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
        this.cache = data['results'][0]['data'];
        this.cachedParcelId = data['results'][0]['parcel_id'];
        this.cachedAddress = WPRDCPropertyAPI._makeAddress(data['results'][0]['data']);
        this.cacheTime = new Date();
        return true
    }


    static _makeAddress(data) {
        return (
            {
                "number": data['assessments'][0]['PROPERTYHOUSENUM'],
                "street": data['assessments'][0]['PROPERTYADDRESS'],
                "city": data['assessments'][0]['PROPERTYCITY'],
                "state": data['assessments'][0]['PROPERTYSTATE'],
                "zip": data['assessments'][0]['PROPERTYZIP'],
            }
        )
    }

    parcelId() {
        return this.cachedParcelId;
    }

    address() {
        return this.cachedAddress;
    }

    /**
     * Collects data for parcel from API.
     *
     * @param {string} parcelId - ID of parcel
     * @returns (Promise) Promise object that resolves to an Object of parcel data
     * @private
     */
    collectData(parcelId) {
        return new Promise((resolve, reject) => {
            // Check cache first
            if (this._checkCache(parcelId)) {
                resolve(this.cache);
            }
            // Request fresh data from API
            else {
                fetch(this.url + parcelId).then((response) => {
                    if (response.ok) {
                        // cache response before resolving
                        response.json()
                            .then((data) => {
                                this._updateCache(data);
                                resolve(this.cache);
                            }, (err) => {
                                reject(err);
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
     * @param {Array.<Object>} fieldMapping - array of objects representing field mappings {resource: '',
     * @returns {Promise} Promise object that resolves to Object of requested data in form of {title: data}
     */
    getKeyValueData(fieldMapping) {
        let subData = {};
        for (let i in fieldMapping) {
            let field = fieldMapping[i];
            if (typeof(field.title) === 'undefined')
                field.title = field.id;
            subData[field.title] = this.cache[field.resource][0][field.id]
        }
        return subData;
    }

    getTableData(tableMapping) {
        return null
    }

    get(format, parcelId, options) {
        if (format === 'keyValue') {
            if (typeof(options.fieldMapping) === 'undefined')
                throw new Error('Must provide "fieldMapping for KeyValue requests.')
            return this.getKeyValueData(parcelId, options.fieldMapping())
        }
    }
}
