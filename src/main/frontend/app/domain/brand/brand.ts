import {BrandShowcaseImage} from "./brand.showcaseImage";
export class Brand {

    constructor(public code:String,
                public name:String,
                public catchWords:String,
                public description:String,
                public saleProcess:String,
                public brandShowcaseImages?: BrandShowcaseImage[]) {
    }

}