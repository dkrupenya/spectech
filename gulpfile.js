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
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    fileinclude = require('gulp-file-include'),
    reload = browserSync.reload;

//подключаем gilp-grunt
//require('gulp-grunt')(gulp);

//создадим js объект в который пропишем все нужные нам пути, чтобы при необходимости легко в одном месте их редактировать:

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src//*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js', //В стилях и скриптах нам понадобятся только main файлы
        style: 'src/css/style.less',
        img: 'src/img/**/*.*', //Синтаксис img//**//*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build/*'
};     

//Создадим переменную с настройками нашего dev сервера для BrowserSync:

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil",
    browser: "Google Chrome",
    files: "build/css/*.css",
    open: false
};


var fileIncludeConfig = {
    prefix: '@@',
    basepath: '@file'
};

//таск для сборки html:

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(fileinclude(fileIncludeConfig)) // используем fileInclude вместо rigger
//        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); // И перезагрузим наш сервер для обновлений
});

//таск для сборки js:

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
//        .pipe(sourcemaps.init()) //Инициализируем sourcemap
//        .pipe(uglify()) //Сожмем наш js
//        .pipe(sourcemaps.write()) //Пропишем карты
//        .pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

//таск для сборки css:

gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
//        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(less()) //Скомпилируем
//        .pipe(prefixer()) //Добавим вендорные префиксы
//        .pipe(cssmin()) //Сожмем
//        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});

//таск для сборки картинок:

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
//        .pipe(imagemin({ //Сожмем их
//            progressive: true,
//            svgoPlugins: [{removeViewBox: false}],
//            use: [pngquant()],
//            interlaced: true
//        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

//таск для сборки шрифтов:

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

//  попросим gulp каждый раз при изменении какого то файла запускать нужную задачу.

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

// определим таск с именем «build», который будет запускать все что мы с вами тут накодили

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

// Что бы насладиться чудом livereload — нам необходимо создать себе локальный веб-сервер. Для этого напишем следующий простой таск

gulp.task('webserver', function () {
    browserSync(config);
});

//Если вы добавите какую-нибудь картинку, потом запустите задачу image:build 
//и потом картинку удалите — она останется в папке build. Так что было бы удобно периодически подчищать ее.

gulp.task('clean', function (cb) {
   rimraf(path.clean, cb);
});

//Последним делом — мы определим дефолтный таск, который будет запускать всю нашу сборку.
//Теперь выполним в консоли gulp И вуаля

//gulp.task('default', ['build', 'webserver', 'watch']);
gulp.task('default', ['build', 'webserver', 'watch']);

