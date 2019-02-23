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
        //抽奖进行对比的目标数组
        this.arr=[];
        //抽奖缓存数组
        this.arr_1=[];
    }
    public static  async main(){
        const fn=new process_emit_lottery();
        await fn.get_lottery_url();
    }
    private  async get_lottery_url(){
        lottery_url.on('message',async (msg)=>{
            if (msg===false){
                if (this.arr_1.length!=0){
                    //this.arr.splice(0,this.arr.length);
                    //this.arr=[].concat(this.arr_1);
                }
                this.arr=this.arr.concat(this.arr_1);
                this.arr_1.splice(0,this.arr_1.length)
            }else{
                let data=douyu_room_message.room_lottery_message(msg);
                for (let i in data){
                    await this.lottery_activity_id(await data[i])
                }
            }
        })
    }
    //保存抽奖房间数据
    private async save_lottery_message(data:any){
        let arr = Object.keys(data);
        if (arr.length!=0){
            const lottery_room = Parse.Object.extend("lottery_room");
            const lottery = new lottery_room();
            for (let i in data){
                lottery.set(i,data[i])
            }
            return lottery.save()
        }
    }
    //抽奖策略 抽奖号码对比移除同样的抽奖room_list activity_id 返回目标数组不存在的
    private async lottery_activity_id(refer:object|any){
        if (this.arr.length===0){
            this.arr_1.push(refer);
            await this.save_lottery_message(refer)
        }else{
            let g=this.arr.filter(msg=>{
                if (msg.activity_id===refer.activity_id){
                    return false
                }else{
                    return true
                }
            });
            if (g.length!=this.arr.length){
                await this.save_lottery_message(refer);
                this.arr_1.push(refer)
            }
        }
    }
}
process_emit_lottery.main();
