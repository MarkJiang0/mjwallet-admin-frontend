import { ModalForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Form, Image, Input, Modal, Select, message } from 'antd';
import React from 'react'
import { useIntl } from 'umi';
import { useTransactionForm } from '../hooks/useTransactionForm';
import { TransactionOutlined } from '@ant-design/icons';
import { render } from 'react-dom';
import { transaction } from '@/services/wallet/account';
import UsdtLogo from '../img/tether-usdt-logo.png'
import TrxLogo from '../img/tron-trx-logo.png'


type TransModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  id?: string;
  parentID?: string;
  title: string;
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};



const TransactionForm = ({fromAddress}: {fromAddress: string}) => {
  const intl = useIntl()
  const [form] = Form.useForm<API.Transaction>()

  const handleFinish = async () => {
    const trans = await form.validateFields()
    if (trans) {
      trans.from_address = fromAddress
      if (!trans.coin) {
        trans.coin = 'TRX'
      }
      transaction(trans).then(resp => {
        if (resp) {
          message.success('交易成功');
        }
      })
    }
  }

  return (
    <ModalForm<API.Transaction> 
      form={form}
      width={'400px'}
      title={'Transaction'} 
      autoFocusFirstInput 
      trigger={
        <Button type="primary" size='large' icon={<TransactionOutlined />} block>Transaction</Button>
      }
      modalProps={{
        onCancel: () => form.setFieldValue('amount', 0),
      }}
      onFinish={handleFinish}>
        <ProFormText
          width="md"
          name="to_address"
          label="目标地址"
          placeholder="请输入目标地址"
        />
        <ProFormText
          width="md"
          name="amount"
          label="数量"
          placeholder="请输入转账数量"
        />
        <ProFormSelect 
          
          width={'md'}
          name="coin"
          label="币种"
          fieldProps={{
            labelInValue: false,
            defaultValue: 'TRX',
            optionItemRender(item) {
              return (<>{item.value === 'TRX' ? <Image src={TrxLogo} width={'30px'}/> : <Image src={UsdtLogo} width={'30px'}/>} <span style={{padding: '0px 5px'}}>{item.label}</span></>)
            }
          }}
          
          request={async () => [
            { label: 'TRX', value: 'TRX' },
            { label: 'USDT', value: 'USDT' },
          ]}
          />

    </ModalForm>
  )
}

export default TransactionForm
