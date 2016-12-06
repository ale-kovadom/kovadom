/**
 * System configuration for Angular
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'js:': 'js/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'js:app',

      // angular bundles
      '@angular/core': 'js:@angular/core/bundles/core.umd.min.js',
      '@angular/common': 'js:@angular/common/bundles/common.umd.min.js',
      '@angular/compiler': 'js:@angular/compiler/bundles/compiler.umd.min.js',
      '@angular/platform-browser': 'js:@angular/platform-browser/bundles/platform-browser.umd.min.js',
      '@angular/platform-browser-dynamic': 'js:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
      '@angular/http': 'js:@angular/http/bundles/http.umd.min.js',
      '@angular/router': 'js:@angular/router/bundles/router.umd.min.js',
      '@angular/forms': 'js:@angular/forms/bundles/forms.umd.min.js',

      // other libraries
      'rxjs':                      'js:rxjs/bundles/Rx.min.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
