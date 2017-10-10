declare module "SixSigma" {
    export class SixSigma {
        constructor(values: number[], allowNegativeValues: boolean);
        
        data: number[];
        displayTextForMatch: string;
        lowerConfidenceLimit: number;
        upperConfidenceLimit: number;
        twoSigmaLowerConfidenceLimit: number;
        twoSigmaUpperConfidenceLimit: number;
        oneSigmaUpperConfidenceLimit: number;
        oneSigmaLowerConfidenceLimit: number;
        centreConfidenceLimit: number;
    
        public onePointGreaterThanThreeSigmaFromCL(): any[];
        public twoOutOfThreeConsecutivePointsOutsideTwoSigmaLimit(): any[];
        public fourOutOfFiveConsecutivePointsOutsideOneSigmaLimit(): any[];
        public nineConsecutivePointsOnSameSideOfCL(): any[];
        public anyPointGreaterThanThreeSigmaLimit(): any[];
        public twoConsecutivePointsAboveTwoSigmaLimit(): any[];
        public threeConsecutivePointsAboveOneSigmaLimit(): any[];
        public sevenConsecutivePointsFallingAboveCL(): any[];
        public tenConsecutivePointsFallingBelowCL(): any[];
        public fourConsecutivePointsBelowTwoSigmaLowerLimit(): any[];
        public sixConsecutivePointsBelowOneSigmaLowerLimit(): any[];
        public sixPointsInARowContinuallyIncresingOrDecresing(): any[];
        public fourteenPointsInARowAlternateUpAndDown(): any[];
        public fifteenPointsInARowWithinOneSigmaLimitOnEitherSideOfCentreLine(): any[];
        public eightPointsInARowOutsideOneSigmaOfCentreLineAndPointsAreBothSideOfCentreLine(): any[];
    }
}