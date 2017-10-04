import MathHelper = require("../math");
import { expect } from 'chai';
import 'mocha';

describe('average', function () {
    it('returns 3 when given [1,2,3,4,5]', function () {
        var data = [1, 2, 3, 4, 5];
        expect(MathHelper.average(data)).to.equal(3);
    });
});