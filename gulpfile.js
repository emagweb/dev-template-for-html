var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cssbeautify = require("gulp-cssbeautify"),
    jade = require("gulp-jade"),
    imagemin = require("gulp-imagemin"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    browserSync = require("browser-sync").create();

var gulp = require('gulp'),
    cssbeautify = require('gulp-cssbeautify');

gulp.task("sass", function () {
  return gulp.src("src/sass/*.*")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({
      stream: true
  }));
});

gulp.task('js', function() {
  gulp.src("src/js/*")
    .pipe(concat("main.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("imagemin", function() {
  gulp.src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
    .pipe(browserSync.reload({
      stream: true
  }));
});

gulp.task("jade", function () {
  return gulp.src("src/*.jade")
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.reload({
      stream: true
  }));
});

gulp.task("browserSync", function () {
  browserSync.init({
    server: {
      baseDir: "dist"
    },
  });
});

gulp.task("watch", ["browserSync", "sass", "jade", "imagemin", "js"], function () {
  gulp.watch("src/sass/**/*.sass", ["sass"]);
  gulp.watch("src/**/*.jade", ["jade"]);
  gulp.watch("src/img/*", ["imagemin"]);
  gulp.watch("src/js/*", ["js"]);
});

gulp.task("default", ["watch"]);
