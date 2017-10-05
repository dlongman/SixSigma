import MathHelper = require("../math");
import { expect } from 'chai';
import 'mocha';

describe('Check MathHelper module function ', function () {

    describe("average ", () => {

        it('returns 3 when given [1,2,3,4,5]', () => {
            var data = [1, 2, 3, 4, 5];
            expect(MathHelper.average(data)).to.equal(3);
        });

        it('returns 3 when given [1.0, 2.0, 3.0, 4.0, 5.0]', () => {
            var data = [1.0, 2.0, 3.0, 4.0, 5.0];
            expect(MathHelper.average(data)).to.equal(3);
        });

        it('returns 0.6 when given [-1,-2,3,2,1]', () => {
            var data = [-1, -2, 3, 2, 1];
            expect(MathHelper.average(data)).to.equal(0.6);
        });

        it('returns -3 when given [-1,-2,-3,-4,-5]', () => {
            var data = [-1, -2, -3, -4, -5];
            expect(MathHelper.average(data)).to.equal(-3);
        });

        it('returns 0 when given [0,0,0,0,0]', () => {
            var data = [0, 0, 0, 0, 0];
            expect(MathHelper.average(data)).to.equal(0);
        });

        it('returns an error when given undefined', () => {
            // written like this because the expect().to.throw() syntax does not work when using TS
            try {
                var data;
                MathHelper.average(data);
                expect(false).is.true;
            }
            catch (e) {
                expect(true).is.true;
            }
        });

    });

    describe("standardDeviation ", () => {

        it('returns 1.41 when given [1,2,3,4,5]', () => {
            var data = [1, 2, 3, 4, 5];
            expect(MathHelper.standardDeviation(data).toFixed(2)).to.equal('1.41');
        });

        it('returns 1.41 when given [1.0,2.0,3.0,4.0,5.0]', () => {
            var data = [1.0,2.0,3.0,4.0,5.0];
            expect(MathHelper.standardDeviation(data).toFixed(2)).to.equal('1.41');
        });

        it('returns 1.85 when given [-1,-2,3,2,1]', () => {
            var data = [-1, -2, 3, 2, 1];
            expect(MathHelper.standardDeviation(data).toFixed(2)).to.equal('1.85');
        });

        it('returns 1.41 when given [-1,-2,-3,-4,-5]', () => {
            var data = [-1, -2, -3, -4, -5];
            expect(MathHelper.standardDeviation(data).toFixed(2)).to.equal('1.41');
        });

        it('returns 0 when given [0,0,0,0,0]', () => {
            var data = [0, 0, 0, 0, 0];
            expect(MathHelper.standardDeviation(data).toFixed(2)).to.equal('0.00');
        });

        it('returns an error when given undefined', () => {
            // written like this because the expect().to.throw() syntax does not work when using TS
            try {
                var data;
                MathHelper.standardDeviation(data);
                expect(false).is.true;
            }
            catch (e) {
                expect(true).is.true;
            }
        });

    });

    describe("meanVariance ", () => {
        
        // TODO add some functional tests for this function!!!!

        it('returns an error when given undefined', () => {
            // written like this because the expect().to.throw() syntax does not work when using TS
            try {
                var data;
                MathHelper.meanVariance(data);
                expect(false).is.true;
            }
            catch (e) {
                expect(true).is.true;
            }
        });

    });

    describe("min ", () => {
        
        it('returns 1 when given [1,2,3,4,5]', () => {
            var data = [1, 2, 3, 4, 5];
            expect(MathHelper.min(data)).to.equal(1);
        });

        it('returns 1 when given [1.0,2.0,3.0,4.0,5.0]', () => {
            var data = [1.0,2.0,3.0,4.0,5.0];
            expect(MathHelper.min(data)).to.equal(1);
        });

        it('returns -2 when given [-1,-2,3,2,1]', () => {
            var data = [-1, -2, 3, 2, 1];
            expect(MathHelper.min(data)).to.equal(-2);
        });

        it('returns -5 when given [-1,-2,-3,-4,-5]', () => {
            var data = [-1, -2, -3, -4, -5];
            expect(MathHelper.min(data)).to.equal(-5);
        });

        it('returns 0 when given [0,0,0,0,0]', () => {
            var data = [0, 0, 0, 0, 0];
            expect(MathHelper.min(data)).to.equal(0);
        });

        it('returns an error when given undefined', () => {
            // written like this because the expect().to.throw() syntax does not work when using TS
            try {
                var data;
                MathHelper.min(data);
                expect(false).is.true;
            }
            catch (e) {
                expect(true).is.true;
            }
        });

    });

    describe("max ", () => {
        
        it('returns 5 when given [1,2,3,4,5]', () => {
            var data = [1, 2, 3, 4, 5];
            expect(MathHelper.max(data)).to.equal(5);
        });

        it('returns 5 when given [1.0,2.0,3.0,4.0,5.0]', () => {
            var data = [1.0,2.0,3.0,4.0,5.0];
            expect(MathHelper.max(data)).to.equal(5);
        });

        it('returns 3 when given [-1,-2,3,2,1]', () => {
            var data = [-1, -2, 3, 2, 1];
            expect(MathHelper.max(data)).to.equal(3);
        });

        it('returns -1 when given [-1,-2,-3,-4,-5]', () => {
            var data = [-1, -2, -3, -4, -5];
            expect(MathHelper.max(data)).to.equal(-1);
        });

        it('returns 0 when given [0,0,0,0,0]', () => {
            var data = [0, 0, 0, 0, 0];
            expect(MathHelper.max(data)).to.equal(0);
        });

        it('returns an error when given undefined', () => {
            // written like this because the expect().to.throw() syntax does not work when using TS
            try {
                var data;
                MathHelper.max(data);
                expect(false).is.true;
            }
            catch (e) {
                expect(true).is.true;
            }
        });

    });

    describe("movingAverage ", () => {
        
        it("returns [undefined,undefined,2,3,4] when given [1,2,3,4,5] and a period of 3", () => {
            var data: number[] = [1,2,3,4,5];
            expect(MathHelper.movingAverage(data, 3)).to.deep.equal([undefined, undefined, 2,3,4]);
        });

        it("returns [undefined, undefined, 0, 0, 0] when given [0,0,0,0,0] and a period of 3", () => {
            var data: number[] = [0,0,0,0,0];
            expect(MathHelper.movingAverage(data, 3)).to.deep.equal([undefined, undefined, 0, 0, 0]);
        });

        it("returns [1,2,3,4,5] when given [1,2,3,4,5] and a period of 1", () => {
            var data: number[] = [1,2,3,4,5];
            expect(MathHelper.movingAverage(data, 1)).to.deep.equal([1,2,3,4,5]);
        });

        it('returns an error when given undefined', () => {
            // written like this because the expect().to.throw() syntax does not work when using TS
            try {
                var data;
                MathHelper.movingAverage(data, 3);
                expect(false).is.true;
            }
            catch (e) {
                expect(true).is.true;
            }
        });

    });

});