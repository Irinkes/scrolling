"use strict";

const gulp = require('gulp'); // Require gulp

// Sass dependencies
const sass = require('gulp-sass'); // Compile Sass into CSS
const cleanCSS = require('gulp-clean-css'); // Minify the CSS

// Minification dependencies
// var minifyHTML = require('gulp-minify-html'); // Minify HTML
// var concat = require('gulp-concat'); // Join all JS files together to save space
// var stripDebug = require('gulp-strip-debug'); // Remove debugging stuffs
// var uglify = require('gulp-uglify'); // Minify JavaScript
// var imagemin = require('gulp-imagemin'); // Minify images
//
// // Other dependencies
// var size = require('gulp-size'); // Get the size of the project
const browsersync = require('browser-sync').create(); // Reload the browser on file changes
// var jshint = require('gulp-jshint'); // Debug JS files
// var stylish = require('jshint-stylish'); // More stylish debugging
const plumber = require("gulp-plumber");
const vueify = require('vueify');

// Tasks -------------------------------------------------------------------- >

function vue (done) {
  return gulp
    .src('./src/components/*.vue')
    .pipe(vueify())
    .pipe(gulp.dest('./www'));
}

// BrowserSync
// function browserSync(done) {
//   browsersync.init({
//     server: {
//       baseDir: "./"
//     },
//     port: 8080
//   });
//   done();
// }

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Task to compile Sass file into CSS, and minify CSS into build directory
// CSS task (returns a stream)
function css() {
  return gulp
    .src("./src/styles/sass/*.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./src/styles/css/"))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./static/css"))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./src/styles/sass/*", css);
  gulp.watch(
    [
      "./src/*",
      "./src/**/*",
      "./index.html"
    ],
    // gulp.series(browserSyncReload)
  );

}

// Task to minify new or changed HTML pages
// gulp.task('html', function() {
//   gulp.src('./app/*.html')
//     .pipe(minifyHTML())
//     .pipe(gulp.dest('./build/'));
// });
//
// // Task to concat, strip debugging and minify JS files
// gulp.task('scripts', function() {
//   gulp.src(['./app/scripts/lib.js', './app/scripts/*.js'])
//     .pipe(concat('script.js'))
//     .pipe(stripDebug())
//     .pipe(uglify())
//     .pipe(gulp.dest('./build/scripts/'));
// });
//
// // Task to minify images into build
// gulp.task('images', function() {
//   gulp.src('./app/images/*')
//     .pipe(imagemin({
//       progressive: true,
//     }))
//     .pipe(gulp.dest('./build/images'));
// });
//
// // Task to run JS hint
// gulp.task('jshint', function() {
//   gulp.src('./app/scripts/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('jshint-stylish'));
// });
//
// // Task to get the size of the app project
// gulp.task('size', function() {
//   gulp.src('./app/**')
//     .pipe(size({
//       showFiles: true,
//     }));
// });
//
// // Task to get the size of the build project
// gulp.task('build-size', function() {
//   gulp.src('./build/**')
//     .pipe(size({
//       showFiles: true,
//     }));
// });
//
// // Serve application
// gulp.task('serve', ['styles', 'html', 'scripts', 'images', 'jshint', 'size'], function() {
//   browserSync.init({
//     server: {
//       baseDir: 'app',
//     },
//   });
// });

// Run all Gulp tasks and serve application
// gulp.task('default', function() {
//   gulp.watch('src/styles/sass/*.scss', gulp.series('css'));
//   // gulp.watch('app/*.html', browserSync.reload);
//   // gulp.watch('app/scripts/**/*.js', browserSync.reload);
// });

const watch = gulp.parallel(watchFiles);
const build = gulp.series(css, watch);


// export tasks
exports.css = css;
exports.vue = vue;
exports.watch = watch;
exports.default = build;
