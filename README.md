# lightgallery-exif
A plugin for lightgallery which adds an exif panel

## [Demo](https://amcolash.github.io/lg-exif/example/)

## Using It
- Copy the files from the `dist` folder to your own location.
- You can choose either minified or non-minified, both are not necessary.
- Add the stylesheet + script into your html files (where you created the lightgallery):

```
<link rel="stylesheet" href="css/lg-exif.min.css">
...
<script src="js/lg-exif.min.js"></script>
```

Note: You can either rely on the exif information from the image files themselves or use
data attributes (for thumbsup)... Docs to come some day ;)

TODO: Look into `npm` / `bower` as better ways to install this...

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