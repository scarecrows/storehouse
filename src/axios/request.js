import axios from 'axios'
// 使用element-ui Message做消息提醒
import { Message} from 'element-ui';
//1. 创建新的axios实例，
const service = axios.create({
    // 公共接口--这里注意后面会讲
    baseURL: 'http://localhost:3000',
    // 超时时间 单位是ms，这里设置了3s的超时时间
    timeout: 60 * 1000
})
// 2.请求拦截器
service.interceptors.request.use(config => {
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
    config.headers = {
        'Content-Type':'application/json' //配置请求头
    }
    //如有需要：注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
    //const token = getCookie('名称');//这里取token之前，你肯定需要先拿到token,存一下
    //if(token){
    //config.params = {'token':token} //如果要求携带在参数中
    //config.headers.token= token; //如果要求携带在请求头中
    //}
    return config
}, error => {
    Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(response => {
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    return response.data
}, error => {
    /***** 接收到异常响应的处理开始 *****/
    if (JSON.stringify(error).includes('timeout')) {
        Message.error('服务器响应超时，请刷新当前页')
    }
    error.message = '连接服务器失败';

    Message.error(error.message);
    /***** 处理结束 *****/
    //如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve(error.response)
})
//4.导入文件
export default service