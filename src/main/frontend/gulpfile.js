var gulp = require('gulp');
var ts = require('gulp-typescript');
var plugins = require('gulp-load-plugins')();

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
    return gulp.src([paths.src.ts])
        .pipe(plugins.inlineNg2Template({
            base: '/',
            html: true,
            css: false,
            jade: false,
            target: 'es5',
            useRelativePaths: true
        }))
        .pipe(ts(tsProject))
      //  .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.dest.js));
});

gulp.task('default', gulp.series(['ts']));