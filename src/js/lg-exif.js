(function ($, window, document, undefined) {

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

            if (value === "ExposureTime" && data < 1) {
                data = "1/" + Math.round(1 / parseFloat(data));
            } else if (value === "DateTimeOriginal") {
                data = this.parseDate(data).toLocaleString();
            } else if (!isNaN(data)) {
                data = parseFloat(data);
            }

            this.html += '<li>' + label + prefix + data + suffix + '</li>';
        }
    }

    Exif.prototype.renderExif = function () {
        this.html = '<ul>';

        this.appendData("Filename");
        this.appendData("DateTimeOriginal", "Date Taken");
        this.appendData("SourceResolution", "Resolution");
        this.appendData("FNumber", "Aperature", "F");
        this.appendData("ExposureTime", "Exposure", "", " sec");
        this.appendData("ISOSpeedRatings", "ISO");
        this.appendData("FocalLength", "Focal Length", "", "mm");
        this.appendData("Make");
        this.appendData("Model");

        this.html += '</ul>';
        $('.lg-exif .content').html(this.html);
    }

    Exif.prototype.update = function() {
        const _this = this;
        const img = $(this.core.el).find("img").get(this.core.index);

        EXIF.getData(img, function () {
            _this.exif = EXIF.getAllTags(this);
            _this.exif.Filename = img.alt;
            _this.exif.SourceResolution = _this.exif.PixelXDimension + "x" + _this.exif.PixelYDimension;
            _this.renderExif();
        });
    }

    Exif.prototype.init = function () {
        console.log(this);
        
        $('.lg').parent().prepend('<div class="lg-exif hidden"><div><h3>Image Information</h3>\
        <span class="lg-hide lg-icon"></span></div><hr><div class="content"></div></div>');
        
        const _this = this;
        $('#media').on('onAfterSlide.lg', function() {
            console.log("update");
            _this.update();
        });

        if ($('.lg').has('.lg-toolbar')) {
            const close = $('.lg-toolbar .lg-close');
            close.after('<span class="lg-icon lg-info"></span>');
            $('.lg-toolbar .lg-info, .lg-exif .lg-hide').on('click', function () {
                $('.lg-exif').toggleClass('hidden');
            });
        }

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

    /**
    * Destroy function must be defined.
    * lightgallery will automatically call your module destroy function 
    * before destroying the gallery
    */
    Exif.prototype.destroy = function () {
        $('.lg-exif').remove();
    }

    // Attach your module with lightgallery
    $.fn.lightGallery.modules.exif = Exif;


})(jQuery, window, document);