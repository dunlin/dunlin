/* eslint-env node */
'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    nano = require('gulp-cssnano'),
    exec = require('gulp-exec'),
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber'),

    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),

    sequence = require('run-sequence'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    del = require('del');

gulp.task('clean', del.bind(null, ['client']));

gulp.task('styles', function () {
    return gulp.src('source/less/main.less')
        .pipe(less({
            onError: console.error.bind(console, 'Less error:')
        }))
        .pipe(plumber())
        .pipe(gulp.dest('client/css/'));
});

gulp.task('optstyles', function () {
    return gulp.src('client/css/main.css')
        .pipe(autoprefixer({
            browsers: [
                'chrome >= 29',
                'firefox >= 29',
                'ie >= 11',
                'opera >= 24',
                'safari >= 8'
            ]
        }))
        .pipe(nano())
        .pipe(gulp.dest('client/css/'));
});

// Create SVG sprite & insert it into client.hbs
gulp.task('svgstore', function () {
    return gulp.src('source/icons/*.svg')
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest('client/icons/'));
});

gulp.task('browserify', function () {
    return browserify({
            entries: ['./source/js/client.js'],
            transform: 'hbsfy',
            debug: process.env.NODE_ENV === 'development'
        })
        .bundle()
        .pipe(plumber())
        .pipe(source('client.js'))
        .pipe(gulp.dest('client/js/'));
});

gulp.task('images', function () {
    return gulp.src('source/images/*')
        .pipe(gulp.dest('client/images/'));
});

gulp.task('server:signaling', function () {
    return gulp.src('client/')
        .pipe(exec('VIDEO_HOST=localhost:8001 node node_modules/signaling-server/index'));
});

gulp.task('server:dunlin', function () {
    nodemon({
        script: 'index.js',
        watch: 'source',
        ext: 'js hbs less',
        env: {
            'SIGNALING_SERVER': 'localhost:8080',
            'NODE_ENV': 'development'
        }
    }).on('restart', function () {
        sequence('build');
    });
});

gulp.task('build', function (done) {
    sequence('clean', ['images', 'styles', 'browserify', 'optstyles', 'svgstore'], done);
});

gulp.task('server', ['server:signaling', 'server:dunlin']);

gulp.task('default', ['build', 'server'], function () {
    process.env.NODE_ENV = 'develop';
});
