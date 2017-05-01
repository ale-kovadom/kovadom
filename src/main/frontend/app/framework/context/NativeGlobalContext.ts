export interface NativeGlobalContext {

        googleKey: string;

        language: string;

        fullLanguage: string;

}

export abstract class GlobalContext {

    abstract get native(): NativeGlobalContext;
    
}


export class BrowserGlobalContext extends GlobalContext {

    get native(): NativeGlobalContext {
        return window["kovadom"] as NativeGlobalContext;
    }

}

