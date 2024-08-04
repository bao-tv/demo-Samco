import {useMemo, useCallback, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials';
import { columnDefsRegion_Freight_Prices_SetupPage } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import ModalShowAndAdd_Region_Freight_Price from './ModalShowAndAdd_Region_Freight_Price';
import { useIntl } from 'react-intl';
import ToastError from '../../../_metronic/helpers/crud-helper/Toast';
import { region_priceAPIGetAll } from '../../../apis/region-priceAPI';

type Props = {}

const Region_Freight_Prices_SetupPage = (props: Props) => {
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
  const {listRegion_Freight_Prices, setListRegion_Freight_Prices,gridRefRegion_Freight_PriceSetup, showModalRegion_Freight_Price, setShowModalRegion_Freight_Price, setDataModalRegion_Freight_Price} = usePageData();
  const handleCloseModalRegion_Freight_Price = () => {
    setShowModalRegion_Freight_Price && setShowModalRegion_Freight_Price(false);
    setDataModalRegion_Freight_Price && setDataModalRegion_Freight_Price({});
  }
  const getListRegion_Freight_Prices = async () => {
    try {
      const response = await region_priceAPIGetAll();
      response.status === "OK" && setListRegion_Freight_Prices && setListRegion_Freight_Prices(response?.data)      
    } catch (error) {
      ToastError("Có lỗi xả ra!");
    }
  };
  useEffect(() => {
    getListRegion_Freight_Prices();
  },[])
  const defaultColDefRegion_Freight_Prices_SetupPage = useMemo<any>(() => {
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
            ref={gridRefRegion_Freight_PriceSetup}
            rowData={listRegion_Freight_Prices}
            columnDefs={columnDefsRegion_Freight_Prices_SetupPage}
            defaultColDef={defaultColDefRegion_Freight_Prices_SetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <CreateAppModal
        show={showModalRegion_Freight_Price} 
        handleClose={handleCloseModalRegion_Freight_Price} 
        content={<ModalShowAndAdd_Region_Freight_Price title={intl.formatMessage({id: 'MENU.GIACUOCTHEOKG'})} refreshData={getListRegion_Freight_Prices}/>}
        title={intl.formatMessage({id: 'MENU.GIACUOCTHEOKG'})}
        size='lg'
      />
    </div>
  )
}

export default Region_Freight_Prices_SetupPage