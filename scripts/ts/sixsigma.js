define(["require", "exports", "./math"], function (require, exports, MathHelper) {
    "use strict";
    var SixSigma = (function () {
        function SixSigma(values, allowNegativeValues) {
            this.displayTextForMatch = "*";
            this.data = values;
            this.centreConfidenceLimit = MathHelper.average(values);
            var meanVariance = MathHelper.meanVariance(values);
            this.lowerConfidenceLimit = this.centreConfidenceLimit - (meanVariance * 2.66);
            this.upperConfidenceLimit = this.centreConfidenceLimit + (meanVariance * 2.66);
            this.twoSigmaLowerConfidenceLimit = this.centreConfidenceLimit - (meanVariance * 1.77);
            this.twoSigmaUpperConfidenceLimit = this.centreConfidenceLimit + (meanVariance * 1.77);
            this.oneSigmaLowerConfidenceLimit = this.centreConfidenceLimit - (meanVariance * 0.89);
            this.oneSigmaUpperConfidenceLimit = this.centreConfidenceLimit + (meanVariance * 0.89);
            if (allowNegativeValues === false) {
                if (this.lowerConfidenceLimit < 0.0) {
                    this.lowerConfidenceLimit = 0;
                }
                if (this.twoSigmaLowerConfidenceLimit < 0.0) {
                    this.twoSigmaLowerConfidenceLimit = 0;
                }
                if (this.oneSigmaLowerConfidenceLimit < 0.0) {
                    this.oneSigmaLowerConfidenceLimit = 0;
                }
            }
        }
        SixSigma.prototype.onePointGreaterThanThreeSigmaFromCL = function () {
            return this.data.map(function (value) {
                return (value > this.upperConfidenceLimit) ? this._formatDisplayValue(value) : undefined;
            }.bind(this));
        };
        SixSigma.prototype.twoOutOfThreeConsecutivePointsOutsideTwoSigmaLimit = function () {
            return this.data.map(function (value, index, dataArray) {
                var aboveThreshold = this._xValuesAboveThreshold(value, index, dataArray, 2, this.twoSigmaUpperConfidenceLimit, 2);
                var belowThreshold = this._xValuesBelowThreshold(value, index, dataArray, 2, this.twoSigmaLowerConfidenceLimit, 2);
                return (aboveThreshold !== undefined) ? aboveThreshold : belowThreshold;
            }.bind(this));
        };
        SixSigma.prototype.fourOutOfFiveConsecutivePointsOutsideOneSigmaLimit = function () {
            return this.data.map(function (value, index, dataArray) {
                var aboveThreshold = this._xValuesAboveThreshold(value, index, dataArray, 4, this.oneSigmaUpperConfidenceLimit, 4);
                var belowThreshold = this._xValuesBelowThreshold(value, index, dataArray, 4, this.oneSigmaLowerConfidenceLimit, 4);
                return (aboveThreshold !== undefined) ? aboveThreshold : belowThreshold;
            }.bind(this));
        };
        SixSigma.prototype.nineConsecutivePointsOnSameSideOfCL = function () {
            return this.data.map(function (value, index, dataArray) {
                var aboveClCounter = 0;
                var belowClCounter = 0;
                if (index >= 8) {
                    var i;
                    for (i = 0; i <= 8; i++) {
                        if (dataArray[index - i] > this.centreConfidenceLimit) {
                            aboveClCounter = aboveClCounter + 1;
                        }
                        else if (dataArray[index - i] < this.centreConfidenceLimit) {
                            belowClCounter = belowClCounter + 1;
                        }
                    }
                    return ((belowClCounter === 9) || (aboveClCounter === 9)) ? this._formatDisplayValue(value) : undefined;
                }
                else {
                    return undefined;
                }
            }.bind(this));
        };
        SixSigma.prototype.anyPointGreaterThanThreeSigmaLimit = function () {
            return this.onePointGreaterThanThreeSigmaFromCL();
        };
        SixSigma.prototype.twoConsecutivePointsAboveTwoSigmaLimit = function () {
            return this.data.map(function (value, index, dataArray) {
                return this._xValuesAboveThreshold(value, index, dataArray, 1, this.twoSigmaUpperConfidenceLimit, 2);
            }.bind(this));
        };
        SixSigma.prototype.threeConsecutivePointsAboveOneSigmaLimit = function () {
            return this.data.map(function (value, index, dataArray) {
                return this._xValuesAboveThreshold(value, index, dataArray, 2, this.oneSigmaUpperConfidenceLimit, 3);
            }.bind(this));
        };
        SixSigma.prototype.sevenConsecutivePointsFallingAboveCL = function () {
            return this.data.map(function (value, index, dataArray) {
                return this._xValuesAboveThreshold(value, index, dataArray, 6, this.centreConfidenceLimit, 7);
            }.bind(this));
        };
        SixSigma.prototype.tenConsecutivePointsFallingBelowCL = function () {
            return this.data.map(function (value, index, dataArray) {
                return this._xValuesBelowThreshold(value, index, dataArray, 9, this.centreConfidenceLimit, 10);
            }.bind(this));
        };
        SixSigma.prototype.fourConsecutivePointsBelowTwoSigmaLowerLimit = function () {
            return this.data.map(function (value, index, dataArray) {
                return this._xValuesBelowThreshold(value, index, dataArray, 3, this.twoSigmaLowerConfidenceLimit, 4);
            }.bind(this));
        };
        SixSigma.prototype.sixConsecutivePointsBelowOneSigmaLowerLimit = function () {
            return this.data.map(function (value, index, dataArray) {
                return this._xValuesBelowThreshold(value, index, dataArray, 5, this.oneSigmaLowerConfidenceLimit, 6);
            }.bind(this));
        };
        SixSigma.prototype.sixPointsInARowContinuallyIncresingOrDecresing = function () {
            return this.data.map(function (value, index, dataArray) {
                if (index >= 5) {
                    var checkGreaterThan = false;
                    if (dataArray[index - 1] > value) {
                        checkGreaterThan = true;
                    }
                    else if (dataArray[index - 1] < value) {
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
                            }
                            else if (checkGreaterThan === false) {
                                if (dataArray[index - (i + 1)] >= dataArray[index - i]) {
                                    exit = true;
                                }
                            }
                        }
                    }
                    return (exit === false) ? this._formatDisplayValue(value) : undefined;
                }
                else {
                    return undefined;
                }
            }.bind(this));
        };
        SixSigma.prototype.fourteenPointsInARowAlternateUpAndDown = function () {
            return this.data.map(function (value, index, dataArray) {
                if (index >= 13) {
                    var checkGreaterThan = false;
                    if (dataArray[index - 1] > value) {
                        checkGreaterThan = false;
                    }
                    else if (dataArray[index - 1] < value) {
                        checkGreaterThan = true;
                    }
                    var exit = false;
                    var i;
                    for (i = 1; i <= 13; i++) {
                        if (exit === false) {
                            if (checkGreaterThan === true) {
                                if (dataArray[index - (i + 1)] > dataArray[index - i]) {
                                    checkGreaterThan = false;
                                }
                                else {
                                    exit = true;
                                }
                            }
                            else if (checkGreaterThan === false) {
                                if (dataArray[index - (i + 1)] < dataArray[index - i]) {
                                    checkGreaterThan = true;
                                }
                                else {
                                    exit = true;
                                }
                            }
                        }
                    }
                    return (exit === false) ? this._formatDisplayValue(value) : undefined;
                }
                else {
                    return undefined;
                }
            }.bind(this));
        };
        SixSigma.prototype.fifteenPointsInARowWithinOneSigmaLimitOnEitherSideOfCentreLine = function () {
            return this.data.map(function (value, index, dataArray) {
                if (index >= 14) {
                    var exit = false;
                    var aboveCentreLine = false;
                    var belowCentreLine = false;
                    var i;
                    for (i = 1; i <= 14; i++) {
                        if (!this._valueInsideRange(dataArray[index - i], this.oneSigmaUpperConfidenceLimit, this.oneSigmaLowerConfidenceLimit)) {
                            exit = true;
                        }
                        if ((!aboveCentreLine) && (dataArray[index - i] > this.centreConfidenceLimit)) {
                            aboveCentreLine = true;
                        }
                        if ((!belowCentreLine) && (dataArray[index - i] < this.centreConfidenceLimit)) {
                            belowCentreLine = true;
                        }
                    }
                    return ((!exit) && (aboveCentreLine) && (belowCentreLine)) ? this._formatDisplayValue(value) : undefined;
                }
                else {
                    return undefined;
                }
            }.bind(this));
        };
        SixSigma.prototype.eightPointsInARowOutsideOneSigmaOfCentreLineAndPointsAreBothSideOfCentreLine = function () {
            return this.data.map(function (value, index, dataArray) {
                if (index >= 7) {
                    var exit = false;
                    var aboveCentreLine = false;
                    var belowCentreLine = false;
                    var i;
                    for (i = 1; i <= 7; i++) {
                        if (!this._valueOutsideRange(dataArray[index - i], this.oneSigmaUpperConfidenceLimit, this.oneSigmaLowerConfidenceLimit)) {
                            exit = true;
                        }
                        if ((!aboveCentreLine) && (dataArray[index - i] > this.centreConfidenceLimit)) {
                            aboveCentreLine = true;
                        }
                        if ((!belowCentreLine) && (dataArray[index - i] < this.centreConfidenceLimit)) {
                            belowCentreLine = true;
                        }
                    }
                    return ((!exit) && (aboveCentreLine) && (belowCentreLine)) ? this._formatDisplayValue(value) : undefined;
                }
                else {
                    return undefined;
                }
            }.bind(this));
        };
        SixSigma.prototype._valueOutsideRange = function (value, upperThreshold, lowerThreshold) {
            return ((value > upperThreshold) || (value < lowerThreshold));
        };
        SixSigma.prototype._valueInsideRange = function (value, upperThreshold, lowerThreshold) {
            return ((value <= upperThreshold) && (value >= lowerThreshold));
        };
        SixSigma.prototype.xValuesOutsideThresholdRange = function (value, currentIndex, dataArray, offsetLimit, lowerThresholdValue, upperThresholdValue, returnThreshold) {
            if (currentIndex >= offsetLimit) {
                var counter = 0;
                var i;
                for (i = 0; i <= offsetLimit; i++) {
                    if ((dataArray[currentIndex - i] > upperThresholdValue) || (dataArray[currentIndex - i] < lowerThresholdValue)) {
                        counter = counter + 1;
                    }
                }
                return (counter >= returnThreshold) ? this._formatDisplayValue(value) : undefined;
            }
            else {
                return undefined;
            }
        };
        SixSigma.prototype._xValuesAboveThreshold = function (value, currentIndex, dataArray, offsetLimit, upperThresholdValue, returnThreshold) {
            if (currentIndex >= offsetLimit) {
                var counter = 0;
                var i;
                for (i = 0; i <= offsetLimit; i++) {
                    if (dataArray[currentIndex - i] > upperThresholdValue) {
                        counter = counter + 1;
                    }
                }
                return (counter >= returnThreshold) ? this._formatDisplayValue(value) : undefined;
            }
            else {
                return undefined;
            }
        };
        SixSigma.prototype._xValuesBelowThreshold = function (value, currentIndex, dataArray, offsetLimit, lowerThresholdValue, returnThreshold) {
            if (currentIndex >= offsetLimit) {
                var counter = 0;
                var i;
                for (i = 0; i <= offsetLimit; i++) {
                    if (dataArray[currentIndex - i] < lowerThresholdValue) {
                        counter = counter + 1;
                    }
                }
                return (counter >= returnThreshold) ? this._formatDisplayValue(value) : undefined;
            }
            else {
                return undefined;
            }
        };
        SixSigma.prototype._formatDisplayValue = function (value) {
            return (this.displayTextForMatch === undefined) ? value : this.displayTextForMatch;
        };
        return SixSigma;
    }());
    return SixSigma;
});
//# sourceMappingURL=sixsigma.js.map