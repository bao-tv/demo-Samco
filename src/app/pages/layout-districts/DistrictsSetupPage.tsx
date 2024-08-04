import {useMemo, useCallback, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials';
import { columnDefsDistrictsSetupPage } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import ModalShowAndAddDistrict from './ModalShowAndAddDistrict';
import { useIntl } from 'react-intl';
import { districtAPIGetAll } from '../../../apis/districtAPI';
import ToastError from '../../../_metronic/helpers/crud-helper/Toast';

type Props = {}

const DistrictsSetupPage = (props: Props) => {
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
  const {listDistricts, setListDistricts,gridRefDistrictSetup, showModalDistrict, setShowModalDistrict, setDataModalDistrict} = usePageData();
  const handleCloseModalDistrict = () => {
    setShowModalDistrict && setShowModalDistrict(false);
    setDataModalDistrict && setDataModalDistrict({});
  }
  const getListDistricts = async () => {
    try {
      const response = await districtAPIGetAll();
      response.status === "OK" && setListDistricts && setListDistricts(response?.data)      
    } catch (error) {
      ToastError("Có lỗi xả ra!");
    }
  };
  useEffect(() => {
    getListDistricts();
  },[])

  const defaultColDefDistricts_SetupPage = useMemo<any>(() => {
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
            ref={gridRefDistrictSetup}
            rowData={listDistricts}
            columnDefs={columnDefsDistrictsSetupPage}
            defaultColDef={defaultColDefDistricts_SetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <CreateAppModal
        show={showModalDistrict} 
        handleClose={handleCloseModalDistrict} 
        content={<ModalShowAndAddDistrict title={intl.formatMessage({id: 'MENU.HUYENNHANHANG'})} refreshData={getListDistricts} handleClose={handleCloseModalDistrict}/>}
        title={intl.formatMessage({id: 'MENU.HUYENNHANHANG'})}
        size='lg'
      />
    </div>
  )
}

export default DistrictsSetupPage