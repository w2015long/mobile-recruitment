import ajax from './ajax'

//用户登录
export const reqLogin = (username,password) => ajax({url:'/login',data:{username,password},method:"post"});

//注册
export const reqRegister = (user) => ajax({url:'/register',data:user,method:"post"});

//更新用户
export const reqUpdateUser = user => ajax({url:'update',data:user,method:'post'});

// 获取用户信息
export const reqUser = () => ajax({url:'/user'});

// 获取用户列表信息
export const reqUserList = (type) => ajax({url:'/userlist',data:{type}});
