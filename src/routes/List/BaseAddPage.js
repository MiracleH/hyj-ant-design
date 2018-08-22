import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import BaseAdd from 'components/BaseAddOrUpd';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
@connect((state) => ({
    state
}))
export default class BasePage extends PureComponent {
  state = {
    op: [],
    ra: [],
    cb: []
  };

  componentDidMount () {
    this.setState({
        op: [
          {name: '111', value: '111'},
          {name: '222', value: '222'},
          {name: '333', value: '333'}
        ],
        ra: [
          {name: '111', value: '111'},
          {name: '222', value: '222'},
          {name: '333', value: '333'}
        ],
        cb: [
          {label: '111', value: '111'},
          {label: '222', value: '222'},
          {label: '333', value: '333'}
        ]
    })
  }

  add = (values) => {
    this.props.dispatch({
      type: 'rule/add',
      payload: values,
      callback: () => {
          message.success('添加成功');
          this.props.dispatch(routerRedux.push('/base/page-list'));
      }
    });
  }

  render() {
    const formList = [
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
    return (
      <PageHeaderLayout title="添加">
        <BaseAdd
            formList={formList}
            handle={this.add}
        />
      </PageHeaderLayout>
    );
  }
}
