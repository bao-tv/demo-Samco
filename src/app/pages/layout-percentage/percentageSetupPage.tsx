import {useMemo, useCallback} from 'react'
import {AgGridReact} from 'ag-grid-react'
import {CreateAppModal, useThemeMode} from '../../../_metronic/partials'
import {columnDefsPercentageSetupPage} from './interface'
import {usePageData} from '../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import ModalShowAndAddPercentage from './ModalShowAndAddPercentage'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

type Props = {}

const PercentageSetupPage = (props: Props) => {
  const {listPercentage} = useSelector((state: RootState) => state.Percentage)
  // console.log('bao listTax: ', listTax);
  const intl = useIntl()
  const containerStyle = useMemo(() => ({width: '100%', height: '100%'}), [])
  const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), [])
  const {modeCurrent} = useThemeMode()
  const onGridReady = useCallback((params: any) => {}, [])
  const onCellValueChanged = useCallback((event: any) => {
    console.log('bao onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue)
  }, [])
  const {
    gridRefPercentageSetup,
    showModalPercentage,
    setShowModalPercentage,
    setDataModalPercentage,
  } = usePageData()
  const handleCloseModalPercentage = () => {
    setShowModalPercentage && setShowModalPercentage(false)
    setDataModalPercentage && setDataModalPercentage({})
  }
  return (
    <div style={containerStyle}>
      <div style={{height: '100%', boxSizing: 'border-box'}}>
        <div
          style={gridStyle}
          className={modeCurrent === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}
        >
          <AgGridReact
            ref={gridRefPercentageSetup}
            rowData={listPercentage}
            columnDefs={columnDefsPercentageSetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <CreateAppModal
        show={showModalPercentage}
        handleClose={handleCloseModalPercentage}
        content={
          <ModalShowAndAddPercentage
            title={intl.formatMessage({id: 'MENU.PHI-THUE'})}
            // refreshData={getListPercentages}
            handleClose={handleCloseModalPercentage}
          />
        }
        title={intl.formatMessage({id: 'MENU.PHI-THUE'})}
        size='lg'
      />
    </div>
  )
}

export default PercentageSetupPage
