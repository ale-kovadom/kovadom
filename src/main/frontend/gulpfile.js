var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = { // keep in mind we are in frontend folder for paths
    src: {
        ts: './js/app/**/*.ts'
    },
    dest: {
        js: './build/js'
    }
};

// inline template + compile typescript + concatenate + uglify
gulp.task('compile:typescript', function () {
    var result = gulp.src([paths.src.ts])
        .pipe(plugins.inlineNg2Template({
            base: '/',
            html: true,
            css: false,
            jade: false,
            target: 'es6',
            useRelativePaths: true
        }))
        .pipe(plugins.typescript(plugins.typescript.createProject('tsconfig.json', {
            typescript: require('typescript'),
            outFile: paths.dest.js + '/app.js'
        })));
    return result.js
        .pipe(plugins.uglify())
        .pipe(gulp.dest("./js/app"));
});

gulp.task('default', gulp.parallel('compile:typescript'));