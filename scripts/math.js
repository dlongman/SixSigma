define(["require", "exports"], function (require, exports) {
    "use strict";
    var MathHelper = (function () {
        function MathHelper() {
        }
        MathHelper.meanVariance = function (values) {
            var variances = values.map(function (value, index, data) {
                if (index < data.length - 1) {
                    return Math.abs(value - data[index + 1]);
                }
                else {
                    return Math.abs(value);
                }
            });
            return this.average(variances);
        };
        MathHelper.standardDeviation = function (values) {
            var avg = this.average(values);
            var squareDiffs = values.map(function (value) {
                var diff = value - avg;
                var sqrDiff = diff * diff;
                return sqrDiff;
            });
            var avgSquareDiff = this.average(squareDiffs);
            var stdDev = Math.sqrt(avgSquareDiff);
            return stdDev;
        };
        MathHelper.average = function (data) {
            var sum = data.reduce(function (sum, value) {
                return sum + value;
            }, 0);
            var avg = sum / data.length;
            return avg;
        };
        MathHelper.min = function (data) {
            var minVal = data.reduce(function (minVal, value) {
                return (value < minVal) ? value : minVal;
            });
            return minVal;
        };
        MathHelper.max = function (data) {
            var maxVal = data.reduce(function (maxVal, value) {
                return ((value > maxVal) ? value : maxVal);
            });
            return maxVal;
        };
        MathHelper.movingAverage = function (data, period) {
            return this._movingFunction(data, period, this.average);
        };
        MathHelper._movingFunction = function (data, period, func) {
            var returnValue = [];
            if (period === undefined) {
                period = 5;
            }
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