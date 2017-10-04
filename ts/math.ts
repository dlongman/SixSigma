class MathHelper {

    // calculates the mean variance of the supplied dataset
    public static meanVariance(values : number[]) : number {
        // calculate the variance between the data points
        var variances = values.map(function (value, index, data) {
            if (index < data.length - 1) {
                return Math.abs(value - data[index + 1]);
            } else {
                return Math.abs(value);
            }
        });
        // return the average of the variances
        return this.average(variances);
    }

    // calculates the standard deviation of the supplied dataset
    public static standardDeviation(values: number[]) : number {
        var avg = this.average(values);

        var squareDiffs = values.map(function (value) {
            var diff = value - avg;
            var sqrDiff = diff * diff;
            return sqrDiff;
        });

        var avgSquareDiff = this.average(squareDiffs);

        var stdDev = Math.sqrt(avgSquareDiff);
        return stdDev;
    }

    // calculates the numerical average of the supplied dataset
    public static average(data: number[]) : number {
        var sum = data.reduce(function (sum, value) {
            return sum + value;
        }, 0);

        var avg = sum / data.length;
        return avg;
    }

    // returns the smallest value in the supplied dataset
    public static min(data: number[]) : number {
        var minVal = data.reduce(function (minVal, value) {
            return (value < minVal) ? value : minVal;
        });

        return minVal;
    }

    // returns the largest value in the supplied dataset
    public static max(data: number[]) : number {
        var maxVal = data.reduce(function (maxVal, value) {
            return ((value > maxVal) ? value : maxVal);
        });

        return maxVal;
    }

    // calculates a moving average on the numerical dataset
    public static movingAverage(data: number[], period: number) : number[] {

        return this._movingFunction(data, period, this.average);
    }

    // executes the supplied function on the dataset only including the last X values
    private static _movingFunction(data: number[], period: number, func: Function) : number[] {

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
}
export = MathHelper;