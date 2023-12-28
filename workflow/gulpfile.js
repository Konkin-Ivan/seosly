const {src, dest, series, watch} = require('gulp');
const gulp = require('gulp')
const less = require('gulp-less');
const gwatch = require('gulp-watch');
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minifyCSS = require('gulp-minify-css');
const sync = require('browser-sync').create();

//gulp.task('less', function () {
//  gulp.src('./less/styles.less')
//    .pipe(sourcemaps.init())
//    .pipe(less())
//    .pipe(autoprefixer('last 2 version'))
//    .pipe(cleanCSS({compatibility: 'ie8'}))
//    .pipe(minifyCSS())
//    .pipe(sourcemaps.write())
//    .pipe(gulp.dest('../css'))
//    .pipe(livereload());
//});

function leess() {
  return src('less/styles.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer('last 2 version'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('../css'))
    .pipe(gulp.dest('../public/css'))
    .pipe(livereload());
}

function serve() {
  
  watch('less/**/*.less', series(leess)).on('change', sync.reload)
}

exports.leess = leess;
exports.build = series (leess, serve)
// Запуск таска: $ gulp build
//gulp.task('watch', function(){
//    livereload.listen();

//    gulp.watch(['less/styles.less', '../templates/**/*.html.twig', '../js/*.js'], function (files){
//        livereload.changed(files)
//    });
//});
