import React, {useMemo, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {usePageData} from '../../../../_metronic/layout/core'
import {Table} from 'react-bootstrap'
import {AgGridReact} from 'ag-grid-react'
import ButtonActionsRender from '../../../../_metronic/helpers/components/ButtonActionsRender'
import { KTIcon } from '../../../../_metronic/helpers'
// import ButtonActionEdit_Delete from '../../../../_metronic/helpers/components/ButtonActionEdit_Delete'

type Props = {
  data: any
}
const ButtonActionDelete = (props: any) => {
  const {gridRefSubPackage, setRowDataSubPackage} = usePageData()
  // let newRowData: any = []
  const handleDelete = () => {
    if (props?.data?.note != '...') {
      gridRefSubPackage.current!.api.applyTransaction({remove: [props.data]})
    }
  }
  return (
    <div className='d-flex h-100 justify-content-center align-items-center'>
      <Button
        size='sm'
        className='me-1'
        variant='danger'
        style={{padding: 'calc(0.45rem + 1px) calc(1rem + 1px)'}}
        onClick={handleDelete}
      >
        <i className='bi bi-x-circle fs-2'></i>
      </Button>
    </div>
  )
}

const SubPackages = (props: Props) => {
  const {
    showModalOrder,
    showModalSubPackage,
    setShowModalSubPackage,
    gridRefSubPackage,
    rowDataSubPackage,
    setRowDataSubPackage,
  } = usePageData()
  const defaultColDef = useMemo<any>(() => {
    return {
      editable: true,
      flex: 1,
      minWidth: 100,
    }
  }, [])
  // console.log('bao rowDataSubPackage: ', rowDataSubPackage);
  let rowDataAdd: any
  if(rowDataSubPackage.length) {
    rowDataAdd= [...rowDataSubPackage, {note: '...', detail: 0}]
  } else rowDataAdd = [{note: '...', detail: 0}]

  console.log('bao rowDataAdd: ', rowDataAdd);
  console.log('bao rowDataSubPackage: ', rowDataSubPackage);

  const containerStyle = useMemo(() => ({width: '100%', height: '100%'}), [])
  const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), [])
  const [columnDefs, setColumnDefs] = useState<any[]>([
    {field: 'detail', headerName: 'Mã'},
    {
      field: 'note',
      headerName: 'Tên gói hàng phụ',
    },
    {headerName: 'Hành động', cellRenderer: ButtonActionDelete, editable: false},
  ])
  const onchangeValueCell = (prod: any) => {
    // console.log('bao onchangeValueCell: ', prod);
    let rowData: any[] = []
    gridRefSubPackage.current!.api.forEachNode((rowNode: any) => rowData.push(rowNode.data))
    if (rowData[rowData.length - 1].note != '...' && rowData[rowData.length - 1].detail != 0) {
      gridRefSubPackage.current!.api.applyTransaction({add: [{note: '...', detail: 0}]})
    }
  }
  const onHide = () => {
    setShowModalSubPackage && setShowModalSubPackage(false)
    let rowData: any[] = []
    gridRefSubPackage.current!.api.forEachNode((rowNode: any) => {
        if (rowNode.data.note != '...') {
            rowData.push(rowNode.data)
        }
    })
    setRowDataSubPackage && setRowDataSubPackage(rowData);
  }
  return (
    <Modal
      style={{top: '60%'}}
      show={showModalSubPackage}
    //   onHide={() => setShowModalSubPackage && setShowModalSubPackage(false)}
      size='lg'
      animation
      backdrop='static'
      keyboard={false}
      className='z-3'
    >
      <Modal.Header className='p-3'>
        <Modal.Title>{`Thêm kiện hàng phụ: ${showModalOrder.receiptCode}`}</Modal.Title>
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={onHide}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
        {/* end::Close */}
      </Modal.Header>
      <Modal.Body className='p-2' style={{height: '250px'}}>
        <div style={containerStyle}>
          <div style={gridStyle} className={'ag-theme-quartz'}>
            <AgGridReact
              ref={gridRefSubPackage}
              rowData={rowDataAdd}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onCellValueChanged={onchangeValueCell}
            />
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer className='p-3'>
            <p role="button" onClick={downloadPdf}>Download PDF</p>
        </Modal.Footer> */}
    </Modal>
  )
}

export default SubPackages
