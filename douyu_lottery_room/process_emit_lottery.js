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
const fs = require('fs');
/**
 * 只要有能力的话直接修改为数组吧，优化下算法，目前没时间弄这东西，先让能过跑起来
 * 优化 0.01
 */
class process_emit_lottery {
    constructor() {
        this.arr_catch = [];
        this.arr_precached = [];
        this.start = true;
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
                if (msg == false) {
                    //移除 arr_precached 中的重复元素
                    yield this.precached_rm_dup();
                    //获取arr_precached对比与arr_catch的不同元素
                    let diff = yield this.arr_different_gather();
                    //获取 arr_catch 和 arr_precached相交集合
                    let intersection = yield this.index_arr_concat();
                    //返回新的数组
                    this.arr_catch = intersection.concat(diff);
                    fs.appendFileSync(`${__dirame}`);
                    for (let i of diff) {
                        if (i != undefined)
                            yield this.save_database_lottery(i);
                    }
                    //优化内存
                    this.arr_precached.splice(0, this.arr_precached.length);
                }
                else {
                    let data = douyu_room_message_1.douyu_room_message.room_lottery_message(msg);
                    for (let i in data) {
                        this.arr_precached.push(yield data[i]);
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
            return yield query.find();
        });
    }
    //查询并保存没重复数据
    save_non_duplicate(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let query_msg = yield this.query_database_lottery(msg.activity_id);
            if (query_msg.length === 0) {
                yield this.save_database_lottery(msg);
            }
        });
    }
    // 取交集
    index_arr_concat() {
        return this.arr_catch.filter(msg => {
            let k = 0;
            for (let i of this.arr_precached) {
                if (i.activity_id === msg.activity_id) {
                    k++;
                }
            }
            return k >= 1;
        });
    }
    //返回不相同元素
    arr_different_gather() {
        return this.arr_precached.filter(msg => {
            let k = 0;
            for (let i of this.arr_catch) {
                if (i.activity_id === msg.activity_id) {
                    k++;
                }
            }
            return k === 0;
        });
    }
    //数组去重arr_precached去除重复
    precached_rm_dup() {
        let result = [];
        let obj = {};
        for (let i of this.arr_precached) {
            if (!obj[i.activity_id]) {
                result.push(i);
                obj[i.activity_id] = 1;
            }
        }
        this.arr_precached = [].concat(result);
        result.splice(0, result.length);
        //return result
    }
}
process_emit_lottery.main();
//# sourceMappingURL=process_emit_lottery.js.map