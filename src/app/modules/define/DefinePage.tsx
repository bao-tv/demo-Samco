import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
// import DistanceSetupPage from '../../pages/layout-distance/DistanceSetupPage'
import ProvinceSetupPage from '../../pages/layout-province/ProvinceSetupPage'
import PackSetupPage from '../../pages/layout-pack-normal/PackagePriceSetupPage'
import {useIntl} from 'react-intl'
import RegionSetupPage from '../../pages/layout-region/RegionSetupPage'
import DistrictsSetupPage from '../../pages/layout-districts/DistrictsSetupPage'
import CommunesSetupPage from '../../pages/layout-commune/CommunesSetupPage'
import Region_Freight_Prices_SetupPage from '../../pages/layout-regions-freight-prices/Region_Freight_Prices_SetupPage'
import Region_Rates_SetupPage from '../../pages/layout-regions-rates/Region_Rates_SetupPage'
import CBM_Rates_SetupPage from '../../pages/layout-cbm-rates/CBM_Rates_SetupPage'
import PackageCBMPriceSetupPage from '../../pages/layout-pack-cbm/PackageCBMPriceSetupPage'
import PercentageSetupPage from '../../pages/layout-percentage/percentageSetupPage'

type Props = {}
const DefinePagesBreadCrumbs: Array<PageLink> = [
  {
    title: 'Phần trăm',
    path: '/dinh-nghia/chung/phan-tram',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Khu vực',
    path: '/dinh-nghia/vi-tri/khu-vuc',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Tỉnh nhận hàng',
    path: '/dinh-nghia/vi-tri/tinh',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Huyện nhận hàng',
    path: '/dinh-nghia/vi-tri/huyen',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Đóng gói thường',
    path: '/dinh-nghia/dong-goi/thuong',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Đóng gói cbm',
    path: '/dinh-nghia/dong-goi/cbm',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Vùng',
    path: '/dinh-nghia/gia/vung',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Giá theo KG',
    path: '/dinh-nghia/gia/kg',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Giá theo CBM',
    path: '/dinh-nghia/gia/cbm',
    isSeparator: false,
    isActive: false,
  },
]

const DefinePage = (props: Props) => {
  const intl = useIntl()
  return (
    <Routes>
      <Route path='chung'>
        <Route
          path='phan-tram'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>{intl.formatMessage({id: 'MENU.PHI-THUE'})}</PageTitle>
              <PercentageSetupPage />
            </>
          }
        />
        <Route
          path='tinh'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>{intl.formatMessage({id: 'MENU.TINHNHANHANG'})}</PageTitle>
              <ProvinceSetupPage />
            </>
          }
        />
        <Route
          path='huyen'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>{intl.formatMessage({id: 'MENU.HUYENNHANHANG'})}</PageTitle>
              <DistrictsSetupPage />
            </>
          }
        />
        <Route
          path='xa'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>{intl.formatMessage({id: 'MENU.XANHANHANG'})}</PageTitle>
              <CommunesSetupPage />
            </>
          }
        />
      </Route>
      <Route path='vi-tri'>
        <Route
          path='khu-vuc'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>{intl.formatMessage({id: 'MENU.KHUVUC'})}</PageTitle>
              <RegionSetupPage />
            </>
          }
        />
        <Route
          path='tinh'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>{intl.formatMessage({id: 'MENU.TINHNHANHANG'})}</PageTitle>
              <ProvinceSetupPage />
            </>
          }
        />
        <Route
          path='huyen'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>{intl.formatMessage({id: 'MENU.HUYENNHANHANG'})}</PageTitle>
              <DistrictsSetupPage />
            </>
          }
        />
        <Route
          path='xa'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>{intl.formatMessage({id: 'MENU.XANHANHANG'})}</PageTitle>
              <CommunesSetupPage />
            </>
          }
        />
      </Route>
      <Route path='gia'>
        <Route
          path='vung'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>{intl.formatMessage({id: 'MENU.VUNGGIA'})}</PageTitle>
              <Region_Freight_Prices_SetupPage />
            </>
          }
        />

        <Route
          path='kg'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>{intl.formatMessage({id: 'MENU.GIAKG'})}</PageTitle>
              <Region_Rates_SetupPage />
            </>
          }
        />
        <Route
          path='cbm'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>{intl.formatMessage({id: 'MENU.GIACBM'})}</PageTitle>
              <CBM_Rates_SetupPage />
            </>
          }
        />
      </Route>
      <Route path='dong-goi'>
        <Route
          path='thuong'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>{intl.formatMessage({id: 'MENU.DONGGOITHUONG'})}</PageTitle>
              <PackSetupPage />
            </>
          }
        />
        <Route
          path='cbm'
          element={
            <>
              <PageTitle breadcrumbs={DefinePagesBreadCrumbs}>{intl.formatMessage({id: 'MENU.DONGGOICBM'})}</PageTitle>
              <PackageCBMPriceSetupPage />
            </>
          }
        />
      </Route>
      {/* <Route element={<Outlet />}>
      </Route> */}
    </Routes>
  )
}

export default DefinePage
