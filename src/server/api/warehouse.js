// 操作数据库
let db=require('../dp/index');

//请求根据类型获取列表
exports.get_type_data=(req,res)=>{
    let sql=`SELECT * FROM alltypes where state=1`;
    db.query(sql,[
        req.query.type,
    ],(err,data)=>{
        if(err){
            return res.send('错误:'+err.message)
        }
        res.send(data)
    })
};