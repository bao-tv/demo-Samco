import React from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import { IFormAreaInput } from './interface'
import { NumericFormat } from 'react-number-format'
import { usePageData } from '../../../_metronic/layout/core'
import { useSelector } from 'react-redux'
import Select, { ActionMeta, OnChangeValue, StylesConfig } from 'react-select';

type Props = {
    title: string,
}

const ModalAddProvinceAreaObject = ({title}: Props) => {
    const {listDistance} = useSelector((state:any) => state.distances);  
    const {gridRefProvinceObjectSetup, setShowModalProvinceObject, dataModalProvince, setDataModalProvince, dataModalProvinceObject, setDataModalProvinceObject} = usePageData();
    const { control, handleSubmit, reset, formState: { errors }, } = useForm<any>({
        mode: 'all',
        defaultValues: {
            label: dataModalProvinceObject?.data?.label || '',
            transportationRouteCode: dataModalProvinceObject?.data?.transportationRouteCode || '',
            distanceName: dataModalProvinceObject?.data?.distanceName || '',
            value: dataModalProvinceObject?.data?.value || '',
            id: dataModalProvinceObject?.data?.id || 0,
        },
        shouldUnregister: false,
    })
    const onSubmit: SubmitHandler<IFormAreaInput> = (data: IFormAreaInput) =>{
        if (!dataModalProvinceObject?.rowIndex) {
            const rowData: any[] = [];
            gridRefProvinceObjectSetup.current!.api.forEachNode((node: any) => {
                rowData.push(node.data);
            })!;
            rowData.push(data);
            setDataModalProvince &&
            setDataModalProvince((preData: any) => ({
              ...preData,
              transportationRoutes: rowData,
            }));
        } else {
            const rowData: any[] = [];
            gridRefProvinceObjectSetup.current!.api.forEachNode((node: any) => {
                if(node?.rowIndex === dataModalProvinceObject?.rowIndex) {
                    rowData.push(data);
                } else {
                    rowData.push(node.data);
                }
            })!;
            setDataModalProvince &&
            setDataModalProvince((preData: any) => ({
              ...preData,
              transportationRoutes: rowData,
            }));
        }
        reset();
        setShowModalProvinceObject && setShowModalProvinceObject(false);
    }
    const onErrors = async (e: any) => {
        if (Object.keys(e).length) {
          ToastError("Bạn nhập thiếu thông tin!");
        }
      }
    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputGroup className="mb-3">
                        <InputGroup.Text className={`group-text ${errors?.label && 'border-danger'}`}>
                            Tên Khu vực
                        </InputGroup.Text>
                        <Form.Control
                        className={`text-dark ${errors?.label && 'border-danger'}`}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
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
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                    <InputGroup.Text className={`group-text ${errors?.transportationRouteCode && 'border-danger'}`}>
                        Mã
                    </InputGroup.Text>
                    <Form.Control
                        className={`text-dark ${errors?.transportationRouteCode && 'border-danger'}`}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        />
                </InputGroup>
                )}
                name='transportationRouteCode'
            />
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                    <InputGroup.Text className={`group-text ${errors?.distanceName && 'border-danger'}`}>
                        Khoản cách
                    </InputGroup.Text>
                    <NumericFormat
                        value={value}
                        className={`text-dark ${errors?.distanceName && 'border-danger'} form-control`}
                        onBlur={onBlur}
                        onChange={onChange}
                        allowLeadingZeros thousandSeparator=","
                        decimalScale={0}
                    />
                    <InputGroup.Text className={`${errors?.distanceName && 'border-danger'}`}>KM</InputGroup.Text>
                </InputGroup>
                )}
                name='distanceName'
            />

            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                    <div className={`d-flex align-items-center w-100 ${errors?.shipName && 'border-danger'}`}>
                    <label className='form-label d-block me-5'>Mã khu vực</label>
                    {/* <Form.Control
                        className={`text-dark ${errors?.value && 'border-danger'}`}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        /> */}
                     <Select 
                      className={`react-select-styled w-50 ${errors?.value && 'rounded border border-danger'}`}
                      classNamePrefix='react-select' 
                      options={listDistance.map((item: any) => ({label: item.distanceName, value: item.distanceCode, id: item.id}))} 
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      placeholder='Chọn một mã khu vực' 
                  />
                  </div>
                </InputGroup>
                )}
                name='value'
            />
            <div className='row'>
                <div className='col justify-content-end d-flex'>
                <div>
                    <Button type='submit' className="btn btn-primary">{`${dataModalProvinceObject?.rowIndex ? "Cập nhật" : "Tạo mới"} ${title}`}</Button>
                </div>
                </div>
            </div>
        </form>
  )
}

export default ModalAddProvinceAreaObject