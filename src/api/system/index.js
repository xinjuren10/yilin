import Axios from '../axios'
import qs from 'qs'
// 获取短信验证码
export const sendCode = data =>{
  return Axios({
    headers:{ 'content-type': 'application/json'},
    url: '/validCode/send',
    method: 'POST',
    data : data
  });
};
//验证码登录
export const loginIn= data =>{
  return Axios({
    headers:{ 'content-type': 'application/json'},
    url: '/login/byAccount',
    method: 'POST',
    data :data
  });
};
//用户名密码登录
export const loginByCode= data =>{
  return Axios({
    headers:{ 'content-type': 'application/json'},
    url: '/login/bySms',
    method: 'POST',
    data :data
  });
};
//查询科室列表
export const getPageList= data =>{
  return Axios({
    headers:{ 'content-type': 'application/json'},
    url: '/tbDep/getPageList',
    method: 'POST',
    data:data
  });
};
//新增科室分类
export const addDep= data =>{
    return Axios({
        headers:{ 'content-type': 'application/json'},
        url: '/tbDep/add',
        method: 'POST',
        data :data
    });
};
//分页查询科室列表
export const getDepList= data =>{
    return Axios({
        url: '/tbDep/getPageList',
        method: 'POST',
        data :data
    });
};
//关键词查询科室
export const findList= (data) =>{
    return Axios({
        url:'/tbDep/listAllByDeptName',
        method:'GET',
        data:data
    });
};
//删除科室
export const removeDep= data =>{
    return Axios({
        headers:{ 'content-type': 'application/json'},
        url: '/tbDep/delete',
        method: 'POST',
        data :data
    });
};
//获取用户列表
export const getCountList= () =>{
  return Axios({
    url: '/tbUser/listAll',
    method: 'GET'
  });
};
//获取用户列表
export const getCountLists= () =>{
    return Axios({
        url: '/tbUser/getAllUserList',
        method: 'GET'
    });
};
//新增用户
export const addUser= (data) =>{
  return Axios({
    url: '/tbUser/add',
    method: 'POST',
    data:data
  });
};
//删除用户
export const deleteUser= (data) =>{
    return Axios({
        url: '/tbUser/delete',
        method: 'POST',
        data:data
    });
};
//查询所有科室列表
export const getRoomList= () =>{
    return Axios({
        url: '/tbOrgan/listAll',
        method: 'GET',
    });
};
//修改科室
export const editRoom= (data) =>{
    return Axios({
        url: '/tbDep/update',
        method: 'post',
        data:data
    });
};
//医院名称模糊查询
export const getHospital= (data) =>{
    return Axios({
        url: '/tbOrgan/search',
        method: 'POST',
        data:data
    });
};
//添加医院
export const addHospital= (data) =>{
    return Axios({
        url: '/tbOrgan/add',
        method: 'POST',
        data:data
    });
};
//更新医院信息
export const updateHospital= (data) =>{
    return Axios({
        url: '/tbOrgan/update',
        method: 'POST',
        data:data
    });
};
//修改密码
export const updatePwd= (data) =>{
    return Axios({
        url: '/tbUser/updatePwd',
        method: 'POST',
        data:data
    });
};
//重置密码
export const resetPwd= (data) =>{
    return Axios({
        url: '/tbUser/resetPwd',
        method: 'POST',
        data:data
    });
};
//获取当前用户信息
export const getUserInfo= (data) =>{
    return Axios({
        url: '/tbUser/currentInfo',
        method: 'POST',
        data:data
    });
};
//角色列表
export const roleList= () =>{
    return Axios({
        url: '/tbRole/listAll',
        method: 'GET',
    });
};
//添加角色
export const addRole= (data) =>{
    return Axios({
        url: '/tbRole/add',
        method: 'POST',
        data:data
    });
};
//删除角色
export const deleteRole= (data) =>{
    return Axios({
        url: '/tbRole/delete',
        method: 'POST',
        data:data
    });
};
//单个角色的详情
export const getRoleDetail= (data) =>{
    return Axios({
        url: '/tbRole/findOne',
        method: 'POST',
        data:data
    });
};
//根据医院查询角色列表
export const getRoleByHospital= () =>{
    return Axios({
        url: `/tbRole/listBySystem/${system}`,
        method: 'GET'
    });
};
//修改角色
export const updateRole= (data) =>{
    return Axios({
        url: '/tbRole/update',
        method: 'POST',
        data:data
    });
};
//添加功能菜单
export const addFunction= (data) =>{
    return Axios({
        url: '/tbFunc/add',
        method: 'POST',
        data:data
    });
};
// 删除功能菜单
export const deleteFunction= (data) =>{
    return Axios({
        url: '/tbFunc/delete',
        method: 'POST',
        data:data
    });
};
// 修改功能菜单
export const updateFunction= (data) =>{
    return Axios({
        url: '/tbFunc/update',
        method: 'POST',
        data:data
    });
};
// 获取TbFunc分页列表
// export const getFunctionList= (data) =>{
//     return Axios({
//         url: '/tbFunc/listAll',
//         method: 'POST',
//         data:data
//     });
// };
//
// 根据角色ID获取功能菜单列表
export const getFunctionById= () =>{
    return Axios({
        url: `/tbFunc/listAllByRoleId/${roleId}`,
        method: 'POST'
    });
};
//修改用户
export const updateCounts= (data) =>{
    return Axios({
        url: '/tbUser/update',
        method: 'POST',
        data:data
    });
};
// 获取功能分页列表
export const getMenuList= () =>{
    return Axios({
        url: '/tbFunc/listAll',
        method: 'POST'
    });
};
// 添加应知应会表
export const addKnow= (data) =>{
    return Axios({
        url: '/tbMustKnow/add',
        method: 'POST',
        data:data
    });
};
// 删除应知应会表
export const deleteKnow= (data) =>{
    return Axios({
        url: '/tbMustKnow/delete',
        method: 'POST',
        data:data
    });
};
// 获取应知应会列表
export const getKnowList= (data) =>{
    return Axios({
        url: '/tbMustKnow/getPageList',
        method: 'POST',
        data:data
    });
};
// 获取应知应会详情
export const knowInfo= (data) =>{
    return Axios({
        url: '/tbMustKnow/info',
        method: 'POST',
        data:data
    });
};
// 修改应知应会
export const updateknow= (data) =>{
    return Axios({
        url: '/tbMustKnow/update',
        method: 'POST',
        data:data
    });
};