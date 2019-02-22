"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class array_util {
    //数组去重
    static remove_duplication(arr) {
        return Array.from(new Set(arr));
    }
    //字符串数组内容转换大小写
    static arr_toggle_case(arr, toggle) {
        return __awaiter(this, void 0, void 0, function* () {
            let map;
            if (toggle === true) {
                map = arr.map((str) => {
                    return str.toLowerCase();
                });
            }
            else {
                map = arr.map((str) => {
                    return str.toUpperCase();
                });
            }
            return map;
        });
    }
    //两数组去重复
    static merge_array(index, refer) {
        return __awaiter(this, void 0, void 0, function* () {
            return index.filter(str => {
                return refer.includes(str) === false;
            });
        });
    }
}
exports.array_util = array_util;
//# sourceMappingURL=array_util.js.map