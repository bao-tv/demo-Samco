import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'

const PrivateRoutes = () => {
  const OrderManagement = lazy(() => import('../modules/orderPage/OrderPage'))
  const DistanceSetupPage = lazy(() => import('../modules/define/DefinePage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  // const DistanceSetupPageWrapper = lazy(() => import('../pages/layout-distance/DistanceSetupPageWrapper'))
  
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        
        <Route path='auth/*' element={<Navigate to='/thong-tin-chung' />} />
        {/* Pages */}
        <Route path='thong-tin-chung' element={<DashboardWrapper />} />
        {/* <Route path='phieu-nhan-hang' element={<BuilderPageWrapper />} />
        <Route path='phieu-nhan-hang-da-xoa' element={<BuilderPageWrapperDelete />} /> */}
        {/* <Route path='menu-test' element={<MenuTestPage />} /> */}
        {/* Lazy Modules */}
        <Route
          path='quan-ly-don-hang/don-hang/*'
          element={
            <SuspensedView>
              <OrderManagement />
            </SuspensedView>
          }
        />
        <Route
          path='/dinh-nghia/*'
          element={
            <SuspensedView>
              <DistanceSetupPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
