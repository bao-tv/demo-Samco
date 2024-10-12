import {useMemo, useCallback, useEffect, useState} from 'react'
import {CreateAppModal, useThemeMode} from '../../../_metronic/partials'
import {columnDefsProvinceSetupPage} from './interface'
import {IFormSearch, usePageData} from '../../../_metronic/layout/core'
import ModalShowAndAddProvince from './ModalShowAndAddProvince'
import {useIntl} from 'react-intl'
import {provinceAPIGetByPagination} from '../../../apis/provinceAPI'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import Pagination from '../../../_metronic/layout/components/pagination/Pagination'
import MainLayout from '../../../_metronic/partials/layout/mainLayout/MainLayout'
import { defaultSearch } from '../../../_metronic/assets/define/Define'

type Props = {}

const ProvinceSetupPage = (props: Props) => {
  const intl = useIntl()
  const {
    listProvinces,
    setListProvinces,
    gridRefProvinceSetup,
    showModalProvince,
    setShowModalProvince,
    setDataModalProvince,
    searchData,
  } = usePageData()
  const handleCloseModalProvince = () => {
    setShowModalProvince && setShowModalProvince(false)
    setDataModalProvince && setDataModalProvince({})
  }
  const [dataSearch, setDataSearch] = useState<IFormSearch>(defaultSearch)
  const [dataPagination, setDataPagination] = useState<any>({})
  const getListProvinces = async (valuePagination: IFormSearch) => {
    try {
      const response = await provinceAPIGetByPagination(valuePagination)
      response.status === 'OK' && setListProvinces && setListProvinces(response?.data.content)
      setDataPagination(response?.data)
    } catch (error) {
      ToastError('Có lỗi xả ra!')
    }
  }
  useEffect(() => {
    setDataSearch({
      ...defaultSearch,
      searchCriteria: {
        name: searchData,
      },
    })
  }, [searchData])
  useEffect(() => {
    getListProvinces(dataSearch)
  }, [dataSearch])

  return (
    <MainLayout
      gridRef={gridRefProvinceSetup}
      rowData={listProvinces}
      columnDef={columnDefsProvinceSetupPage}
      dataPagination={dataPagination}
      setDataSearch={setDataSearch}
      modal={
        <CreateAppModal
          show={showModalProvince}
          handleClose={handleCloseModalProvince}
          content={
            <ModalShowAndAddProvince
              title={intl.formatMessage({id: 'MENU.TINHNHANHANG'})}
              handleClose={handleCloseModalProvince}
              refreshData={() => getListProvinces(dataSearch)}
            />
          }
          title={intl.formatMessage({id: 'MENU.TINHNHANHANG'})}
          size='lg'
        />
      }
    />
  )
}

export default ProvinceSetupPage
