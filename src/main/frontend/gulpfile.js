const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const gulpCopy = require('gulp-copy');
const postcss = require('gulp-postcss');
const assets = require('postcss-assets');
const del = require('del');
const hasha = require('hasha');
const path = require('path');
const isWin = /^win/.test(process.platform);
const exec = require('child_process').exec;
const i18nFormat = "xlf";
const i18nOutputPrefix = "messages";
const i18nOutputFile = i18nOutputPrefix + '.' + i18nFormat;
const i18nLocales = {
    "frFr": "fr-FR"
};
const i18nOutputDir = "./locale";

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

gulp.task('copy-app-to-aot', cb => {
    return gulp
        .src("app/**")
        .pipe(gulpCopy("aot", {}));
});

gulp.task('post-asset-css', cb => {
    return gulp.src('aot/**/*.css')
        .pipe(postcss([assets({
            basePath: '../webapp/',
            loadPaths: ['resources/img/'],
            cachebuster: function (filePath, urlPathname) {
                return {
                    pathname: path.dirname(urlPathname)
                    + '/' + path.basename(urlPathname, path.extname(urlPathname))
                    + '-' + hasha.fromFileSync(filePath, {algorithm: 'md5'}) + path.extname(urlPathname),
                    query: false
                }
            }
        })]))
        .pipe(gulp.dest('aot'));
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


gulp.task('default', gulp.series(['copy-app-to-aot', 'post-asset-css', 'i18n', 'i18n-move-to-locale-dir', 'ngc', 'rollup']));