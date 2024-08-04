import {useMemo, useCallback, useEffect} from 'react'
import {AgGridReact} from 'ag-grid-react'
import {CreateAppModal, useThemeMode} from '../../../_metronic/partials'
import {columnDefsProvinceSetupPage} from './interface'
import {usePageData} from '../../../_metronic/layout/core'
import ModalShowAndAddProvince from './ModalShowAndAddProvince'
import {useIntl} from 'react-intl'
import { provinceAPIGetAll } from '../../../apis/provinceAPI'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'

type Props = {}

const ProvinceSetupPage = (props: Props) => {
  const intl = useIntl()
  const containerStyle = useMemo(() => ({width: '100%', height: '100%'}), [])
  const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), [])
  const {modeCurrent} = useThemeMode()
  const onGridReady = useCallback((params: any) => {}, [])
  const onCellValueChanged = useCallback((event: any) => {
    console.log('bao onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue)
  }, [])
  // const {listProvince} = useSelector((state: any) => state.provinces)
  const {listProvinces, setListProvinces ,gridRefProvinceSetup, showModalProvince, setShowModalProvince, setDataModalProvince} =
    usePageData()
  const handleCloseModalProvince = () => {
    setShowModalProvince && setShowModalProvince(false)
    setDataModalProvince && setDataModalProvince({})
  }

  const getListProvinces = async () => {
    try {
      const response = await provinceAPIGetAll();
      response.status === "OK" && setListProvinces && setListProvinces(response?.data)      
    } catch (error) {
      ToastError("Có lỗi xả ra!");
    }
  };
  useEffect(() => {
    getListProvinces();
  },[])

  const defaultColDefProvinces_SetupPage = useMemo<any>(() => {
    return {
      flex: 1,
      filter: true,
    };
  }, []);
  return (
    <div style={containerStyle}>
      <div style={{height: '100%', boxSizing: 'border-box'}}>
        <div
          style={gridStyle}
          className={modeCurrent === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}
        >
          <AgGridReact
            ref={gridRefProvinceSetup}
            rowData={listProvinces}
            columnDefs={columnDefsProvinceSetupPage}
            defaultColDef={defaultColDefProvinces_SetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <CreateAppModal
        show={showModalProvince}
        handleClose={handleCloseModalProvince}
        content={<ModalShowAndAddProvince title={intl.formatMessage({id: 'MENU.TINHNHANHANG'})} handleClose={handleCloseModalProvince} refreshData={getListProvinces}/>}
        title={intl.formatMessage({id: 'MENU.TINHNHANHANG'})}
        size='lg'
      />
    </div>
  )
}

export default ProvinceSetupPage
