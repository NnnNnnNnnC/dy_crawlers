/**
 * 获取正在抽奖房间的URL
 */
import axios from 'axios';
export class Directory_traversal_room{
    public static async main(){
        let pgcnt=2;
        for(let page=1;page<pgcnt;page++){
            let message=await this.get_room_list(page);
            pgcnt=message.data.pgcnt;
            let lottery_room=this.get_lottery_room(message.data.rl);
            let room_number=this.lottery_room_number(lottery_room);
            process.send(room_number);
        }
        process.send(false)
        setInterval(()=>{
            return this.main()
        },30000)
    }
    //单次访问URL获取JSON信息
    private static async get_room_list(page:number) {
        const directory_all: String = 'https://www.douyu.com/gapi/rkc/directory/0_0';
        let response = await axios.get(`${directory_all}/${page}`);
        return  response.data
    }
    //分析是否存在抽奖行为
    private  static lottery_progress(room_obj:object|any){
        let lucky_draw_icon = 'https://sta-op.douyucdn.cn/dy-listicon/web-lottery-v3.png';
        let icon_arr:Array<any>=room_obj.icv1;
        for(let i=0;i<icon_arr.length;i++){
            if (icon_arr[i].length!=0){
                for(let k in icon_arr[i]){
                    for(let t in icon_arr[i][k]){
                        if ( icon_arr[i][k][t]==lucky_draw_icon){
                            return true;
                        }
                    }
                }
            }
        }
        return false
    }
    //遍历room_list进行匹配
    private static get_lottery_room(room_list) {
        return room_list.filter( (room)=>{
            return this.lottery_progress(room)
        })
    }
    //返回正在抽奖房间的房间号
    private static lottery_room_number(lottery_room){
        return lottery_room.map((obj)=>{
            return obj.rid
        })
    }
}
Directory_traversal_room.main();