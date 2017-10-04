define(["require", "exports", "../math", "chai", "mocha"], function (require, exports, MathHelper, chai_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('average', function () {
        it('returns 3 when given [1,2,3,4,5]', function () {
            var data = [1, 2, 3, 4, 5];
            chai_1.expect(MathHelper.average(data)).to.equal(3);
        });
    });
});
//# sourceMappingURL=math.spec.js.map