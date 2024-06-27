import React, {useCallback, useMemo, useRef, useState} from 'react'
import {AgGridReact} from 'ag-grid-react'
import {useForm, SubmitHandler, Controller, useWatch} from 'react-hook-form'
import {InputGroup, Button, Form, OverlayTrigger} from 'react-bootstrap'
import {IFormProvinceInput, columnDefsAreaInProvince} from './interface'
import { useThemeMode } from '../../../_metronic/partials'
import ModalAddProvinceAreaObject from './ModalAddProvinceAreaObject'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import { provinceCreatedAPI } from '../../../apis/provinceAPI';
import { usePageData } from '../../../_metronic/layout/core'
// import { province, province_created } from '../../../slices/provinceSlices'

type Props = {}

const ModalShowAndAddProvince = (props: any) => {
  const {showCreateProvinceModal} = usePageData();
  console.log('bao showCreateProvinceModal: ', showCreateProvinceModal)
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<any>({
    mode: 'all',
    defaultValues: {
      label: showCreateProvinceModal.label || '',
      value: showCreateProvinceModal.value || '',
      licenseplates: showCreateProvinceModal.licenseplates || '',
      transportationRoutes: showCreateProvinceModal.transportationRoutes || [],
     },
    shouldUnregister: false,
  })

  const gridRefProvinceInProvince = useRef(null)
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
  const [showModalAddProvinceAreaObject, setShowModalAddProvinceAreaObject] = useState<any>(false);
  const [rowDataProvinceObject, setRowDataProvinceObject] = useState<any[]>(showCreateProvinceModal.transportationRoutes || [])
  const handleSubmitModalAddProvinceObject = async (data: any) => {
    setRowDataProvinceObject && await setRowDataProvinceObject((prevRowData: any) => [...prevRowData, {...data, id: 0}]);
  }
  const onSubmit: SubmitHandler<IFormProvinceInput> = async(data: IFormProvinceInput) =>{
    // handleSubmit((data) => console.log('bao data', data));
    const provinceObject = {...data, transportationRoutes: rowDataProvinceObject, id: 0}
    try{
      const response = !showModalAddProvinceAreaObject && await provinceCreatedAPI(provinceObject);
    }catch (err) {
      // setErr(err.response?.data?.content)
    }
    // reset();
  }
  const onErrors = async (e: any) => {
    if (Object.keys(e).length) {
      ToastError("Bạn nhập thiếu thông tin!");
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <div className='row'>
        <div className='group card mb-5 p-5 pt-0 me-3'>
          <>
            <p className='list-unstyled text-gray-700 fw-bold fs-3'>{`Tên ${props.title}`}</p>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <InputGroup.Text className={`group-text ${errors?.label && 'border-danger'}`}>
                    Tỉnh
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.label && 'border-danger'}`}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
              )}
              name='label'
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <InputGroup.Text className={`group-text ${errors?.value && 'border-danger'}`}>
                    Mã tỉnh
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.value && 'border-danger'}`}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
              )}
              name='value'
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <InputGroup.Text className={`group-text ${errors?.licenseplates && 'border-danger'}`}>
                    Mã biển số xe
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.licenseplates && 'border-danger'}`}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
              )}
              name='licenseplates'
            />
          </>
        </div>
      </div>
      <div className='row'>
        <div className='mb-5 p-5 pt-0 me-3'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <p className='list-unstyled text-gray-700 fw-bold fs-3 mb-0'>Khu vực nhận hàng</p>
                <Button type="submit" onClick={()=> setShowModalAddProvinceAreaObject(true)} className='btn btn-primary'>Thêm</Button>
            </div>
            <div style={containerStyle}>
                <div style={{height: '400px', minHeight: '100px' , boxSizing: 'border-box'}}>
                    <div
                        style={gridStyle}
                        className={modeCurrent === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}
                    >
                        <AgGridReact
                            ref={gridRefProvinceInProvince}
                            rowData={rowDataProvinceObject}
                            columnDefs={columnDefsAreaInProvince}
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
      <div className='row'>
        <div className='col justify-content-end d-flex'>
          <div>
            {/* <Button href="#" className="btn btn-secondary me-10" onClick={() => reset()}>Nhập lại</Button> */}
            <Button type="submit" className="btn btn-primary">{`Tạo mới ${props.title}`}</Button>
          </div>
        </div>
      </div>
      <ModalAddProvinceAreaObject
        isShow={showModalAddProvinceAreaObject} 
        setShow={setShowModalAddProvinceAreaObject}
        handleSubmmit={handleSubmitModalAddProvinceObject}
        />
    </form>
  )
}

export default ModalShowAndAddProvince

