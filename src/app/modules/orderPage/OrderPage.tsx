import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import OrderManagement from '../../pages/layout-order/OrderSetupPage'
import OrderManagementDelete from '../../pages/layout-builder-delete/OrderManagementDelete'

type Props = {}

const OrderManagementsBreadCrumbs: Array<PageLink> = [
    {
      title: 'Đơn hàng',
      path: '/quan-ly-don-hang/don-hang',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

const OrderPage = (props: Props) => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='phieu-nhan-hang'
          element={
            <>
              <PageTitle breadcrumbs={OrderManagementsBreadCrumbs}>Phiếu nhận hàng</PageTitle>
              <OrderManagement />
            </>
          }
        />
         <Route
          path='phieu-nhan-hang-da-xoa'
          element={
            <>
              <PageTitle breadcrumbs={OrderManagementsBreadCrumbs}>Phiếu nhận hàng đã xóa</PageTitle>
              <OrderManagementDelete />
            </>
          }
        />
        <Route index element={<Navigate to='/quan-ly-don-hang/don-hang/phieu-nhan-hang' />} />
      </Route>
    </Routes>
  )
}

export default OrderPage