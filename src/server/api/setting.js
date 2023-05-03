// 操作数据库
let db=require('../dp/index');

//请求根据类型获取列表
exports.get_list=(req,res)=>{
    let sql=`SELECT * FROM alltypes where type=${req.query.type} and state=1`;
    db.query(sql,[
        req.query.type,
    ],(err,data)=>{
        if(err){
            return res.send('错误:'+err.message)
        }
        res.send(data)
    })
};
//添加
exports.add_list=(req,res)=>{
    let sql=`insert into alltypes(id,name,num,type,state,useNum,inventory) values (?,?,?,?,?,?,?)`;
    db.query(sql,[
        req.body.id,
        req.body.name,
        req.body.num,
        req.body.type,
        req.body.state,
        req.body.useNum,
        req.body.inventory
    ],(err,data)=>{
        if(err){
            return res.send('错误:'+err.message)
        }
        res.send(data)
    })
};
//修改
exports.change_list=(req,res)=>{
    let sql=`UPDATE alltypes SET name=?,num=?,inventory=? WHERE id=?`;
    db.query(sql,[
        req.body.name,
        req.body.num,
        req.body.inventory,
        req.body.id,
    ],(err,data)=>{
        if(err){
            return res.send('错误:'+err.message)
        }
        res.send(data)
    });
};
//删除
exports.delete_list=(req,res)=>{
    console.log(req.query);
    let sql=`UPDATE alltypes SET state=2 WHERE id="${req.query.id}"`;
    db.query(sql,[
        req.query.id
    ],(err,data)=>{
        if(err){
            return res.send('错误:'+err.message)
        }
        res.send(data)
    });
};
//增加数量
exports.change_num=(req,res)=>{
    let sql=`UPDATE alltypes SET num=?,inventory=? WHERE id=?`;
    db.query(sql,[
        req.body.num,
        req.body.inventory,
        req.body.id,
    ],(err,data)=>{
        if(err){
            return res.send('错误:'+err.message)
        }
        res.send(data)
    });
};
//查询单位列表
exports.get_unit=(req,res)=>{
    let sql=`SELECT * FROM unit where state=1`;
    db.query(sql,[],(err,data)=>{
        if(err){
            return res.send('错误:'+err.message)
        }
        res.send(data)
    })
};
//新增单位
exports.add_unit=(req,res)=>{
    let sql=`insert into unit(id,name,remark,time,state) values (?,?,?,?,?)`;
    db.query(sql,[
        req.body.id,
        req.body.name,
        req.body.remark,
        req.body.time,
        req.body.state,
    ],(err,data)=>{
        if(err){
            return res.send('错误:'+err.message)
        }
        res.send(data)
    })
};
//修改
exports.change_unit=(req,res)=>{
    let sql=`UPDATE unit SET name=?,remark=? WHERE id=?`;
    db.query(sql,[
        req.body.name,
        req.body.remark,
        req.body.id,
    ],(err,data)=>{
        if(err){
            return res.send('错误:'+err.message)
        }
        res.send(data)
    });
};
//删除
exports.delete_unit=(req,res)=>{
    console.log(req.query);
    let sql=`UPDATE unit SET state=2 WHERE id="${req.query.id}"`;
    db.query(sql,[
        req.query.id
    ],(err,data)=>{
        if(err){
            return res.send('错误:'+err.message)
        }
        res.send(data)
    });
};
