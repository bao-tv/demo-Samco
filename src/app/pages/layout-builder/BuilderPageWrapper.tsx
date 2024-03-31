import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {BuilderPage} from './BuilderPage'
import OrderManagement from './OrderManagement'

const BuilderPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Quản lý đơn hàng</PageTitle>
      <OrderManagement />
    </>
  )
}

export default BuilderPageWrapper
