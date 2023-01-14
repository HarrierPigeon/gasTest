let cache_config1: sheetDataEntry = {
    tabName: 'demo_caching_thingy',
    headerRow: 4,
    initialColumnOrder: {
        date_column: 0,
        test_column_2: 1,
        test_column_3: 2
    },
    includeSoftcodedColumns: false
}
// WAKE UP
let cache_config2: sheetDataEntry = {
    tabName: 'demo_cacher_two',
    headerRow: 17,
    initialColumnOrder: {
        column1: 0,
        column2: 1,
        "Fancy COlumn name with spaces": 2,
        "EMOJIS😀😄": 3,
    },
    includeSoftcodedColumns: true,
    sheetId: SpreadsheetApp.getActive().getId(),
    allowWrite: false,
};
// 
// WYLO: I think I should probably make a multiple-sheet-data-constructing thing inside of sheetCore?  Maaaayyyybe?  Would make it consistent at the very least?

/**
 *  Returns time, in milliseconds, that something takes to execute
 *
 * @param {Date} startTime
 * @return {*}  {number}
 */
function timeFunction(startTime: Date):number {
    let endTime = new Date()

    return endTime.getTime() - startTime.getTime()
}

function cacheTesting() {
    
    let startTime1 = new Date()
    let sheet1 = new SheetData(new RawSheetData(cache_config1))
    let sheet2 = new SheetData(new RawSheetData(cache_config2))
    let straight_up = timeFunction(startTime1)

    let total_time: number = 0
    let sheetsToCache: SheetData[] = [sheet1, sheet2]
    for (let sheet of sheetsToCache) {
        let preCachedData = sheet.rsd.getEntryConfig()
        let dataForCaching = sheet.getConfigForCache()
        let timer_two = new Date()
        let restoredSheet = new SheetData(new RawSheetData(dataForCaching))
        straight_up += timeFunction(timer_two)
        let postData = restoredSheet.rsd.getEntryConfig()
        console.log(preCachedData.tabName, compareInOutput(preCachedData, postData))
    }

    console.warn("Time (ms) to create two without restoring:", straight_up)
    console.warn("Time (ms) to create with a cache-restore: ", total_time)


}

function compareArrays(array1: any[], array2: any[]) {
    let maxLength = array1.length > array1.length ? array1.length : array2.length
    let differences = {}
    for (let i = 0; i < maxLength; i++){
        if (array1.length < i) {
            differences[i.toString()] = "DNE on array 1"
        } else if(array2.length < i){
            differences[i.toString()] = "DNE on array 2"
        } else if (array1[i] != array2[i]) {
            differences[i.toString()] = array1[i].toString() + ", " + array2[i].toString()
        }
    }
    return differences
}

function isArray(object: any) {
    return Object.prototype.toString.call(object) == '[object Object]'
}
function compareInOutput(obj1: {}, obj2: {}) {
    let keys1 = Object.getOwnPropertyNames(obj1)
    let keys2 = Object.getOwnPropertyNames(obj2)
    let differences: {} = {}

    for (let key in obj1) {
        if (obj2.hasOwnProperty(key)) {
            if (obj1[key] != obj2[key]) {
                if (isArray(obj1[key]) && isArray(obj2[key])) {
                    differences[key] = compareArrays(obj1[key], obj2[key])
                } else {
                    differences[key] = obj1[key].toString() + ", " + obj2[key].toString()
                }
            }
        } else {
            differences[key] = key.toString() + " not on second object"
        }
    }
    for (let key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
            differences[key] = key.toString() + "not on first object"
        }
    }
    return differences
}


// WYLO: Getting new CLASPRC token