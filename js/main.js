define(["require", "exports", "./sixsigma"], function (require, exports, SixSigma) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function addDataArrayToHtmlTable(dataArray, columnIndex, createNewRows) {
        var table = document.getElementById("data-table");
        var i;
        for (i = 0; i < dataArray.length; i++) {
            var row;
            if (createNewRows === true) {
                row = table.insertRow(table.rows.length);
            }
            else {
                row = table.rows[i + 1];
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
    var testDataset = [0, 0, 1, 20, 26, 18, 2, 10, 37, 13, 16, 40, 15, 29, 0, 8, 0, 20, 13, 31, 21, 36, 13, 34, 20, 37, 0, 49.5, 38, 16, 10, 34, 29, 25, 27, 29, 25, 22, 42, 35, 0, 18, 27, 26, 33, 34, 36, 32, 36, 29, 18, 34, 28, 21, 19, 21, 16, 21, 22, 35, 27, 16, 26, 21];
    addDataArrayToHtmlTable(testDataset, 0, true);
    var sixsigma = new SixSigma(testDataset, false);
    addValueToSummaryTable("lcl-value", sixsigma.lowerConfidenceLimit);
    addValueToSummaryTable("ucl-value", sixsigma.upperConfidenceLimit);
    addValueToSummaryTable("2sigma-lcl-value", sixsigma.twoSigmaLowerConfidenceLimit);
    addValueToSummaryTable("2sigma-ucl-value", sixsigma.twoSigmaUpperConfidenceLimit);
    addValueToSummaryTable("1sigma-ucl-value", sixsigma.oneSigmaUpperConfidenceLimit);
    addValueToSummaryTable("1sigma-lcl-value", sixsigma.oneSigmaLowerConfidenceLimit);
    addValueToSummaryTable("cl-value", sixsigma.centreConfidenceLimit);
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
//# sourceMappingURL=main.js.map