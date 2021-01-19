# Tempo-Timelog-Importer
Google Script for importing csv exports from a Google Spreadsheet

Installing and running the script
  1. Create the spreadsheet for importing time logs
  2. Import the csv file into the sheet 
  3. Go to "Tools>Script Editor" in the top menu
  4. Copy content of the tempoImporter.gs into the new script
  5. Name and save your project in the scirpt editor 
  6. Replace PASTE_TOKEN with your Tempo API token (generated by a user with tempo_administrator access rights)
  7. Run the onOpen function in the ScriptEditor
  8. Go back to the spreadsheet and use Tempo Magic > Import Records to import worklog into your tempo instance
  
 For the script to work the following column mapping must be kept in the data:

  Column 1 - Issue data

  Column 3 - Hours

  Column 4 - Timelog Date

  Column 5 - User Account Id

  Column 23 - Description
  
  The date must be provided in a format that is starting with: YYYY-MM-DD ...
  
 Uncomment (remove the /* */ characters) the "Prompt for debug in the spreadsheet" section and comment out (add // in front) the callTempo function to verify that proper data is being mapped 
 
 
    //callTempo(key, time, date, description, author)

    
    //Prompt for debug in the spreadsheet
    var testing = key + time + date + description + author
    ui.alert(testing)
