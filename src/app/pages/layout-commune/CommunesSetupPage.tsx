import {useMemo, useCallback, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials';
import { columnDefsCommunesSetupPage } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import { useIntl } from 'react-intl';
import ToastError from '../../../_metronic/helpers/crud-helper/Toast';
import ModalShowAndAddCommune from './ModalShowAndAddCommune';
import { communeAPIGetAll } from '../../../apis/communeAPI';

type Props = {}

const CommunesSetupPage = (props: Props) => {
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
  const {listCommunes, setListCommunes,gridRefCommuneSetup, showModalCommune, setShowModalCommune, setDataModalCommune} = usePageData();
  const handleCloseModalCommune = () => {
    setShowModalCommune && setShowModalCommune(false);
    setDataModalCommune && setDataModalCommune({});
  }
  const getListCommunes = async () => {
    try {
      const response = await communeAPIGetAll();
      response.status === "OK" && setListCommunes && setListCommunes(response?.data)      
    } catch (error) {
      ToastError("Có lỗi xả ra!");
    }
  };
  useEffect(() => {
    getListCommunes();
  },[])
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
            ref={gridRefCommuneSetup}
            rowData={listCommunes}
            columnDefs={columnDefsCommunesSetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <CreateAppModal
        show={showModalCommune} 
        handleClose={handleCloseModalCommune} 
        content={<ModalShowAndAddCommune title={intl.formatMessage({id: 'MENU.XANHANHANG'})} refreshData={getListCommunes}/>}
        title={intl.formatMessage({id: 'MENU.XANHANHANG'})}
        size='lg'
      />
    </div>
  )
}

export default CommunesSetupPage