import React, {useMemo, useCallback, useState, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials';
import { columnDefsProvinceSetupPage } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import ModalShowAndAddProvince from './ModalShowAndAddProvince';
import { log } from 'console';
import { useSelector } from 'react-redux';
import ModalAddProvinceAreaObject from './ModalAddProvinceAreaObject';
import { useIntl } from 'react-intl';

type Props = {}

const ProvinceSetupPage = (props: Props) => {
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
  const {listProvince} = useSelector((state:any) => state.provinces);  
  const {gridRefProvinceSetup, showModalProvince, setShowModalProvince, dataModalProvince, setDataModalProvince, showModalProvinceObject, setShowModalProvinceObject, dataModalProvinceObject, setDataModalProvinceObject} = usePageData();
  const handleCloseModalProvince = () => {
    setShowModalProvince && setShowModalProvince(false);
    setDataModalProvince && setDataModalProvince({});
  }
  const handleCloseModalProvinceObject = () => {
    setShowModalProvinceObject && setShowModalProvinceObject(false);
    setDataModalProvinceObject && setDataModalProvinceObject({});
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
            ref={gridRefProvinceSetup}
            rowData={listProvince}
            columnDefs={columnDefsProvinceSetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <CreateAppModal
        show={showModalProvince} 
        handleClose={handleCloseModalProvince} 
        content={<ModalShowAndAddProvince title={intl.formatMessage({id: 'MENU.TINHNHANHANG'})}/>}
        title={intl.formatMessage({id: 'MENU.TINHNHANHANG'})}
      />
      <CreateAppModal
        show={showModalProvinceObject}
        handleClose={handleCloseModalProvinceObject} 
        content={<ModalAddProvinceAreaObject title="Khu vực nhận hàng"/>}
        title="Khu vực nhận hàng"
        size="lg"
      />
    </div>
  )
}

export default ProvinceSetupPage