# 通用列表模板
适用于不复杂列表显示
## 用法
```
1 传值 接受七个属性
    1.1 formList
        eg.
        formList = [
            {
                name: '111',
                value: '111',
                type: 'input'
            },
            {
                name: '222',
                value: '222',
                type: 'select',
                option: this.state.op,
                changeHandle: this.getList
            },
            {
                name: '333',
                value: '333',
                type: 'rangePicker'
            },
        ]
    1.2 searchHandle - 点击搜索时操作
    1.3 handleOption - 列表中操作相关(一般在最后一列)
    1.4 tableTitle - 表头显示数据
        eg.
        tableTitle = [{name: "aaa", value: "callNo"},
        {name: "bbb", value: "owner"},
        {name: "ccc", value: "href"},
        {name: "ddd", value: "description"},
        {name: "eee", value: "progress"}]
    1.5 pagination - 分页相关属性
    1.6 loading 
    1.7 data - 表中数据


```