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
 * 获取正在抽奖房间的URL
 */
const axios_1 = require("axios");
class Directory_traversal_room {
    static main() {
        return __awaiter(this, void 0, void 0, function* () {
            let pgcnt = 2;
            for (let page = 1; page < pgcnt; page++) {
                let message = yield this.get_room_list(page);
                pgcnt = message.data.pgcnt;
                let lottery_room = this.get_lottery_room(message.data.rl);
                let room_number = this.lottery_room_number(lottery_room);
                process.send(room_number);
            }
            process.send(false);
            setInterval(() => {
                return this.main();
            }, 10000);
        });
    }
    //单次访问URL获取JSON信息
    static get_room_list(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const directory_all = 'https://www.douyu.com/gapi/rkc/directory/0_0';
            let response = yield axios_1.default.get(`${directory_all}/${page}`);
            return response.data;
        });
    }
    //分析是否存在抽奖行为
    static lottery_progress(room_obj) {
        let lucky_draw_icon = 'https://sta-op.douyucdn.cn/dy-listicon/web-lottery-v3.png';
        let icon_arr = room_obj.icv1;
        for (let i = 0; i < icon_arr.length; i++) {
            if (icon_arr[i].length != 0) {
                for (let k in icon_arr[i]) {
                    for (let t in icon_arr[i][k]) {
                        if (icon_arr[i][k][t] == lucky_draw_icon) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    //遍历room_list进行匹配
    static get_lottery_room(room_list) {
        return room_list.filter((room) => {
            return this.lottery_progress(room);
        });
    }
    //返回正在抽奖房间的房间号
    static lottery_room_number(lottery_room) {
        return lottery_room.map((obj) => {
            return obj.rid;
        });
    }
}
exports.Directory_traversal_room = Directory_traversal_room;
Directory_traversal_room.main();
//# sourceMappingURL=Directory_traversal_room.js.map