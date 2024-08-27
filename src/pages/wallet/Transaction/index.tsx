import { queryTransactions } from '@/services/wallet/transaction'
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import { Tag } from 'antd'
import React from 'react'
import { useIntl } from 'umi'

const Transaction = () => {
  const intl = useIntl()
  


  const columns: ProColumns<API.Transaction>[] = [
    {
      title: intl.formatMessage({ id: 'pages.wallet.transaction.form.from_address' }),
      dataIndex: 'from_address',
      ellipsis: true,
      width: 220,
      key: 'from_address', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.wallet.transaction.form.to_address' }),
      dataIndex: 'to_address',
      ellipsis: true,
      width: 220,
      key: 'to_address', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.wallet.transaction.form.amount' }),
      dataIndex: 'amount',
      ellipsis: true,
      width: 100,
      align: 'right',
      key: 'amount', // Query field name
      render: (_, record) => {
        const amount = record.amount;
        return (
          <span>{amount / 1000000}</span>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.wallet.transaction.form.coin' }),
      dataIndex: 'coin',
      ellipsis: true,
      width: 60,
      key: 'coin', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.wallet.transaction.form.status' }),
      dataIndex: 'status',
      ellipsis: true,
      width: 60,
      key: 'status', // Query field name
      render: (_, record) => {
        const status = record.status;
        return (
          <Tag color={status === 1 ? 'success' : 'error'}>
            {status === 1
              ? intl.formatMessage({ id: 'pages.wallet.transaction.form.status.success' })
              : intl.formatMessage({ id: 'pages.wallet.transaction.form.status.failed' })}
          </Tag>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.wallet.transaction.form.confirm_status' }),
      dataIndex: 'confirm_status',
      ellipsis: true,
      width: 60,
      key: 'confirm_status', // Query field name
      render: (_, record) => {
        const confirm_status = record.confirm_status;
        return (
          <Tag color={confirm_status === 1 ? 'success' : 'error'}>
            {confirm_status === 1
              ? intl.formatMessage({ id: 'pages.wallet.transaction.form.status.confirmed' })
              : intl.formatMessage({ id: 'pages.wallet.transaction.form.status.unconfirmed' })}
          </Tag>
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
        request={queryTransactions}
        >

      </ProTable>
      
    </PageContainer>
  )
}

export default Transaction
