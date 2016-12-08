var gulp = require('gulp');
var ts = require('gulp-typescript');
var plugins = require('gulp-load-plugins')();
//var sourcemaps = require('gulp-sourcemaps');

var paths = { // keep in mind we are in frontend folder for paths
    src: {
        ts: './app/**/*.ts'
    },
    dest: {
        js: './app-out'
    }
};

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript'),
    outFile: 'bundle.js'
});

gulp.task('ts', function () {
    // var result = gulp.src([paths.src.ts])
    // .pipe(plugins.inlineNg2Template({
    //     base: '/',
    //     html: true,
    //     css: false,
    //     jade: false,                 
    //     target: 'es5',
    //     useRelativePaths: true
    // }))
    // .pipe(plugins.typescript(plugins.typescript.createProject('tsconfig.json', {
    //     typescript: require('typescript'),
    //  //   outFile: paths.dest.js + '/app.js'
    // })));
    //result.js
    //   .pipe(plugins.uglify())
    //    .pipe(gulp.dest("./js/app/build/js"));
    return gulp.src([paths.src.ts])
        // .pipe(sourcemaps.init({
        //     loadMaps: true
        // }))
        .pipe(plugins.inlineNg2Template({
            base: '/',
            html: true,
            css: false,
            jade: false,
            target: 'es5',
            useRelativePaths: true
        }))
        .pipe(ts(tsProject))
        //.pipe(sourcemaps.write('.'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.dest.js));
});

gulp.task('default', gulp.series(['ts']));