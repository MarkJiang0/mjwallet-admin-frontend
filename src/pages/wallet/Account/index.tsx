import { fetchAccounts } from '@/services/wallet/account'
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import React, { useRef } from 'react'
import { useIntl } from 'umi'

const Account = () => {
  const intl = useIntl()
  


  const columns: ProColumns<API.Account>[] = [
    {
      title: intl.formatMessage({ id: 'pages.wallet.account.form.username' }),
      dataIndex: 'username',
      ellipsis: true,
      width: 100,
      key: 'username', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.wallet.account.form.name' }),
      dataIndex: 'name',
      ellipsis: true,
      width: 160,
      key: 'name', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.wallet.account.form.address' }),
      dataIndex: 'address_base_58',
      ellipsis: true,
      width: 200,
      key: 'address', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.wallet.account.form.balance' }),
      dataIndex: 'balance',
      ellipsis: true,
      width: 60,
      key: 'balance', // Query field name
      align: 'right',
      render: (_, record) => {
        const b = record.balance??0;
        return (
          <span>{b / 1000000}</span>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.wallet.account.form.usdtbalance' }),
      dataIndex: 'usdt_balance',
      ellipsis: true,
      width: 60,
      key: 'usdt_balance', // Query field name
      align: 'right',
      render: (_, record) => {
        const b = record.usdt_balance??0;
        return (
          <span>{b / 1000000}</span>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.system.user.form.created_at' }),
      dataIndex: 'created_at',
      valueType: 'dateTime',
      search: false,
      width: 180,
      align: 'center'
    },
  ]

  return (
    <PageContainer>
      <ProTable<API.Account, API.PaginationParam>
        columns={columns}
        rowKey="id"
        cardBordered
        pagination={{pageSize: 10, showSizeChanger: true}}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
        }}
        dateFormatter="string"
        request={fetchAccounts}
        >

      </ProTable>
      
    </PageContainer>
  )
}

export default Account
