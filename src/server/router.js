// 配置对应路由
let express=require('express');
let router=express.Router();
let setting=require('./API/setting');
let warehouse=require('./API/warehouse');


router.get('/getList',setting.get_list);
router.post('/addList',setting.add_list);
router.post('/changeList',setting.change_list);
router.get('/deleteList',setting.delete_list);
router.post('/changeNum',setting.change_num);
router.get('/getTypeData',warehouse.get_type_data);
router.get('/getUnit',setting.get_unit);
router.post('/addUnit',setting.add_unit);
router.post('/changeUnit',setting.change_unit);
router.get('/deleteUnit',setting.delete_unit);
module.exports=router;