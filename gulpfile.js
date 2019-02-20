const gulp = require('gulp');
const pug = require('gulp-pug');

const ttf2woff = require('gulp-ttf2woff');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sassGlob = require('gulp-sass-glob');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const del = require('del');

const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace');

const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/assets/images/'
    },
    fonts: {
        src: 'src/fonts/**/*.*',
        dest: 'build/assets/fonts/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/assets/scripts/'
    }
}

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
    return gulp.src('./src/styles/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.styles.dest))
}


// очистка
function clean() {
    return del(paths.root);
}

// webpack
function scripts() {
    return gulp.src('src/scripts/*.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}

// галповский вотчер
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}

// локальный сервер + livereload (встроенный)
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// просто переносим картинки
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

// перенос шрифтов
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

//перенос видео
function video() {
    return gulp.src(paths.video.src)
        .pipe(gulp.dest(paths.video.dest));
}

//Конвертация шрифтов
function convWoff() {
    return gulp.src(['fonts/*.ttf'])
        .pipe(ttf2woff())
        .pipe(gulp.dest('fonts/woff'));
};

//сборка svg спрайта
const config = {
    mode: {
        symbol: {
            sprite: "../sprite.svg",
            example: {
                dest: '../tmp/spriteSvgDemo.html' // демо html
            }
        }
    }
};

function spritesvg() {
    return gulp.src('src/images/icons/*.svg')
        // минифицируем svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // удалить все атрибуты fill, style and stroke в фигурах
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        // cheerio плагин заменит, если появилась, скобка '&gt;', на нормальную.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite(config))
        .pipe(gulp.dest('sprite/'));
};


exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.fonts = fonts;
exports.video = video;
exports.convWoff = convWoff;
exports.spritesvg = spritesvg;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, fonts, scripts),
    gulp.parallel(watch, server)
));

gulp.task('woff', gulp.series(
    convWoff
));


gulp.task('spritesvg', gulp.series(
    spritesvg
));