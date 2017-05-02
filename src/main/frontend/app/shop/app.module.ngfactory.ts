// FAKE TS to make main.ts compile
// This file won't be used at all since AOT will produce it

import * as import0 from '@angular/core/src/linker/ng_module_factory';
import * as import1 from './app.module';
export const AppModuleNgFactory:import0.NgModuleFactory<import1.AppModule> = new import0.NgModuleFactory(null, null);