function checkUpdate(e) {
    
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
        id: 0,
        url: 1,
        title: 2,
        channel: 3,
        pubDate:4
    },
    includeSoftcodedColumns: false
}


function runSearch() {
    let searchSheet = new SheetData(new RawSheetData(sheetConfigInfo))
    let searchData = search("the WAN show",50)
    if (searchData) {
        searchSheet.setData(searchData);
    }
}

function search(query: string,numResults:number): searchResult[] | undefined {
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
        output.title = String(item.snippet.title)
        output.channel = String(item.snippet?.channelTitle)
        output.pubDate = new Date(item.snippet.publishedAt)
        results.push(output)
        console.log(item["kind"])
        console.log(item["etag"])
        
    })

    }
    return results
}