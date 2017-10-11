define(["require", "exports"], function (require, exports) {
    "use strict";
    var MathHelper = (function () {
        function MathHelper() {
        }
        MathHelper.meanVariance = function (data) {
            if (data === undefined) {
                throw new Error("the values parameter must be a number[].");
            }
            var variances = data.map(function (value, index, arr) {
                if (index < arr.length - 1) {
                    return Math.abs(value - arr[index + 1]);
                }
                else {
                    return Math.abs(value);
                }
            });
            return MathHelper.average(variances);
        };
        MathHelper.standardDeviation = function (data) {
            if (data === undefined) {
                throw new Error("the values parameter must be a number[].");
            }
            var avg = MathHelper.average(data);
            var squareDiffs = data.map(function (value) {
                var diff = value - avg;
                var sqrDiff = diff * diff;
                return sqrDiff;
            });
            var avgSquareDiff = MathHelper.average(squareDiffs);
            var stdDev = Math.sqrt(avgSquareDiff);
            return stdDev;
        };
        MathHelper.average = function (data) {
            if (data === undefined) {
                throw new Error("the data parameter must be a number[].");
            }
            var sum = MathHelper.sum(data);
            var avg = sum / data.length;
            return avg;
        };
        MathHelper.sum = function (data) {
            if (data === undefined) {
                throw new Error("the data parameter must be a number[].");
            }
            var sum = data.reduce(function (sum, value) {
                return sum + value;
            }, 0);
            return sum;
        };
        MathHelper.min = function (data) {
            if (data === undefined) {
                throw new Error("the data parameter must be a number[].");
            }
            var minVal = data.reduce(function (minVal, value) {
                return (value < minVal) ? value : minVal;
            });
            return minVal;
        };
        MathHelper.max = function (data) {
            if (data === undefined) {
                throw new Error("the data parameter must be a number[].");
            }
            var maxVal = data.reduce(function (maxVal, value) {
                return ((value > maxVal) ? value : maxVal);
            });
            return maxVal;
        };
        MathHelper.movingAverage = function (data, period) {
            return this.movingFunction(data, period, MathHelper.average);
        };
        MathHelper.movingFunction = function (data, period, func) {
            console.log(func);
            var returnValue = [];
            var index;
            var lowIndex;
            var highIndex;
            var tempData;
            for (index = 0; index < data.length; index += 1) {
                if (index < (period - 1)) {
                    returnValue[index] = undefined;
                }
                else {
                    lowIndex = (index + 1) - period;
                    highIndex = index + 1;
                    tempData = data.slice(lowIndex, highIndex);
                    returnValue[index] = func(tempData);
                }
            }
            return returnValue;
        };
        return MathHelper;
    }());
    return MathHelper;
});
//# sourceMappingURL=math.js.map