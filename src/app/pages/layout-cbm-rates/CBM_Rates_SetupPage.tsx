import {useMemo, useCallback, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials';
import { columnDefsCBM_Rates_SetupPage } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import ModalShowAndAdd_CBM_Rate from './ModalShowAndAdd_CBM_Rate';
import { useIntl } from 'react-intl';
import ToastError from '../../../_metronic/helpers/crud-helper/Toast';
import { cbm_rateAPIGetAll } from '../../../apis/cbm-rateAPI';

type Props = {}

const CBM_Rates_SetupPage = (props: Props) => {
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
  const {listCBM_Rates, setListCBM_Rates, gridRefCBM_RateSetup, showModalCBM_Rate, setShowModalCBM_Rate, setDataModalCBM_Rate} = usePageData();
  const handleCloseModalCBM_Rate = () => {
    setShowModalCBM_Rate && setShowModalCBM_Rate(false);
    setDataModalCBM_Rate && setDataModalCBM_Rate({});
  }
  const getListCBM_Rates = async () => {
    try {
      const response = await cbm_rateAPIGetAll();
      response.status === "OK" && setListCBM_Rates && setListCBM_Rates(response?.data)      
    } catch (error) {
      ToastError("Có lỗi xả ra!");
    }
  };
  useEffect(() => {
    getListCBM_Rates();
  },[])
  const defaultColDefCBM_Rates_SetupPage = useMemo<any>(() => {
    return {
      flex: 1,
      filter: true,
    };
  }, []);
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
            ref={gridRefCBM_RateSetup}
            rowData={listCBM_Rates.map((ele: any) => ({...ele, additionalPrice: ele.additionalPrice ? true : false, additionalWeight: ele.additionalWeight ? true : false}))}
            columnDefs={columnDefsCBM_Rates_SetupPage}
            defaultColDef={defaultColDefCBM_Rates_SetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <CreateAppModal
        show={showModalCBM_Rate} 
        handleClose={handleCloseModalCBM_Rate} 
        content={<ModalShowAndAdd_CBM_Rate title={intl.formatMessage({id: 'MENU.GIACUOCTHEOCBM'})} refreshData={getListCBM_Rates} handleClose={handleCloseModalCBM_Rate} />}
        title={intl.formatMessage({id: 'MENU.GIACUOCTHEOCBM'})}
        size='lg'
      />
    </div>
  )
}

export default CBM_Rates_SetupPage