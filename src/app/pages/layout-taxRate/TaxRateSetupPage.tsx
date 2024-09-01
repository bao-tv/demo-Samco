import {useMemo, useCallback, useState, useEffect} from 'react'
import {AgGridReact} from 'ag-grid-react'
import {CreateAppModal, useThemeMode} from '../../../_metronic/partials'
import {columnDefsTaxRateSetupPage} from './interface'
import {usePageData} from '../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import {regionAPIGetAll} from '../../../apis/regionAPI'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import ModalShowAndAddTaxRate from './ModalShowAndAddRegion'
import { taxRateAPIGetAll } from '../../../apis/taxRateAPI'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

type Props = {}

const TaxRateSetupPage = (props: Props) => {
  const {listTax} = useSelector((state: RootState) => state.taxRate)
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
    gridRefTaxRateSetup,
    showModalTaxRate,
    setShowModalTaxRate,
    setDataModalTaxRate,
  } = usePageData()
  const handleCloseModalTaxRate = () => {
    setShowModalTaxRate && setShowModalTaxRate(false)
    setDataModalTaxRate && setDataModalTaxRate({})
  }
  return (
    <div style={containerStyle}>
      <div style={{height: '100%', boxSizing: 'border-box'}}>
        <div
          style={gridStyle}
          className={modeCurrent === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}
        >
          <AgGridReact
            ref={gridRefTaxRateSetup}
            rowData={listTax}
            columnDefs={columnDefsTaxRateSetupPage}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
      <CreateAppModal
        show={showModalTaxRate}
        handleClose={handleCloseModalTaxRate}
        content={
          <ModalShowAndAddTaxRate
            title={intl.formatMessage({id: 'MENU.THUESUAT'})}
            // refreshData={getListTaxRates}
            handleClose={handleCloseModalTaxRate}
          />
        }
        title={intl.formatMessage({id: 'MENU.THUESUAT'})}
        size='lg'
      />
    </div>
  )
}

export default TaxRateSetupPage
