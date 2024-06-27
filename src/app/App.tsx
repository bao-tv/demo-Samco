import {Suspense, useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { province } from '../slices/provinceSlices'

const App = () => {
  const dispath = useDispatch();
  useEffect(() => {
    dispath( province());
  }, []);
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
            <ToastContainer />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
