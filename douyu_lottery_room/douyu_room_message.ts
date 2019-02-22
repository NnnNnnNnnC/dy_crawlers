/**
 * 用于访问斗鱼API获取斗鱼直播间主播信息
 */
import axios from 'axios'
export  class douyu_room_message {
    constructor() {
    }
    public static main(url_list){
        //const fn=new douyu_room_message();
        //fn.room_lottery_message(url_list)
    }
    public static room_lottery_message(url_list: Array<string>) {
        const api='https://www.douyu.com/member/lottery/activity_info';
        return url_list.map(async (url)=>{
            let message=await axios.get(`${api}?room_id=${url}`);
            let data=message.data;
            return{
                name:data.data.prize_name,
                room_id:data.data.room_id
            }
        })
    }
    private async sizer_message_lottery(obj:Object){

    }
}