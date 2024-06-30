import React, {useCallback, useMemo, useRef, useState} from 'react'
import {AgGridReact} from 'ag-grid-react'
import {useForm, SubmitHandler, Controller, useWatch} from 'react-hook-form'
import {InputGroup, Button, Form, OverlayTrigger} from 'react-bootstrap'
import {IFormProvinceInput, columnDefsPricesInDistance} from './interface'
import { CreateAppModal, useThemeMode } from '../../../_metronic/partials'
import ModalAddProvinceAreaObject from './ModalAddDistancePriceObject'
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast'
import { provinceCreatedAPI, provinceEditAPIByID } from '../../../apis/provinceAPI';
import { usePageData } from '../../../_metronic/layout/core'
import { province } from '../../../slices/provinceSlices'
import { useDispatch } from 'react-redux'
import { distanceCreatedAPI, distanceEditAPIByID } from '../../../apis/distanceAPI'
import { distance } from '../../../slices/distanceSlices'

type Props = {}

const ModalShowAndAddDistance = (props: any) => {
  const {gridRefDistancePricebjectSetup, setShowModalDistance, dataModalDistance, setDataModalDistance, setShowModalDistancePriceObject, dataModalDistancePriceObject} = usePageData();
  const dispath = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<any>({
    mode: 'all',
    defaultValues: {
      distanceName: dataModalDistance.distanceName || '',
      distanceCode: dataModalDistance.distanceCode || '',
      time: dataModalDistance.time || '',
      prices: dataModalDistance.prices || [],
      id: dataModalDistance.id || 0,
     },
    shouldUnregister: false,
  })
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
    gridRefDistancePricebjectSetup.current!.api.forEachNode(function (node: any) {
      rowData.push(node.data);
    });
    const distanceObjectUpdate = {...data, prices: rowData}
    if(!dataModalDistancePriceObject?.id) {
      try{
        if(data.id) {
          await distanceEditAPIByID(distanceObjectUpdate);
          ToastSuccess("Bạn đã cập nhật thành công");
        } else {
          await distanceCreatedAPI(distanceObjectUpdate);
          ToastSuccess("Bạn đã tạo mới thành công");
        }
        dispath(distance());
        setShowModalDistance && setShowModalDistance(false);
        setDataModalDistance && setDataModalDistance({});
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
                      Tên khoảng cách
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
                name='distanceName'
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.value && 'border-danger'}`}>
                      Mã khoảng cách
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
                name='distanceCode'
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.licenseplates && 'border-danger'}`}>
                      Thời gian giao
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
                name='time'
              />
            </>
          </div>
        </div>
        <div className='row'>
          <div className='mb-5 p-5 pt-0 me-3'>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                  <p className='list-unstyled text-gray-700 fw-bold fs-3 mb-0'>Giá giao tại Khoảng cách</p>
                  <a onClick={()=> setShowModalDistancePriceObject && setShowModalDistancePriceObject(true)} className='btn btn-primary'>Thêm</a>
              </div>
              <div style={containerStyle}>
                  <div style={{height: '400px', minHeight: '100px' , boxSizing: 'border-box'}}>
                      <div
                          style={gridStyle}
                          className={modeCurrent === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'}
                      >
                          <AgGridReact
                              ref={gridRefDistancePricebjectSetup}
                              rowData={dataModalDistance?.prices || []}
                              columnDefs={columnDefsPricesInDistance}
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
              <Button type="submit" className="btn btn-primary">{`${dataModalDistance.id ? "Cập nhật" : "Tạo mới"} ${props.title}`}</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ModalShowAndAddDistance

