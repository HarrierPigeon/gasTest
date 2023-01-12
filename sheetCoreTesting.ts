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

    console.log(sheet1.getConfigForCache())
}