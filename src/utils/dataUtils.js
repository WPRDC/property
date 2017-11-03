/**
 * Created by sds25 on 9/19/17.
 */

import {getParcelIdFromAddress} from './apiUtils'

const PARCEL_ID_PATTERN = /^(\d{4}\D\d{4}[a-zA-Z0-9]{7})$/;

/**
 * Checks that all properties of object have values.
 *
 * @param obj
 * @return {boolean}
 */
export function hasValues(obj) {
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            if (obj[k] === null || typeof(obj[k]) === 'undefined')
                return false;
        }
    }
    return true;
}


/**
 * Check if all `things` exist
 *
 * @param {stuff} things - variable amount of arguments to test for existence
 * @return {boolean} `true` if all things exist, `false` otherwise
 */
export function exists(...things) {
    for (let thing of things) {
        if (typeof(thing) === 'undefined') {
            return false;
        }
    }
    return true;
}

export function monify(number, decimal) {
    let dec = 0;
    if (number !== 0 && (!number || isNaN(number)))
        return '';
    if(decimal)
        dec = 2;

    // Set decimals and commas
    number = number.toFixed(dec).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return '$' + number;
}


/**
 * Check if arrays a and b contain the same items.
 * NOTE: this is currently a shallow check.  If complex data structures are stored in the arrays, this may
 * return false even though the the two lists are actually different
 * @param {array} a - first array
 * @param {array} b - second array
 * @return {boolean} True if they are different, False if the same
 */
export const arraysAreDifferent = (a, b) => {
    if (!a || !b) {
        return true;
    }

    return (a.length !== b.length ||
        !(a.every((item, i) => {
            return item === b[i]
        }))
    );
};


/**
 * Checks search query, first to see if it's a Parcel ID, then if it's not, it assumes it's an address.
 *
 * @param {string} query - query entered by user could be parcel ID or address
 * @return {Promise}
 */
export const checkSearchQuery = query => {
     if (PARCEL_ID_PATTERN.test(query)){
         return new Promise( (resolve, reject) => {
             resolve(query.toUpperCase());
         })
     }
     else{
         return getParcelIdFromAddress(query)
     }
};

export const makeAddress = data => {
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