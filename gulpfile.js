const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const uglifycss = require('gulp-uglifycss');
const del = require('del');

// Lots o' constants
const baseName = 'lg-exif';
const dest = 'dist';

const jsFiles = 'src/js/**/*.js';
const jsDest = dest + '/js';

const cssFiles = 'src/css/**/*.css';
const cssDest = dest + '/css';

// Actual tasks
gulp.task('watch', function () {
    gulp.watch('src/**/*', ['default'])
});

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

gulp.task('clean', function () {
    return del(dest + '/**', { force: true });
});

// Meta Tasks
gulp.task('minify', gulp.parallel('scripts', 'styles'));
gulp.task('default', gulp.series('clean', 'minify'));

