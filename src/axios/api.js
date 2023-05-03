import request from "./request.js";

export function getList(params) {
    return request.get('/getList',{params});
}
export function addList(params) {
    return request.post('/addList',params);
}
export function changeList(params) {
    return request.post('/changeList',params);
}
export function deleteList(params) {
    return request.get('/deleteList',{params});
}
export function changeNum(params) {
    return request.post('/changeNum',params);
}
export function getUnit() {
    return request.get('/getUnit',{});
}
export function getTypeData() {
    return request.get('/getTypeData',{});
}
export function addUnit(params) {
    return request.post('/addUnit',params);
}
export function changeUnit(params) {
    return request.post('/changeUnit',params);
}
export function deleteUnit(params) {
    return request.get('/deleteUnit',{params});
}