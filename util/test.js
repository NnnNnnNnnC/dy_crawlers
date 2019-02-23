"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_util_1 = require("./array_util");
let a = [
    {
        a: 1,
        b: 2,
        c: 3,
    },
    {
        a: 1,
        b: 1,
        c: 1,
    },
    {
        a: 2,
        b: 2,
        c: 2,
    },
];
let b = [
    {
        a: 1,
        b: 3,
        c: 5,
    },
    {
        a: 1,
        b: 1,
        c: 1,
    },
    {
        a: 2,
        b: 4,
        c: 25,
    },
];
let c = {
    a: 2,
    b: 4,
    c: 25,
};
console.log(array_util_1.array_util.arr_0(a, JSON.stringify(c)));
//# sourceMappingURL=test.js.map