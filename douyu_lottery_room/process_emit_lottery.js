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
const douyu_room_message_1 = require("./douyu_room_message");
const cp = require('child_process');
const path = require('path');
const Parse = require('parse/node');
Parse.initialize("com.node.douyu_crawlers");
Parse.serverURL = 'http://localhost:1337/parse';
const lottery_url_file = path.join(__dirname, 'Directory_traversal_room.js');
const lottery_url = cp.fork(lottery_url_file);
class process_emit_lottery {
    constructor() {
        this.arr = [];
    }
    static main() {
        const fn = new process_emit_lottery();
        fn.get_lottery_url();
    }
    get_lottery_url() {
        lottery_url.on('message', (msg) => __awaiter(this, void 0, void 0, function* () {
            let data = douyu_room_message_1.douyu_room_message.room_lottery_message(msg);
            for (let i = 0; i < data.length; i++) {
                this.save_lottery_message(this.arr).then().catch();
            }
        }));
    }
    //保存抽奖房间数据
    save_lottery_message(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const lottery_room = Parse.Object.extend("lottery_room");
            const lottery = new lottery_room();
            for (let i in data) {
                for (let k in data[i]) {
                    lottery.set(k, data[i][k]);
                }
            }
            return lottery.save();
        });
    }
    //抽奖策略 抽奖号码对比移除同样的抽奖room_list activity_id 返回目标数组不存在的
    lottery_activity_id(index, refer) {
        let a = index.filter(msg => {
            if (msg.activity_id === refer.activity_id) {
                return false;
            }
            else {
                return true;
            }
        });
        a.push(refer);
    }
}
process_emit_lottery.main();
//# sourceMappingURL=process_emit_lottery.js.map