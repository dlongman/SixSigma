import SixSigma = require("../sixsigma");
import { expect } from 'chai';
import 'mocha';

describe('Check SixSigma module function ', function () {

    var testDataset: number[];
    var expectedData: any[];
    var sixsigma: SixSigma;
    beforeEach(() => {
        testDataset = [0, 0, 1, 20, 26, 18, 2, 10, 37, 13, 16, 40, 15, 29, 0, 8, 0, 20, 13, 31, 21, 36, 13, 34, 20, 37, 0, 49.5, 38, 16, 10, 34, 29, 25, 27, 29, 25, 22, 42, 35, 0, 18, 27, 26, 33, 34, 36, 32, 36, 29, 18, 34, 28, 21, 19, 21, 16, 21, 22, 35, 27, 16, 26, 21];
        expectedData = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
        sixsigma = new SixSigma(testDataset,false);
    })

    describe("properties ", () => {

        it('data returns testDataset when given testDataset', () => {
            expect(sixsigma.data).to.deep.equal(testDataset);
        });

        it('centreConfidenceLimit returns 22.4609375 when given testDataset', () => {
            expect(sixsigma.centreConfidenceLimit).to.equal(22.4609375);
        });

        it('displayTextForMatch returns * when using default constructor', () => {
            expect(sixsigma.displayTextForMatch).to.equal("*");
        });
        
        it('lowerConfidenceLimit returns 0 when given testDataset and ignore negative values is set', () => {
            expect(sixsigma.lowerConfidenceLimit).to.equal(0);
        });
        
        it('upperConfidenceLimit returns 54.588750000000005 when given testDataset', () => {
            expect(sixsigma.upperConfidenceLimit).to.equal(54.588750000000005);
        });

        it('twoSigmaLowerConfidenceLimit returns 1.0826562499999994 when given testDataset and ignore negative values is set', () => {
            expect(sixsigma.twoSigmaLowerConfidenceLimit).to.equal(1.0826562499999994);
        });

        it('twoSigmaUpperConfidenceLimit returns 43.83921875 when given testDataset', () => {
            expect(sixsigma.twoSigmaUpperConfidenceLimit).to.equal(43.83921875);
        });

        it('oneSigmaUpperConfidenceLimit returns 33.210468750000004 when given testDataset', () => {
            expect(sixsigma.oneSigmaUpperConfidenceLimit).to.equal(33.210468750000004);
        });

        it('oneSigmaLowerConfidenceLimit returns 11.71140625 when given testDataset and ignore negative values is set', () => {
            expect(sixsigma.oneSigmaLowerConfidenceLimit).to.equal(11.71140625);
        });

        it('centreConfidenceLimit returns 22.4609375 when given testDataset', () => {
            expect(sixsigma.centreConfidenceLimit).to.equal(22.4609375);
        });

    });

    describe("methods ", () => {
        
        it("onePointGreaterThanThreeSigmaFromCL highlights no points with testDataset ", () => {
            expect(sixsigma.onePointGreaterThanThreeSigmaFromCL()).to.deep.equal(expectedData);
        });
        
        it("twoOutOfThreeConsecutivePointsOutsideTwoSigmaLimit highlights 3 points with testDataset ", () => {
            expectedData = [undefined, undefined, "*", "*", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "*", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
            expect(sixsigma.twoOutOfThreeConsecutivePointsOutsideTwoSigmaLimit()).to.deep.equal(expectedData);
        });
        
        it("fourOutOfFiveConsecutivePointsOutsideOneSigmaLimit highlights no points with testDataset ", () => {
            expect(sixsigma.fourOutOfFiveConsecutivePointsOutsideOneSigmaLimit()).to.deep.equal(expectedData);
        });
        
        it("nineConsecutivePointsOnSameSideOfCL highlights no points with testDataset ", () => {
            expect(sixsigma.nineConsecutivePointsOnSameSideOfCL()).to.deep.equal(expectedData);
        });
        
        it("anyPointGreaterThanThreeSigmaLimit highlights no points with testDataset ", () => {
            expect(sixsigma.anyPointGreaterThanThreeSigmaLimit()).to.deep.equal(expectedData);
        });
        
        it("twoConsecutivePointsAboveTwoSigmaLimit highlights no points with testDataset ", () => {
            expect(sixsigma.twoConsecutivePointsAboveTwoSigmaLimit()).to.deep.equal(expectedData);
        });
        
        it("threeConsecutivePointsAboveOneSigmaLimit highlights no points with testDataset ", () => {
            expect(sixsigma.threeConsecutivePointsAboveOneSigmaLimit()).to.deep.equal(expectedData);
        });
        
        it("sevenConsecutivePointsFallingAboveCL highlights 2 points with testDataset ", () => {
            expectedData = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "*", "*", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
            expect(sixsigma.sevenConsecutivePointsFallingAboveCL()).to.deep.equal(expectedData);
        });
        
        it("tenConsecutivePointsFallingBelowCL highlights no points with testDataset ", () => {
            expect(sixsigma.tenConsecutivePointsFallingBelowCL()).to.deep.equal(expectedData);
        });
        
        it("fourConsecutivePointsBelowTwoSigmaLowerLimit highlights no points with testDataset ", () => {
            expect(sixsigma.fourConsecutivePointsBelowTwoSigmaLowerLimit()).to.deep.equal(expectedData);
        });
        
        it("sixConsecutivePointsBelowOneSigmaLowerLimit highlights no points with testDataset ", () => {
            expect(sixsigma.sixConsecutivePointsBelowOneSigmaLowerLimit()).to.deep.equal(expectedData);
        });
        
        it("sixPointsInARowContinuallyIncresingOrDecresing highlights no points with testDataset ", () => {
            expect(sixsigma.sixPointsInARowContinuallyIncresingOrDecresing()).to.deep.equal(expectedData);
        });
        
        it("fourteenPointsInARowAlternateUpAndDown highlights 5 points with testDataset ", () => {
            expectedData = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "*", "*", "*", "*", "*", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
            expect(sixsigma.fourteenPointsInARowAlternateUpAndDown()).to.deep.equal(expectedData);
        });
        
        it("fifteenPointsInARowWithinOneSigmaLimitOnEitherSideOfCentreLine highlights no points with testDataset ", () => {
            expect(sixsigma.fifteenPointsInARowWithinOneSigmaLimitOnEitherSideOfCentreLine()).to.deep.equal(expectedData);
        });

        it("eightPointsInARowOutsideOneSigmaOfCentreLineAndPointsAreBothSideOfCentreLine highlights no points with testDataset ", () => {
            expect(sixsigma.eightPointsInARowOutsideOneSigmaOfCentreLineAndPointsAreBothSideOfCentreLine()).to.deep.equal(expectedData);
        });
        

    });
});