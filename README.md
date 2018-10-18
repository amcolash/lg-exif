# lightgallery-exif
A plugin for lightgallery which adds an exif panel

## [Demo](https://amcolash.github.io/lg-exif/example/)

## Using It
- Copy the files from the `dist` folder to your own project.
- You can choose either minified or non-minified, you only need one of the sets - both are not necessary.
- Add the stylesheet + script into your html files (where you created the lightgallery):

```
<link rel="stylesheet" href="css/lg-exif.min.css">
...
<script src="js/lg-exif.min.js"></script>
```

There are 2 ways for this plugin to work.

1) Use EXIF info from the image files themseleves. This plugin can scrape the exif info off of the thumbnails that are on the page. This is the simplest if you already have the info hanging around.

2) Use data attributes for images in the gallery. Below is a list of data attributes / corresponding exif names

## EXIF Info Provided

| EXIF Value | Data Attribute |
|------------|----------------|
| Filename | `data-filename` |
| DateTimeOriginal | `data-datetimeoriginal` |
| FNumber | `data-fnumber` |
| ExposureTime | `data-exposuretime` |
| ISOSpeedRatings | `data-isospeedratings` |
| FocalLength | `data-focallength` |
| LensModel | `data-lensmodel` |
| Model | `data-model` |
| Make | `data-make` |
| GPSLatitude | `data-gpslatitude` |
| GPSLongitude | `data-gpslongitude` |
| GPSLatitudeRef | `data-gpslatituderef` |
| GPSLongitudeRef | `data-gpslongituderef` |
| GPSAltitude | `data-gpsaltitude` |

## Building It
It couldn't be much easier to get a minifed version from scratch!
```
$ npm install
$ npm install -g gulp-cli     # If you don't already have gulp globally installed
$ gulp
```

## Attributions
- jQuery based lightweight photo gallery: [lightgallery](http://sachinchoolur.github.io/lightGallery)
- Simple js map library: [LeafletJS](https://leafletjs.com/)
- Exif parsing library: [exif-js](https://github.com/exif-js/exif-js)
- RobG for his take on exif dates: [stackoverflow](https://stackoverflow.com/questions/43083993)