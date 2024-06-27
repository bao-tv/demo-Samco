import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import DistanceSetupPage from '../../pages/layout-distance/DistanceSetupPage'
import ProvinceSetupPage from '../../pages/layout-province/ProvinceSetupPage'


type Props = {}

const DefinePagesBreadCrumbs: Array<PageLink> = [
    {
      title: 'Khoảng cách',
      path: '/dinh-nghia/khoang-cach',
      isSeparator: false,
      isActive: true,
    },
    {
      title: 'Tỉnh nhận hàng',
      path: '/dinh-nghia/tinh-nhan-hang',
      isSeparator: false,
      isActive: false,
    },
  ]

const DefinePage = (props: Props) => {
  return (
    <Routes>
        <Route
          path='khoang-cach'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>Khoảnh cách</PageTitle>
              <DistanceSetupPage />
            </>
          }
        />
        <Route
          path='tinh-nhan-hang'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>Tỉnh nhận hàng</PageTitle>
              <ProvinceSetupPage />
            </>
          }
        />
        <Route index element={<Navigate to='/dinh-nghia/khoang-cach' />} />
      {/* <Route element={<Outlet />}> */}
      {/* </Route> */}
    </Routes>
  )
}

export default DefinePage