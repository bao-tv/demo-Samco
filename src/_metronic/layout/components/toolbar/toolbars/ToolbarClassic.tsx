/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useState} from 'react'
import { useLocation } from 'react-router-dom';
import {KTIcon} from '../../../../helpers'
import {CreateAppModal, Dropdown1} from '../../../../partials'
import {useLayout, usePageData} from '../../../core'
import { BuilderPage } from '../../../../../app/pages/layout-builder/BuilderPage'
import { useIntl } from 'react-intl';

const ToolbarClassic = () => {
  const {config} = useLayout();
  const intl = useIntl();
  const {showCreateAppModal, setShowCreateAppModal, setShowModalDistance, setShowModalProvince, setShowModalPackage} = usePageData();
  const location = useLocation();
  // console.log('bao showCreateAppModal: ', showCreateAppModal);
  // const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const daterangepickerButtonClass = config.app?.toolbar?.fixed?.desktop
    ? 'btn-light'
    : 'bg-body btn-color-gray-700 btn-active-color-primary'
  return (
    <div className='d-flex align-items-center gap-2 gap-lg-3'>
      {/* {config.app?.toolbar?.filterButton && (
        <div className='m-0'>
          <a
            href='#'
            className={clsx('btn btn-sm btn-flex fw-bold', daterangepickerButtonClass)}
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
          >
            <KTIcon iconName='filter' className='fs-6 text-muted me-1' />
            Filter
          </a>
          <Dropdown1 />
        </div>
      )} */}

      {config.app?.toolbar?.daterangepickerButton && (
        <div
          data-kt-daterangepicker='true'
          data-kt-daterangepicker-opens='left'
          className={clsx(
            'btn btn-sm fw-bold  d-flex align-items-center px-4',
            daterangepickerButtonClass
          )}
        >
          <div className='text-gray-600 fw-bold'>Loading date range...</div>
          <KTIcon iconName='calendar-8' className='fs-1 ms-2 me-0' />
        </div>
      )}

      {config.app?.toolbar?.secondaryButton && (
        <a href='#' className='btn btn-sm btn-flex btn-light fw-bold'>
          Filter
        </a>
      )}

      {config.app?.toolbar?.primaryButton && location.pathname === '/quan-ly-don-hang/don-hang/phieu-nhan-hang' && (
        <div
          onClick={() => (setShowCreateAppModal && setShowCreateAppModal(true))}
          className='btn btn-sm fw-bold btn-primary'
        >
          Tạo Phiếu nhận hàng
        </div>
      )}
      {config.app?.toolbar?.primaryButton && location.pathname === '/dinh-nghia/khoang-cach' && (
        <div
          onClick={() => (setShowModalDistance && setShowModalDistance(true))}
          className='btn btn-sm fw-bold btn-primary'
        >
          {`Tạo ${intl.formatMessage({id: 'MENU.KHOANGCACH'})}`}
        </div>
      )}
      {config.app?.toolbar?.primaryButton && location.pathname === '/dinh-nghia/tinh-nhan-hang' && (
        <div
          onClick={() => (setShowModalProvince && setShowModalProvince(true))}
          className='btn btn-sm fw-bold btn-primary'
        >
          {`Tạo ${intl.formatMessage({id: 'MENU.TINHNHANHANG'})}`}
        </div>
      )}
      {config.app?.toolbar?.primaryButton && location.pathname === '/dinh-nghia/dong-goi' && (
        <div
          onClick={() => (setShowModalPackage && setShowModalPackage(true))}
          className='btn btn-sm fw-bold btn-primary'
        >
          {`Tạo ${intl.formatMessage({id: 'MENU.DONGGOI'})}`}
        </div>
      )}
      {/* <CreateAppModal
        show={showCreateAppModal} 
        handleClose={handleClose} 
        content={<BuilderPage handleClose={handleClose}/>}
      /> */}
    </div>
  )
}

export {ToolbarClassic}
