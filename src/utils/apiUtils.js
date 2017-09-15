/**
 * Created by sds25 on 9/5/17.
 */

const streetViewUrl = "https://maps.googleapis.com/maps/api/streetview";

const params = {
    key: "AIzaSyCcLG-dRLxiRB22U9cSv1jaP6XxoOn5aSY",
    location: records['PROPERTYHOUSENUM'] + " " + records['PROPERTYADDRESS'] + records['PROPERTYCITY'] + ", " + records['PROPERTYSTATE'] + " " + records['PROPERTYZIP'],
    size: "600x300"
};

let imgUrl = streetViewUrl + '?' + $.param(params);

$.get(streetViewUrl + "/metadata?" + $.param(params))
    .done(function (data) {
        if (data.status == 'OK') {
            $loader.hide();
            $svImg.attr('src', imgUrl);
        } else if (data.status == "NOT_FOUND") {
            console.log('using lat/lng backup');
            params.location = centroid[1] + ',' + centroid[0];
            imgUrl = streetViewUrl + '?' + $.param(params);
            $loader.hide();
            $svImg.attr('src', imgUrl);
        }
    });