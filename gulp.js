'use strict';
// http://habrahabr.ru/post/250569/

var gulp = require('gulp'),
    watch = require('gulp-watch'),
//    prefixer = require('gulp-autoprefixer'),
//    uglify = require('gulp-uglify'),
//    sass = require('gulp-sass'),
//    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    rigger = require('gulp-rigger'),
//    cssmin = require('gulp-minify-css'),
//    imagemin = require('gulp-imagemin'),
//    pngquant = require('imagemin-pngquant'),
//    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

//�������� js ������ � ������� �������� ��� ������ ��� ����, ����� ��� ������������� ����� � ����� ����� �� �������������:

var path = {
    build: { //��� �� ������ ���� ���������� ������� ����� ������ �����
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //���� ������ ����� ���������
        html: 'src/*.html', //��������� src//*.html ������� gulp ��� �� ����� ����� ��� ����� � ����������� .html
        js: 'src/js/main.js', //� ������ � �������� ��� ����������� ������ main �����
        style: 'src/css/style.less',
        img: 'src/img/**/*.*', //��������� img//**//*.* �������� - ����� ��� ����� ���� ���������� �� ����� � �� ��������� ���������
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //��� �� ������, �� ���������� ����� ������ �� ����� ���������
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};     

//�������� ���������� � ����������� ������ dev �������:

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

//���� ��� ������ html:

gulp.task('html:build', function () {
    gulp.src(path.src.html) //������� ����� �� ������� ����
        .pipe(rigger()) //�������� ����� rigger
        .pipe(gulp.dest(path.build.html)); //�������� �� � ����� build
//        .pipe(reload({stream: true})); � ������������ ��� ������ ��� ����������
});

//���� ��� ������ js:

gulp.task('js:build', function () {
    gulp.src(path.src.js) //������ ��� main ����
        .pipe(rigger()) //�������� ����� rigger
//        .pipe(sourcemaps.init()) //�������������� sourcemap
//        .pipe(uglify()) //������ ��� js
//        .pipe(sourcemaps.write()) //�������� �����
//        .pipe(gulp.dest(path.build.js)); //�������� ������� ���� � build
//        .pipe(reload({stream: true})); //� ������������ ������
});

//���� ��� ������ css:

gulp.task('style:build', function () {
    gulp.src(path.src.style) //������� ��� main.scss
//        .pipe(sourcemaps.init()) //�� �� ����� ��� � � js
        .pipe(less()) //������������
//        .pipe(prefixer()) //������� ��������� ��������
//        .pipe(cssmin()) //������
//        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)); //� � build
//        .pipe(reload({stream: true}));
});

//���� ��� ������ ��������:

gulp.task('image:build', function () {
    gulp.src(path.src.img) //������� ���� ��������
//        .pipe(imagemin({ //������ ��
//            progressive: true,
//            svgoPlugins: [{removeViewBox: false}],
//            use: [pngquant()],
//            interlaced: true
//        }))
        .pipe(gulp.dest(path.build.img)); //� ������ � build
//        .pipe(reload({stream: true}));
});

//���� ��� ������ �������:

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

//  �������� gulp ������ ��� ��� ��������� ������ �� ����� ��������� ������ ������.

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

// ��������� ���� � ������ �build�, ������� ����� ��������� ��� ��� �� � ���� ��� ��������

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

// ��� �� ����������� ����� livereload � ��� ���������� ������� ���� ��������� ���-������. ��� ����� ������� ��������� ������� ����

gulp.task('webserver', function () {
    browserSync(config);
});

//���� �� �������� �����-������ ��������, ����� ��������� ������ image:build 
//� ����� �������� ������� � ��� ��������� � ����� build. ��� ��� ���� �� ������ ������������ ��������� ��.

gulp.task('clean', function (cb) {
// ����� rimraf �� ���������� 
//   rimraf(path.clean, cb);
});

//��������� ����� � �� ��������� ��������� ����, ������� ����� ��������� ��� ���� ������.
//������ �������� � ������� gulp � �����

//gulp.task('default', ['build', 'webserver', 'watch']);
gulp.task('default', ['build']);

