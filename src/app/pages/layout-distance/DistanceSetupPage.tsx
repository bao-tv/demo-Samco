import React, {useMemo, useCallback, useState, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials';
import { columnDefsDistanceSetupPage } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import ModalShowAndAddDistance from './ModalShowAndAddDistance';
import { log } from 'console';
import { useSelector } from 'react-redux';
import ModalAddDistancePriceObject from './ModalAddDistancePriceObject';
import { useIntl } from 'react-intl';

type Props = {}

const DistanceSetupPage = (props: Props) => {
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
  const {listDistance} = useSelector((state:any) => state.distances);  
  const {gridRefDistanceSetup, showModalDistance, setShowModalDistance, dataModalDistance, setDataModalDistance, showModalDistancePriceObject, setShowModalDistancePriceObject, dataModalDistancePriceObject, setDataModalDistancePriceObject} = usePageData();
  const handleCloseModalDistance = () => {
    setShowModalDistance && setShowModalDistance(false);
    setDataModalDistance && setDataModalDistance({});
  }
  const handleCloseModalDistancePriceObject = () => {
    setShowModalDistancePriceObject && setShowModalDistancePriceObject(false);
    setDataModalDistancePriceObject && setDataModalDistancePriceObject({});
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
            ref={gridRefDistanceSetup}
            rowData={listDistance}
            columnDefs={columnDefsDistanceSetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <CreateAppModal
        show={showModalDistance} 
        handleClose={handleCloseModalDistance} 
        content={<ModalShowAndAddDistance title={intl.formatMessage({id: 'MENU.KHOANGCACH'})}/>}
        title={intl.formatMessage({id: 'MENU.KHOANGCACH'})}
      />
      <CreateAppModal
        show={showModalDistancePriceObject}
        handleClose={handleCloseModalDistancePriceObject} 
        content={<ModalAddDistancePriceObject title="Giá tại khoảng cách"/>}
        title="Giá tại khoảng cách"
        size="lg"
      />
    </div>
  )
}

export default DistanceSetupPage