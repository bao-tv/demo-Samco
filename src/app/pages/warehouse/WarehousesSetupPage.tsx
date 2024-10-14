import {useMemo, useCallback, useEffect, useState} from 'react'
import {CreateAppModal} from '../../../_metronic/partials'
import {columnDefsWarehousesSetupPage} from './interface'
import {IFormSearch, usePageData} from '../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
// import ModalShowAndAddWarehouse from './ModalShowAndAddWarehouse'
import {communeAPIGetByPagination} from '../../../apis/communeAPI'
import MainLayout from '../../../_metronic/partials/layout/mainLayout/MainLayout'
import {defaultSearch} from '../../../_metronic/assets/define/Define'
import { receiptAPIGetByPagination } from '../../../apis/receiptAPI'
import ReceiptLayoutPrints from '../../../_metronic/layout/components/Coupon/ReceiptLayoutPrints'
import { rowClassRules } from '../../../_metronic/helpers'

type Props = {}

const WarehousesSetupPage = (props: Props) => {
  const intl = useIntl()
  const {
    listWarehouses,
    setListWarehouses,
    gridRefWarehouseSetup,
    setRowDataOrder,
    rowDataOrder,
    rowDataCouponReciept,
    isLoading,
    searchData,
  } = usePageData()

  const [dataPagination, setDataPagination] = useState<any>({})
  const convertDefaultSearch: any = {
    ...defaultSearch,
    searchCriteria: {
      billStatus: ['IN_WAREHOUSE','PENDING_APPROVAL','DELIVERED']
    },
  }
  const [dataSearch, setDataSearch] = useState<IFormSearch>(convertDefaultSearch)
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

  // useEffect(() => {
  //   setDataSearch({
  //     ...convertDefaultSearch,
  //     searchCriteria: {
  //       name: searchData,
  //     },
  //   })
  // }, [searchData])
  useEffect(() => {
    getListReceivers(dataSearch)
  }, [dataSearch])
  

  return (
    <>
      <MainLayout
        gridRef={gridRefWarehouseSetup}
        rowData={rowDataOrder}
        columnDef={columnDefsWarehousesSetupPage}
        dataPagination={dataPagination}
        setDataSearch={setDataSearch}
        defaultCol={false}
        isLoading={isLoading}
        rowClassRules={rowClassRules}
        rowSelection='multiple'
      />
            {/* {rowDataCouponReciept.data && <ReceiptLayoutPrints data={rowDataCouponReciept.data} />} */}
            {rowDataCouponReciept.data && 
              <ReceiptLayoutPrints data={rowDataCouponReciept?.data} /> 
            }
    </>
  )
}

export default WarehousesSetupPage
