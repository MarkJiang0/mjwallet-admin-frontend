import React, { useEffect, useState } from 'react'
import styles from './wallet.less';
import { Button, Card, Col, Image, Input, List, Modal, Row, Tabs, Tooltip, message } from 'antd';
import { BlockOutlined, CaretDownOutlined, CopyOutlined, PlusCircleOutlined, ReloadOutlined, SearchOutlined, TransactionOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import { UsdtSvg } from '@/components/Svg/icon/usdt';
import UsdtLogo from './img/tether-usdt-logo.png'
import TrxLogo from './img/tron-trx-logo.png'
import { changeDefaultAccount, createAccount, fetchAccounts, fetchCurrentUserAccounts, getAccountByAddress } from '@/services/wallet/account';
import _ from 'lodash';
import { useIntl } from 'umi'
import TransactionForm from './components/TransactionForm';

const defaultAccountStyle = {
  cursor:'pointer', 
  borderLeft: '2px solid #1890FF', 
  padding: '5px 5px', 
  backgroundColor: '#E2F2FA'
}

const Wallet = () => {
  const [accountList, setAccountList] = useState<API.Account[] | undefined>([])
  const [currentAccount, setCurrentAccount] = useState<API.Account | null>(null)
  const [isChangeAccountModalOpen, setIsChangeAccountModalOpen] = useState(false);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [newAccountName, setNewAccountName] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<API.Account | null>(null);

  const reloadAccount = () => {
    fetchCurrentUserAccounts().then(resp => {
      
      resp.data?.forEach(a => {
        if (a.default) {
          setCurrentAccount(a)
          // getAccountByAddress(a.address_base_58).then(res => {
          //   if (res.success && res.data) {
          //     setCurrentAccount(res.data)
          //   }
          // })
          return
        }
      })
      if (resp.data) {
        const removedList = _.remove(resp.data, a => a.default)
        setAccountList(removedList.concat(resp.data))
      }
      
    })
  }

  const showChangeAccountModal = () => {
    setSelectedAccount(currentAccount)
    setIsChangeAccountModalOpen(true);
  };

  const handleChangeAccountOk = () => {
    if (selectedAccount?.address_base_58) {
      changeDefaultAccount(selectedAccount?.address_base_58).then(resp => {
        if (resp.success) {
          reloadAccount()
        }
      })
    }
    
    setIsChangeAccountModalOpen(false);
  };

  const handleChangeAccountCancel = () => {
    setIsChangeAccountModalOpen(false);
  };

  const showAddAccountModal = () => {
    setIsAddAccountModalOpen(true);
  };

  const handleAddAccountOk = () => {
    createAccount(newAccountName).then(resp => {
      if (resp.success) {
        message.success('Create account success');
        reloadAccount()
      }
    })
    setIsAddAccountModalOpen(false);
  };

  const handleAddAccountCancel = () => {
    setIsAddAccountModalOpen(false);
  }

  const hanldeRefreshAccount = () => {
    if (currentAccount) {
      getAccountByAddress(currentAccount?.address_base_58).then(resp => {
        if (resp.success && resp.data) {
          setCurrentAccount(resp.data)
        }
      })
    }
  }

  

  useEffect(() => {
    reloadAccount()
  }, [])


  return (
    <>
      <Row justify={'center'} align={'middle'}>
      <Card style={{ width: 500 }}>
        <Row justify={'center'} align={'middle'} style={{borderBottom: '1px solid'}}>
          <Row justify={'space-between'} align={'middle'} >
            <Col span={1}></Col>
            <Col span={22}>
              <Button type="text" icon={<CaretDownOutlined />} onClick={showChangeAccountModal}>{currentAccount?.name}</Button>
            </Col>
            <Col span={1}>
              <Button type="text" icon={<ReloadOutlined />} onClick={hanldeRefreshAccount} />
            </Col>
            
          </Row>
          <Row justify={'center'} align={'middle'}>
            <Tooltip title="复制到剪贴板" placement='right'>
              <Button type="text" icon={<CopyOutlined />}>{currentAccount?.address_base_58}</Button><Tooltip/>
            </Tooltip>
          </Row>

        </Row>
        <Row justify={'center'} align={'middle'} style={{padding: '20px 0px'}}>
          <Row justify={'center'} align={'middle'} style={{fontSize: '40px'}}>
            {currentAccount?.balance / 1000000 + ' TRX'}
          </Row>
        </Row>
        <Row justify={'center'} align={'middle'}>
          {/* <Button type="primary" size='large' icon={<TransactionOutlined />} block>Transaction</Button> */}
          <TransactionForm fromAddress={currentAccount?.address_base_58} />
        </Row>
        <Row>
          <Tabs defaultActiveKey="1" items={[{key: '1',label: 'Assets'}]} />
        </Row>
        <Row justify={'space-between'} style={{padding: '10px 0px', cursor: 'pointer'}}>
          <Col span={6}><Image src={TrxLogo} width={'30px'}/> <span style={{padding: '0px 5px'}}>TRX</span> </Col>
          <Col span={12}><div style={{width:'100%', textAlign:'right'}}>{currentAccount?.balance / 1000000}</div></Col>
        </Row>
        <Row justify={'space-between'} style={{padding: '10px 0px', cursor: 'pointer'}}>
          <Col span={6}><Image src={UsdtLogo} width={'30px'}/><span style={{padding: '0px 5px'}}>USDT</span></Col>
          <Col span={12}><div style={{width:'100%', textAlign:'right'}}>{currentAccount?.usdt_balance}</div></Col>
        </Row>
      </Card>
      </Row>


      <Modal title="Account Select" open={isChangeAccountModalOpen} onOk={handleChangeAccountOk} onCancel={handleChangeAccountCancel}>
        <List 
          
          itemLayout='horizontal' 
          dataSource={accountList}
          renderItem={(item: API.Account, index: number) => (
            <List.Item style={selectedAccount?.id === item.id ? defaultAccountStyle : {cursor: 'pointer', padding: '5px 5px',}} key={item.id} onClick={() => setSelectedAccount(item)}>
              <List.Item.Meta title={item.name} description={item.address_base_58}/>
              <span>{item.balance + ' TRX'}</span>
            </List.Item>
          )} />
        <Row style={{paddingTop: '5px'}}>
          <Button type="primary" size='large' icon={<PlusCircleOutlined />} block  onClick={showAddAccountModal}>Add account</Button>
        </Row>
      </Modal>

      <Modal title="Create Account" open={isAddAccountModalOpen} onOk={handleAddAccountOk} onCancel={handleAddAccountCancel}>
        <Row>
          <Input placeholder="Please input account name" value={newAccountName} onChange={e => setNewAccountName(e.target.value)}/>
        </Row>
      </Modal>
      
    </>
    
  )
}

export default Wallet
