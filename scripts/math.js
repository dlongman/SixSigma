/**
 * Collection of various helpful mathmatical functions
**/
define([], function () {

    "use strict";

    // calculates the mean variance of the supplied dataset
    function meanVariance(values) {
        // calculate the variance between the data points
        var variances = values.map(function (value, index, data) {
            if (index < data.length - 1) {
                return Math.abs(value - data[index + 1]);
            } else {
                return Math.abs(value);
            }
        });
        // return the average of the variances
        return average(variances);
    }

    // calculates the standard deviation of the supplied dataset
    function standardDeviation(values) {
        var avg = average(values);

        var squareDiffs = values.map(function (value) {
            var diff = value - avg;
            var sqrDiff = diff * diff;
            return sqrDiff;
        });

        var avgSquareDiff = average(squareDiffs);

        var stdDev = Math.sqrt(avgSquareDiff);
        return stdDev;
    }

    // calculates the numerical average of the supplied dataset
    function average(data) {
        var sum = data.reduce(function (sum, value) {
            return sum + value;
        }, 0);

        var avg = sum / data.length;
        return avg;
    }

    // returns the smallest value in the supplied dataset
    function min(data) {
        var minVal = data.reduce(function (minVal, value) {
            return (value < minVal) ? value : minVal;
        });

        return minVal;
    }

    // returns the largest value in the supplied dataset
    function max(data) {
        var maxVal = data.reduce(function (maxVal, value) {
            return ((value > maxVal) ? value : maxVal);
        });

        return maxVal;
    }

    // calculates a moving average on the numerical dataset
    function movingAverage(data, period) {

        return _movingFunction(data, period, average);
    }

    // executes the supplied function on the dataset only including the last X values
    function _movingFunction(data, period, func) {

        var returnValue = [];

        if (period === undefined) {
            period = 5;
        }

        // loop through data array and calculate the average for each value
        // including the past X values, where X = period
        var index;
        var lowIndex;
        var highIndex;
        var tempData;
        for (index = 0; index < data.length; index += 1) {
            // if index is less than period add undefined
            if (index < (period - 1)) {
                returnValue[index] = undefined;
            } else {
                lowIndex = (index + 1) - period;
                highIndex = index + 1;
                tempData = data.slice(lowIndex, highIndex);
                returnValue[index] = func(tempData);
            }
        }

        return returnValue;
    }

    return {
        meanVariance: meanVariance,
        standardDeviation: standardDeviation,
        average: average,
        min: min,
        max: max,
        movingAverage: movingAverage
    };
});