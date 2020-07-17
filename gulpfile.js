const gulp = require("gulp");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const replace = require("gulp-replace");
const concat = require("gulp-concat");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const useref = require("gulp-useref");
const uglify = require("gulp-uglify");
const gulpIf = require("gulp-if");
const cache = require("gulp-cache");
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

//Compile scss in css

function style() {
	// Where is My Scss file
	return (
		gulp
			.src("app/assets/scss/**/*.scss")
			//Pass the file through Sass Compiler
			.pipe(sass())
			//Where i Do Save the Compiled CSS ?
			.pipe(gulp.dest("app/assets/css"))
			//Settle Down thing Automatically
			.pipe(browserSync.stream())
	);
}

function uref() {
	return gulp
		.src("app/*.html")
		.pipe(useref())
		.pipe(gulpIf("**/*.js", uglify()))
		.pipe(gulpIf("**/*.css", cssnano()))
		.pipe(gulp.dest("public"));
	// .pipe(gulpIf("*.html", gulp.dest("public"), gulp.dest("public/assets/")))
}

function images() {
	return gulp
		.src("app/assets/images/**/*.+(png|jpg|gif|svg|jpeg)")
		.pipe(
			cache(
				imagemin({
					interlaced: true
				})
			)
		)
		.pipe(gulp.dest("public/assets/images"));
}

function font_family() {
	return gulp.src("app/assets/font-family/**/*").pipe(gulp.dest("public/assets/font-family"));
}

function flat_font() {
	return gulp.src("app/assets/font/**/*").pipe(gulp.dest("public/assets/font"));
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "app"
		}
	});
	gulp.watch("app/assets/scss/**/*.scss", style);
	gulp.watch("app/*.html").on("change", browserSync.reload);
	gulp.watch("app/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
exports.uref = uref;
exports.images = images;
exports.flat_font = flat_font;
exports.font_family = font_family;
exports.build = gulp.series(uref, images, font_family, flat_font);
