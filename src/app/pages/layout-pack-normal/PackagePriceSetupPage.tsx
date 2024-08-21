import {CreateAppModal, useThemeMode} from '../../../_metronic/partials'
import {columnDefsPackagePriceSetupPage} from './interface'
import {usePageData} from '../../../_metronic/layout/core'
import ModalShowAndAddPackage from './ModalShowAndAddPackagePrice'
import {useSelector} from 'react-redux'
import {useIntl} from 'react-intl'
import MainLayout from '../../../_metronic/partials/layout/mainLayout/MainLayout'

type Props = {}

const PackagePriceSetupPage = (props: Props) => {
  const intl = useIntl()
  const {listPackagesPrice} = useSelector((state: any) => state.packagesPrice)
  const {
    gridRefPackagePriceSetup,
    showModalPackagePrice,
    setShowModalPackagePrice,
    setDataModalPackagePrice,
  } = usePageData()
  const handleCloseModalPackagePrice = () => {
    setShowModalPackagePrice && setShowModalPackagePrice(false)
    setDataModalPackagePrice && setDataModalPackagePrice({})
  }
  return (
    <MainLayout
      gridRef={gridRefPackagePriceSetup}
      rowData={listPackagesPrice}
      columnDef={columnDefsPackagePriceSetupPage}
      heightBottom='0px'
      defaultCol={false}
      modal={
        <CreateAppModal
          show={showModalPackagePrice}
          handleClose={handleCloseModalPackagePrice}
          content={
            <ModalShowAndAddPackage title={intl.formatMessage({id: 'MENU.DONGGOITHUONG'})} />
          }
          title={intl.formatMessage({id: 'MENU.DONGGOITHUONG'})}
          size='lg'
        />
      }
    />
  )
}

export default PackagePriceSetupPage
