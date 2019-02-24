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
        this.arr_1 = [];
    }
    static main() {
        return __awaiter(this, void 0, void 0, function* () {
            const fn = new process_emit_lottery();
            yield fn.save_lottery_message();
        });
    }
    //保存获取的抽奖信息
    save_lottery_message() {
        return __awaiter(this, void 0, void 0, function* () {
            lottery_url.on('message', (msg) => __awaiter(this, void 0, void 0, function* () {
                let data = douyu_room_message_1.douyu_room_message.room_lottery_message(msg);
                for (let i in data) {
                    //await this.lottery_activity_id(await data[i])
                    let msg = yield data[i];
                    let query_msg = yield this.query_database_lottery(msg.activity_id);
                    if (query_msg.length === 0) {
                        yield this.save_database_lottery(msg);
                    }
                }
            }));
        });
    }
    //保存抽奖房间数据
    save_database_lottery(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const lottery_room = Parse.Object.extend("lottery_room");
            const lottery = new lottery_room();
            for (let i in data) {
                lottery.set(i, data[i]);
            }
            return lottery.save();
        });
    }
    //查找抽奖房间编号
    query_database_lottery(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const lottery_room = Parse.Object.extend("lottery_room");
            const query = new Parse.Query(lottery_room);
            query.equalTo('activity_id', msg);
            const results = yield query.find();
            return results;
        });
    }
}
process_emit_lottery.main();
//# sourceMappingURL=process_emit_lottery.js.map