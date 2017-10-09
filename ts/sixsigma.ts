/// <reference path="./math.ts" />

import MathHelper = require("./math");

class SixSigma {

    data: number[];
    displayTextForMatch: string = "*";
    lowerConfidenceLimit: number;
    upperConfidenceLimit: number;
    twoSigmaLowerConfidenceLimit: number;
    twoSigmaUpperConfidenceLimit: number;
    oneSigmaUpperConfidenceLimit: number;
    oneSigmaLowerConfidenceLimit: number;
    centreConfidenceLimit: number;

    constructor(values: number[], allowNegativeValues: boolean) {
        
        this.data = values;

        this.centreConfidenceLimit = MathHelper.average(values);
        var meanVariance = MathHelper.meanVariance(values);

        this.lowerConfidenceLimit = this.centreConfidenceLimit - (meanVariance * 2.66);
        this.upperConfidenceLimit = this.centreConfidenceLimit + (meanVariance * 2.66);

        this.twoSigmaLowerConfidenceLimit = this.centreConfidenceLimit - (meanVariance * 1.77);
        this.twoSigmaUpperConfidenceLimit = this.centreConfidenceLimit + (meanVariance * 1.77);

        this.oneSigmaLowerConfidenceLimit = this.centreConfidenceLimit - (meanVariance * 0.89);
        this.oneSigmaUpperConfidenceLimit = this.centreConfidenceLimit + (meanVariance * 0.89);

        // if negative values are not expected then floor all the lower confidence limits to zero
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

     // ************************************************************************
    // WESTERN ELECTRIC RULES
    // https://en.wikipedia.org/wiki/Western_Electric_rules
    // ************************************************************************
    // RULE 1
    public onePointGreaterThanThreeSigmaFromCL(): any[] {
        return this.data.map(function (value: number) {
            return (value > this.upperConfidenceLimit) ? this._formatDisplayValue(value) : undefined;
        }.bind(this));
    }

    // RULE 2
    public twoOutOfThreeConsecutivePointsOutsideTwoSigmaLimit(): any[] {
        return this.data.map(function (value: number, index: number, dataArray: number[]) {

            // check whether we get a hit above threshold
            var aboveThreshold = this._xValuesAboveThreshold(value,
                    index,
                    dataArray,
                    2,
                    this.twoSigmaUpperConfidenceLimit,
                    2);

            // check whether we get a hit below threshold
            var belowThreshold = this._xValuesBelowThreshold(value,
                    index,
                    dataArray,
                    2,
                    this.twoSigmaLowerConfidenceLimit,
                    2);

            return (aboveThreshold !== undefined) ? aboveThreshold : belowThreshold;
        }.bind(this));
    }

    // RULE 3
    public fourOutOfFiveConsecutivePointsOutsideOneSigmaLimit(): any[] {
        return this.data.map(function (value: number, index: number, dataArray: number[]) {

            // check whether we get a hit above threshold
            var aboveThreshold = this._xValuesAboveThreshold(value,
                    index,
                    dataArray,
                    4,
                    this.oneSigmaUpperConfidenceLimit,
                    4);

            // check whether we get a hit below threshold
            var belowThreshold = this._xValuesBelowThreshold(value,
                    index,
                    dataArray,
                    4,
                    this.oneSigmaLowerConfidenceLimit,
                    4);

            return (aboveThreshold !== undefined) ? aboveThreshold : belowThreshold;

        }.bind(this));
    }

    // RULE 4
    public nineConsecutivePointsOnSameSideOfCL(): any[] {
        return this.data.map(function (value: number, index: number, dataArray: number[]) {
            var aboveClCounter = 0;
            var belowClCounter = 0;
            if (index >= 8) {
                // check the past 9 values and increment a counter
                // depending if the value is > or < CL value
                var i;
                for (i = 0; i <= 8; i++) {
                    if (dataArray[index - i] > this.centreConfidenceLimit) {
                        aboveClCounter = aboveClCounter + 1;
                    } else if (dataArray[index - i] < this.centreConfidenceLimit) {
                        belowClCounter = belowClCounter + 1;
                    }
                }

                // return the value if either counter is 9
                return ((belowClCounter === 9) || (aboveClCounter === 9)) ? this._formatDisplayValue(value) : undefined;

            } else {
                return undefined;
            }
        }.bind(this));
    }
    // ************************************************************************

    // ************************************************************************
    // WESTERN ELECTRIC ASYMETRIC CONTROL LIMIT RULES
    // https://en.wikipedia.org/wiki/Western_Electric_rules
    // ************************************************************************

    public anyPointGreaterThanThreeSigmaLimit(): any[] {
        return this.onePointGreaterThanThreeSigmaFromCL();
    }

    public twoConsecutivePointsAboveTwoSigmaLimit(): any[] {
        return this.data.map(function (value: number, index: number, dataArray: number[]) {
            return this._xValuesAboveThreshold(value,
                index,
                dataArray,
                1,
                this.twoSigmaUpperConfidenceLimit,
                2);
        }.bind(this));
    }

    public threeConsecutivePointsAboveOneSigmaLimit(): any[] {
        return this.data.map(function (value: number, index: number, dataArray: number[]) {
            return this._xValuesAboveThreshold(value,
                index,
                dataArray,
                2,
                this.oneSigmaUpperConfidenceLimit,
                3);
        }.bind(this));
    }

    public sevenConsecutivePointsFallingAboveCL(): any[] {
        return this.data.map(function (value: number, index: number, dataArray: number[]) {
            return this._xValuesAboveThreshold(value,
                    index,
                    dataArray,
                    6,
                    this.centreConfidenceLimit,
                    7);
        }.bind(this));
    }

    public tenConsecutivePointsFallingBelowCL(): any[] {
        return this.data.map(function (value: number, index: number, dataArray: number[]) {
            return this._xValuesBelowThreshold(value,
                    index,
                    dataArray,
                    9,
                    this.centreConfidenceLimit,
                    10);
        }.bind(this));
    }

    public fourConsecutivePointsBelowTwoSigmaLowerLimit(): any[] {
        return this.data.map(function (value: number, index: number, dataArray: number[]) {
            return this._xValuesBelowThreshold(value,
                    index,
                    dataArray,
                    3,
                    this.twoSigmaLowerConfidenceLimit,
                    4);
        }.bind(this));
    }

    public sixConsecutivePointsBelowOneSigmaLowerLimit(): any[] {
        return this.data.map(function (value: number, index: number, dataArray: number[]) {
            return this._xValuesBelowThreshold(value,
                    index,
                    dataArray,
                    5,
                    this.oneSigmaLowerConfidenceLimit,
                    6);
        }.bind(this));
    }
    // ************************************************************************
    // ****************************************
    // NELSON CONTROL LIMIT RULES
    // https://en.wikipedia.org/wiki/Nelson_rules
    // ************************************************************************

    // RULE 3
    public sixPointsInARowContinuallyIncresingOrDecresing(): any[] {
        return this.data.map(function (value: number, index: number, dataArray: number[]) {
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

                return (exit === false) ? this._formatDisplayValue(value) : undefined;

            } else {
                return undefined;
            }
        }.bind(this));
    }

