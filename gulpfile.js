const gulp = require('gulp')

// css
const cleancss = require('gulp-clean-css');
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')

// browser refresh
const browserSync = require('browser-sync').create()

// images
const imagemin = require('gulp-imagemin')

// github
const ghpages = require('gulp-gh-pages')

gulp.task('css', function() {
    // i want to run 'css/app.scss app.css --watch'
    return gulp.src([
        'src/css/reset.css',
        'src/css/typography.css',
        'src/css/app.css',
    ])
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('autoprefixer'),
            require('postcss-preset-env')({
                stage: 1,
                browsers: ['IE 11', 'last 2 versions']
            })
        ]))
        .pipe(concat('app.css'))
        .pipe(
            cleancss({
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
    gulp.watch('src/css/*', gulp.series(['css']))
    gulp.watch('src/fonts/*, gulp', gulp.series(['fonts']))
    gulp.watch('src/img/*', gulp.series(['images']))
})

gulp.task('deploy', function() {
    return gulp.src('./dist')
        .pipe(ghpages());
});

gulp.task('default', gulp.series(['html', 'css', 'fonts', 'images', 'watch']))