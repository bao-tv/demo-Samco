import React, {useMemo, useCallback, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { usePageData } from '../../../_metronic/layout/core';
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials';
import { columnDefsOrderManagerment } from './interface';

type Props = {}

const OrderManagementDelete = (props: Props) => {
  const {rowDataOrder, gridRef, showCreateAppModal, setShowCreateAppModal, rowDataCouponReciept} = usePageData();
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
  const renderRowDataOrder = (rowDataOrder)?.map((item) => ({...item, receiptAddressJoin: `${item.receiptAddress.label} - ${item.receiptProvinceAddress.label}`}))
  // const getRowId = useCallback((params: any) => params.data.indexRow, []);
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
            rowData={renderRowDataOrder?.filter(item => item.isRemove)}
            columnDefs={columnDefsOrderManagerment}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
            // getRowId={getRowId}
          />
        </div>
      </div>
    </div>
  )
}

export default OrderManagementDelete