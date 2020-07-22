const gulp = require('gulp')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')

sass.compiler = require('node-sass')

gulp.task('sass', function() {
    // i want to run 'css/app.scss app.css --watch'
    return gulp.src('src/css/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(
            cleanCSS({
                compatibility: 'ie8'
            })
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream())
})

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('fonts', function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('images', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
})

gulp.task('watch', function() {

    browserSync.init({
        server:  {
            baseDir: 'dist'
        }
    })

    gulp.watch('src/*.html', gulp.series(['html'])).on('change', browserSync.reload)
    gulp.watch('src/css/app.scss', gulp.series(['sass']))
    gulp.watch('src/fonts/*, gulp', gulp.series(['fonts']))
    gulp.watch('src/img/*', gulp.series(['images']))
})

gulp.task('default', gulp.series(['html', 'sass', 'fonts', 'images', 'watch']))