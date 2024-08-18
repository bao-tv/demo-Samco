import {useMemo, useCallback, useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials';
import { IFormSearch, columnDefsCommunesSetupPage } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import { useIntl } from 'react-intl';
import ToastError from '../../../_metronic/helpers/crud-helper/Toast';
import ModalShowAndAddCommune from './ModalShowAndAddCommune';
import { communeAPIGetByPagination } from '../../../apis/communeAPI';
import Pagination from '../../../_metronic/layout/components/pagination/Pagination';

type Props = {}

const CommunesSetupPage = (props: Props) => {
  const intl = useIntl();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({height: 'calc(100% - 50px)', width: "100%" }), []);
  const {modeCurrent} = useThemeMode();
  const onGridReady = useCallback((params: any) => {
  }, []);
  const onCellValueChanged = useCallback((event: any) => {
    console.log(
      "bao onCellValueChanged: " + event.colDef.field + " = " + event.newValue,
    );
  }, []); 
  const {listCommunes, setListCommunes,gridRefCommuneSetup, showModalCommune, setShowModalCommune, setDataModalCommune, searchData} = usePageData();
  const handleCloseModalCommune = () => {
    setShowModalCommune && setShowModalCommune(false);
    setDataModalCommune && setDataModalCommune({});
  }
  const defaultSearch = {
    searchCriteria: {},
    page: 0,
    pageSize: 20,
    direction: 'ASC',
    sortBy: 'id',
  }
  const [dataPagination, setDataPagination] = useState<any>({})
  const [dataSearch, setDataSearch] = useState<IFormSearch>(defaultSearch)
  const getListCommunes = async (valuePagination: IFormSearch) => {
    try {
      const response = await communeAPIGetByPagination(valuePagination);
      response.status === "OK" && setListCommunes && setListCommunes(response?.data.content)      
      setDataPagination(response?.data)
    } catch (error) {
      ToastError("Có lỗi xả ra!");
    }
  };

  useEffect(() => {
    setDataSearch({
      searchCriteria: {
        name: searchData,
      },
      page: 0,
      pageSize: 20,
      direction: 'ASC',
      sortBy: 'id',
    })
  }, [searchData])
  useEffect(() => {
    getListCommunes(dataSearch);
  },[dataSearch])
  const defaultColDefCommunes_SetupPage = useMemo<any>(() => {
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
            ref={gridRefCommuneSetup}
            rowData={listCommunes}
            columnDefs={columnDefsCommunesSetupPage}
            defaultColDef={defaultColDefCommunes_SetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
          <Pagination dataPagination={dataPagination} setDataSearch={setDataSearch}/>
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