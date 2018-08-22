import React, { PureComponent, Fragment } from 'react';
import { Link } from 'dva/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Table,
  Divider,
  Dropdown,
  Icon,
  Menu,
} from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

@Form.create()
export default class BaseList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {},
      searchParams: {
        pageSize: 30,
      },
    };
  }

  componentDidMount() {
    this.searchLists();
  }

  searchLists = () => {
    let value = {
      ...this.state.formValues,
      ...this.state.searchParams,
    };
    this.props.searchHandle(value);
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.searchLists();
  };

  setSearch = page => {
    this.setState(
      {
        searchParams: page,
      },
      this.searchLists
    );
  };
  setSize = pageSize => {
    this.setState(
      {
        searchParams: pageSize,
      },
      this.searchLists
    );
  };

  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;
    const { searchParams } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      //todo 处理时间

      const values = {
        ...fieldsValue,
        ...searchParams,
      };

      this.setState(
        {
          formValues: values,
        },
        this.searchLists
      );
    });
  };

  getColumns = tableTitle => {
    let arr = [];
    tableTitle &&
      tableTitle.length &&
      tableTitle.forEach(val => {
        let obj = {};
        obj.title = val.name;
        obj.dataIndex = val.value;
        arr.push(obj);
      });
    if (this.props.handleOption.show) {
      let handleObj = {};
      handleObj.title = this.props.handleOption.titleName;
      handleObj.dataIndex = this.props.handleOption.value;
      handleObj.render = (dataIndex, record) => {
        return (
          <Fragment>
            {(() => {
              if (this.props.handleOption.data.length > 3) {
                const menu = (
                  <Menu>
                    {this.props.handleOption.data.map((sVal, sIndex) => {
                      if (sVal.url) {
                        return (
                          <Menu.Item key={sVal.name}>
                            <Link key={sIndex} to={`${sVal.url}/${dataIndex}`}>
                              {sVal.name}
                            </Link>
                          </Menu.Item>
                        );
                      } else if (sVal.todo) {
                        return (
                          <Menu.Item key={sVal.name}>
                            <a
                              href="javascript:void(0);"
                              key={sIndex}
                              onClick={sVal.todo.bind(this, dataIndex, this.searchLists)}
                            >
                              {sVal.name}
                            </a>
                          </Menu.Item>
                        );
                      }
                    })}
                  </Menu>
                );
                return (
                  <Dropdown overlay={menu}>
                    <a>
                      操作 <Icon type="down" />
                    </a>
                  </Dropdown>
                );
              } else {
                return this.props.handleOption.data.map((hVal, index) => {
                  if (hVal.url && this.props.handleOption.data.length != index + 1) {
                    return (
                      <Fragment key={index}>
                        <Link key={index} to={`${hVal.url}/${dataIndex}`}>
                          {hVal.name}
                        </Link>
                        <Divider type="vertical" />
                      </Fragment>
                    );
                  } else if (hVal.todo && this.props.handleOption.data.length != index + 1) {
                    return (
                      <Fragment key={index}>
                        <a
                          href="javascript:void(0);"
                          key={index}
                          onClick={hVal.todo.bind(this, dataIndex, this.searchLists)}
                        >
                          {hVal.name}
                        </a>
                        <Divider type="vertical" />
                      </Fragment>
                    );
                  } else if (hVal.url) {
                    return (
                      <Link key={index} to={`${hVal.url}/${dataIndex}`}>
                        {hVal.name}
                      </Link>
                    );
                  } else if (hVal.todo) {
                    return (
                      <a
                        href="javascript:void(0);"
                        key={index}
                        onClick={hVal.todo.bind(this, dataIndex, this.searchLists)}
                      >
                        {hVal.name}
                      </a>
                    );
                  }
                });
              }
            })()}
          </Fragment>
        );
      };
      arr.push(handleObj);
    }
    return arr;
  };

  renderAdvancedForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {this.props.formList.map((value, index) => {
            return (
              <Col md={8} sm={12} key={index}>
                <FormItem label={value.name}>
                  {(() => {
                    switch (value.type) {
                      case 'input':
                        return getFieldDecorator(`${value.value}`, {})(
                          <Input style={{ width: '100%' }} placeholder={`请输入${value.name}`} />
                        );
                      case 'select':
                        return getFieldDecorator(`${value.value}`, {})(
                          <Select
                            placeholder={`请选择${value.name}`}
                            onChange={value.changeHandle ? value.changeHandle : null}
                            style={{ width: '100%' }}
                          >
                            {value.option &&
                              value.option.map((val, key) => {
                                return (
                                  <Option key={key} value={val.value}>
                                    {val.name}
                                  </Option>
                                );
                              })}
                          </Select>
                        );
                      case 'rangePicker':
                        return getFieldDecorator(`${value.value}`, {})(
                          <RangePicker style={{ width: '100%' }} placeholder={['开始', '结束']} />
                        );
                    }
                  })()}
                </FormItem>
              </Col>
            );
          })}
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            {this.props.handleOption.add.btn ? (
              <Link to={this.props.handleOption.add.url}>
                <Button style={{ marginLeft: 8 }} type="primary">
                  {this.props.handleOption.add.btnName}
                </Button>
              </Link>
            ) : null}
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.renderAdvancedForm();
  }

  render() {
    const { data, pagination, tableTitle, loading } = this.props;

    const columns = this.getColumns(tableTitle);
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      total: pagination.total,
      showTotal: (total, range) => {
        return `共${total}条记录`;
      },
      current: pagination.current,
      defaultPageSize: 30,
      onShowSizeChange: (current, pageSize) => {
        this.setSize({ current, pageSize });
      },
      onChange: (page, pageSize) => {
        this.setSearch({ page, pageSize });
      },
    };
    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <Table
            loading={loading}
            dataSource={data}
            columns={columns}
            pagination={paginationProps}
          />
        </div>
      </Card>
    );
  }
}
