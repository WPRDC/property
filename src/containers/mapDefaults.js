/**
 * Created by sds25 on 9/20/17.
 */


const PARCEL_MAP = {
    sql: "SELECT * FROM allegheny_parcel_boundaries",
    css: `#allegheny_county_parcel_boundaries{ +
            polygon-fill: #FFFFFF; +
            polygon-opacity: 0.2;+
            line-color: #4d4d4d; +
            line-width: 0.5;+ 
            line-opacity: 0; +
            [zoom >= 15] {line-opacity: .8;}}`
};
