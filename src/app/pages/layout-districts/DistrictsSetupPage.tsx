import {useEffect, useState} from 'react'
import {CreateAppModal} from '../../../_metronic/partials'
import {columnDefsDistrictsSetupPage} from './interface'
import {IFormSearch, usePageData} from '../../../_metronic/layout/core'
import ModalShowAndAddDistrict from './ModalShowAndAddDistrict'
import {useIntl} from 'react-intl'
import {districtAPIGetByPagination} from '../../../apis/districtAPI'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import MainLayout from '../../../_metronic/partials/layout/mainLayout/MainLayout'
import { defaultSearch } from '../../../_metronic/assets/define/Define'

type Props = {}

const DistrictsSetupPage = (props: Props) => {
  const intl = useIntl()
  const {
    listDistricts,
    setListDistricts,
    gridRefDistrictSetup,
    showModalDistrict,
    setShowModalDistrict,
    setDataModalDistrict,
    searchData,
  } = usePageData()
  const handleCloseModalDistrict = () => {
    setShowModalDistrict && setShowModalDistrict(false)
    setDataModalDistrict && setDataModalDistrict({})
  }

  const [dataPagination, setDataPagination] = useState<any>({})
  const [dataSearch, setDataSearch] = useState<IFormSearch>(defaultSearch)
  const getListDistricts = async (valuePagination: IFormSearch) => {
    try {
      const response = await districtAPIGetByPagination(valuePagination)
      response.status === 'OK' && setListDistricts && setListDistricts(response?.data.content)
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
    getListDistricts(dataSearch)
  }, [dataSearch])


  return (
    <MainLayout
      gridRef={gridRefDistrictSetup}
      rowData={listDistricts}
      columnDef={columnDefsDistrictsSetupPage}
      dataPagination={dataPagination}
      setDataSearch={setDataSearch}
      modal={
        <CreateAppModal
          show={showModalDistrict}
          handleClose={handleCloseModalDistrict}
          content={
            <ModalShowAndAddDistrict
              title={intl.formatMessage({id: 'MENU.HUYENNHANHANG'})}
              refreshData={getListDistricts}
              handleClose={handleCloseModalDistrict}
            />
          }
          title={intl.formatMessage({id: 'MENU.HUYENNHANHANG'})}
          size='lg'
        />
      }
    />
  )
}

export default DistrictsSetupPage
