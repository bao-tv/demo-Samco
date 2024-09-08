import {useState, useEffect, useRef} from 'react'
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

type Props = {}

const OrderSetupPage = (props: Props) => {
  const intl = useIntl();
  const {
    rowDataOrder,
    gridRefOrderSetup,
    showModalOrder,
    setShowModalOrder,
    setDataModalOrder,
    rowDataCouponReciept,
    isLoading,
    setRowDataOrder,
    searchData,
  } = usePageData()
  // console.log('bao rowDataCouponReciept: ', rowDataCouponReciept);
  const [dataPagination, setDataPagination] = useState<any>({})
  const [dataSearch, setDataSearch] = useState<IFormSearch>(defaultSearch)
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
    setDataModalOrder && setDataModalOrder({})
  }

  useEffect(() => {
    // console.log('bao dataSearch: ', dataSearch);
    setDataSearch({
      searchCriteria: {
        // name: searchData,
      },
      page: 0,
      pageSize: 20,
      direction: 'ASC',
      sortBy: 'id',
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
        modal={
          <CreateAppModal
            show={showModalOrder}
            handleClose={handleCloseOrderPage}
            content={
              <ModalOrderPage
                handleClose={handleCloseOrderPage}
                title={intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})}
                refreshData={() => getListReceivers(dataSearch)}
              />
            }
            title={intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})}
          />
        }
      />
      <ModalShowImport />
      {/* {rowDataCouponReciept.data && <ReceiptLayoutPrints data={rowDataCouponReciept.data} />} */}
      {rowDataCouponReciept.data && 
        <ReceiptLayoutPrints data={rowDataCouponReciept?.data} /> 
      }
    </>
  )
}

export default OrderSetupPage
