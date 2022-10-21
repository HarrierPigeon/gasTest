function checkUpdate(e: GoogleAppsScript.Events.SheetsOnEdit) {
    for (let property in e) {
        console.log(e[property])
    }
    let searchSheet :SheetData= new SheetData(new RawSheetData(sheetConfigInfo));
    let searchData = search_("the WAN show", 50);
    if (searchData) {
        searchSheet.setData(searchData);
    }
    // let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetConfigInfo.tabName)
    // if (sheet) {
        let queryData = searchSheet.rsd.sheet.getRange(1, 1, 2, 2)
        
        let queryString = queryData[2][1]
        let maxRows = queryData[2][2]
    if (queryString != "" && +maxRows > 0) {
        let results = search_(queryString, maxRows)
        if (results) {
            searchSheet.setData(results)
        }
    }

    
}


interface searchResult extends kiDataEntry{
    id: string,
    url: string,
    title: string,
    channel: string,
    pubDate:Date | "",
}

let sheetConfigInfo: sheetDataEntry = {
    tabName: 'search',
    headerRow: 5,
    initialColumnOrder: {
        pubDate:0,
        title: 1,
        channel: 2,
        url: 3,
        id: 4,
    },
    includeSoftcodedColumns: false
}

// thanks to https://stackoverflow.com/questions/784586/convert-special-characters-to-html-in-javascript
function decodeHtmlCharCodes_(str):string {
    return str.replace(/(&#(\d+);)/g, function (match, capture, charCode) {
        return String.fromCharCode(charCode);
    });
}

function search_(query: string,numResults:number): searchResult[] | undefined {
    // let result:searchResult = {
    //     id: "",
    //     url: '',
    //     title: '',
    //     channel: '',
    // }

    let results: searchResult[] = []
    
    try {
    let queryBody = {
        q: query,
        maxResults: numResults
    };
    const unparsed = YouTube.Search.list("id,snippet", queryBody)
    
    if (unparsed === null && !unparsed.hasOwnProperty("items")) {
        console.error("unable to find matching videos")
        return
        }
    // @ts-ignore undefined type gets handled above here
    unparsed.items.forEach((item) => {
        let output: searchResult = {
            id: '',
            url: '',
            title: '',
            channel: '',
            pubDate: ''
        }
        
        output.id = String(item.id.videoId)
        output.url = "https://youtube.com/watch?v=" + String(item.id.videoId)
        output.title = decodeHtmlCharCodes_(String(item.snippet.title))
        output.channel = decodeHtmlCharCodes_(String(item.snippet.channelTitle))
        output.pubDate = new Date(item.snippet.publishedAt)
        if (output.id != "undefined") {
            results.push(output)
            
        }
        console.log(item["kind"])
        console.log(item["etag"])
        
    })

    }
    return results
}