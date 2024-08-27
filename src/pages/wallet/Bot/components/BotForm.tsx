import { createBot } from '@/services/wallet/bot'
import { PlusCircleOutlined } from '@ant-design/icons'
import { ModalForm, ProFormText } from '@ant-design/pro-components'
import { Button, Form, message } from 'antd'
import React from 'react'

const BotForm = () => {
  const [form] = Form.useForm<API.Bot>()

  const handleFinish = async () => {
    const bot = await form.validateFields()

    if (bot) {
      createBot(bot).then(resp => {
        if (resp.success) {
          message.success('创建成功');
        }
      })
    }
  }

  return (
    <ModalForm<API.Bot> 
      form={form}
      width={'400px'}
      title={'Transaction'} 
      autoFocusFirstInput 
      trigger={
        <Button type="primary" size='large' icon={<PlusCircleOutlined />} block>Add</Button>
      }
      modalProps={{
        onCancel: () => form.resetFields(),
      }}
      
      onFinish={handleFinish}>
        <ProFormText
          width="md"
          name="name"
          label="名称"
          placeholder="请输入名称"
        />
        <ProFormText
          width="md"
          name="token"
          label="Token"
          placeholder="请输入Token"
        />

    </ModalForm>
    )
}

export default BotForm
