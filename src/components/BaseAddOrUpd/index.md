# 通用新增编辑模板
适用于不复杂表单提交及编辑
## 用法
```
1 传值 接受两个属性
    1.1 formList
        eg.
        formList = [
            {
            name: '111',
            value: '111',
            type: 'input',
            rule: {
                required: true,
                options: {
                max: 20,
                message: 'sss'
                }
            },
            options: {
                initialValue: 111
            }
            },
            {
            name: '222',
            value: '222',
            type: 'select',
            rule: true,
            option: this.state.op,
            changeHandle: this.getList
            },
            {
            name: '333',
            value: '333',
            type: 'rangePicker',
            rule: true
            },
            {
            name: '444',
            value: '444',
            type: 'textArea',
            rule: false
            },
            {
            name: '555',
            value: '555',
            type: 'radio',
            rule: true,
            radio: this.state.ra
            },
            {
            name: '666',
            value: '666',
            type: 'checkbox',
            rule: true,
            checkbox: this.state.cb
            },
            {
            name: '666',
            value: '666',
            type: 'upload',
            action: 'aaaa',
            upData: {
                a: 1
            },
            rule: true,
            length: 2,
            fileList: [{
                uid: 0,
                thumbUrl: 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg',
                url: 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg',
                img_url: 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg',
                status: 'done'
            }]
            }
        ]
    1.2 handle - 点击按钮时操作(添加或者编辑)


```