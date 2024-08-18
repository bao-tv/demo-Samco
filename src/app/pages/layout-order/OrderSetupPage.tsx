import React, {useMemo, useCallback, useState, useEffect} from 'react'
import {AgGridReact} from 'ag-grid-react'
import {usePageData} from '../../../_metronic/layout/core'
import {CreateAppModal, useThemeMode} from '../../../_metronic/partials'
import {columnDefsOrderManagerment} from './component/interface'
import ModalShowImport from './ModalShowImport'
import ModalOrderPage from './ModalOrderPage'
import ReceiptLayoutPrints from '../../../_metronic/layout/components/Coupon/ReceiptLayoutPrints'
import {useIntl} from 'react-intl'
import {receiptAPIGetAll} from '../../../apis/receiptAPI'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'

type Props = {}

const OrderSetupPage = (props: Props) => {
  const intl = useIntl()
  const {
    rowDataOrder,
    gridRefOrderSetup,
    showModalOrder,
    setShowModalOrder,
    setDataModalOrder,
    rowDataCouponReciept,
    isLoading,
    setRowDataOrder,
  } = usePageData()
  console.log('bao rowDataOrder: ', rowDataOrder)
  const containerStyle = useMemo(() => ({width: '100%', height: '100%'}), [])
  const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), [])
  const onGridReady = useCallback((params: any) => {}, [])
  const {modeCurrent} = useThemeMode()
  const onCellValueChanged = useCallback((event: any) => {
    console.log('bao onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue)
  }, [])
  const getListReceivers = async () => {
    try {
      const response = await receiptAPIGetAll()
      response.status === 'OK' && setRowDataOrder && setRowDataOrder(response?.data)
    } catch (error) {
      ToastError('Có lỗi xả ra!')
    }
  }
  const handleCloseOrderPage = () => {
    setShowModalOrder && setShowModalOrder(false)
    setDataModalOrder && setDataModalOrder({})
  }
  // const getRowId = useCallback((params: any) => params.data.indexRow, []);
  // if(isLoading) return (
  //   <div className="h-100 d-flex justify-content-center align-items-center">
  //     <img src={'/media/img/awating.gif'} className="img-fluid" style={{height: '100px', width: '100px'}}/>
  //   </div>
  // );
  useEffect(() => {
    getListReceivers()
  }, [])
  return (
    <div style={containerStyle}>
      <div style={{height: '100%', boxSizing: 'border-box'}}>
        <div
          style={gridStyle}
          className={modeCurrent === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}
        >
          {isLoading && (
            <div
              className='h-100 d-flex justify-content-center align-items-center bg-black bg-opacity-25'
              style={{
                zIndex: 999,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                height: '100vh',
                width: '100vw',
              }}
            >
              <img
                src={'/media/img/awating.gif'}
                className='img-fluid'
                style={{height: '100px', width: '100px'}}
              />
            </div>
          )}
          <AgGridReact
            ref={gridRefOrderSetup}
            rowData={rowDataOrder}
            columnDefs={columnDefsOrderManagerment}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <ModalShowImport />
      <CreateAppModal
        show={showModalOrder}
        handleClose={handleCloseOrderPage}
        content={
          <ModalOrderPage
            handleClose={handleCloseOrderPage}
            title={intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})}
            refreshData={getListReceivers}
          />
        }
        title={intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})}
      />
      {rowDataCouponReciept.data && <ReceiptLayoutPrints data={rowDataCouponReciept.data} />}
    </div>
  )
}

export default OrderSetupPage
