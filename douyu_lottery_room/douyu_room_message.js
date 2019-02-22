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
/**
 * 用于访问斗鱼API获取斗鱼直播间主播信息
 */
const axios_1 = require("axios");
class douyu_room_message {
    constructor() {
    }
    static main(url_list) {
        //const fn=new douyu_room_message();
        //fn.room_lottery_message(url_list)
    }
    static room_lottery_message(url_list) {
        const api = 'https://www.douyu.com/member/lottery/activity_info';
        return url_list.map((url) => __awaiter(this, void 0, void 0, function* () {
            let message = yield axios_1.default.get(`${api}?room_id=${url}`);
            let data = message.data;
            return {
                name: data.data.prize_name,
                room_id: data.data.room_id
            };
        }));
    }
    sizer_message_lottery(obj) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.douyu_room_message = douyu_room_message;
//# sourceMappingURL=douyu_room_message.js.map