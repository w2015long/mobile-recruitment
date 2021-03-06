## 1. 搭建项目
    1). 使用create-react-app脚手架创建模板项目(工程化)
    2). 引入antd-mobile, 并实现按需打包和自定义主题
    3). 引入react-router-dom(v4): 
        HashRouter/Route/Switch
        history: push()/replace()
    4). 引入redux
        redux/react-redux/redux-thunk
        redux: createStore()/combineReducers()/applyMiddleware()
        react-redux: <Provider store={store}> / connect()(Xxx)
        4个重要模块: reducers/store/actions/action-types

## 2. 登陆/注册界面
    1). 创建3个1级路由: main/login/register
    2). 完成登陆/注册的静态组件
        antd组件: NavBar/WingBlank/WhiteSpace/List/InputItem/Radio/Button
        路由跳转: this.props.history.replace('/login')
        收集表单输入数据: state/onChange/变量属性名


    
## 3. 注册/登陆前台处理
    1). ajax
        ajax请求函数(通用): 使用axios库, 返回的是promise对象
        后台接口请求函数: 针对具体接口定义的ajax请求函数, 返回的是promise对象
        代理: 跨域问题/配置代理解决
        await/async: 同步编码方式实现异步ajax请求 
    2). redux
        store.js
          生成并暴露一个store管理对象
        reducers.js
          包含n个reducer函数
          根据老state和指定action来产生返回一个新的state
        actions.js
          包含n个action creator函数
          同步action: 返回一个action对象({type: 'XXX', data: xxx})
          异步action: 返回一个函数: disptach => {执行异步代理, 结束时dispatch一个同步action}
        action-types.js
          action的type名称常量
    3). component
        UI组件: 
            组件内部没有使用任何redux相关的API
            通过props接收容器组件传入的从redux获取数据
            数据类型: 一般和函数
        容器组件
            connect(
              state => ({user: state.user}),
              {action1, action2}
            )(UI组件)
## 4. 实现user信息完善功能
    1). 用户信息完善界面路由组件: 
        组件: dashen-info/laoban-info/header-selector
        界面: Navbar/List/Grid/InputItem/Button/TextareaItem
        收集用户输入数据: onChange监听/state 
        注册2级路由: 在main路由组件
    2). 登陆/注册成功后的跳转路由计算
        定义工具函数
        计算逻辑分析
    3). 后台路由处理
    4). 前台接口请求函数
    5). 前台redux
        action-types
        异步action/同步action
        reducer
    6). 前台组件
        UI组件包装生成容器组件
        读取状态数据
        更新状态

## 5. 搭建整体界面
    1). 登陆状态维护
        后台将userid保存到cookie中
        前台读取cookie中的userid
        redux中管理user信息状态
        
    2). 实现自动登陆
        整体逻辑分析
        ajax请求根据cookie中的userid查询获取对应的user信息
    3). 封装导航路由相关数据(数组/对象)
        抽取底部导航组件
        非路由组件使用路由组件API    
## 6. 个人中心
    读取user信息显示
    退出登陆
    
## 7. 用户列表
    为大神/老板列表组件抽取用户列表组件
    异步读取指定类型用户列表数据
        后台路由
        api
        redux
        component

## 8. socket.io
    实现实时聊天的库
    包装的H5 WebSocket和轮询---> 兼容性/编码简洁性
    包含2个包:
      socket.io: 用于服务器端
      socket.io-client: 用于客户端
    基本思想: 远程自定义事件机制
        on(name, function(data){}): 绑定监听
        emit(name, data): 发送消息
        
        io: 服务器端核心的管理对象
        socket: 客户端与服务器的连接对象


## 9. 聊天组件功能:
    后台接口
    chat静态组件
    发送消息与接收消息
    获取消息列表显示
    接收消息显示
    完善列表显示


## 10. 消息列表
    对消息进行分组保存, 且只保存每个组最后一条消息
    对于对象容器和数组容器的选择
    数组排序
    
## 11. 未读消息数量显示 
    每个组的未读数量统计
    总未读数量统计显示
    查看消息后, 更新未读数量
       