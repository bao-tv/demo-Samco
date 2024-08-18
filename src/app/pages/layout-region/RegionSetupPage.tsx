import {useMemo, useCallback, useState, useEffect} from 'react'
import {AgGridReact} from 'ag-grid-react'
import {CreateAppModal, useThemeMode} from '../../../_metronic/partials'
import {columnDefsRegionSetupPage} from './interface'
import {usePageData} from '../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import {regionAPIGetAll} from '../../../apis/regionAPI'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import ModalShowAndAddRegion from './ModalShowAndAddRegion'

type Props = {}

const RegionSetupPage = (props: Props) => {
  const intl = useIntl()
  const containerStyle = useMemo(() => ({width: '100%', height: '100%'}), [])
  const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), [])
  const {modeCurrent} = useThemeMode()
  const onGridReady = useCallback((params: any) => {}, [])
  const onCellValueChanged = useCallback((event: any) => {
    console.log('bao onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue)
  }, [])
  const {
    gridRefRegionSetup,
    listRegions,
    setListRegions,
    showModalRegion,
    setShowModalRegion,
    setDataModalRegion,
  } = usePageData()
  const getListRegions = async () => {
    try {
      const response = await regionAPIGetAll()
      response.status === 'OK' && setListRegions && setListRegions(response?.data)
    } catch (error) {
      ToastError('Có lỗi xả ra!')
    }
  }
  const handleCloseModalRegion = () => {
    setShowModalRegion && setShowModalRegion(false)
    setDataModalRegion && setDataModalRegion({})
  }
  useEffect(() => {
    getListRegions()
  }, [])
  return (
    <div style={containerStyle}>
      <div style={{height: '100%', boxSizing: 'border-box'}}>
        <div
          style={gridStyle}
          className={modeCurrent === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}
        >
          <AgGridReact
            ref={gridRefRegionSetup}
            rowData={listRegions}
            columnDefs={columnDefsRegionSetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <CreateAppModal
        show={showModalRegion}
        handleClose={handleCloseModalRegion}
        content={
          <ModalShowAndAddRegion
            title={intl.formatMessage({id: 'MENU.KHUVUC'})}
            refreshData={getListRegions}
            handleClose={handleCloseModalRegion}
          />
        }
        title={intl.formatMessage({id: 'MENU.KHUVUC'})}
        size='lg'
      />
    </div>
  )
}

export default RegionSetupPage
