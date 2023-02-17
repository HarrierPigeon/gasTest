function test1(){
    let config: sheetDataEntry = {
        tabName: 'curlyBird',
        headerRow: 5,
        initialColumnOrder: {
            line1: 0,
            line2:1
        },
        includeSoftcodedColumns: true
    }
    let url = "https://github.com/texas-mcallen-mission/sheetCore"
    let fetchArgs: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        muteHttpExceptions: true,
    }
    let test2 = UrlFetchApp.fetch(url, fetchArgs)
    let response = JSON.parse(test2.getContentText())
    console.log(response);
    
}