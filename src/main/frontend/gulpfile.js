var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var gulpCopy = require('gulp-copy');

var isWin = /^win/.test(process.platform);

var exec = require('child_process').exec;

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

gulp.task('ngc', cb => {
    var cmd = 'node_modules/.bin/ngc -p tsconfig-aot.json';
    if (isWin) {
        cmd = '"node_modules/.bin/ngc" -p tsconfig-aot.json';
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


gulp.task('default', gulp.series(['copy-js-to-aot', 'ngc', 'rollup']));