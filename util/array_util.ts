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
    //数组取不相交集合，数组合并不相交元素
    public static  different_merge_array(index:Array<object|any>,refer:Array<object|any>){
        return index.filter((msg)=>{
            for (let i in refer){
                if (JSON.stringify(msg)===JSON.stringify(refer[i])){
                    return false
                }
            }
            return true
        }).concat(refer)
    }
    //index 数组移除目标字符串中相同元素，并保留不同元素
    public static arr_0(index:Array<object|any>,refer:string){
        let a=[].concat(index.filter((msg)=>{
            if (JSON.stringify(msg)===refer){
                return false
            }else{
                return true
            }
        }))
        a.push(JSON.parse(refer));
        return a
    }
}
