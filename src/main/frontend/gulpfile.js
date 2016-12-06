var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = { // keep in mind we are in frontend folder for paths
    src: {
        ts: './js/app/**/*.ts',
        main: './js/app/main.ts'
    },
    dest: {
        js: './build/js'
    }
};
              //TODO app.js quasi vide puis aller voir dans systemjs.congig.js
// inline template + compile typescript + concatenate + uglify
gulp.task('compile:typescript', function () {
    var result = gulp.src([paths.src.ts])
        // .pipe(plugins.inlineNg2Template({
        //     base: '/',
        //     html: true,
        //     css: false,
        //     jade: false,
        //     target: 'es5',
        //     useRelativePaths: true
        // }))
        .pipe(plugins.typescript(plugins.typescript.createProject('tsconfig.json', {
            typescript: require('typescript'),
         //   outFile: paths.dest.js + '/app.js'
        })));
    result.js
     //   .pipe(plugins.uglify())
        .pipe(gulp.dest("./js/app/build/js"));

    // var resultMain = gulp.src([paths.src.main])
    //     .pipe(plugins.typescript(plugins.typescript.createProject('tsconfigmain.json', {
    //         typescript: require('typescript'),
    //      //   outFile: paths.dest.js + '/main.js'
    //     })));
    // return resultMain.js
    // // .pipe(plugins.uglify())
    //     .pipe(gulp.dest("./js/app/build/js"));

});

gulp.task('default', gulp.parallel('compile:typescript'));