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
* 安装ant design

1. ```npm install --save antd```
2. ```npm install -S lodash```




## Design

### component 划分

MVVM Model-View-ViewModel pattern

- 数据传递
  - profile
  - shot data

### 设计
- 两个component 分别拿
- 合并成2 child components; parent 去拿数据;通过props传给child
  - 任何数据的变化，只要parent去处理再分发

```
1. topbar
2. profile
3. shot

        APP
        / \
      topbar Main (fetch data from nba-client)
              / \ （by props）
          profile  shotchart (flexbox)
```

* NBA存在跨域访问限制所以自己用自己创建的server
  - 前端broswer向后端拿数据属于CORS
  - 但是node 属于后端，所以通过node 可以和NBA server进行通信
* 跨域
  * 端口不一致
  * IP不一致

## 如何通信

### 外部通信
  1. NBA web通过调用nba-client.js interface来获获取play 和他们的shot info


  ```
   NBA WEB  <--request/response [nba-client.js] -->   Node Server    <--node index.js-->     NBA server
                                                    Node API()                         playerInfo/shot data
                                      const SERVER_URL = 'http://35.235.84.235:5000';
  ```
### 内部数据通信

  ```
           p (define call back func回调) c的改变其实是父组件改变父组件
      /         \
    child       child          
  ```
  1. parent => child : props
  - 在parent里面设置属性A
  - 在child里面通过 props.A 拿到

  2. child => parent: callback
  - 在parent里面定义call back 函数，并且把这个callback 函数通过props传给child
  - 在child使用props的值时，它是通过调用parent传下来的这个callback函数
  - child到parent的数据修改，实际是parent修改parent

  3. child => child
  - 必须通过parent component
  - 先调用2.再执行1

  * setstates 变化=> render变化
  * UI 变化=> data 变化

## 各个函数

### nba-client.js

1. 向外暴露nba库 API
2. 暴露统计states属性

### Main.js

1. 获取数据
- fetch nba from nba-client.js
2. 数据初始化定义
  - playerInfo(personal data & shot data) 属于main component的私有属性，用 state={ playerInfo: {}} 来装变动的球员信息
3. 调用和使用数据
  - componentDidMount() (lifecycle)
    - 像node server（nba-client） 发送http request
    - connect with server
4. 通过props将state 传给profile 和 shotchart

5.

###  Profile.js

1. 解构从main里面通过props传下来的playerInfo
2. 展示在web上{`${variable}`}

### ShotChart.js

1. import third party library d3-hexbin & d3-shotchart into public->index.html
2. 获取投球数据
  - fetch nba from nba-client.js
3. 在componentDidMount()里调用API
```
nba.stats.shots({
    PlayerID: this.props.playerId
})
```
4. 拿到投球数据存在response

### shotcut

* 创建component
```
rcc + tab
```

### filter
```
filter       ShotChart  <--------|
|------------------------------>main

```
* 新的层级关系
  - 便于数据管理
[data flow](https://github.com/dodoph/NBA-react/blob/master/nba-Diagram.png)

- reat UI library with lots of components
- slider

## CounterSlider.js
* control components 双向绑定
* 用stats 记录私有属性

* filter data change ====call back====> dataview ========> ShotChart

## TOOLTIPS

```
Tooltips      

```


### SearchBar.js

* import ant desisgn
  * auto-complete function
    - input
    - keyword
    - option-list
    - select option

* option-list
  * fetch data: onSearch={this.handleSearch}
    * call 回调函数 handleSearch()=>{}
      * 通过nba keyword，并进行处理拿到name 和 id
      * setStates 使得render
  * display data: dataSource
    * 将每一条数据变成一个option
      * 但是option是一条条的，如果保证最快更新用key去更新
    * key 每条数据变成一个option
      * key 是给diff用的，只在component下面能看到，页面上面是看不到的
    * value 选择某一条data时候，会显示在search bar上面 optionLabelProp
    * img

* onSelect
  * when click, trigger onSelect
  * onSelect = (value) =>{}
    * after select, update player component

* SeachBar => player

```
            === playerInfo call back ===>            ====this.props===>
[SeachBar]                                  [main]                          [player component]
            <======== props  ========                < ==== callback ====
```
1. 在main里面定义回调函数 handleSelectPlayer = (playerName) => {}
2. 将回调函数通过props传给child component  <SearchBar handleSelectPlayer={this.handleSelectPlayer}/>，so search bar  can access this func
3. In searchbar.js, 调用callback函数  onSelect = (name) => {this.props.handleSelectPlayer(name);}  当searchbar handleSelectPlayer 发生改变时候，它将name是回传给了main
4. 回到main.js 已经拿到了player name；然后要通过componentDidMount() loadPlayerInfo = (playerName) => {} 去nba库找球员的信息，并setState（）
5. 当setState()时候，会在一个trigger render() 然后传给child component：player


## React 其他知识点


### react lifecycle

[lifecycle](https://docs.google.com/document/d/15VHlygOAsuG1P9YOkhBR3MMhzI1psHfWMBLUVwoVb-g/edit)

### fetch ... then 通fetch向后端获取promise,创建一个request 请求

* then 什么时候被调用？
  - 首先，then是通过promise进行链式调用
  - 当拿到信息是then才会被调用，在调用之前，promise有3种状态

### promise 的状态

* pending
* resolve
* reject

### Main 传 info 给profile 通过props


### margin 塌陷

```
margin A botton 10
                   ===> margin 10 Effect
margin B top 10
````

### react 解构赋值 distructure

* nba.findPlayer('Stephen Curry').playerId 解构用法
* playerID: xxx 赋值用法

```
{ PlayerID: nba.findPlayer('Stephen Curry').playerId}
```

### prop-types 校验


### debounce
* import lodash

防抖：防止用户在短时间滑动造成阻塞

### componentDidMount vs. componentDidUpdata


componentDidMount:获取数据时候用的，只渲染一次
componentDidUpdata：更新数据时候用的；多次渲染


## Map vs filter

* Map() : access array
* filter(): 删除




*****


# Redux

## 通信

* 子组件
  * 对外接口 props 传来的
  * states 记录内部状态
  * 问题1：
    * 需要3个callback，数据重复了
    * 数据一致性无法保证
  * 优化1
    * 增加base component
    * 将数据独立成组件，进行全局管理，所以用redux进行管理
  * 问题2：
    * grandparent => parent => child
  * 优化2:
    * 使用context
    * 将数据独立与组件，集中

```
              counter(parent)            states = c1+c2+c3
           /     |      \
        c1       c2      c3  (child)
      state1   state2    state3
                b->b1(b1 没有往回传，parent不知道是b还是b1,数据一致性无法保证)
```

```

      grandparent
          |
        parent
          |
        child


```

## flux

arch

##
