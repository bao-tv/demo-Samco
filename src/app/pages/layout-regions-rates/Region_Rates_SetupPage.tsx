import {useEffect, useState} from 'react'
import {CreateAppModal} from '../../../_metronic/partials'
import {columnDefsRegion_Rates_SetupPage} from './interface'
import {IFormSearch, usePageData} from '../../../_metronic/layout/core'
import ModalShowAndAdd_Region_Rate from './ModalShowAndAdd_Region_Rate'
import {useIntl} from 'react-intl'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import {region_rateAPIGetByPagination} from '../../../apis/region-rateAPI'
import MainLayout from '../../../_metronic/partials/layout/mainLayout/MainLayout'
import { defaultSearch } from '../../../_metronic/assets/define/Define'

type Props = {}

const Region_Rates_SetupPage = (props: Props) => {
  const intl = useIntl()
  const {
    listRegion_Rates,
    setListRegion_Rates,
    gridRefRegion_RateSetup,
    showModalRegion_Rate,
    setShowModalRegion_Rate,
    setDataModalRegion_Rate,
    searchData,
  } = usePageData()
  const handleCloseModalRegion_Rate = () => {
    setShowModalRegion_Rate && setShowModalRegion_Rate(false)
    setDataModalRegion_Rate && setDataModalRegion_Rate({})
  }
  const [dataPagination, setDataPagination] = useState<any>({})
  const [dataSearch, setDataSearch] = useState<IFormSearch>({...defaultSearch, searchCriteria: {}})
  const getListRegion_Rates = async (valuePagination: IFormSearch) => {
    try {
      const response = await region_rateAPIGetByPagination(valuePagination)
      response.status === 'OK' && setListRegion_Rates && setListRegion_Rates(response?.data.content)
      setDataPagination({...response?.data, content: {}})
    } catch (error) {
      ToastError('Có lỗi xả ra!')
    }
  }
  useEffect(() => {
    setDataSearch({
      ...defaultSearch,
      searchCriteria: {
        name: searchData
      },
    })
  }, [searchData])
  useEffect(() => {
    getListRegion_Rates(dataSearch)
  }, [dataSearch])
  return (
    <MainLayout
      gridRef={gridRefRegion_RateSetup}
      rowData={listRegion_Rates.map((ele: any) => ({
        ...ele,
        additionalPrice: ele.additionalPrice ? true : false,
        additionalWeight: ele.additionalWeight ? true : false,
      }))}
      columnDef={columnDefsRegion_Rates_SetupPage}
      dataPagination={dataPagination}
      setDataSearch={setDataSearch}
      modal={
        <CreateAppModal
          show={showModalRegion_Rate}
          handleClose={handleCloseModalRegion_Rate}
          content={
            <ModalShowAndAdd_Region_Rate
              title={intl.formatMessage({id: 'MENU.GIACUOCTHEOKG'})}
              refreshData={() => getListRegion_Rates(dataSearch)}
              handleClose={handleCloseModalRegion_Rate}
            />
          }
          title={intl.formatMessage({id: 'MENU.GIACUOCTHEOKG'})}
          size='lg'
        />
      }
    />
  )
}

export default Region_Rates_SetupPage
