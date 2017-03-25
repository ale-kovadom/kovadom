import {BrandShowcaseImage} from "./brand.showcaseImage";
import {BrandMetadata} from "./brand.metadata";
export class Brand {

    constructor(public code:String,
                public name:String,
                public catchWords:String,
                public description:String,
                public saleProcess:String,
                public metadata: BrandMetadata,
                public brandShowcaseImages?: BrandShowcaseImage[]) {
    }

}