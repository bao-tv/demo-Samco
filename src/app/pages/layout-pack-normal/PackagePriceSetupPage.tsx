import {useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials';
import { columnDefsPackagePriceSetupPage } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import ModalShowAndAddPackage from './ModalShowAndAddPackagePrice';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

type Props = {}

const PackagePriceSetupPage = (props: Props) => {
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
  const {listPackagesPrice} = useSelector((state:any) => state.packagesPrice);  
  const {gridRefPackagePriceSetup, showModalPackagePrice, setShowModalPackagePrice, setDataModalPackagePrice} = usePageData();
  const handleCloseModalPackagePrice = () => {
    setShowModalPackagePrice && setShowModalPackagePrice(false);
    setDataModalPackagePrice && setDataModalPackagePrice({});
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
            ref={gridRefPackagePriceSetup}
            rowData={listPackagesPrice}
            columnDefs={columnDefsPackagePriceSetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <CreateAppModal
        show={showModalPackagePrice} 
        handleClose={handleCloseModalPackagePrice} 
        content={<ModalShowAndAddPackage title={intl.formatMessage({id: 'MENU.DONGGOITHUONG'})}/>}
        title={intl.formatMessage({id: 'MENU.DONGGOITHUONG'})}
        size="lg"
      />
    </div>
  )
}

export default PackagePriceSetupPage