import {useState, useEffect, useRef, useMemo} from 'react'
// import {ColDef, ModuleRegistry, RowSelectionOptions} from '@ag-grid-community/core'
import {IFormSearch, usePageData} from '../../../_metronic/layout/core'
import {CreateAppModal} from '../../../_metronic/partials'
import {columnDefsOrderManagerment} from './component/interface'
import ModalShowImport from './ModalShowImport'
import ModalOrderPage from './ModalOrderPage'
import ReceiptLayoutPrints from '../../../_metronic/layout/components/Coupon/ReceiptLayoutPrints'
import {useIntl} from 'react-intl'
import {receiptAPIGetByPagination, receiptEditAPIByID} from '../../../apis/receiptAPI'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import {defaultSearch} from '../../../_metronic/assets/define/Define'
import MainLayout from '../../../_metronic/partials/layout/mainLayout/MainLayout'
// import SubPackages from './component/SubPackages'
import TransferToWarehouse from '../../../_metronic/layout/components/Coupon/TransferToWarehouse'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'
import {rowClassRules} from '../../../_metronic/helpers'
import TransferMoney from '../../../_metronic/layout/components/Coupon/TransferMoney'
import { number } from 'yup'

type Props = {}

const OrderSetupPage = (props: Props) => {
  const intl = useIntl()
  const {
    rowDataOrder,
    gridRefOrderSetup,
    showModalOrder,
    setShowModalOrder,
    showModalSubPackage,
    setShowModalSubPackage,
    setDataModalOrder,
    rowDataCouponReciept,
    isLoading,
    setIsLoading,
    setRowDataOrder,
    searchData,
    tranferToWarehouseTemplateRef,
    tranferMoneyTemplateRef,
  } = usePageData()
  const [dataPagination, setDataPagination] = useState<any>({})
  const convertDefaultSearch: any = {
    ...defaultSearch,
    searchCriteria: {
      billStatus: ['CREATED', 'PENDING_APPROVAL', 'IN_WAREHOUSE', 'DELIVERED'],
      // settlementStatus: ['PENDING'],
    },
  }
  // console.log('bao rowDataOrder: ', rowDataOrder);
  const [dataSearch, setDataSearch] = useState<IFormSearch>(convertDefaultSearch)
  const [selectedData, setSelectedData] = useState<{
    type: 'TransferToWarehouse' | 'None' | 'TranfMoney'
    data: any[]
  }>({type: 'None', data: []})
  const getListReceivers = async (valuePagination: IFormSearch) => {
    // console.log('bao run')
    try {
      const response = await receiptAPIGetByPagination(valuePagination)
      response.status === 'OK' && setRowDataOrder && setRowDataOrder(response?.data.content || [])
      // console.log('bao response: ', response);
      setDataPagination({...response?.data, content: {}})
    } catch (error) {
      ToastError('Có lỗi xảy ra!')
    }
  }
  const handleCloseOrderPage = () => {
    setShowModalOrder && setShowModalOrder(false)
    setShowModalSubPackage && setShowModalSubPackage(false)
    setDataModalOrder && setDataModalOrder({})
  }

  const handlegGetDataTranfToWarehouseSelected = async () => {
    const selectedRows = gridRefOrderSetup.current.api.getSelectedRows()
    // console.log('bao selectedRows: ', selectedRows)
    await setSelectedData({type: 'TransferToWarehouse', data: selectedRows})
    try {
      setIsLoading(true)
      // const temp = await tranferToWarehouseTemplateRef;
      // console.log('bao tranferToWarehouseTemplateRef: ', temp);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [297, 210],
      })
      let imgData1: any
      imgData1 = await html2canvas(tranferToWarehouseTemplateRef.current).then((canvas) =>
        canvas.toDataURL('image/jpeg')
      )
      pdf.addImage(imgData1, 'image/jpeg', 2, 3, 293, 204)
      // pdf.addPage('a4', 'l')
      const pdfBlob = pdf.output('blob')
      const blobUrl = URL.createObjectURL(pdfBlob)
      const newWindow = window.open(blobUrl, '_blank')
    } catch (error) {
      console.error('Error:', error)
      ToastError('In phiếu thất bại')
    } finally {
      console.log('bao ')
      setIsLoading(false) // Hide loading GIF
      setSelectedData({type: 'None', data: []})
    }
  }

  const handlegGetDataTranfMoneySelected = async () => {
    const selectedRows = gridRefOrderSetup.current.api.getSelectedRows()
    // console.log('bao selectedRows: ', selectedRows)
    await setSelectedData({type: 'TranfMoney', data: selectedRows})
  }

  const hanleGetPDFTranfMoney = async () => {
    selectedData.data.forEach(async (item: any) => {
      item?.id && await receiptEditAPIByID({...item, settlementStatus: 'COMPLETED'})
    })
    try {
      setIsLoading(true)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [297, 210],
      })
      let imgData1: any
      imgData1 = await html2canvas(tranferMoneyTemplateRef.current).then((canvas) =>
        canvas.toDataURL('image/jpeg')
      )
      pdf.addImage(imgData1, 'image/jpeg', 2, 3, 293, 204)
      // pdf.addPage('a4', 'l')
      const pdfBlob = pdf.output('blob')
      const blobUrl = URL.createObjectURL(pdfBlob)
      const newWindow = window.open(blobUrl, '_blank')
    } catch (error) {
      console.error('Error:', error)
      ToastError('In phiếu thất bại')
    } finally {
      // console.log('bao ');
      setIsLoading(false) // Hide loading GIF
      setSelectedData({type: 'None', data: []})
      getListReceivers(dataSearch)
    }
  }
  useEffect(() => {
    getListReceivers(dataSearch)
  }, [dataSearch])
  return (
    <>
      <MainLayout
        gridRef={gridRefOrderSetup}
        rowData={rowDataOrder}
        columnDef={columnDefsOrderManagerment}
        dataPagination={dataPagination}
        setDataSearch={setDataSearch}
        defaultCol={false}
        isLoading={isLoading}
        rowClassRules={rowClassRules}
        rowSelection='multiple'
        handlegGetDataTranfToWarehouse={handlegGetDataTranfToWarehouseSelected}
        handlegGetDataTranfMoneySelected={handlegGetDataTranfMoneySelected}
        modal={
          <CreateAppModal
            show={showModalOrder}
            handleClose={handleCloseOrderPage}
            content={
              <ModalOrderPage
                handleClose={handleCloseOrderPage}
                title={`${intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})}: ${
                  showModalOrder.receiptCode ? showModalOrder.receiptCode : ''
                }`}
                refreshData={() => getListReceivers(convertDefaultSearch)}
              />
            }
            title={`${intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})}: ${
              showModalOrder.receiptCode ? showModalOrder.receiptCode : ''
            }`}
          />
        }
      />
      <ModalShowImport />
      {/* {rowDataCouponReciept.data && <ReceiptLayoutPrints data={rowDataCouponReciept.data} />} */}
      {rowDataCouponReciept.data && <ReceiptLayoutPrints data={rowDataCouponReciept?.data} />}
      {selectedData.type === 'TranfMoney' ? (
        <TransferMoney
          data={selectedData.data}
          show={selectedData.type === 'TranfMoney' ? true : false}
          handleClose={() => setSelectedData({type: 'None', data: []})}
          hanleGetPDFTranfMoney={hanleGetPDFTranfMoney}
        />
      ) : (
        ''
      )}
      {selectedData.type === 'TransferToWarehouse' ? (
        <TransferToWarehouse data={selectedData.data} />
      ) : (
        ''
      )}
    </>
  )
}

export default OrderSetupPage
