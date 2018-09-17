#!/bin/sh

for theme in theme-cards theme-classic theme-mosaic
do
    cp dist/css/lg-exif.min.css ../$theme/theme/public/lightgallery/css
    cp dist/js/lg-exif.min.js ../$theme/theme/public/lightgallery/css
done