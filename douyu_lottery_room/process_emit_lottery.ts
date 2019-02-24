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
    private arr_1: any[];
    constructor(){
        this.arr=[];
        this.arr_1=[];
    }
    public static  async main(){
        const fn=new process_emit_lottery();
        await fn.save_lottery_message();
    }
    //保存获取的抽奖信息
    private  async save_lottery_message(){
        lottery_url.on('message',async (msg)=>{
            let data=douyu_room_message.room_lottery_message(msg);
            for (let i in data){
                //await this.lottery_activity_id(await data[i])
                let msg=await data[i];
                let query_msg=await this.query_database_lottery(msg.activity_id);
                if (query_msg.length===0){
                    await this.save_database_lottery(msg)
                }
            }
        })
    }
    //保存抽奖房间数据
    private async save_database_lottery(data:any){
        const lottery_room = Parse.Object.extend("lottery_room");
        const lottery = new lottery_room();
        for (let i in data){
                lottery.set(i,data[i])
        }
        return lottery.save()
    }
    //查找抽奖房间编号
    private async query_database_lottery(msg){
        const lottery_room = Parse.Object.extend("lottery_room");
        const query = new Parse.Query(lottery_room);
        query.equalTo('activity_id', msg);
        const results=await query.find();
        return  results
    }

}
process_emit_lottery.main();
