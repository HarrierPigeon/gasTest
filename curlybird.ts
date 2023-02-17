function test1(){
    let config: sheetDataEntry = {
        tabName: 'curlyBird',
        headerRow: 5,
        initialColumnOrder: {
            line1: 0,

        },
        includeSoftcodedColumns: true
    }
    let sheet = new SheetData(new RawSheetData(config))

    let url1 = "https://github.com/texas-mcallen-mission/sheetCore"
    let fetchArgs: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        muteHttpExceptions: true,
    }
    // console.log(getDataFromURL(url1))
    let url2 = composeGitUrl("texas-mcallen-mission", "sheetCore")
    const response = getDataFromURL(url2)

    let keys = Object.keys(response)
    sheet.addKeysFromArray(keys)
    sheet.setData(response)
}

function getDataFromURL(url: string) {
    let fetchArgs: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        muteHttpExceptions: true,
    }
    const fetcher = UrlFetchApp(url, fetchArgs)
    let response = JSON.parse(fetcher.getContentText())
    return response
}

function composeGitUrl(ownerName:string,repoName:string) {
    //https://api.github.com/repos/RaviKharatmal/test/contents
    const baseURL = "https://api.github.com";
    return baseURL + "/repos/" + ownerName + "/" + repoName + "/contents";
}