import {useMemo, useCallback, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials';
import { columnDefsPackageCBMPriceSetupPage } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import ModalShowAndAddPackage from './ModalShowAndAddPackageCBMPrice';
import { useIntl } from 'react-intl';
import { packageCBMPriceAPIGetAll } from '../../../apis/packageCBMPriceAPI';
import ToastError from '../../../_metronic/helpers/crud-helper/Toast';
import { useSelector } from 'react-redux';
import MainLayout from '../../../_metronic/partials/layout/mainLayout/MainLayout';

type Props = {}

const PackageCBMPriceSetupPage = (props: Props) => {
  const intl = useIntl();
  const {listPackagesCBMPrice} = useSelector((state:any) => state.packagesCBMPrice);  
  const {gridRefPackageCBMPriceSetup, showModalPackageCBMPrice, setShowModalPackageCBMPrice, setDataModalPackageCBMPrice} = usePageData();
  const handleCloseModalPackageCBMPrice = () => {
    setShowModalPackageCBMPrice && setShowModalPackageCBMPrice(false);
    setDataModalPackageCBMPrice && setDataModalPackageCBMPrice({});
  }
  return (
      <MainLayout 
        gridRef={gridRefPackageCBMPriceSetup}
        rowData={listPackagesCBMPrice}
        columnDef={columnDefsPackageCBMPriceSetupPage}
        heightBottom='0px'
        defaultCol={false}
        modal={ <CreateAppModal
          show={showModalPackageCBMPrice} 
          handleClose={handleCloseModalPackageCBMPrice} 
          content={<ModalShowAndAddPackage title={intl.formatMessage({id: 'MENU.DONGGOICBM'})}/>}
          title={intl.formatMessage({id: 'MENU.DONGGOICBM'})}
          size="lg"
        />}
      />
  )
}

export default PackageCBMPriceSetupPage