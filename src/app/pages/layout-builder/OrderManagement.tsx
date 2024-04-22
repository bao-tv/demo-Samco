import React, {useMemo, useCallback, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { usePageData } from '../../../_metronic/layout/core';
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials';
import { columnDefsOrderManagerment } from './interface';
import ModalShowImport from './ModalShowImport';
import { BuilderPage } from './BuilderPage';

type Props = {}

const OrderManagement = (props: Props) => {
  const {rowDataOrder, gridRef, showCreateAppModal, setShowCreateAppModal} = usePageData();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const onGridReady = useCallback((params: any) => {
  }, []);
  const {modeCurrent} = useThemeMode();
  const onCellValueChanged = useCallback((event: any) => {
    console.log(
      "bao onCellValueChanged: " + event.colDef.field + " = " + event.newValue,
    );
  }, []);
  const handleClose = () => setShowCreateAppModal && setShowCreateAppModal(false);
  console.log('bao rowDataOrder: ', rowDataOrder)
  const renderRowDataOrder = rowDataOrder?.filter((item) => !item.isRemove)
  const getRowId = useCallback((params: any) => params.data.indexRow, []);
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
            ref={gridRef}
            rowData={renderRowDataOrder}
            columnDefs={columnDefsOrderManagerment}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
            getRowId={getRowId}
          />
        </div>
      </div>
      <ModalShowImport />
      <CreateAppModal
        show={showCreateAppModal} 
        handleClose={handleClose} 
        content={<BuilderPage handleClose={handleClose}/>}
      />
    </div>
  )
}

export default OrderManagement