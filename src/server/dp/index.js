let mysql=require('mysql');

let db=mysql.createPool({
    host:'localhost',            //数据库IP地址
    port:'3306',
    user:'root',                //数据库登录账号
    password:'850951609',     //数据库登录密码
    database:'storehouse'           //要操作的数据库
});

module.exports=db;