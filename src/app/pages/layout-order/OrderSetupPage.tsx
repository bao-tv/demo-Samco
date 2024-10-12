import {useState, useEffect, useRef, useMemo} from 'react'
import {ColDef, ModuleRegistry, RowSelectionOptions} from '@ag-grid-community/core'
import {IFormSearch, usePageData} from '../../../_metronic/layout/core'
import {CreateAppModal} from '../../../_metronic/partials'
import {columnDefsOrderManagerment} from './component/interface'
import ModalShowImport from './ModalShowImport'
import ModalOrderPage from './ModalOrderPage'
import ReceiptLayoutPrints from '../../../_metronic/layout/components/Coupon/ReceiptLayoutPrints'
import {useIntl} from 'react-intl'
import {receiptAPIGetByPagination} from '../../../apis/receiptAPI'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import {defaultSearch} from '../../../_metronic/assets/define/Define'
import MainLayout from '../../../_metronic/partials/layout/mainLayout/MainLayout'
import SubPackages from './component/SubPackages'
import TransferToWarehouse from '../../../_metronic/layout/components/Coupon/TransferToWarehouse'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'

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
  } = usePageData()
  const [dataPagination, setDataPagination] = useState<any>({})
  const convertDefaultSearch: any = {
    ...defaultSearch,
    searchCriteria: {
      billStatus: ['CREATED', 'PENDING_APPROVAL'],
    },
  }
  const [dataSearch, setDataSearch] = useState<IFormSearch>(convertDefaultSearch)
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const getListReceivers = async (valuePagination: IFormSearch) => {
    // console.log('bao run')
    try {
      const response = await receiptAPIGetByPagination(valuePagination)
      response.status === 'OK' && setRowDataOrder && setRowDataOrder(response?.data.content || [])
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
    try {
      setIsLoading(true)
      const selectedRows = gridRefOrderSetup.current.api.getSelectedRows()
      console.log('bao selectedRows: ', selectedRows)
      await setSelectedRows(selectedRows)
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
      setIsLoading(false) // Hide loading GIF
      setSelectedRows([])
    }
  }

  const rowClassRules = useMemo<any>(() => {
    return {
      // row style function
      PENDING_APPROVAL_COLOR: (params: any) => {
        return params.data.billStatus === 'PENDING_APPROVAL'
      },
    }
  }, [])

  useEffect(() => {
    setDataSearch({
      ...convertDefaultSearch,
      searchCriteria: {
        name: searchData,
      },
    })
  }, [searchData])
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
      {selectedRows.length ? <TransferToWarehouse data={selectedRows} /> : ''} 
    </>
  )
}

export default OrderSetupPage
