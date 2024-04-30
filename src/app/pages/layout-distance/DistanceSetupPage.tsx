import React, {useMemo, useCallback, useState, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useThemeMode } from '../../../_metronic/partials';
import { columnDefsDistanceSetupPage } from './interface';

type Props = {}

const DistanceSetupPage = (props: Props) => {
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
  const gridRefDistanceSetup = useRef(null);
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
            ref={gridRefDistanceSetup}
            rowData={[]}
            columnDefs={columnDefsDistanceSetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
            // getRowId={getRowId}
          />
        </div>
      </div>
    </div>
  )
}

export default DistanceSetupPage