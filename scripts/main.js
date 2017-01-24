requirejs(["sixsigma"], function(sixsigma) {

    function addDataArrayToHtmlTable(dataArray, columnIndex, createNewRows) {
        var table = document.getElementById("data-table");
        for(i=0; i < dataArray.length;i++) {
            var row = 0;
            if (createNewRows === true){
                row = table.insertRow(table.rows.length);
            }
            else {
                row = table.rows[i+1];
            }
            
            var cell = row.insertCell(columnIndex);
            if (dataArray[i] === undefined) {
                cell.innerHTML = "";
            }
            else {
                cell.innerHTML = dataArray[i];
                if (dataArray[i] === "*") {
                    cell.setAttribute("class", "highlight-outlier");
                }
            }
        }
    }

    function addValueToSummaryTable(dataType, dataValue) {
        var cell = document.getElementById(dataType);
        cell.innerHTML = dataValue;
    }

    // This function is called when scripts/sixsigma.js is loaded.
    // If sixsigma.js calls define(), then this function is not fired until
    // sixsigma's dependencies have loaded, and the sixsigma argument will hold
    // the module value for "sixsigma".

    // this is just some test data to check the code is working
    var testDataset = [0,0,1,23,26,18,2,10,35,13,34,40,36,29,0,8,0,20,13,31,26,36,13,34,20,24,0,49.5,37,8,10,34,3,20,24,26,25,0,42,0,37,0];

    addDataArrayToHtmlTable(testDataset, 0, true);    

    sixsigma.init(testDataset, false, "*");

    addValueToSummaryTable("lcl-value", sixsigma.LCL());
    addValueToSummaryTable("ucl-value", sixsigma.UCL());
    addValueToSummaryTable("2sigma-lcl-value", sixsigma.twoSigmaLCL());
    addValueToSummaryTable("2sigma-ucl-value", sixsigma.twoSigmaUCL());
    addValueToSummaryTable("1sigma-ucl-value", sixsigma.oneSigmaUCL());
    addValueToSummaryTable("1sigma-lcl-value", sixsigma.oneSigmaLCL());
    addValueToSummaryTable("cl-value", sixsigma.centreCL());

    addDataArrayToHtmlTable(sixsigma.onePointGreaterThanThreeSigmaFromCL(), 1, false);
    addDataArrayToHtmlTable(sixsigma.twoOutOfThreeConsecutivePointsOutsideTwoSigmaLimit(), 2, false);
    addDataArrayToHtmlTable(sixsigma.fourOutOfFiveConsecutivePointsOutsideOneSigmaLimit(), 3, false);
    addDataArrayToHtmlTable(sixsigma.nineConsecutivePointsOnSameSideOfCL(), 4, false);
    addDataArrayToHtmlTable(sixsigma.anyPointGreaterThanThreeSigmaLimit(), 5, false);
    addDataArrayToHtmlTable(sixsigma.twoConsecutivePointsAboveTwoSigmaLimit(), 6, false);
    addDataArrayToHtmlTable(sixsigma.threeConsecutivePointsAboveOneSigmaLimit(), 7, false);
    addDataArrayToHtmlTable(sixsigma.sevenConsecutivePointsFallingAboveCL(), 8, false);
    addDataArrayToHtmlTable(sixsigma.tenConsecutivePointsFallingBelowCL(), 9, false);
    addDataArrayToHtmlTable(sixsigma.fourConsecutivePointsBelowTwoSigmaLowerLimit(), 10, false);
    addDataArrayToHtmlTable(sixsigma.sixConsecutivePointsBelowOneSigmaLowerLimit(), 11, false);
    addDataArrayToHtmlTable(sixsigma.sixPointsInARowContinuallyIncresingOrDecresing(), 12, false);
    addDataArrayToHtmlTable(sixsigma.fourteenPointsInARowAlternateUpAndDown(), 13, false);
    addDataArrayToHtmlTable(sixsigma.fifteenPointsInARowWithinOneSigmaLimitOnEitherSideOfCentreLine(), 14, false);
    addDataArrayToHtmlTable(sixsigma.eightPointsInARowOutsideOneSigmaOfCentreLineAndPointsAreBothSideOfCentreLine(), 15, false);
    
    addDataArrayToHtmlTable(sixsigma.fourteenPointsInARowAlternateUpAndDown(), 16, false);
});