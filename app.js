/*
启动服务
 */
const { exec } = require('child_process');
const path=require('path');
let database_conf_path=path.join(__dirname,'database_confi');
//const bat = spawn(`cd ${DashBard_conf_path}`);
exec('mongodb-runner start',(err)=>{
    console.log(err,1)
});
exec(`f:&&cd ${database_conf_path}&&parse-server parseConf.json`,(err)=>{
    console.log(err,2)
});
exec(`f:&&cd ${database_conf_path}&&parse-dashboard --config dashboard.json`,(err)=>{
    console.log(err,3)
});

