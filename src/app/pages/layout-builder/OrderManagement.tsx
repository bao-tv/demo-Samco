import React, {useMemo, useCallback, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { usePageData } from '../../../_metronic/layout/core';
import { useThemeMode } from '../../../_metronic/partials';
import { columnDefsOrderManagerment } from './interface';

type Props = {}

const OrderManagement = (props: Props) => {
  const gridRef = useRef(null);
  const {rowDataOrder} = usePageData();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const onGridReady = useCallback((params: any) => {
  }, []);
  const {modeCurrent} = useThemeMode();
  const cloneRowDataAddIndex = rowDataOrder?.map((item, index) => ({...item, index: index + 1}))
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
            rowData={cloneRowDataAddIndex}
            columnDefs={columnDefsOrderManagerment}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  )
}

export default OrderManagement