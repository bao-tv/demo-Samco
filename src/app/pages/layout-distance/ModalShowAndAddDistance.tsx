import React, {useCallback, useMemo, useRef, useState} from 'react'
import {AgGridReact} from 'ag-grid-react'
import {useForm, SubmitHandler, Controller, useWatch} from 'react-hook-form'
import {InputGroup, Button, Form, OverlayTrigger} from 'react-bootstrap'
import {columnDefsPriceInDistance} from './interface'
import { useThemeMode } from '../../../_metronic/partials'
import ModalAddPriceObject from './ModalAddPriceObject'

type Props = {}

const ModalShowAndAddDistance = (props: any) => {
  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    clearErrors,
    reset,
    formState: {errors},
  } = useForm<any>({
    mode: 'all',
    defaultValues: {},
    shouldUnregister: false,
  })
  const gridRefPriceInDistance = useRef(null)
  const onGridReady = useCallback((params: any) => {}, [])
  const onCellValueChanged = useCallback((event: any) => {
    console.log('bao onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue)
  }, [])
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%"}), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const defaultColDef: any = {
    flex: 1,
  }
  const {modeCurrent} = useThemeMode();
  const [showModalAddPriceObject, setShowModalAddPriceObject] = useState<any>(false);
  const [rowDataPriceObject, setRowDataPriceObject] = useState<any[]>([])
  const handleSubmitModalAddPriceObject = async (data: any) => {
    setRowDataPriceObject && await setRowDataPriceObject((prevRowData: any) => [...prevRowData, data]);
  }
  return (
    <form>
      <div className='row'>
        <div className='group card mb-5 p-5 pt-0 me-3'>
          <>
            <p className='list-unstyled text-gray-700 fw-bold fs-3'>Tên Khoảng cách</p>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <InputGroup.Text className={`group-text ${errors?.sendName && 'border-danger'}`}>
                    Tên
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.sendName && 'border-danger'}`}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
              )}
              name='distanceName'
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <InputGroup.Text className={`group-text ${errors?.sendName && 'border-danger'}`}>
                    Mã
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.sendName && 'border-danger'}`}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
              )}
              name='distanceCode'
            />
          </>
        </div>
      </div>
      <div className='row'>
        <div className='mb-5 p-5 pt-0 me-3'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <p className='list-unstyled text-gray-700 fw-bold fs-3 mb-0'>Giá</p>
                <Button onClick={()=> setShowModalAddPriceObject(true)} className='btn btn-primary'>Thêm</Button>
            </div>
            <div style={containerStyle}>
                <div style={{height: '100%', minHeight: '100px' , boxSizing: 'border-box'}}>
                    <div
                        style={gridStyle}
                        className={modeCurrent === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}
                    >
                        <AgGridReact
                            ref={gridRefPriceInDistance}
                            rowData={rowDataPriceObject}
                            columnDefs={columnDefsPriceInDistance}
                            onGridReady={onGridReady}
                            onCellValueChanged={onCellValueChanged}
                            // getRowId={getRowId}
                            defaultColDef={defaultColDef}
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>
      <ModalAddPriceObject
        isShow={showModalAddPriceObject} 
        setShow={setShowModalAddPriceObject}
        handleSubmmit={handleSubmitModalAddPriceObject}
        />
    </form>
  )
}

export default ModalShowAndAddDistance
