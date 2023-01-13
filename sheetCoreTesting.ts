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

function cacheTesting() {
    let sheet1 = new SheetData(new RawSheetData(cache_config1))
    let sheet2 = new SheetData(new RawSheetData(cache_config2))
    
    let cachedSheet1 = sheet1.getConfigForCache()
    console.log(sheet1.rsd.getEntryConfig())
    let restoredSheetRSD = new RawSheetData(cachedSheet1)
    let restoredSheetData = new SheetData(restoredSheetRSD)
    console.log(restoredSheetData.getConfigForCache())
    console.log(restoredSheetData.rsd.getEntryConfig())
    console.log(compareInOutput(sheet1.rsd.getEntryConfig(), restoredSheetData.rsd.getEntryConfig()))
}

function compareInOutput(obj1: {}, obj2: {}) {
    let keys1 = Object.getOwnPropertyNames(obj1)
    let keys2 = Object.getOwnPropertyNames(obj2)
    let differences: {} = {}

    for (let key in obj1) {
        if (obj2.hasOwnProperty(key)) {
            if (obj1[key] != obj2[key]) {
                differences[key] = obj1[key].toString() + ", " + obj2[key].toString()
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