import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import BaseList from 'components/BaseList';

@connect((state) => ({
    state
}))
export default class BasePage extends PureComponent {
  state = {
    op: []
  };

  componentDidMount () {
    this.setState({
        op: [
            {name: '111', value: '111'},
            {name: '222', value: '222'},
            {name: '333', value: '333'}
        ]
    })
  }

  getList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  deleteListItem = (id, fn) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/del',
      payload: {
          id
      },
      callback: (res) => {
          fn();
      }
    });
  }

  search = (values) => {
    this.props.dispatch({
        type: 'rule/fetch',
        payload: values
    });
  }

  render() {
    const formList = [
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
    const handleOption = {
        show: true,
        value: 'key',
        titleName: '操作',
        data: [{name: '详情', url: 'aaa-aaa'}, {name: '删除', todo: this.deleteListItem}],
        add:{
            btn: true,
            url: 'page-add',
            btnName: '新增'
        }
    }
    const { list , pagination, tableTitle } = this.props.state.rule.data;
    const loading = this.props.state.loading.models.rule;
    return (
      <PageHeaderLayout title="查询表格">
        <BaseList
            formList={formList}
            searchHandle={this.search}
            handleOption={handleOption}
            data={list}
            pagination={pagination}
            tableTitle={tableTitle}
            loading={loading}
        />
      </PageHeaderLayout>
    );
  }
}
