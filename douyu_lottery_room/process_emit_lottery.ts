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
    private start: boolean;
    constructor(){
        //抽奖进行对比的目标数组
        this.arr=[];
        //抽奖缓存数组
        this.arr_1=[];
        //执行计数器
        this.start=true;
    }
    public static  main(){
        const fn=new process_emit_lottery();
        fn.get_lottery_url();
    }
    private  async get_lottery_url(){
        lottery_url.on('message',async (msg)=>{
            if (msg===false){
                this.start=false;
                if (this.arr.length!=0){
                    this.arr=[].concat(this.arr_1);
                }
                this.arr_1.splice(0,this.arr_1.length);
            }else{
                let data=douyu_room_message.room_lottery_message(msg);
                for (let i in data){
                    let x=[].concat(this.lottery_activity_id(this.arr,await data[i]));
                    await this.save_lottery_message(x)
                }
            }
        })
    }
    //保存抽奖房间数据
    private async save_lottery_message(data:Array<object|any>){
        if (data.length!==0){
            const lottery_room = Parse.Object.extend("lottery_room");
            const lottery = new lottery_room();
            for (let i in data){
                for (let k in data[i]){
                    lottery.set(k,data[i][k])
                }
            }
            return lottery.save()
        }
    }
    //抽奖策略 抽奖号码对比移除同样的抽奖room_list activity_id 返回目标数组不存在的
    private lottery_activity_id(index:Array<object|any>,refer:object|any){
        let k=[];
        if (index.length!=0){
            //移除当前数组中相同的元素
            let g=[].concat(index.filter(msg=>{
                if (msg.activity_id===refer.activity_id){
                    return false
                }else{
                    return true
                }
            }));
            if (g.length===index.length){
                this.arr_1.push(refer);
                k.push(refer)
            }
        }else{
            if (this.start===true){
                this.arr_1.push(refer);
                k.push(refer)
            }
        }
        return k
    }
}
process_emit_lottery.main();
