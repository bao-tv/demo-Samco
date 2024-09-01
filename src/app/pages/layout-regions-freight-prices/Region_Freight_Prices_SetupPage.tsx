import {useEffect} from 'react'
import {CreateAppModal} from '../../../_metronic/partials'
import {columnDefsRegion_Freight_Prices_SetupPage} from './interface'
import {usePageData} from '../../../_metronic/layout/core'
import ModalShowAndAdd_Region_Freight_Price from './ModalShowAndAdd_Region_Freight_Price'
import {useIntl} from 'react-intl'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import {region_priceAPIGetAll} from '../../../apis/region-priceAPI'
import MainLayout from '../../../_metronic/partials/layout/mainLayout/MainLayout'

type Props = {}

const Region_Freight_Prices_SetupPage = (props: Props) => {
  const intl = useIntl()
  const {
    listRegion_Freight_Prices,
    setListRegion_Freight_Prices,
    gridRefRegion_Freight_PriceSetup,
    showModalRegion_Freight_Price,
    setShowModalRegion_Freight_Price,
    setDataModalRegion_Freight_Price,
  } = usePageData()
  const handleCloseModalRegion_Freight_Price = () => {
    setShowModalRegion_Freight_Price && setShowModalRegion_Freight_Price(false)
    setDataModalRegion_Freight_Price && setDataModalRegion_Freight_Price({})
  }
  const getListRegion_Freight_Prices = async () => {
    try {
      const response = await region_priceAPIGetAll()
      response.status === 'OK' &&
        setListRegion_Freight_Prices &&
        setListRegion_Freight_Prices(response?.data)
    } catch (error) {
      ToastError('Có lỗi xả ra!')
    }
  }
  useEffect(() => {
    getListRegion_Freight_Prices()
  }, [])
  return (
    <MainLayout
      gridRef={gridRefRegion_Freight_PriceSetup}
      rowData={listRegion_Freight_Prices}
      columnDef={columnDefsRegion_Freight_Prices_SetupPage}
      heightBottom='0px'
      defaultCol={false}
      modal={
        <CreateAppModal
          show={showModalRegion_Freight_Price}
          handleClose={handleCloseModalRegion_Freight_Price}
          content={
            <ModalShowAndAdd_Region_Freight_Price
              title={intl.formatMessage({id: 'MENU.VUNGGIA'})}
              refreshData={getListRegion_Freight_Prices}
            />
          }
          title={intl.formatMessage({id: 'MENU.VUNGGIA'})}
          size='lg'
        />
      }
    />
  )
}

export default Region_Freight_Prices_SetupPage
