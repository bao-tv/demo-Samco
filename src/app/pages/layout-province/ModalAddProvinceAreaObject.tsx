import React from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ToastError from '../../../_metronic/helpers/crud-helper/Toast'
import { IFormAreaInput } from './interface'
import { NumericFormat } from 'react-number-format'

type Props = {
    isShow: any,
    setShow: any,
    handleSubmmit: any
}

const ModalAddProvinceAreaObject = ({isShow, setShow, handleSubmmit}: Props) => {
    const { control, handleSubmit, reset, formState: { errors }, } = useForm<any>({
        defaultValues: {
          label: isShow.label || '',
          transportationRouteCode: isShow.transportationRouteCode || '',
          distanceName: isShow.distanceName || '',
          value: isShow.value || '',
          id: isShow.id || 0,
         },
         shouldUnregister: false,
        })
    const onSubmit: SubmitHandler<IFormAreaInput> = (data: IFormAreaInput) =>{
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
        <Modal 
            show={isShow} 
            onHide={() => setShow(false)} 
            backdrop="static" 
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered'
            className='fade'
            keyboard={false}
        >
            <Modal.Header closeButton className='p-3'>
                <Modal.Title>TẠO KHU VỰC NHẬN HÀNG</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <Modal.Body>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputGroup className="mb-3">
                            <InputGroup.Text className={`group-text ${errors?.areaName && 'border-danger'}`}>
                                Tên Khu vực
                            </InputGroup.Text>
                            <Form.Control
                            className={`text-dark ${errors?.areaName && 'border-danger'}`}
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
                        <InputGroup.Text className={`group-text ${errors?.transportation_route_code && 'border-danger'}`}>
                            Mã
                        </InputGroup.Text>
                        <Form.Control
                            className={`text-dark ${errors?.transportation_route_code && 'border-danger'}`}
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
                        <InputGroup.Text className={`group-text ${errors?.distance && 'border-danger'}`}>
                            Khoản cách
                        </InputGroup.Text>
                        <NumericFormat
                            value={value}
                            className={`text-dark ${errors?.distance && 'border-danger'} form-control`}
                            onBlur={onBlur}
                            onChange={onChange}
                            allowLeadingZeros thousandSeparator=","
                            decimalScale={0}
                        />
                        <InputGroup.Text className={`${errors?.distance && 'border-danger'}`}>KM</InputGroup.Text>
                    </InputGroup>
                    )}
                    name='distanceName'
                />

                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <InputGroup className="mb-3">
                        <InputGroup.Text className={`group-text ${errors?.distanceCode && 'border-danger'}`}>
                            Mã khoản cách
                        </InputGroup.Text>
                        <Form.Control
                            className={`text-dark ${errors?.distanceCode && 'border-danger'}`}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            />
                    </InputGroup>
                    )}
                    name='value'
                />
            </Modal.Body>
            <Modal.Footer className='p-2'>
                {/* <Button variant="secondary"onClick={() => reset()}>Nhập lại</Button> */}
                <Button type="submit">Thêm</Button>
            </Modal.Footer>
            </form>
        </Modal>
  )
}

export default ModalAddProvinceAreaObject