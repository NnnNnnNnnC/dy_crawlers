import {array_util} from '../util/array_util';
import {douyu_room_message} from './douyu_room_message'
const cp=require('child_process');
const  path=require('path');
const lottery_url_file=path.join(__dirname,'Directory_traversal_room.js');
const lottery_url=cp.fork(lottery_url_file);

class process_emit_lottery{
    private lottery_url: any[];
    constructor(){
    }
    public static  main(){
        const fn=new process_emit_lottery();
        fn.get_lottery_url();
    }
    private  get_lottery_url(){
        lottery_url.on('message',async (msg)=>{
            let data=douyu_room_message.room_lottery_message(msg);
            for(let i=0;i<data.length;i++){
                console.log(await data[i])
            }
            //console.log(douyu_room_message.room_lottery_message(msg))
        })
    }
    public a(){
        console.log(this.lottery_url)
    }
}
process_emit_lottery.main();
