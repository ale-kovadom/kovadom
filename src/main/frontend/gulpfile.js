var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var gulpCopy = require('gulp-copy');
const del = require('del');

var isWin = /^win/.test(process.platform);

var exec = require('child_process').exec;

var i18nFormat = "xlf";
var i18nOutputPrefix = "messages";
var i18nOutputFile = i18nOutputPrefix + '.' + i18nFormat;
var i18nLocales = {
    "frFr": "fr-FR"
};
var i18nOutputDir = "./locale";

// helper function for running ngc and tree shaking tasks
const run_proc = (cmd, callBack, options) => {
    // if (!isProd) return;
    exec(cmd, (err, stdout, stderr) => {
        if (options === undefined) options = {};
        if (options.outFilter !== undefined) stdout = options.outFilter(stdout);
        if (options.errFilter !== undefined) stderr = options.errFilter(stderr);
        process.stdout.write(stdout);
        process.stdout.write(stderr);
        callBack(err);
    });
};

gulp.task('copy-js-to-aot', cb => {
    return gulp
        .src("app/**")
        .pipe(gulpCopy("aot", {}));
});

gulp.task('i18n', cb => {
    var cmd = './node_modules/.bin/ng-xi18n --i18nFormat=' + i18nFormat + ' -p tsconfig-aot.json';
    if (isWin) {
        cmd = '"./node_modules/.bin/ng-xi18n" --i18nFormat=' + i18nFormat + ' -p tsconfig-aot.json';
    }
    return run_proc(cmd, cb);
});

gulp.task('i18n-move-to-locale-dir', cb => {
    gulp.src(i18nOutputFile)
    .pipe(gulp.dest(i18nOutputDir));
    return del([i18nOutputFile]);
});

gulp.task('ngc', cb => {
    var cmd = 'node_modules/.bin/ngc -p tsconfig-aot.json --i18nFile=' + i18nOutputDir + '/' + i18nOutputPrefix + '.' + i18nLocales.frFr + '.' + i18nFormat + ' --locale=' + i18nLocales.frFr + ' --i18nFormat=' + i18nFormat;
    if (isWin) {
        cmd = '"node_modules/.bin/ngc" -p tsconfig-aot.json --i18nFile=' + i18nOutputDir + '/' + i18nOutputPrefix + '.' + i18nLocales.frFr + '.' + i18nFormat + ' --locale=' + i18nLocales.frFr + ' --i18nFormat=' + i18nFormat;
    }
    return run_proc(cmd, cb);
});

gulp.task('rollup', cb => {
    var cmd = 'node_modules/.bin/rollup -c rollup-config.js';
    if (isWin) {
        cmd = '"node_modules/.bin/rollup" -c rollup-config.js';
    }
    return run_proc(cmd, cb);
});


gulp.task('default', gulp.series(['copy-js-to-aot', 'i18n', 'i18n-move-to-locale-dir', 'ngc', 'rollup']));