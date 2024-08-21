import {useMemo, useEffect, useState} from 'react'
import {CreateAppModal} from '../../../_metronic/partials'
import {columnDefsCBM_Rates_SetupPage} from './interface'
import {IFormSearch, usePageData} from '../../../_metronic/layout/core'
import ModalShowAndAdd_CBM_Rate from './ModalShowAndAdd_CBM_Rate'
import {useIntl} from 'react-intl'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import {cbm_rateAPIGetByPagination} from '../../../apis/cbm-rateAPI'
import MainLayout from '../../../_metronic/partials/layout/mainLayout/MainLayout'
import {defaultSearch} from '../../../_metronic/assets/define/Define'

type Props = {}

const CBM_Rates_SetupPage = (props: Props) => {
  const intl = useIntl()
  const {
    listCBM_Rates,
    setListCBM_Rates,
    gridRefCBM_RateSetup,
    showModalCBM_Rate,
    setShowModalCBM_Rate,
    setDataModalCBM_Rate,
    searchData,
  } = usePageData()
  const handleCloseModalCBM_Rate = () => {
    setShowModalCBM_Rate && setShowModalCBM_Rate(false)
    setDataModalCBM_Rate && setDataModalCBM_Rate({})
  }
  const [dataPagination, setDataPagination] = useState<any>({})
  const [dataSearch, setDataSearch] = useState<IFormSearch>(defaultSearch)
  const getListCBM_Rates = async (valuePagination: IFormSearch) => {
    try {
      const response = await cbm_rateAPIGetByPagination(valuePagination)
      response.status === 'OK' && setListCBM_Rates && setListCBM_Rates(response?.data.content)
      setDataPagination({...response?.data, content: {}})
    } catch (error) {
      ToastError('Có lỗi xả ra!')
    }
  }

  useEffect(() => {
    setDataSearch({
      searchCriteria: {
        name: searchData,
      },
      page: 0,
      pageSize: 20,
      direction: 'ASC',
      sortBy: 'id',
    })
  }, [searchData])
  useEffect(() => {
    getListCBM_Rates(dataSearch)
  }, [dataSearch])
  return (
    <MainLayout
      gridRef={gridRefCBM_RateSetup}
      rowData={listCBM_Rates.map((ele: any) => ({
        ...ele,
        additionalPrice: ele.additionalPrice ? true : false,
        additionalWeight: ele.additionalWeight ? true : false,
      }))}
      columnDef={columnDefsCBM_Rates_SetupPage}
      dataPagination={dataPagination}
      setDataSearch={setDataSearch}
      modal={
        <CreateAppModal
          show={showModalCBM_Rate}
          handleClose={handleCloseModalCBM_Rate}
          content={
            <ModalShowAndAdd_CBM_Rate
              title={intl.formatMessage({id: 'MENU.GIACUOCTHEOCBM'})}
              refreshData={getListCBM_Rates}
              handleClose={handleCloseModalCBM_Rate}
            />
          }
          title={intl.formatMessage({id: 'MENU.GIACUOCTHEOCBM'})}
          size='lg'
        />
      }
    />
  )
}

export default CBM_Rates_SetupPage
