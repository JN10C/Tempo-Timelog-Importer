var ui = SpreadsheetApp.getUi();
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();
var rangeData = sheet.getDataRange();
var lastColumn = rangeData.getLastColumn();
var lastRow = rangeData.getLastRow();
var searchRange = sheet.getRange(2,1, lastRow-1, lastColumn);

var tempoToken = "PASTE_TOKEN";

//Adding UI element
function onOpen() {
  ui.createMenu('Tempo Magic')
  .addItem('Import Records', 'startImport')
  .addToUi();
};

//Iterating through the range and running the callTempo function for each row

function startImport() {

  // Get array of values in the search Range
  var rangeValues = searchRange.getValues();

  // Loop through array and send request to Tempo with data from selected cells
  for ( j = 0 ; j < lastRow - 1; j++){
    var key = rangeValues[j][0];
    var time = rangeValues[j][2] * 3600;
    var date = new Date(rangeValues[j][3]).toISOString().slice(0,10);
    var description = rangeValues[j][22];
    var author = rangeValues[j][4];

    callTempo(key, time, date, description, author)

    /*
    //Prompt for debug in the spreadsheet
    var testing = key + time + date + description + author
    ui.alert(testing)
    */
  }
}

//Make an API call to Tempo API consisting of the parameters passed to the function

function callTempo(issueKey, timeSpentSeconds, startDate, description, authorAccountId) {

  //Request payload
  var payload = JSON.stringify(
    {
    "issueKey": issueKey,
    "timeSpentSeconds": timeSpentSeconds,
    "startDate": startDate,
    "description": description,
    "authorAccountId": authorAccountId,
    "attributes": []
    }
  );

  // Tempo autohirsation header
  var headers = {
  "Authorization": "Bearer " + tempoToken
  };

  //Curl options
  var options = {
   'method': 'post',
   'payload': payload,
   'contentType': 'application/json',
   'Accept': 'application/json',
   'headers': headers
  };

  //Send Api fetch
  UrlFetchApp.fetch('https://api.tempo.io/core/3/worklogs/', options);
}
