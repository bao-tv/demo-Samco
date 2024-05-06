import React from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import { IFormInput } from './interface'
import { NumericFormat } from 'react-number-format'

type Props = {
    isShow: any,
    setShow: any,
    handleSubmmit: any
}

const ModalAddPriceObject = ({isShow, setShow, handleSubmmit}: Props) => {
    const { control, handleSubmit, reset, formState: { errors }, } = useForm<any>({
        defaultValues: {
          priceName: isShow.priceName || '',
          price: isShow.price || '',
          minKG: isShow.minKG || '',
          maxKG: isShow.maxKG || '',
         },
         shouldUnregister: false,
        })
    const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) =>{
        handleSubmmit(data);
        reset();
        setShow(false);
    }
    const onErrors = async (e: any) => {
        if (Object.keys(e).length) {
          ToastError("Bạn nhập thiếu thông tin!");
        }
      }
    return (
        <Modal show={isShow} onHide={() => setShow(false)} backdrop="static">
            <Modal.Header closeButton className='p-3'>
                <Modal.Title>TẠO GIÁ THEO KHOẢNG CÁCH TRỌNG LƯỢNG</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <Modal.Body>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputGroup className="mb-3">
                            <InputGroup.Text className={`group-text ${errors?.priceName && 'border-danger'}`}>
                                Tên khoảng cách trọng lượng
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
                        <InputGroup.Text className={`group-text ${errors?.price && 'border-danger'}`}>
                            Giá
                        </InputGroup.Text>
                        <NumericFormat
                            value={value}
                            className={`text-dark ${errors?.price && 'border-danger'} form-control`}
                            onBlur={onBlur}
                            onChange={onChange}
                            allowLeadingZeros thousandSeparator=","
                            decimalScale={0}
                        />
                        <InputGroup.Text className={`${errors?.price && 'border-danger'}`}>VNĐ</InputGroup.Text>
                    </InputGroup>
                    )}
                    name='price'
                />
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <InputGroup className="mb-3">
                        <InputGroup.Text className={`group-text ${errors?.minKG && 'border-danger'}`}>
                            Từ trọng lượng
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
                            Đến trọng lượng
                        </InputGroup.Text>
                        <NumericFormat
                            value={value}
                            className={`text-dark ${errors?.maxKG && 'border-danger'} form-control`}
                            onBlur={onBlur}
                            onChange={onChange}
                            allowLeadingZeros thousandSeparator=","
                            decimalScale={2}
                        />
                        <InputGroup.Text className={`${errors?.maxKG && 'border-danger'}`}>KG</InputGroup.Text>
                    </InputGroup>
                    )}
                    name='maxKG'
                />
            </Modal.Body>
            <Modal.Footer className='p-2'>
                <Button variant="secondary"onClick={() => reset()}>Nhập lại</Button>
                <Button type="submit">Thêm</Button>
            </Modal.Footer>
            </form>
        </Modal>
  )
}

export default ModalAddPriceObject