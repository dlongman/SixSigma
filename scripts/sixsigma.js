/**
 * Collection of various helpful mathmatical functions for generating Six Sigma charts
**/
define(["math"], function (MathHelper) {

    "use strict";

    var data;
    var displayTextForMatch;
    var lowerConfidenceLimit;
    var upperConfidenceLimit;
    var twoSigmaLowerConfidenceLimit;
    var twoSigmaUpperConfidenceLimit;
    var oneSigmaUpperConfidenceLimit;
    var oneSigmaLowerConfidenceLimit;
    var centreConfidenceLimit;

    // initialises the module with the dataset to analyse and general configuration data
    function init(values, allowNegativeValues, displayTextForMatches) {
        
        data = values;
        displayTextForMatch = displayTextForMatches;
        var mean = MathHelper.average(values);
        var meanVariance = MathHelper.meanVariance(values);

        var lcl = mean - (meanVariance * 2.66);
        var ucl = mean + (meanVariance * 2.66);
        var twoSigmaLcl = mean - (meanVariance * 1.77);
        var twoSigmaUcl = mean + (meanVariance * 1.77);
        var oneSigmaLcl = mean - (meanVariance * 0.89);
        var oneSigmaUcl = mean + (meanVariance * 0.89);

        if (allowNegativeValues === false) {
            if (lcl < 0.0) {
                lcl = 0;
            }
            if (twoSigmaLcl < 0.0) {
                twoSigmaLcl = 0;
            }
            if (oneSigmaLcl < 0.0) {
                oneSigmaLcl = 0;
            }
        }

        // var dataset = [0,0,1,23,26,18,2,10,35,13,34,40,36,29,0,8,0,20,13,31,26,36,13,34,20,24,0,50]

        lowerConfidenceLimit = lcl;
        upperConfidenceLimit = ucl;
        twoSigmaLowerConfidenceLimit = twoSigmaLcl;
        twoSigmaUpperConfidenceLimit = twoSigmaUcl;
        oneSigmaUpperConfidenceLimit = oneSigmaUcl;
        oneSigmaLowerConfidenceLimit = oneSigmaLcl;
        centreConfidenceLimit = mean;
    }

     // ************************************************************************
    // WESTERN ELECTRIC RULES
    // https://en.wikipedia.org/wiki/Western_Electric_rules
    // ************************************************************************
    // RULE 1
    function onePointGreaterThanThreeSigmaFromCL() {
        return data.map(function (value) {
            return (value > upperConfidenceLimit) ? _formatDisplayValue(value) : undefined;
        });
    }

    // RULE 2
    function twoOutOfThreeConsecutivePointsOutsideTwoSigmaLimit() {
        return data.map(function (value, index, dataArray) {

            // check whether we get a hit above threshold
            var aboveThreshold = _xValuesAboveThreshold(value,
                    index,
                    dataArray,
                    2,
                    twoSigmaUpperConfidenceLimit,
                    2);

            // check whether we get a hit below threshold
            var belowThreshold = _xValuesBelowThreshold(value,
                    index,
                    dataArray,
                    2,
                    twoSigmaLowerConfidenceLimit,
                    2);

            return (aboveThreshold !== undefined) ? aboveThreshold : belowThreshold;
        });
    }

    // RULE 3
    function fourOutOfFiveConsecutivePointsOutsideOneSigmaLimit() {
        return data.map(function (value, index, dataArray) {

            // check whether we get a hit above threshold
            var aboveThreshold = _xValuesAboveThreshold(value,
                    index,
                    dataArray,
                    4,
                    oneSigmaUpperConfidenceLimit,
                    4);

            // check whether we get a hit below threshold
            var belowThreshold = _xValuesBelowThreshold(value,
                    index,
                    dataArray,
                    4,
                    oneSigmaLowerConfidenceLimit,
                    4);

            return (aboveThreshold !== undefined) ? aboveThreshold : belowThreshold;

        });
    }

    // RULE 4
    function nineConsecutivePointsOnSameSideOfCL() {
        return data.map(function (value, index, dataArray) {
            var aboveClCounter = 0;
            var belowClCounter = 0;
            if (index >= 8) {
                // check the past 9 values and increment a counter
                // depending if the value is > or < CL value
                var i;
                for (i = 0; i <= 8; i++) {
                    if (dataArray[index - i] > centreConfidenceLimit) {
                        aboveClCounter = aboveClCounter + 1;
                    } else if (dataArray[index - i] < centreConfidenceLimit) {
                        belowClCounter = belowClCounter + 1;
                    }
                }

                // return the value if either counter is 9
                return ((belowClCounter === 9) || (aboveClCounter === 9)) ? _formatDisplayValue(value) : undefined;

            } else {
                return undefined;
            }
        });
    }
    // ************************************************************************

    // ************************************************************************
    // WESTERN ELECTRIC ASYMETRIC CONTROL LIMIT RULES
    // https://en.wikipedia.org/wiki/Western_Electric_rules
    // ************************************************************************

    function anyPointGreaterThanThreeSigmaLimit() {
        return onePointGreaterThanThreeSigmaFromCL();
    }

    function twoConsecutivePointsAboveTwoSigmaLimit() {
        return data.map(function (value, index, dataArray) {
            return _xValuesAboveThreshold(value,
                index,
                dataArray,
                1,
                twoSigmaUpperConfidenceLimit,
                2);
        });
    }

    function threeConsecutivePointsAboveOneSigmaLimit() {
        return data.map(function (value, index, dataArray) {
            return _xValuesAboveThreshold(value,
                index,
                dataArray,
                2,
                oneSigmaUpperConfidenceLimit,
                3);
        });
    }

    function sevenConsecutivePointsFallingAboveCL() {
        return data.map(function (value, index, dataArray) {
            return _xValuesAboveThreshold(value,
                    index,
                    dataArray,
                    6,
                    centreConfidenceLimit,
                    7);
        });
    }

    function tenConsecutivePointsFallingBelowCL() {
        return data.map(function (value, index, dataArray) {
            return _xValuesBelowThreshold(value,
                    index,
                    dataArray,
                    9,
                    centreConfidenceLimit,
                    10);
        });
    }

    function fourConsecutivePointsBelowTwoSigmaLowerLimit() {
        return data.map(function (value, index, dataArray) {
            return _xValuesBelowThreshold(value,
                    index,
                    dataArray,
                    3,
                    twoSigmaLowerConfidenceLimit,
                    4);
        });
    }

    function sixConsecutivePointsBelowOneSigmaLowerLimit() {
        return data.map(function (value, index, dataArray) {
            return _xValuesBelowThreshold(value,
                    index,
                    dataArray,
                    5,
                    oneSigmaLowerConfidenceLimit,
                    6);
        });
    }
    // ************************************************************************
    // ****************************************
    // NELSON CONTROL LIMIT RULES
    // https://en.wikipedia.org/wiki/Nelson_rules
    // ************************************************************************

    // RULE 3
    function sixPointsInARowContinuallyIncresingOrDecresing() {
        return data.map(function (value, index, dataArray) {
            if (index >= 5) {

                // is the previous value less than or greater than the current value?
                var checkGreaterThan = false;
                if (dataArray[index - 1] > value) {
                    checkGreaterThan = true;
                } else if (dataArray[index - 1] < value) {
                    checkGreaterThan = false;
                }

                var exit = false;
                var i;
                for (i = 1; i <= 5; i++) {
                    if (exit === false) {
                        if (checkGreaterThan === true) {
                            if (dataArray[index - (i + 1)] <= dataArray[index - i]) {
                                exit = true;
                            }
                        } else if (checkGreaterThan === false) {
                            if (dataArray[index - (i + 1)] >= dataArray[index - i]) {
                                exit = true;
                            }
                        }
                    }
                }

                return (exit === false) ? _formatDisplayValue(value) : undefined;

            } else {
                return undefined;
            }
        });
    }

    // RULE 4
    function fourteenPointsInARowAlternateUpAndDown() {
        return data.map(function (value, index, dataArray) {
            if (index >= 13) {

                // is the previous value less than or greater than the current value?
                var checkGreaterThan = false;
                if (dataArray[index - 1] > value) {
                    checkGreaterThan = false;
                } else if (dataArray[index - 1] < value) {
                    checkGreaterThan = true;
                }

                var exit = false;
                var i;
                for (i = 1; i <= 13; i++) {
                    if (exit === false) {
                        if (checkGreaterThan === true) {
                            if (dataArray[index - (i + 1)] > dataArray[index - i]) {
                                checkGreaterThan = false;
                            } else {
                                exit = true;
                            }
                        } else if (checkGreaterThan === false) {
                            if (dataArray[index - (i + 1)] < dataArray[index - i]) {
                                checkGreaterThan = true;
                            } else {
                                exit = true;
                            }
                        }
                    }
                }

                return (exit === false) ? _formatDisplayValue(value) : undefined;

            } else {
                return undefined;
            }
        });
    }

    // RULE 7
    function fifteenPointsInARowWithinOneSigmaLimitOnEitherSideOfCentreLine() {
        return data.map(function (value, index, dataArray) {
            if (index >= 14) {

                var exit = false;
                var aboveCentreLine = false;
                var belowCentreLine = false;
                var i;
                for (i = 1; i <= 14; i++) {
                    if (!_valueInsideRange(dataArray[index - i], oneSigmaUpperConfidenceLimit, oneSigmaLowerConfidenceLimit)) {
                        exit = true;
                    }

                    if ((!aboveCentreLine) && (dataArray[index - i] > centreConfidenceLimit)) {
                        aboveCentreLine = true;
                    }

                    if ((!belowCentreLine) && (dataArray[index - i] < centreConfidenceLimit)) {
                        belowCentreLine = true;
                    }
                }

                return ((!exit) && (aboveCentreLine) && (belowCentreLine)) ? _formatDisplayValue(value) : undefined;

            } else {
                return undefined;
            }
        });
    }

    // RULE 8
    function eightPointsInARowOutsideOneSigmaOfCentreLineAndPointsAreBothSideOfCentreLine() {
        return data.map(function (value, index, dataArray) {
            if (index >= 7) {

                var exit = false;
                var aboveCentreLine = false;
                var belowCentreLine = false;
                var i;
                for (i = 1; i <= 7; i++) {
                    if (!_valueOutsideRange(dataArray[index - i], oneSigmaUpperConfidenceLimit, oneSigmaLowerConfidenceLimit)) {
                        exit = true;
                    }

                    if ((!aboveCentreLine) && (dataArray[index - i] > centreConfidenceLimit)) {
                        aboveCentreLine = true;
                    }

                    if ((!belowCentreLine) && (dataArray[index - i] < centreConfidenceLimit)) {
                        belowCentreLine = true;
                    }
                }

                return ((!exit) && (aboveCentreLine) && (belowCentreLine)) ? _formatDisplayValue(value) : undefined;

            } else {
                return undefined;
            }
        });
    }
    // ************************************************************************

    // ************************************************************************
    // PRIVATE FUNCTIONS
    // ************************************************************************
    function _valueOutsideRange(value, upperThreshold, lowerThreshold) {
        return ((value > upperThreshold) || (value < lowerThreshold));
    }

    function _valueInsideRange(value, upperThreshold, lowerThreshold) {
        return ((value <= upperThreshold) && (value >= lowerThreshold));
    }

    function xValuesOutsideThresholdRange(value, currentIndex, dataArray, offsetLimit, lowerThresholdValue, upperThresholdValue, returnThreshold) {
        if (currentIndex >= offsetLimit) {
            var counter = 0;
            var i;
            for (i = 0; i <= offsetLimit; i++) {
                if ((dataArray[currentIndex - i] > upperThresholdValue) || (dataArray[currentIndex - i] < lowerThresholdValue)) {
                    counter = counter + 1;
                }
            }
            return (counter >= returnThreshold) ? formatDisplayValue(value) : undefined;

        }
        else {
            return undefined;
        }
    }

    function _xValuesAboveThreshold(value, currentIndex, dataArray, offsetLimit, upperThresholdValue, returnThreshold) {
        if (currentIndex >= offsetLimit) {
            var counter = 0;
            var i;
            for (i = 0; i <= offsetLimit; i++) {
                if (dataArray[currentIndex - i] > upperThresholdValue) {
                    counter = counter + 1;
                }
            }

            return (counter >= returnThreshold) ? _formatDisplayValue(value) : undefined;

        } else {
            return undefined;
        }
    }

    function _xValuesBelowThreshold(value, currentIndex, dataArray, offsetLimit, lowerThresholdValue, returnThreshold) {
        if (currentIndex >= offsetLimit) {
            var counter = 0;
            var i;
            for (i = 0; i <= offsetLimit; i++) {
                if (dataArray[currentIndex - i] < lowerThresholdValue) {
                    counter = counter + 1;
                }
            }

            return (counter >= returnThreshold) ? _formatDisplayValue(value) : undefined;

        } else {
            return undefined;
        }
    }

    function _formatDisplayValue(value) {
        return (displayTextForMatch === undefined) ? value : displayTextForMatch;
    }
    // ************************************************************************

    return {
        init: init,
        onePointGreaterThanThreeSigmaFromCL: onePointGreaterThanThreeSigmaFromCL,
        twoOutOfThreeConsecutivePointsOutsideTwoSigmaLimit: twoOutOfThreeConsecutivePointsOutsideTwoSigmaLimit,
        fourOutOfFiveConsecutivePointsOutsideOneSigmaLimit: fourOutOfFiveConsecutivePointsOutsideOneSigmaLimit,
        nineConsecutivePointsOnSameSideOfCL: nineConsecutivePointsOnSameSideOfCL,
        anyPointGreaterThanThreeSigmaLimit: anyPointGreaterThanThreeSigmaLimit,
        twoConsecutivePointsAboveTwoSigmaLimit: twoConsecutivePointsAboveTwoSigmaLimit,
        threeConsecutivePointsAboveOneSigmaLimit: threeConsecutivePointsAboveOneSigmaLimit,
        sevenConsecutivePointsFallingAboveCL: sevenConsecutivePointsFallingAboveCL,
        tenConsecutivePointsFallingBelowCL: tenConsecutivePointsFallingBelowCL,
        fourConsecutivePointsBelowTwoSigmaLowerLimit: fourConsecutivePointsBelowTwoSigmaLowerLimit,
        sixConsecutivePointsBelowOneSigmaLowerLimit: sixConsecutivePointsBelowOneSigmaLowerLimit,
        sixPointsInARowContinuallyIncresingOrDecresing: sixPointsInARowContinuallyIncresingOrDecresing,
        fourteenPointsInARowAlternateUpAndDown: fourteenPointsInARowAlternateUpAndDown,
        fifteenPointsInARowWithinOneSigmaLimitOnEitherSideOfCentreLine: fifteenPointsInARowWithinOneSigmaLimitOnEitherSideOfCentreLine,
        eightPointsInARowOutsideOneSigmaOfCentreLineAndPointsAreBothSideOfCentreLine: eightPointsInARowOutsideOneSigmaOfCentreLineAndPointsAreBothSideOfCentreLine,
        LCL: function() {
            return lowerConfidenceLimit;
        },
        UCL: function() {
            return upperConfidenceLimit;
        },
        twoSigmaLCL: function() {
            return twoSigmaLowerConfidenceLimit;
        },
        twoSigmaUCL: function() {
            return twoSigmaUpperConfidenceLimit;
        },
        oneSigmaUCL: function() {
            return oneSigmaUpperConfidenceLimit;
        },
        oneSigmaLCL: function() {
            return oneSigmaLowerConfidenceLimit;
        },
        centreCL: function() {
            return centreConfidenceLimit;
        }
    };
});