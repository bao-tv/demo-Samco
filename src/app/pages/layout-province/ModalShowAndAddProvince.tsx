import React, {useCallback, useMemo, useRef, useState} from 'react'
import {AgGridReact} from 'ag-grid-react'
import {useForm, SubmitHandler, Controller} from 'react-hook-form'
import {InputGroup, Button, Form} from 'react-bootstrap'
import {IFormProvinceInput, columnDefsAreaInProvince} from './interface'
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials'
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast'
import { provinceCreatedAPI, provinceEditAPIByID } from '../../../apis/provinceAPI';
import { usePageData } from '../../../_metronic/layout/core'
import { province } from '../../../slices/provinceSlices'
import { useDispatch } from 'react-redux'

type Props = {}

const ModalShowAndAddProvince = (props: any) => {
  const {gridRefProvinceObjectSetup, setShowModalProvince, dataModalProvince, setDataModalProvince, setShowModalProvinceObject, dataModalProvinceObject, setDataModalProvinceObject} = usePageData();
  const dispath = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<any>({
    mode: 'all',
    defaultValues: {
      label: dataModalProvince.label || '',
      value: dataModalProvince.value || '',
      licenseplates: dataModalProvince.licenseplates || '',
      transportationRoutes: dataModalProvince.transportationRoutes || [],
      id: dataModalProvince.id || 0,
     },
    shouldUnregister: false,
  })
  // const gridRefProvinceInProvince = useRef(null)
  const onGridReady = useCallback((params: any) => {
  }, [])
  const onCellValueChanged = useCallback((event: any) => {
    console.log('bao onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue)
  }, [])
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%"}), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const defaultColDef: any = {
    flex: 1,
  }
  const {modeCurrent} = useThemeMode();
  const onSubmit: SubmitHandler<IFormProvinceInput> = async(data: IFormProvinceInput) =>{
    const rowData: any[] = [];
    gridRefProvinceObjectSetup.current!.api.forEachNode(function (node: any) {
      rowData.push(node.data);
    });
    const provinceObjectUpdate = {...data, transportationRoutes: rowData}
    if(!dataModalProvinceObject?.id) {
      try{
        if(data.id) {
          await provinceEditAPIByID(provinceObjectUpdate);
          ToastSuccess("Bạn đã cập nhật thành công");
        } else {
          await provinceCreatedAPI(provinceObjectUpdate);
          ToastSuccess("Bạn đã tạo mới thành công");
        }
        dispath(province());
        setShowModalProvince && setShowModalProvince(false);
        setDataModalProvince && setDataModalProvince({});
      }catch (err) {
      ToastError("Có lỗi xảy ra!");

      }

    }
    reset();
  }
  const onErrors = async (e: any) => {
    if (Object.keys(e).length) {
      ToastError("Bạn nhập thiếu thông tin!");
    }
  }
  return (
    <>
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
                  <a onClick={()=> setShowModalProvinceObject && setShowModalProvinceObject(true)} className='btn btn-primary'>Thêm</a>
              </div>
              <div style={containerStyle}>
                  <div style={{height: '400px', minHeight: '100px' , boxSizing: 'border-box'}}>
                      <div
                          style={gridStyle}
                          className={modeCurrent === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}
                      >
                          <AgGridReact
                              ref={gridRefProvinceObjectSetup}
                              rowData={dataModalProvince?.transportationRoutes || []}
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
              <Button type="submit" className="btn btn-primary">{`${dataModalProvince.id ? "Cập nhật" : "Tạo mới"} ${props.title}`}</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ModalShowAndAddProvince

