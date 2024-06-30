import React from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import { IFormAreaInput } from './interface'
import { NumericFormat } from 'react-number-format'
import { usePageData } from '../../../_metronic/layout/core'

type Props = {
    title: string,
}

const ModalAddDistancePriceObject = ({title}: Props) => {
    const {gridRefDistancePricebjectSetup, setShowModalDistancePriceObject, setDataModalDistance, dataModalDistancePriceObject} = usePageData();
    const { control, handleSubmit, reset, formState: { errors }, } = useForm<any>({
        mode: 'all',
        defaultValues: {
            priceName: dataModalDistancePriceObject?.data?.priceName || '',
            priceNumber: dataModalDistancePriceObject?.data?.priceNumber || 0,
            priceCode: dataModalDistancePriceObject?.data?.priceCode || '',
            minKG: dataModalDistancePriceObject?.data?.minKG || 0,
            maxKG: dataModalDistancePriceObject?.data?.maxKG || 0,
            priceAdd: dataModalDistancePriceObject?.data?.priceAdd || false,
            id: dataModalDistancePriceObject?.data?.id || 0,
        },
        shouldUnregister: false,
    })
    const onSubmit: SubmitHandler<IFormAreaInput> = (data: IFormAreaInput) =>{
        // console.log('bao data: ', data)
        if (!dataModalDistancePriceObject?.rowIndex) {
            const rowData: any[] = [];
            console.log('bao gridRefDistancePricebjectSetup: ', gridRefDistancePricebjectSetup)
            gridRefDistancePricebjectSetup.current!.api.forEachNode((node: any) => {
                rowData.push(node.data);
            })!;
            rowData.push(data);
            setDataModalDistance &&
            setDataModalDistance((preData: any) => ({
              ...preData,
              prices: rowData,
            }));
        } else {
            const rowData: any[] = [];
            gridRefDistancePricebjectSetup.current!.api.forEachNode((node: any) => {
                if(node?.rowIndex === dataModalDistancePriceObject?.rowIndex) {
                    rowData.push(data);
                } else {
                    rowData.push(node.data);
                }
            })!;
            setDataModalDistance &&
            setDataModalDistance((preData: any) => ({
              ...preData,
              prices: rowData,
            }));
        }
        reset();
        setShowModalDistancePriceObject && setShowModalDistancePriceObject(false);
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
                        <InputGroup.Text className={`group-text ${errors?.priceName && 'border-danger'}`}>
                        Tên loại giá
                        </InputGroup.Text>
                        <Form.Control
                        className={`text-dark ${errors?.priceName && 'border-danger'}`}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        />
                    </InputGroup>
                )}
                name='priceName'
            />
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                    <InputGroup.Text className={`group-text ${errors?.priceCode && 'border-danger'}`}>
                        Mã loại giá
                    </InputGroup.Text>
                    <Form.Control
                        className={`text-dark ${errors?.priceCode && 'border-danger'}`}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        />
                </InputGroup>
                )}
                name='priceCode'
            />
            
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                    <InputGroup.Text className={`group-text ${errors?.priceNumber && 'border-danger'}`}>
                        Giá
                    </InputGroup.Text>
                    <NumericFormat
                        value={value}
                        className={`text-dark ${errors?.priceNumber && 'border-danger'} form-control`}
                        onBlur={onBlur}
                        onChange={onChange}
                        allowLeadingZeros thousandSeparator=","
                        decimalScale={0}
                    />
                    <InputGroup.Text className={`${errors?.priceNumber && 'border-danger'}`}>VND</InputGroup.Text>
                </InputGroup>
                )}
                name='priceNumber'
            />

            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                    <InputGroup.Text className={`group-text ${errors?.minKG && 'border-danger'}`}>
                        Số KG nhỏ nhất
                    </InputGroup.Text>
                    <NumericFormat
                        value={value}
                        className={`text-dark ${errors?.minKG && 'border-danger'} form-control`}
                        onBlur={onBlur}
                        onChange={onChange}
                        allowLeadingZeros thousandSeparator=","
                        decimalScale={0}
                    />
                    <InputGroup.Text className={`${errors?.minKG && 'border-danger'}`}>KG</InputGroup.Text>
                </InputGroup>
                )}
                name='minKG'
            />
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                    <InputGroup.Text className={`group-text ${errors?.maxKG && 'border-danger'}`}>
                        Số KG lớn nhất
                    </InputGroup.Text>
                    <NumericFormat
                        value={value}
                        className={`text-dark ${errors?.maxKG && 'border-danger'} form-control`}
                        onBlur={onBlur}
                        onChange={onChange}
                        allowLeadingZeros thousandSeparator=","
                        decimalScale={0}
                    />
                    <InputGroup.Text className={`${errors?.maxKG && 'border-danger'}`}>KG</InputGroup.Text>
                </InputGroup>
                )}
                name='maxKG'
            />
            <Controller
                control={control}
                rules={{ required: false }}
                render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label={<span className='fs-4 text-dark'>Giá lũy tiến</span>}
                        id="disabled-default-checkbox"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                    />
                </InputGroup>
                )}
                name='priceAdd'
            />
            <div className='row'>
                <div className='col justify-content-end d-flex'>
                <div>
                    <Button type='submit' className="btn btn-primary">{`${dataModalDistancePriceObject?.rowIndex ? "Cập nhật" : "Tạo mới"} ${title}`}</Button>
                </div>
                </div>
            </div>
        </form>
  )
}

export default ModalAddDistancePriceObject