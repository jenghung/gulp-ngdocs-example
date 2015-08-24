var gulp = require('gulp');
var connect = require('connect');
var serveStatic = require('serve-static');
var gulpDocs = require('gulp-ngdocs');
var ghPages = require('gulp-gh-pages');

gulp.task('ngdocs', [], function () {
    var options = {
        scripts: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular/angular.min.js.map',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-animate/angular-animate.min.js.map',
            'src/src.js',
            'src/focus.js'],
        html5Mode: false
    }

    return gulp.src('src/*.js')
    .pipe(gulpDocs.process(options))
    .pipe(gulp.dest('./docs'));
});

gulp.task('deploy', function() {
    return gulp.src('docs/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['ngdocs'], function (cb) {
    var app = connect().use(serveStatic('./docs'));
    app.listen(8000);
    cb();
    console.log('Server started on http://localhost:8000');
});

