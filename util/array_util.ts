export class array_util{
    //数组去重
    public static  remove_duplication(arr:Array<any>):Array<object|any>{
        return Array.from(new Set(arr))
    }
    //字符串数组内容转换大小写
    public static async arr_toggle_case(arr:Array<string>,toggle:boolean){
        let map;
        if(toggle===true){
            map=arr.map((str)=>{
                return str.toLowerCase()
            });
        }else{
            map=arr.map((str)=>{
                return str.toUpperCase()
            })
        }
        return map;
    }
    //两数组去重复
    public static async merge_array(index:Array<any>,refer:any){
        return index.filter(str=>{
            return refer.includes(str)===false
        });
    }
}
