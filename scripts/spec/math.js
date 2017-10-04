define(["require", "exports", "../ts/math"], function (require, exports, MathHelper) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('average', function () {
        it('returns 3 when given [1,2,3,4,5]', function () {
            var data = [1, 2, 3, 4, 5];
            expect(MathHelper.average(data)).toEqual(3);
        });
    });
});
//# sourceMappingURL=math.js.map