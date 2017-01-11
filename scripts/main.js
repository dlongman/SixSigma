requirejs(["sixsigma"], function(sixsigma) {
    // This function is called when scripts/sixsigma.js is loaded.
    // If sixsigma.js calls define(), then this function is not fired until
    // sixsigma's dependencies have loaded, and the sixsigma argument will hold
    // the module value for "sixsigma".
    var testDataset = [0,0,1,23,26,18,2,10,35,13,34,40,36,29,0,8,0,20,13,31,26,36,13,34,20,24,0,49.5,37,8,10,34,3,20,24,26,25,0,42,0,37,0];

    sixsigma.init(testDataset, false, "*");

    console.log(sixsigma.LCL());
    console.log(sixsigma.UCL());
    console.log(sixsigma.twoSigmaLCL());
    console.log(sixsigma.twoSigmaUCL());
    console.log(sixsigma.oneSigmaUCL());
    console.log(sixsigma.oneSigmaLCL());
    console.log(sixsigma.centreCL());

    console.log(sixsigma.onePointGreaterThanThreeSigmaFromCL());
    console.log(sixsigma.twoOutOfThreeConsecutivePointsOutsideTwoSigmaLimit());
    console.log(sixsigma.fourOutOfFiveConsecutivePointsOutsideOneSigmaLimit());
    console.log(sixsigma.nineConsecutivePointsOnSameSideOfCL());
    console.log(sixsigma.anyPointGreaterThanThreeSigmaLimit());
    console.log(sixsigma.twoConsecutivePointsAboveTwoSigmaLimit());
    console.log(sixsigma.threeConsecutivePointsAboveOneSigmaLimit());
    console.log(sixsigma.sevenConsecutivePointsFallingAboveCL());
    console.log(sixsigma.tenConsecutivePointsFallingBelowCL());
    console.log(sixsigma.fourConsecutivePointsBelowTwoSigmaLowerLimit());
    console.log(sixsigma.sixConsecutivePointsBelowOneSigmaLowerLimit());
    console.log(sixsigma.sixPointsInARowContinuallyIncresingOrDecresing());
    console.log(sixsigma.fourteenPointsInARowAlternateUpAndDown());
    console.log(sixsigma.fifteenPointsInARowWithinOneSigmaLimitOnEitherSideOfCentreLine());
    console.log(sixsigma.eightPointsInARowOutsideOneSigmaOfCentreLineAndPointsAreBothSideOfCentreLine());
    
    console.log(sixsigma.fourteenPointsInARowAlternateUpAndDown());
});