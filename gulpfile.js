const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglifycss = require('gulp-uglifycss');
const del = require('del');
const browserSync = require('browser-sync');
const butternut = require('gulp-butternut');

// Lots o' paths
const paths = {
    baseName: 'lg-exif',
    src: 'src/',
    dest: 'dist/',
    example: 'example/',
    js: {
        get src () { return paths.src + 'js/**/*.js' },
        get dest () { return paths.dest + 'js/' }
    },
    css: {
        get src() { return paths.src + 'css/**/*.css' },
        get dest() { return paths.dest + 'css/' }
    }
};

// Concat Tasks
gulp.task('js', () => {
    return gulp.src(paths.js.src)
        .pipe(concat(paths.baseName + '.js'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('css', () => {
    return gulp.src(paths.css.src)
        .pipe(concat(paths.baseName + '.css'))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browserSync.reload({ stream: true }));
});

// Minify Tasks
gulp.task('minify-js', () => {
    return gulp.src(paths.js.dest + paths.baseName + '.js')
        .pipe(butternut())
        .pipe(rename(paths.baseName + '.min.js'))
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('minify-css', () => {
    return gulp.src(paths.css.dest + paths.baseName + '.css')
        .pipe(uglifycss())
        .pipe(rename(paths.baseName + '.min.css'))
        .pipe(gulp.dest(paths.css.dest));
});

// Other Tasks
gulp.task('clean', () => {
    return del(paths.dest, { force: true });
});

// Meta Tasks
gulp.task('concat', gulp.series('clean', gulp.parallel('js', 'css')));
gulp.task('minify', gulp.parallel(gulp.series('js', 'minify-js'), gulp.series('css', 'minify-css')));
gulp.task('default', gulp.series('minify'));

// Live reload via browser sync
gulp.task('serve', gulp.series('default', () => {
    browserSync.init({
        server: {
            basedir: './'
        },
        startPath: paths.example
    });

    gulp.watch(paths.js.src, gulp.series('js'));
    gulp.watch(paths.css.src, gulp.series('css'));
}));