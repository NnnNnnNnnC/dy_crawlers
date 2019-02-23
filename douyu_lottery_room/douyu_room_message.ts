/**
 * 用于访问斗鱼API获取斗鱼直播间主播信息
 */
import axios from 'axios'
export  class douyu_room_message {
    constructor() {
    }
    public static room_lottery_message(url_list: Array<string>) {
        const api='https://www.douyu.com/member/lottery/activity_info';
        return url_list.map(async (url)=>{
            let message=await axios.get(`${api}?room_id=${url}`);
            return message.data.data
        })

    }
    private async sizer_message_lottery(obj:Object){

    }
}