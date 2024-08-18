/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {KTIcon} from '../../../../helpers'
import {useLayout, usePageData} from '../../../core'
// import OrderPage from '../../../../../app/pages/layout-order/ModalOrderPage'
import {useIntl} from 'react-intl'
import ButtonCreate from '../../../../helpers/components/ButtonCreate'
import SearchData from '../../../../helpers/components/SearchData'

const ToolbarClassic = () => {
  const {config} = useLayout()
  const intl = useIntl()
  const {
    setShowModalRegion,
    setShowModalOrder,
    setShowModalProvince,
    setShowModalDistrict,
    setShowModalCommune,
    setShowModalPackagePrice,
    setShowModalRegion_Freight_Price,
    setShowModalRegion_Rate,
    setShowModalCBM_Rate,
    setShowModalPackageCBMPrice,
    setSearchData,
  } = usePageData()
  const location = useLocation()
  // console.log('bao showCreateAppModal: ', showCreateAppModal);
  // const [showCreateAppModal, setShowModalOrder] = useState<boolean>(false)
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

      {config.app?.toolbar?.primaryButton &&
        location.pathname === '/quan-ly-don-hang/don-hang/phieu-nhan-hang' && (
          <>
            <ButtonCreate setData={setShowModalOrder} title={`Tạo Phiếu nhận hàng`} />
          </>
        )}
      {config.app?.toolbar?.primaryButton && location.pathname === '/dinh-nghia/vi-tri/khu-vuc' && (
        <>
          <ButtonCreate
            setData={setShowModalRegion}
            title={`Tạo ${intl.formatMessage({id: 'MENU.KHUVUC'})}`}
          />
        </>
      )}
      {config.app?.toolbar?.primaryButton && location.pathname === '/dinh-nghia/vi-tri/tinh' && (
        <>
          <ButtonCreate
            setData={setShowModalProvince}
            title={`Tạo ${intl.formatMessage({id: 'MENU.TINHNHANHANG'})}`}
          />
        </>
      )}
      {config.app?.toolbar?.primaryButton && location.pathname === '/dinh-nghia/vi-tri/huyen' && (
        <>
          <SearchData handleClick={(value: any) => setSearchData && setSearchData(value)} placeholder={`Tìm ${intl.formatMessage({id: 'MENU.HUYENNHANHANG'})}...`}/>
          <ButtonCreate
            setData={setShowModalDistrict}
            title={`Tạo ${intl.formatMessage({id: 'MENU.HUYENNHANHANG'})}`}
          />
        </>
      )}
      {config.app?.toolbar?.primaryButton && location.pathname === '/dinh-nghia/vi-tri/xa' && (
        <>
          <SearchData handleClick={(value: any) => setSearchData && setSearchData(value)} placeholder={`Tìm ${intl.formatMessage({id: 'MENU.XANHANHANG'})}...`}/>
          <ButtonCreate
            setData={setShowModalCommune}
            title={`Tạo ${intl.formatMessage({id: 'MENU.XANHANHANG'})}`}
          />
        </>
      )}
      {config.app?.toolbar?.primaryButton && location.pathname === '/dinh-nghia/gia/vung' && (
        <>
          <ButtonCreate
            setData={setShowModalRegion_Freight_Price}
            title={`Tạo ${intl.formatMessage({id: 'MENU.VUNGGIA'})}`}
          />
        </>
      )}
      {config.app?.toolbar?.primaryButton && location.pathname === '/dinh-nghia/gia/kg' && (
        <>
          <ButtonCreate
            setData={setShowModalRegion_Rate}
            title={`Tạo ${intl.formatMessage({id: 'MENU.GIAKG'})}`}
          />
        </>
      )}

      {config.app?.toolbar?.primaryButton && location.pathname === '/dinh-nghia/gia/cbm' && (
        <>
          <ButtonCreate
            setData={setShowModalCBM_Rate}
            title={`Tạo ${intl.formatMessage({id: 'MENU.GIACBM'})}`}
          />
        </>
      )}
      {config.app?.toolbar?.primaryButton && location.pathname === '/dinh-nghia/dong-goi/thuong' && (
        <>
          <ButtonCreate
            setData={setShowModalPackagePrice}
            title={`Tạo ${intl.formatMessage({id: 'MENU.DONGGOITHUONG'})}`}
          />
        </>
      )}
      {config.app?.toolbar?.primaryButton && location.pathname === '/dinh-nghia/dong-goi/cbm' && (
        <>
          <ButtonCreate
            setData={setShowModalPackageCBMPrice}
            title={`Tạo ${intl.formatMessage({id: 'MENU.DONGGOICBM'})}`}
          />
        </>
      )}
    </div>
  )
}

export {ToolbarClassic}
