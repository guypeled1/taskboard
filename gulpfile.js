var gulp = require('gulp');
var del = require('del');
var rename = require("gulp-rename");

gulp.task('bootstrap', function () {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('dist/styles'))
});

gulp.task('jsVendors', function () {
    return gulp.src('app/vendors/uuid.js')
        .pipe(gulp.dest('dist/scripts/vendors'))
});

gulp.task('styles', function () {
    return gulp.src('app/css/*')
        .pipe(gulp.dest('dist/styles'))
});

gulp.task('images', function () {
    return gulp.src('app/img/*')
        .pipe(gulp.dest('dist/images'))
});

gulp.task('scripts', function () {
    return gulp.src('app/js/*')
        .pipe(gulp.dest('dist/scripts'))
});

gulp.task('html', function () {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('dist'))
});

// Load plugins
var $ = require('gulp-load-plugins')();

// Clean
gulp.task('clean', function () {
    return del(['dist/styles/*', 'dist/scripts/*', 'dist/images/*', 'dist/index.html']);
});

// Build
gulp.task('build', ['styles', 'scripts', 'bootstrap', 'jsVendors', 'html', 'images']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Watch .css files
gulp.watch('app/css/*.css', ['styles']);

// Watch .js files
gulp.watch('app/js/*.js', ['scripts']);

// Watch html files
gulp.watch('app/index.html', ['html']);

// Watch image files
gulp.watch('app/img/*', ['images']);