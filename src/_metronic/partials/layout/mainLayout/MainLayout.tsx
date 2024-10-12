import {useMemo, useCallback, useEffect, useState} from 'react'
import {AgGridReact} from 'ag-grid-react'
import Pagination from '../../../layout/components/pagination/Pagination'
import { useThemeMode } from '../theme-mode/ThemeModeProvider'
// import './styleMainLayout.css'


type Props = {
    gridRef: any,
    rowData: any[] | undefined,
    columnDef: any,
    defaultCol?: any
    dataPagination?: any,
    setDataSearch?: any,
    modal?: any,
    isLoading?: any,
    heightBottom?: any | '50px',
    rowClassRules?: any,
    rowSelection?: 'single' | 'multiple',
    handlegGetDataTranfToWarehouse?: any
}

const MainLayout: React.FC<Props> = ({
    gridRef,
    rowData,
    columnDef,
    defaultCol = {
        flex: 1,
        filter: true,
    sortable: true,
    resizable: true,
        menuTabs: [],
            headerComponentParams: { menuIcon: 'fa-bars' },
      },
    dataPagination,
    setDataSearch,
    modal,
    isLoading,
    heightBottom = '50px', // Default value here
    rowClassRules,
    rowSelection,
    handlegGetDataTranfToWarehouse,
}) => {
    // console.log('bao heightBottom: ', heightBottom)
  const containerStyle = useMemo(() => ({width: '100%', height: '100%'}), [])
  const gridStyle = useMemo(() => ({height: `calc(100% - ${heightBottom})`, width: '100%'}), [])
  const {modeCurrent} = useThemeMode();
  return (
    <div style={containerStyle}>
      <div style={{height: '100%', boxSizing: 'border-box'}}>
        <div
          style={gridStyle}
          className={modeCurrent === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}
        >
            {isLoading && (
            <div
              className='h-100 d-flex justify-content-center align-items-center bg-black bg-opacity-25'
              style={{
                zIndex: 999,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                height: '100vh',
                width: '100vw',
              }}
            >
              <img
                src={'/media/img/awating.gif'}
                className='img-fluid'
                style={{height: '100px', width: '100px'}}
              />
            </div>
          )}
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDef}
            defaultColDef={defaultCol}
            rowClassRules={rowClassRules}
            rowSelection={rowSelection}
          />
          <Pagination dataPagination={dataPagination} setDataSearch={setDataSearch} handlegGetDataTranfToWarehouse={handlegGetDataTranfToWarehouse}/>
        </div>
      </div>
      {modal}
    </div>
  )
}

export default MainLayout
