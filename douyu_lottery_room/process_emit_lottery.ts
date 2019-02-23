import {array_util} from '../util/array_util';
import {douyu_room_message} from './douyu_room_message'
const cp=require('child_process');
const  path=require('path');
const Parse=require('parse/node');
Parse.initialize("com.node.douyu_crawlers",);
Parse.serverURL = 'http://localhost:1337/parse';

const lottery_url_file=path.join(__dirname,'Directory_traversal_room.js');
const lottery_url=cp.fork(lottery_url_file);

class process_emit_lottery{
    private arr: any[];
    constructor(){
        this.arr=[]
    }
    public static  main(){
        const fn=new process_emit_lottery();
        fn.get_lottery_url();
    }
    private  get_lottery_url(){
        lottery_url.on('message',async (msg)=>{
            let data=douyu_room_message.room_lottery_message(msg);
            for(let i =0;i<data.length;i++){

                this.save_lottery_message(this.arr).then().catch()
            }
        })
    }
    //保存抽奖房间数据
    private async save_lottery_message(data:Array<object|any>){
        const lottery_room = Parse.Object.extend("lottery_room");
        const lottery = new lottery_room();
        for (let i in data){
            for (let k in data[i]){
                lottery.set(k,data[i][k])
            }
        }
        return lottery.save()
    }
    //抽奖策略 抽奖号码对比移除同样的抽奖room_list activity_id 返回目标数组不存在的
    private lottery_activity_id(index:Array<object|any>,refer:object|any){
        let a=index.filter(msg=>{
            if(msg.activity_id===refer.activity_id){
                return false
            }else{
                return true
            }
        });
        a.push(refer)
    }
}
process_emit_lottery.main();
