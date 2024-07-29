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

type Props = {}

const PackageCBMPriceSetupPage = (props: Props) => {
  const intl = useIntl();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const {modeCurrent} = useThemeMode();
  const onGridReady = useCallback((params: any) => {
  }, []);
  const onCellValueChanged = useCallback((event: any) => {
    console.log(
      "bao onCellValueChanged: " + event.colDef.field + " = " + event.newValue,
    );
  }, []);
  const {listPackagesCBMPrice} = useSelector((state:any) => state.packagesCBMPrice);  
  const {gridRefPackageCBMPriceSetup, showModalPackageCBMPrice, setShowModalPackageCBMPrice, setDataModalPackageCBMPrice} = usePageData();
  const handleCloseModalPackageCBMPrice = () => {
    setShowModalPackageCBMPrice && setShowModalPackageCBMPrice(false);
    setDataModalPackageCBMPrice && setDataModalPackageCBMPrice({});
  }
  return (
    <div style={containerStyle}>
      <div style={{ height: "100%", boxSizing: "border-box" }}>
        <div
          style={gridStyle}
          className={
            modeCurrent === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz"
          }
        >
          <AgGridReact
            ref={gridRefPackageCBMPriceSetup}
            rowData={listPackagesCBMPrice}
            columnDefs={columnDefsPackageCBMPriceSetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <CreateAppModal
        show={showModalPackageCBMPrice} 
        handleClose={handleCloseModalPackageCBMPrice} 
        content={<ModalShowAndAddPackage title={intl.formatMessage({id: 'MENU.DONGGOICBM'})}/>}
        title={intl.formatMessage({id: 'MENU.DONGGOICBM'})}
        size="lg"
      />
    </div>
  )
}

export default PackageCBMPriceSetupPage