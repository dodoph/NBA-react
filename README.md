# React NBA

## Install
```
Nba web Setup
Step1: create nba-web project
create-react-app nba-web
cd nba-web
npm install --save nba@4.8
npm install --save d3-shotchart

npm start
```

## Design
* component 划分
- 数据传递
  - profile
  - shot data

* 设计
  - 两个component 分别拿
  - 合并成2 child components; parent 去拿数据;通过props传给child
    - 任何数据的变化，只要parent去处理再分发

```
1. topbar
2. profile
3. shot

        APP
        / \
      topbar Main
              / \ （by props）
          profile  shotchart (flexbox)
```

* NBA存在跨域访问限制所以自己用自己创建的server
  - 前端broswer向后端拿数据属于CORS
  - 但是node 属于后端，所以
* 跨域
  * 端口不一致
  * IP不一致
```
 NBA WEB  <--request-->   Node Server    <--node index.js-->         NBA server
                          Node API()
                const SERVER_URL = 'http://35.235.84.235:5000';

```
## shotcut

* 创建component
```
rcc + tab
```


## promise 的状态

//pending
//resolve
//reject

## Main 传 info 给profile 通过props
