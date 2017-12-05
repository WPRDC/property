/**
 * Here is where we'll define what datasets will be used in the app.
 */

class DataSet {
    constructor(id, name, parcelIdField, datasetUrl, fields, cartoConnection, dataPuller) {
        this.id = id;
        this.name = name;
        this.parcelIdField = parcelIdField;
        this.datasetUrl = dataUrl;
        this.fields = fields;
        this.cartoConnection = cartoConnection;
        this.datapuller = dataPuller;
    }

    getData = () => {
        return this.dataPuller();
    }
}

class Field {
    constructor(id, name, info, type, subtype, range) {
        this.id = id;
        this.name = name;
        this.info = info;
        this.type = type;
        this.subtype = subtype;
        this.range = range;
    }
}


const datasets = [

];
