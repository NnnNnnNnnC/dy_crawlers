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
        //抽奖进行对比的目标数组
        this.arr = [];
        //抽奖缓存数组
        this.arr_1 = [];
    }
    static main() {
        return __awaiter(this, void 0, void 0, function* () {
            const fn = new process_emit_lottery();
            yield fn.get_lottery_url();
        });
    }
    get_lottery_url() {
        return __awaiter(this, void 0, void 0, function* () {
            lottery_url.on('message', (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg === false) {
                    if (this.arr_1.length != 0) {
                        //this.arr.splice(0,this.arr.length);
                        //this.arr=[].concat(this.arr_1);
                    }
                    this.arr = this.arr.concat(this.arr_1);
                    this.arr_1.splice(0, this.arr_1.length);
                }
                else {
                    let data = douyu_room_message_1.douyu_room_message.room_lottery_message(msg);
                    for (let i in data) {
                        yield this.lottery_activity_id(yield data[i]);
                    }
                }
            }));
        });
    }
    //保存抽奖房间数据
    save_lottery_message(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = Object.keys(data);
            if (arr.length != 0) {
                const lottery_room = Parse.Object.extend("lottery_room");
                const lottery = new lottery_room();
                for (let i in data) {
                    lottery.set(i, data[i]);
                }
                return lottery.save();
            }
        });
    }
    //抽奖策略 抽奖号码对比移除同样的抽奖room_list activity_id 返回目标数组不存在的
    lottery_activity_id(refer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.arr.length === 0) {
                this.arr_1.push(refer);
                yield this.save_lottery_message(refer);
            }
            else {
                let g = this.arr.filter(msg => {
                    if (msg.activity_id === refer.activity_id) {
                        return false;
                    }
                    else {
                        return true;
                    }
                });
                if (g.length != this.arr.length) {
                    yield this.save_lottery_message(refer);
                    this.arr_1.push(refer);
                }
            }
        });
    }
}
process_emit_lottery.main();
//# sourceMappingURL=process_emit_lottery.js.map