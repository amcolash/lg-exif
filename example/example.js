var USE_DATA_ATTRIBUTES = false;

window.onload = function() {
    if (USE_DATA_ATTRIBUTES) addData();

    let dataLabel = document.getElementById("dataLabel");
    dataLabel.innerHTML = "USE_DATA_ATTRIBUTES: " + USE_DATA_ATTRIBUTES;

    let button = document.getElementById("dataToggle");
    button.onclick = toggleData;
}

function toggleData() {
    USE_DATA_ATTRIBUTES = !USE_DATA_ATTRIBUTES;

    if (USE_DATA_ATTRIBUTES) {
        addData();
    } else {
        deleteData();
    }

    let dataLabel = document.getElementById("dataLabel");
    dataLabel.innerHTML = "USE_DATA_ATTRIBUTES: " + USE_DATA_ATTRIBUTES;
}

function addData() {
    let thumbnails = document.getElementsByClassName("item");
    for (let i = 0; i < thumbnails.length; i++) {
        const thumbnail = thumbnails[i];

        if (i === 0) {
            thumbnail.dataset.filename = "test.jpg";
            thumbnail.dataset.sourceresolution = "4000x3000";
            thumbnail.dataset.datetimeoriginal = "8/10/2013, 7:00:10 PM";
            thumbnail.dataset.fnumber = "5.6";
            thumbnail.dataset.exposuretime = "1/15";
            thumbnail.dataset.isospeedratings = "125";
            thumbnail.dataset.focallength = "300";
            thumbnail.dataset.model = "Nikon D600";
            thumbnail.dataset.make = "Nikon Corporation";
        } else if (i === 1) {
            thumbnail.dataset.filename = "test2.jpg";
            thumbnail.dataset.sourceresolution = "3000x4000";
            thumbnail.dataset.datetimeoriginal = "9/24/2014, 12:17:44 PM";
            thumbnail.dataset.fnumber = "8";
            thumbnail.dataset.exposuretime = "1/45";
            thumbnail.dataset.isospeedratings = "100";
            thumbnail.dataset.focallength = "15";
            thumbnail.dataset.lensmodel = "8.0-16.0 mm f/4.5-5.6";
            thumbnail.dataset.model = "Nikon D7100";
            thumbnail.dataset.make = "Nikon Corporation";
            thumbnail.dataset.gpslatitude = "48.61739";
            thumbnail.dataset.gpslongitude = "15.20271";
            thumbnail.dataset.gpslatituderef = "N";
            thumbnail.dataset.gpslongituderef = "E";
            thumbnail.dataset.gpsaltitude = "512.5";
        }
    }
}

function deleteData() {
    let thumbnails = document.getElementsByClassName("item");
    for (let i = 0; i < thumbnails.length; i++) {
        const thumbnail = thumbnails[i];

        delete thumbnail.dataset.filename;
        delete thumbnail.dataset.sourceresolution;
        delete thumbnail.dataset.datetimeoriginal;
        delete thumbnail.dataset.fnumber;
        delete thumbnail.dataset.exposuretime;
        delete thumbnail.dataset.isospeedratings;
        delete thumbnail.dataset.focallength;
        delete thumbnail.dataset.lensmodel;
        delete thumbnail.dataset.model;
        delete thumbnail.dataset.make;
        delete thumbnail.dataset.gpslatitude;
        delete thumbnail.dataset.gpslongitude;
        delete thumbnail.dataset.gpslatituderef;
        delete thumbnail.dataset.gpslongituderef;
        delete thumbnail.dataset.gpsaltitude;
    }
}