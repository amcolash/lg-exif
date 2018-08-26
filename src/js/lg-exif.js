(function ($) {

    'use strict';

    var defaults = {
        exif: true
    };

    var Exif = function (element) {

        // You can access all lightgallery variables and functions like this.
        this.core = $(element).data('lightGallery');

        this.$el = $(element);
        this.core.s = $.extend({}, defaults, this.core.s)

        this.exif = {};
        this.element;
        this.html = '';

        this.init();

        return this;
    }

    Exif.prototype.appendData = function (value, label, prefix, suffix) {
        var data = this.exif[value];
        if (data) {
            label = (label || value) + ": ";
            prefix = prefix || "";
            suffix = suffix || "";
            var style = "";

            if (value === "ExposureTime" && data < 1) {
                data = "1/" + Math.round(1 / parseFloat(data));
            } else if (value === "DateTimeOriginal") {
                data = this.parseDate(data).toLocaleString();
            } else if (value === "GPSLatitude" && this.exif.Geo) {
                data = Math.abs(this.exif.Geo[0].toFixed(5));
                suffix = " " + this.exif.GPSLatitudeRef;
            } else if (value === "GPSLongitude" && this.exif.Geo) {
                data = Math.abs(this.exif.Geo[1].toFixed(5));
                suffix = " " + this.exif.GPSLongitudeRef;
            } else if (!isNaN(data)) {
                data = +parseFloat(data).toFixed(2);
            }

            if (value === 'Make' || value === 'Model') {
                data = data.toLowerCase();
                style = 'style="text-transform: capitalize;"';
            }

            this.html += '<li ' + style + '>' + label + prefix + data + suffix + '</li>';
        }
    }

    Exif.prototype.renderExif = function () {
        this.html = '<ul>';

        this.appendData("Filename");
        this.appendData("DateTimeOriginal", "Date Taken");
        this.appendData("SourceResolution", "Resolution");
        this.appendData("FNumber", "Aperature", "f/");
        this.appendData("ExposureTime", "Exposure", "", " sec");
        this.appendData("ISOSpeedRatings", "ISO");
        this.appendData("FocalLength", "Focal Length", "", "mm");
        this.appendData("LensModel", "Lens");
        this.appendData("Model");
        this.appendData("Make");

        if (this.exif.Geo) {
            this.html += '<hr>';
            this.appendData("GPSLatitude", "Latitude");
            this.appendData("GPSLongitude", "Longitude");
            this.appendData("GPSAltitude", "Altitude", "", " m");
        }

        this.html += '</ul>';

        if (this.exif.Geo) {
            this.html += '<div id="map"></div>';
        }

        $('.lg-exif .content').html(this.html);

        if (this.exif.Geo) {
            var map = L.map('map').setView(this.exif.Geo, 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            L.marker(this.exif.Geo).addTo(map);
        }
    }

    Exif.prototype.update = function() {
        const _this = this;
        const thumbnail = this.core.$items.get(this.core.index);
        const img = $(thumbnail).find('img').get(0);

        EXIF.getData(img, function () {
            _this.exif = EXIF.getAllTags(this);
            // console.log(_this.exif);
            _this.exif.Geo = _this.updateGeo();
            _this.exif.Filename = img.alt;

            // Keeping this out for now since it is not reliable, might need a mix of things for resolution
            // _this.exif.SourceResolution = _this.exif.PixelXDimension + "x" + _this.exif.PixelYDimension;

            _this.renderExif();
        });
    }

    Exif.prototype.init = function () {
        // Define the base panel template
        const template = '<div class="lg-exif hidden"><div><h3>Image Information</h3>\
        <span class="lg-hide lg-icon"></span></div><hr><div class="content"></div></div>';

        // Inject template into lg + get a reference to the root
        this.core.$outer.prepend(template);
        this.element = this.core.$outer.find('.lg-exif');
        
        // Add slide event listener
        const _this = this;
        this.$el.on('onAfterSlide.lg', function() {
            _this.update();
        });

        // Inject info button before close button
        const close = this.core.$outer.find('.lg-toolbar .lg-close');
        close.after('<span class="lg-icon lg-info"></span>');

        // Attach toggle handler to info icon + close button (in panel)
        this.core.$outer.find('.lg-toolbar .lg-info, .lg-exif .lg-hide').on('click', function () {
            _this.element.toggleClass('hidden');
        });

        // Update info based on current image
        this.update();
    }

    /* From RobG: https://stackoverflow.com/questions/43083993
    * Parse date string in YYYY-MM-DD hh:mm:ss format
    * separator can be any non-digit character
    * e.g. 2017:03:09 14:49:21 OR 2017-03-09 14:49:21
    */
    Exif.prototype.parseDate = function(s) {
        var b = s.split(/\D/);
        return new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);
    }

    Exif.prototype.updateGeo = function() {
        if (this.exif.GPSLatitude && this.exif.GPSLongitude) {
            var lat = this.parseDMS(this.exif.GPSLatitude) * (this.exif.GPSLatitudeRef === "S" ? -1 : 1);
            var lng = this.parseDMS(this.exif.GPSLongitude) * (this.exif.GPSLongitudeRef === "W" ? -1 : 1);
            return [lat, lng];
        }

        return null;
    }

    /* Take d/m/s array from exif-js and convert to decimal format */
    Exif.prototype.parseDMS = function(input) {
        if (input.length === 3) {
            return input[0] + input[1] / 60 + input[2] / 3600;
        }

        // Not in the format we expected
        return input;
    }

    /**
    * Destroy function must be defined.
    * lightgallery will automatically call your module destroy function 
    * before destroying the gallery
    */
    Exif.prototype.destroy = function () {
        this.element.remove();
    }

    // Attach your module to lightgallery
    $.fn.lightGallery.modules.exif = Exif;


})(jQuery, window, document);