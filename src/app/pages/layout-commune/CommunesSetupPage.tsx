import {useMemo, useCallback, useEffect, useState} from 'react'
import {CreateAppModal} from '../../../_metronic/partials'
import {columnDefsCommunesSetupPage} from './interface'
import {IFormSearch, usePageData} from '../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import ModalShowAndAddCommune from './ModalShowAndAddCommune'
import {communeAPIGetByPagination} from '../../../apis/communeAPI'
import MainLayout from '../../../_metronic/partials/layout/mainLayout/MainLayout'
import {defaultSearch} from '../../../_metronic/assets/define/Define'

type Props = {}

const CommunesSetupPage = (props: Props) => {
  const intl = useIntl()
  const {
    listCommunes,
    setListCommunes,
    gridRefCommuneSetup,
    showModalCommune,
    setShowModalCommune,
    setDataModalCommune,
    searchData,
  } = usePageData()
  const handleCloseModalCommune = () => {
    setShowModalCommune && setShowModalCommune(false)
    setDataModalCommune && setDataModalCommune({})
  }
  // console.log('bao listCommunes: ', listCommunes);
  const [dataPagination, setDataPagination] = useState<any>({})
  const [dataSearch, setDataSearch] = useState<IFormSearch>(defaultSearch)
  const getListCommunes = async (valuePagination: IFormSearch) => {
    try {
      const response = await communeAPIGetByPagination(valuePagination)
      response.status === 'OK' && setListCommunes && setListCommunes(response?.data.content)
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
    getListCommunes(dataSearch)
  }, [dataSearch])

  return (
    <MainLayout
      gridRef={gridRefCommuneSetup}
      rowData={listCommunes}
      columnDef={columnDefsCommunesSetupPage}
      dataPagination={dataPagination}
      setDataSearch={setDataSearch}
      modal={
        <CreateAppModal
          show={showModalCommune}
          handleClose={handleCloseModalCommune}
          content={
            <ModalShowAndAddCommune
              title={intl.formatMessage({id: 'MENU.XANHANHANG'})}
              refreshData={() => getListCommunes(dataSearch)}
              handleClose={handleCloseModalCommune}
            />
          }
          title={intl.formatMessage({id: 'MENU.XANHANHANG'})}
          size='lg'
        />
      }
    />
  )
}

export default CommunesSetupPage
