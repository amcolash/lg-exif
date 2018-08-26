const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const uglifycss = require('gulp-uglifycss');
const del = require('del');
const runSequence = require('run-sequence');

// Lots o' constants

const baseName = 'lg-exif';
const dest = 'dist';

const jsFiles = 'src/js/**/*.js';
const jsDest = dest + '/js';

const cssFiles = 'src/css/**/*.css';
const cssDest = dest + '/css';

const imageFiles = 'src/images/**/*.{png,jpg}';
const imageDest = dest + '/images';

const fontFiles = 'src/fonts/**/*.{ttf,woff,eot,svg}';
const fontDest = dest + '/fonts';

// Meta Tasks

gulp.task('default', () => runSequence('clean', 'dist'));

gulp.task('dist', ['minify', 'copy']);
gulp.task('minify', ['scripts', 'styles']);
gulp.task('copy', ['copy_fonts', 'copy_images']);

// Actual tasks

gulp.task('scripts', function () {
    return gulp.src(jsFiles)
        .pipe(concat(baseName + '.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename(baseName + '.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('styles', function () {
    return gulp.src(cssFiles)
        .pipe(concat(baseName + '.css'))
        .pipe(gulp.dest(cssDest))
        .pipe(rename(baseName + '.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest(cssDest));
});

gulp.task('copy_fonts', function () {
    return gulp.src(fontFiles)
        .pipe(gulp.dest(fontDest));
});

gulp.task('copy_images', function () {
    return gulp.src(imageFiles)
        .pipe(gulp.dest(imageDest));
});

gulp.task('clean', function () {
    return del(dest + '/**', { force: true });
});