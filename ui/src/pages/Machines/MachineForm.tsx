import React from 'react'
import {
  Form,
  Input,
  Checkbox,
  Button,
  Collapse,
  Space,
  Select,
  Typography,
} from 'antd'
import uniqid from 'uniqid'

export interface IMachine {
  id: string
  name: string
  host: string
  port: number

  isPubKeyAuth: boolean
  privateKey: string
  privateKeyPassword: string

  username: string
  password: string

  dc: string
  rack: string
}

const defMachine: IMachine = {
  id: '',
  name: '',
  host: '',
  port: 22,

  isPubKeyAuth: false,
  privateKey: '',
  privateKeyPassword: '',

  username: '',
  password: '',

  dc: '',
  rack: '',
}

export interface IMachineFormProps {
  machine?: IMachine
  machines: { [key: string]: IMachine }
  onAdd?: (machine: IMachine) => void
  onUpdate?: (machine: IMachine) => void
}

export default function MachineForm({
  machine,
  machines,
  onAdd,
  onUpdate,
}: IMachineFormProps) {
  const [form] = Form.useForm()

  const addNew: boolean = machine === undefined

  function onReset() {
    form.resetFields()
  }

  function handleFinish(values: any) {
    if (values.name === '') {
      values.name = `${values.username}@${values.host}:${values.port}`
    }
    if (addNew) {
      onAdd &&
        onAdd({
          ...defMachine,
          ...(values as IMachine),
          id: uniqid(),
        })
    } else {
      onUpdate &&
        onUpdate({
          ...defMachine,
          ...(values as IMachine),
          id: machine!.id,
        })
    }
  }

  function handleTemplateChange(machineID: string) {
    const m = machines[machineID]
    form.setFieldsValue({
      port: m.port,

      isPubKeyAuth: m.isPubKeyAuth,
      privateKey: m.privateKey,
      privateKeyPassword: m.privateKeyPassword,

      username: m.username,
      password: m.password,

      dc: m.dc,
      rack: m.rack,
    })
  }

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      initialValues={addNew ? defMachine : machine}
    >
      <Collapse defaultActiveKey={['import', 'basic']} bordered={false}>
        {addNew && (
          <Collapse.Panel key="import" header="导入模板">
            <Form.Item label="以现有主机配置作为模板">
              <Select placeholder="选择模板" onChange={handleTemplateChange}>
                {Object.values(machines).map((m) => {
                  return (
                    <Select.Option value={m.id} label={m.name} key={m.id}>
                      <div>{m.name}</div>
                      <div>
                        <Typography.Text type="secondary">
                          {m.username}@{m.host}:{m.port}
                        </Typography.Text>
                      </div>
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Collapse.Panel>
        )}

        <Collapse.Panel key="basic" header="详细配置">
          <Form.Item label="唯一名称" name="name">
            <Input placeholder="留空自动生成" />
          </Form.Item>
          <Form.Item
            label="地址"
            name="host"
            rules={[
              {
                required: true,
                message: '请输入主机地址',
              },
            ]}
          >
            <Input placeholder="主机地址，IP 或域名" />
          </Form.Item>
          <Form.Item
            label="端口"
            name="port"
            rules={[
              {
                required: true,
                message: '请输入端口',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="登录用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入登录用户名',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="isPubKeyAuth" valuePropName="checked">
            <Checkbox>使用私钥登录</Checkbox>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.isPubKeyAuth !== currentValues.isPubKeyAuth
            }
          >
            {({ getFieldValue }) => {
              return getFieldValue('isPubKeyAuth') ? (
                <>
                  <Form.Item
                    label="私钥"
                    name="privateKey"
                    rules={[
                      {
                        required: true,
                        message: '请输入私钥',
                      },
                    ]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item label="私钥密码" name="privateKeyPassword">
                    <Input.Password />
                  </Form.Item>
                </>
              ) : (
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入登录密码',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              )
            }}
          </Form.Item>
        </Collapse.Panel>

        <Collapse.Panel key="advance" header="高级配置">
          <Form.Item label="位置标签: DC" name="dc">
            <Input />
          </Form.Item>
          <Form.Item label="位置标签: Rack" name="rack">
            <Input />
          </Form.Item>
        </Collapse.Panel>

        <Form.Item style={{ padding: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              {addNew ? '添加' : '更新'}
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Collapse>
    </Form>
  )
}
