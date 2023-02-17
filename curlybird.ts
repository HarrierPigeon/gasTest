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

    let url1 = "https://github.com/texas-mcallen-mission/sheetCore"
    let fetchArgs: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        muteHttpExceptions: true,
    }
    console.log(getDataFromURL(url1))
    let url2 = composeGitUrl("texas-mcallen-mission", "sheetCore")
    console.log(getDataFromURL(url2))
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
    const baseURL = "https://github.com"
    
    return baseURL + "/"+ownerName + "/"+repoName
}