    // RULE 4
    public fourteenPointsInARowAlternateUpAndDown(): any[] {
        return this.data.map(function (value: number, index: number, dataArray: number[]) {
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

                return (exit === false) ? this._formatDisplayValue(value) : undefined;

            } else {
                return undefined;
            }
        }.bind(this));
    }

    // RULE 7
    public fifteenPointsInARowWithinOneSigmaLimitOnEitherSideOfCentreLine(): any[] {
        return this.data.map(function (value: number, index: number, dataArray: number[]) {
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

            } else {
                return undefined;
            }
        }.bind(this));
    }

    // RULE 8
    public eightPointsInARowOutsideOneSigmaOfCentreLineAndPointsAreBothSideOfCentreLine(): any[] {
        return this.data.map(function (value: number, index: number, dataArray: number[]) {
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

            } else {
                return undefined;
            }
        }.bind(this));
    }
    // ************************************************************************

    // ************************************************************************
    // PRIVATE FUNCTIONS
    // ************************************************************************
    private _valueOutsideRange(value: number, upperThreshold: number, lowerThreshold: number) {
        return ((value > upperThreshold) || (value < lowerThreshold));
    }

    private _valueInsideRange(value: number, upperThreshold: number, lowerThreshold: number) {
        return ((value <= upperThreshold) && (value >= lowerThreshold));
    }

    private xValuesOutsideThresholdRange(value: number, currentIndex: number, dataArray: number[], offsetLimit: number, lowerThresholdValue: number, upperThresholdValue: number, returnThreshold: number) {
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
    }

    private _xValuesAboveThreshold(value: number, currentIndex: number, dataArray: number[], offsetLimit: number, upperThresholdValue: number, returnThreshold: number) {
        if (currentIndex >= offsetLimit) {
            var counter = 0;
            var i;
            for (i = 0; i <= offsetLimit; i++) {
                if (dataArray[currentIndex - i] > upperThresholdValue) {
                    counter = counter + 1;
                }
            }

            return (counter >= returnThreshold) ? this._formatDisplayValue(value) : undefined;

        } else {
            return undefined;
        }
    }

    private _xValuesBelowThreshold(value: number, currentIndex: number, dataArray: number[], offsetLimit: number, lowerThresholdValue: number, returnThreshold: number) {
        if (currentIndex >= offsetLimit) {
            var counter = 0;
            var i;
            for (i = 0; i <= offsetLimit; i++) {
                if (dataArray[currentIndex - i] < lowerThresholdValue) {
                    counter = counter + 1;
                }
            }

            return (counter >= returnThreshold) ? this._formatDisplayValue(value) : undefined;

        } else {
            return undefined;
        }
    }

    private _formatDisplayValue(value: number) {
        return (this.displayTextForMatch === undefined) ? value : this.displayTextForMatch;
    }
}
export = SixSigma;