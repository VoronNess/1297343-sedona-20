const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};
exports.styles = styles;

const stylesCopy = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};
exports.stylesCopy = stylesCopy;

// Img optimization

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
     ]))
    .pipe(gulp.dest("build/img"))
};
exports.images = images;


const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
};
exports.createWebp = createWebp;


//SVG-sprite

const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
};
exports.sprite = sprite;

//Js-min

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"));
};
exports.scripts = scripts;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};
exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
  gulp.watch("source/*.js").on("change", sync.reload);
};

exports.default = gulp.series(
  styles, server, watcher
);


//Del old files

const clean = () => {
  return del("build");
};
exports.clean = clean;

//Copy to build

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/manifest.json"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
};
exports.copy = copy;

const html = () => {
  return gulp.src("source/*.html",{base: "source"})
    .pipe(gulp.dest("build"));
};
exports.html = html;

const htmlMinify = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
};
exports.htmlMinify = htmlMinify;

const build = gulp.series(
  clean,
  copy,
  styles,
  images,
  createWebp,
  sprite,
  html,
  stylesCopy,
  scripts,
);
exports.build = build;

const start = gulp.series(
  build,
  server,
  watcher
);
exports.start = start;
