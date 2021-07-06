async function updateApprovedClubApplications() {
  let approved = ["id202118124", "id202118184", "id202118202"];
    // loop through the approved clubs ids
    // for each id, get record,
    approved.forEach(approval => logApproval(approval));
    // get index of the record row
    // get index of the record column
    // update the value to true
    function logApproval(approval) {
      Logger.log(approval);
        let id = approval;
        // Logger.log(`id: ${id}`)
        let rowIndex = -1;
        let colIndex = clubApplicationValues[0].indexOf('processed');
        // Logger.log(`colIndex: ${colIndex}`)
        for (let row = 1; row < clubApplicationValues.length; row++) {
          // Logger.log(`Values in cell ${clubApplicationValues[row][0] }`)
            if (clubApplicationValues[row][0] === id) {
                rowIndex = row;
                Logger.log('found it');
                break;
            }
            else {
                rowIndex = -1;
            }
            //Logger.log(`values: ${rowIndex} ${colIndex} ${clubApplicationValues[row][colIndex]}`);
        }
        Logger.log(`rowIndex: ${rowIndex}`)
        // Logger.log(`colIndex: ${colIndex}`)
        clubApplicationSheet.getRange(rowIndex + 1, colIndex + 1).setValue(true);
    }
    // change property in object 
    // append the row 
}