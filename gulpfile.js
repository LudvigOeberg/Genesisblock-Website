var sources, destinations, lr, gulp, gutil, jade, stylus;

gulp = require('gulp');
jade = require('gulp-jade');
gutil = require('gulp-util');
stylus = require('gulp-stylus');
lr = require('tiny-lr')();
var open = require('gulp-open');

sources = {
  jade: "*.jade",
  stylus: "css/*.styl",
};

destinations = {
  html: "./",
  css: "css"
};

gulp.task("jade", function(event) {
  return gulp.src("*.jade").pipe(jade({
    pretty: true
  })).pipe(gulp.dest(destinations.html));
});

gulp.task("stylus", function(event) {
  return gulp.src("css/*.styl").pipe(stylus({
    style: "compressed"
  })).pipe(gulp.dest(destinations.css));
});

gulp.task("watch", function() {
  gulp.watch(sources.jade, ["jade"]);
  gulp.watch(sources.stylus, ["stylus"]);
  gulp.watch(['*.html', 'js/*.js', 'css/*.css'], refresh);
});

gulp.task('serve', function () {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(__dirname));
  app.listen(4000);
  lr.listen(35729);

  gulp.src('')
  .pipe(open({uri: 'http://localhost:4000'}));
});

gulp.task("default", ["jade", "stylus", "watch", "serve"]);

refresh = function(event) {
  var fileName = require('path').relative(__dirname, event.path);
  gutil.log.apply(gutil, [gutil.colors.magenta(fileName), gutil.colors.cyan('built')]);
  lr.changed({
    body: { files: [fileName] }
  });
}
