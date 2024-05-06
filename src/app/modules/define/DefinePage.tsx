import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import DistanceSetupPage from '../../pages/layout-distance/DistanceSetupPage'


type Props = {}

const DefinePagesBreadCrumbs: Array<PageLink> = [
    {
      title: 'Khoảng cách',
      path: '/gia-cuoc',
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

const DefinePage = (props: Props) => {
  return (
    <Routes>
        <Route
          path='khoang-cach'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>Định nghĩa khoảnh cách</PageTitle>
              <DistanceSetupPage />
            </>
          }
        />
        <Route index element={<Navigate to='/gia-cuoc/khoang-cach' />} />
      {/* <Route element={<Outlet />}> */}
      {/* </Route> */}
    </Routes>
  )
}

export default DefinePage