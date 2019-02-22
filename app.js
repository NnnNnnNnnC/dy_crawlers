/*
启动服务
 */
const { exec } = require('child_process');
const path=require('path');
let database_conf_path=path.join(__dirname,'parseServer_config');
//const bat = spawn(`cd ${DashBard_conf_path}`);
exec('mongodb-runner start',(error, stdout, stderr) => {
    if (error) {
      console.error(`执行出错: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
exec(`cd ${database_conf_path}&&parse-server parseConf.json`,(error, stdout, stderr) => {
    if (error) {
      console.error(`执行出错: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
exec(`cd ${database_conf_path}&&parse-dashboard --config dashboard.json`,(error, stdout, stderr) => {
    if (error) {
      console.error(`执行出错: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });

