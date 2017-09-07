/**
 * Created by sds25 on 9/5/17.
 */

function getJSON (url, options){
    if (typeof(options) === 'undefined')
        options = {}
    return fetch(url, options).then(response => response.json())
}