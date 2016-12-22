export class Arrays {

    public static split<T>(arr:T[], chunkSize:Number) {
        let length = arr.length;
        let chunk = 0;
        let rows:T[][] = [];
        let cols:T[] = [];
        
        rows.push(cols);
        
        for (let i = 0; i < length; i++) {
            let elm = arr[i];
            cols.push(elm);
            chunk++;

            if (chunk == chunkSize && (i + 1) < length) {
                cols = [];
                rows.push(cols);
            }
        }

        return rows;
    }

}