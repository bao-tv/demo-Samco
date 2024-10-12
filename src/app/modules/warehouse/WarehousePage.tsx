import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import WarehousesSetupPage from '../../pages/warehouse/WarehousesSetupPage'

type Props = {}
const WarehousePagesBreadCrumbs: Array<PageLink> = [
  {
    title: 'Hàng trong kho',
    path: '/quan-ly-kho/hang-trong-kho',
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

const WarehousePage = (props: Props) => {
  const intl = useIntl()
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='hang-trong-kho'
          element={
            <>
              <PageTitle breadcrumbs={WarehousePagesBreadCrumbs}>
                {intl.formatMessage({id: 'MENU.HANGTRONGKHO'})}
              </PageTitle>
              <WarehousesSetupPage />
            </>
          }
        />
        <Route index element={<Navigate to='/quan-ly-kho/hang-trong-kho' />} />
      </Route>
    </Routes>
  )
}

export default WarehousePage
