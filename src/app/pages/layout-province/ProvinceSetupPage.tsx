import React, {useMemo, useCallback, useState, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials';
import { columnDefsProvinceSetupPage } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import ModalShowAndAddProvince from './ModalShowAndAddProvince';
import { log } from 'console';
import { useSelector } from 'react-redux';

type Props = {}

const ProvinceSetupPage = (props: Props) => {
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
  const {gridRefProvinceSetup, showCreateProvinceModal, setShowCreateProvinceModal} = usePageData();
  const handleClose = () => setShowCreateProvinceModal && setShowCreateProvinceModal(false);
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
          <CreateAppModal
            show={showCreateProvinceModal} 
            handleClose={handleClose} 
            content={<ModalShowAndAddProvince title="Tỉnh nhận hàng" handleClose={handleClose}/>}
            title="Tỉnh nhận hàng"
          />
        </div>
      </div>
    </div>
  )
}

export default ProvinceSetupPage