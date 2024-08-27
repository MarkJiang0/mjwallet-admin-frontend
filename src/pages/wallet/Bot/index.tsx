import { AddButton } from '@/components/Button'
import { queryBots } from '@/services/wallet/bot'
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import { Input, Modal, Row, Tag } from 'antd'
import React, { useState } from 'react'
import { useIntl } from 'umi'
import BotForm from './components/BotForm'

const Bot = () => {
  const intl = useIntl()

  const columns: ProColumns<API.Bot>[] = [
    {
      title: intl.formatMessage({ id: 'pages.wallet.bot.form.name' }),
      dataIndex: 'name',
      ellipsis: true,
      width: 220,
      key: 'name', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.wallet.bot.form.status' }),
      dataIndex: 'status',
      ellipsis: true,
      width: 100,
      key: 'status', // Query field name
      align: 'center',
      render: (_, record) => {
        const status = record.status;
        return (
          <Tag color={status === 1 ? 'success' : 'error'}>
            {status === 1
              ? intl.formatMessage({ id: 'pages.wallet.bot.form.status.enable' })
              : intl.formatMessage({ id: 'pages.wallet.bot.form.status.disable' })}
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
      <ProTable<API.Bot, API.PaginationParam>
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
        request={queryBots}
        toolBarRender={() => [
          <BotForm />,
        ]}
        >

      </ProTable>
      
    </PageContainer>
  )
}

export default Bot
