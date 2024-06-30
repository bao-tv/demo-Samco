import {useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials';
import { columnDefsPackageSetupPage } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import ModalShowAndAddPackage from './ModalShowAndAddPackage';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

type Props = {}

const PackageSetupPage = (props: Props) => {
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
  const {listPackages} = useSelector((state:any) => state.packages);  
  const {gridRefPackageSetup, showModalPackage, setShowModalPackage, setDataModalPackage} = usePageData();
  const handleCloseModalPackage = () => {
    setShowModalPackage && setShowModalPackage(false);
    setDataModalPackage && setDataModalPackage({});
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
            ref={gridRefPackageSetup}
            rowData={listPackages}
            columnDefs={columnDefsPackageSetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <CreateAppModal
        show={showModalPackage} 
        handleClose={handleCloseModalPackage} 
        content={<ModalShowAndAddPackage title={intl.formatMessage({id: 'MENU.DONGGOI'})}/>}
        title={intl.formatMessage({id: 'MENU.DONGGOI'})}
        size="lg"
      />
    </div>
  )
}

export default PackageSetupPage