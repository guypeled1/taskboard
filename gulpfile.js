var gulp = require('gulp');
var del = require('del');

gulp.task('bootstrap', function () {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('dist/styles'))
});

gulp.task('styles', function () {
    return gulp.src('css/*')
        .pipe(gulp.dest('dist/styles'))
});

gulp.task('scripts', function () {
    return gulp.src('js/*')
        .pipe(gulp.dest('dist/scripts'))
});

gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'))
});

// Load plugins
var $ = require('gulp-load-plugins')();

// Clean
gulp.task('clean', function () {
    return del(['dist/styles/*', 'dist/scripts/*', 'dist/images/*', 'dist/index.html']);
});

// Build
gulp.task('build', ['styles', 'scripts', 'bootstrap', 'html']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Watch .css files
gulp.watch('css/*.css', ['styles']);

// Watch .js files
gulp.watch('js/*.js', ['scripts']);

// Watch html files
gulp.watch('index.html', ['html']);

      // Watch image files
   //   gulp.watch('app/images/**/*', ['images']);

