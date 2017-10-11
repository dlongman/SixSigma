class MathHelper {

    /**
     * Calculates the mean variance of the supplied dataset
     * @param values 
     */
    public static meanVariance(data : number[]) : number {
        
        if (data === undefined) {
            throw new Error("the values parameter must be a number[]."); 
        }
        
        // calculate the variance between the data points
        var variances = data.map(function (value, index, arr) {
            if (index < arr.length - 1) {
                return Math.abs(value - arr[index + 1]);
            } else {
                return Math.abs(value);
            }
        });
        // return the average of the variances
        return MathHelper.average(variances);
    }

    /**
     * Calculates the standard deviation of the supplied dataset
     * @param data the data to compare 
     */
    public static standardDeviation(data: number[]) : number {
        
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
    }

    /**
     * Calculates the numerical average of the supplied dataset
     * @param data the data to compare
     */
    public static average(data: number[]) : number {
        
        if (data === undefined) {
            throw new Error("the data parameter must be a number[]."); 
        }

        var sum: number = MathHelper.sum(data); 

        var avg: number = sum / data.length;
        return avg;
    }

    /**
     * Calculates the total of the supplied dataset
     * @param data the data to compare
     */
    public static sum(data: number[]) : number {
        
        if (data === undefined) {
            throw new Error("the data parameter must be a number[]."); 
        }

        var sum: number = data.reduce(function (sum: number, value: number) {
            return sum + value;
        }, 0);

        return sum;
    }

    /**
     * returns the smallest value in the supplied dataset
     * @param data the data to compare
     */
    public static min(data: number[]) : number {
        
        if (data === undefined) {
            throw new Error("the data parameter must be a number[]."); 
        }

        var minVal = data.reduce(function (minVal, value) {
            return (value < minVal) ? value : minVal;
        });

        return minVal;
    }

    /**
     * returns the largest value in the supplied dataset
     * @param data the data to compare
     */
    public static max(data: number[]) : number {
        
        if (data === undefined) {
            throw new Error("the data parameter must be a number[]."); 
        }

        var maxVal = data.reduce(function (maxVal, value) {
            return ((value > maxVal) ? value : maxVal);
        });

        return maxVal;
    }

    /**
     * Calculates a moving average on the numerical dataset
     */
    public static movingAverage(data: number[], period: number) : number[] {
        return this.movingFunction(data, period, MathHelper.average);
    }

    /**
     * Executes the supplied function on the dataset only including the last X values
     * @param data the data to compare
     * @param period the number of data points to include in each slice
     * @param func the function to apply to each slice of the data
     */
    public static movingFunction(data: number[], period: number, func: Function) : number[] {

        console.log(func);
        var returnValue = [];

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