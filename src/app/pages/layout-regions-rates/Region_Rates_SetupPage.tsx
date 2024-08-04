import {useMemo, useCallback, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials';
import { columnDefsRegion_Rates_SetupPage } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import ModalShowAndAdd_Region_Rate from './ModalShowAndAdd_Region_Rate';
import { useIntl } from 'react-intl';
import ToastError from '../../../_metronic/helpers/crud-helper/Toast';
import { region_rateAPIGetAll } from '../../../apis/region-rateAPI';

type Props = {}

const Region_Rates_SetupPage = (props: Props) => {
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
  const {listRegion_Rates, setListRegion_Rates, gridRefRegion_RateSetup, showModalRegion_Rate, setShowModalRegion_Rate, setDataModalRegion_Rate} = usePageData();
  const handleCloseModalRegion_Rate = () => {
    setShowModalRegion_Rate && setShowModalRegion_Rate(false);
    setDataModalRegion_Rate && setDataModalRegion_Rate({});
  }
  const getListRegion_Rates = async () => {
    try {
      const response = await region_rateAPIGetAll();
      response.status === "OK" && setListRegion_Rates && setListRegion_Rates(response?.data)      
    } catch (error) {
      ToastError("Có lỗi xả ra!");
    }
  };
  useEffect(() => {
    getListRegion_Rates();
  },[])
  const defaultColDefRegion_Rates_SetupPage = useMemo<any>(() => {
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
            ref={gridRefRegion_RateSetup}
            rowData={listRegion_Rates.map((ele: any) => ({...ele, additionalPrice: ele.additionalPrice ? true : false, additionalWeight: ele.additionalWeight ? true : false}))}
            columnDefs={columnDefsRegion_Rates_SetupPage}
            defaultColDef={defaultColDefRegion_Rates_SetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <CreateAppModal
        show={showModalRegion_Rate} 
        handleClose={handleCloseModalRegion_Rate} 
        content={<ModalShowAndAdd_Region_Rate title={intl.formatMessage({id: 'MENU.GIACUOCTHEOKG'})} refreshData={getListRegion_Rates} handleClose={handleCloseModalRegion_Rate} />}
        title={intl.formatMessage({id: 'MENU.GIACUOCTHEOKG'})}
        size='lg'
      />
    </div>
  )
}

export default Region_Rates_SetupPage