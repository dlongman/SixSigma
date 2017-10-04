/// <reference path="../typings/index.d.ts" />

import MathHelper = require("../ts/math");

describe('average', function () {
    it('returns 3 when given [1,2,3,4,5]', function () {
        var data = [1, 2, 3, 4, 5];
        expect(MathHelper.average(data)).toEqual(3);
    });
});