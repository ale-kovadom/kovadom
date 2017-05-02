import { platformBrowser }    from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { ShopModuleNgFactory } from './shop.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(ShopModuleNgFactory);