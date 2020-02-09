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
              / \
          profile  shot
```
