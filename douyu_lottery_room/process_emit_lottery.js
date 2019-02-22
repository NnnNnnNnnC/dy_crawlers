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
const lottery_url_file = path.join(__dirname, 'Directory_traversal_room.js');
const lottery_url = cp.fork(lottery_url_file);
class process_emit_lottery {
    constructor() {
    }
    static main() {
        const fn = new process_emit_lottery();
        fn.get_lottery_url();
    }
    get_lottery_url() {
        lottery_url.on('message', (msg) => __awaiter(this, void 0, void 0, function* () {
            let data = douyu_room_message_1.douyu_room_message.room_lottery_message(msg);
            for (let i = 0; i < data.length; i++) {
                console.log(yield data[i]);
            }
            //console.log(douyu_room_message.room_lottery_message(msg))
        }));
    }
    a() {
        console.log(this.lottery_url);
    }
}
process_emit_lottery.main();
//# sourceMappingURL=process_emit_lottery.js.map