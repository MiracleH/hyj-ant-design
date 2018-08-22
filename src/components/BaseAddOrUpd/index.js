import React, { PureComponent } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  Radio,
  Checkbox,
  Upload,
  Icon,
  Modal
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

@Form.create()
export default class BaseAddOrUpd extends PureComponent {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        img: null,
    }

    componentWillMount() {
        this.props.formList.forEach(val => {
            if(val.type == 'upload') {
                if(val.fileList) {
                    this.state.fileList = val.fileList
                }
            }
        })
    }
    
  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handle(values);
      }
    });
  };
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    let image = file.url || file.thumbUrl;
    this.setState({
      previewImage: image,
      previewVisible: true,
    });
  }
  handleChange = ({ fileList, file }) => {
    if (file.response && file.response.status_code == 500) {
      message.error(file.response.message);
    }
    let image = [];
    fileList = fileList.length ? fileList.map((file) => {
      if (typeof file.response == 'object') {
        file.url = file.response.data.url;
        image.push(file.response.data.url);
        image = Array.from(new Set(image));
      }
      return file;
    }) : image = [];
    fileList = fileList.filter((f) => {
      if (f.response) {
        return f.response.status_code === '200';
      }
      return true;
    });
    this.setState({ fileList, img: image });
  }

  uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (

        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            {
                this.props.formList.map((value, index) => {
                    return <FormItem {...formItemLayout} label={value.name} key={index}>
                        {
                            (() => {
                                switch(value.type) {
                                    case 'input':
                                        return (
                                            getFieldDecorator(`${value.value}`, {
                                                rules: [
                                                {
                                                    required: value.rule.required,
                                                    message: `请输入${value.name}`,
                                                },
                                                {...value.rule.options}
                                                ],
                                                ...value.options
                                            })(<Input placeholder={`请输入${value.name}`} />)
                                        )
                                    case 'select':
                                        return (
                                            getFieldDecorator(`${value.value}`, {
                                                rules: [
                                                    {
                                                        required: value.rule,
                                                        message: `请选择${value.name}`,
                                                    },
                                                ],
                                                ...value.options
                                            })(
                                                <Select
                                                    placeholder={`请选择${value.name}`}
                                                    onChange={value.changeHandle ? value.changeHandle : null}
                                                    style={{ width: '100%' }}
                                                    >
                                                    {
                                                        value.option && value.option.map((val, key) => {
                                                        return <Option key={key} value={val.value}>{val.name}</Option>
                                                        })
                                                    }
                                                </Select>
                                            )
                                        )
                                    case 'rangePicker':
                                        return (
                                            getFieldDecorator(`${value.value}`, {
                                                rules: [
                                                {
                                                    required: value.rule,
                                                    message: '请选择起止日期',
                                                },
                                                ],
                                            })(<RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />)
                                        )
                                    case 'textArea': 
                                        return (
                                            getFieldDecorator(`${value.value}`, {
                                                rules: [
                                                {
                                                    required: value.rule,
                                                    message: `请输入${value.name}`,
                                                },
                                                ],
                                            })(
                                                <TextArea
                                                style={{ minHeight: 32 }}
                                                placeholder={`请输入${value.name}`}
                                                rows={4}
                                                />
                                            )
                                        )
                                    case 'radio':
                                        return (
                                            getFieldDecorator(`${value.value}`, {
                                                rules: [
                                                {
                                                    required: value.rule,
                                                    message: `请选择${value.name}`,
                                                },
                                                ],
                                            })(
                                                <Radio.Group>
                                                    {
                                                        value.radio.map((val, key) => {
                                                        return  <Radio value={val.value} key={key}>{val.name}</Radio>
                                                        })
                                                    }
                                                </Radio.Group>
                                            )
                                        )
                                    case 'checkbox': 
                                        return (
                                            getFieldDecorator(`${value.value}`, {
                                                rules: [
                                                {
                                                    required: value.rule,
                                                    message: `请选择${value.name}`,
                                                },
                                                ],
                                            })(
                                                <CheckboxGroup options={value.checkbox} />
                                            )
                                        )
                                    case 'upload':
                                        return (
                                            <div className="clearfix">
                                                <Upload
                                                name="images"
                                                action={ value.action }
                                                data={value.upData}
                                                listType="picture-card"
                                                fileList={this.state.fileList}
                                                defaultFileList={this.state.fileList}
                                                onPreview={this.handlePreview}
                                                onChange={this.handleChange}
                                                >
                                                {this.state.fileList.length >= value.length ? null : this.uploadButton}
                                                </Upload>
                                                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                                <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                                </Modal>
                                            </div>
                                        )
                                }
                            })()
                        }
                    </FormItem>
                    
                })
            }
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
    );
  }
}
