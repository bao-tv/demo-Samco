/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import Select from 'react-select';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import {InputGroup, Button, Form } from 'react-bootstrap';
import { IFormInput } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import ToastError from '../../../_metronic/helpers/components/Toast';

const BuilderPage: React.FC<any> = ({handleClose}: any) => {
  const optionsCoefficient: any[] = [
    { value: 'option 1', label: 'Hàng bình thường (1)' },
    { value: 'option 2', label: 'Hàng quá tải (1.2)' },
    { value: 'option 3', label: 'Hàng quá khổ (1.2)' },
    { value: 'option 4', label: 'Hàng quá tải và quá khổ (1.2)' },
  ]

  const optionsShipName: any[] = [
    { value: 'option 1', label: 'Samco' },
    { value: 'option 2', label: 'Phương Trang' },
    { value: 'option 3', label: 'Thành Bưởi' },
    { value: 'option 4', label: 'Bus Line' },
    { value: 'option 5', label: 'Vận chuyển siêu tốc' },
]
  const {setRowDataOrder} = usePageData();
  const [totalPay, setTotalPay] = useState<number>(0);

  const { control, watch, setValue, handleSubmit, clearErrors, reset, formState: { errors }, } = useForm<IFormInput>({
    mode: 'all',
    defaultValues: {
      sendDate: new Date(),
      sendName: '',
      sendIdPer: '',
      sendPhone: '',
      sendAddress: '',
      receiptName: '',
      receiptIdPer: '',
      receiptPhone: '',
      receiptAddress: '',
      packageName: '',
      packageValue: '',
      packageWeight: '',
      packageQuantity: '',
      shipName: '',
      price: 0,
      coefficient: 0,
      packagingServicePrice: 0,
      totalPrice: 0,
      sendPay: 0,
      receiptPay: 0,
     },
     shouldUnregister: false,
    })

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    setRowDataOrder && await setRowDataOrder((prevRowData: any) => [...prevRowData, data]);
    handleClose();
    clearErrors();
  }

  const onErrors = async (e: any) => {
    if (Object.keys(e).length) {
      ToastError("Bạn nhập thiếu thông tin!");
    }
  }

  const priceValue: any = watch(["price", "packagingServicePrice"]);
  useEffect(() => {
    const value0 = priceValue[0] || 0;
    const value1 = priceValue[1] || 0;
    setTotalPay(+value0 + +value1);
    setValue("totalPrice", +value0 + +value1);
  },[priceValue])
  
  const sendPayValue = watch("sendPay");

  const [receiptPayValue, setRecipePayValue] = useState<number>(0);
  useEffect(() => {
    const value = sendPayValue || 0;
    setRecipePayValue(+totalPay - +value);
  },[priceValue, sendPayValue])

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <div className='row'>
        <div className='group card mb-5 p-5 pt-0 me-3'>
          <>
            <p className='list-unstyled text-gray-700 fw-bold fs-3'>Người gửi</p>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.sendName && 'border-danger'}`}>
                    Họ tên
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.sendName && 'border-danger'}`}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
                )}
              name="sendName"
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.sendIdPer && 'border-danger'}`}>
                    Số CCCD
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.sendIdPer && 'border-danger'}`}
                    type='number'
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
                )}
              name="sendIdPer"
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.sendPhone && 'border-danger'}`}>
                    Điện thoại
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.sendPhone && 'border-danger'}`}
                    type='number'
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
                )}
                name="sendPhone"
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.sendAddress && 'border-danger'}`}>
                  Địa chỉ
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.sendAddress && 'border-danger'}`}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
                )}
                name="sendAddress"
            />
          </>
        </div>
        <div className='group card mb-5 p-5 pt-0 ms-3'>
          <>
            <p className='list-unstyled text-gray-700 fw-bold fs-3'>Người nhận</p>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.receiptName && 'border-danger'}`}>
                    Họ tên
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.receiptName && 'border-danger'}`}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
                )}
              name="receiptName"
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.receiptIdPer && 'border-danger'}`}>
                    Số CCCD
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.receiptIdPer && 'border-danger'}`}
                    type='number'
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
                )}
              name="receiptIdPer"
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.receiptPhone && 'border-danger'}`}>
                    Điện thoại
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.receiptPhone && 'border-danger'}`}
                    type='number'
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
                )}
                name="receiptPhone"
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.receiptAddress && 'border-danger'}`}>
                  Địa chỉ
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.receiptAddress && 'border-danger'}`}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
                )}
                name="receiptAddress"
            />
          </>
        </div>
        <div className='group card mb-5 p-5 me-3'>
          <>
            <p className='list-unstyled text-gray-700 fw-bold fs-3'>Bưu kiện</p>
            <Controller
              control={control}
              rules={{
              required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.packageName && 'border-danger'}`}>
                  Tên hàng
                  </InputGroup.Text>
                  <Form.Control
                  className={`text-dark ${errors?.packageName && 'border-danger'}`}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  />
              </InputGroup>
              )}
              name='packageName'
            />

            <Controller
              name="packageValue"
              control={control}
              rules={{
              required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.packageValue && 'border-danger'}`}>
                  Trị giá
                  </InputGroup.Text>
                  <Form.Control
                      className={`text-dark ${errors?.packageValue && 'border-danger'}`}
                      type='number'
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                  />
                  <InputGroup.Text className={`${errors?.packageValue && 'border-danger'}`}>VND</InputGroup.Text>
              </InputGroup>
              )}
            />

            <Controller
              name="packageWeight"
              control={control}
              rules={{
              required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.packageWeight && 'border-danger'}`}>
                  Trọng lượng
                  </InputGroup.Text>
                  <Form.Control
                      className={`text-dark ${errors?.packageWeight && 'border-danger'}`}
                      type='number'
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                  />
                  <InputGroup.Text
                    className={`${errors?.packageWeight && 'border-danger'}`}
                    style={{padding: '0.75rem 1.45rem'}}
                  >
                    KG
                  </InputGroup.Text>
              </InputGroup>
              )}
            />

            <Controller
              name="packageQuantity"
              control={control}
              rules={{
              required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.packageQuantity && 'border-danger'}`}>
                      Số kiện
                  </InputGroup.Text>
                  <Form.Control
                      className={`text-dark ${errors?.packageQuantity && 'border-danger'}`}
                      type='number'
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                  />
              </InputGroup>
              )}
            />

            <InputGroup className="mb-3">
                <Controller
                  name="shipName"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                      <div className={`d-flex align-items-center w-100 ${errors?.shipName && 'border-danger'}`}>
                      <label className='form-label d-block me-5'>Đơn vị vận chuyển</label>
                      <Select 
                          className={`react-select-styled w-50 ${errors?.shipName && 'rounded border border-danger'}`}
                          classNamePrefix='react-select' 
                          options={optionsShipName} 
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          placeholder='Chọn một đơn vị vận chuyển' 
                      />
                      </div>
                  )}
                />
            </InputGroup>
          </>
        </div>
        <div className='group card mb-5 p-5 ms-3'>
          <>
            <p className='list-unstyled text-gray-700 fw-bold fs-3'>Tiền dịch vụ</p>
            <Controller
              control={control}
              rules={{
                required: true,
                min: 0.1
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.price && 'border-danger'}`}>
                    Giá dịch vụ
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.price && 'border-danger'}`}
                    type='number'
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                  <InputGroup.Text className={`${errors?.price && 'border-danger'}`}>VND</InputGroup.Text>
                </InputGroup>
                )}
              name='price'
            />

            <Controller
              name="coefficient"
              control={control}
              rules={{
                required: true,
                min: 0.1
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <div className={`d-flex align-items-center w-100 mb-3 ${errors?.coefficient && 'border-danger'}`}>
                <label className='form-label d-block me-5'>Hệ số dịch vụ</label>
                  <Select 
                      className={`react-select-styled w-50 ${errors?.coefficient && 'rounded border border-danger'}`}
                      classNamePrefix='react-select text-dark' 
                      options={optionsCoefficient}
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      placeholder='Chọn một hệ số dịch vụ' 
                  />
                </div>
                )}
            />

            <Controller
              control={control}
              rules={{
                required: true,
                min: 0.1
              }}
              render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.packagingServicePrice && 'border-danger'}`}>
                    Giá dịch vụ đóng gói
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.packagingServicePrice && 'border-danger'}`}
                    type='number'
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
              </InputGroup>
              )}
              name='packagingServicePrice'
            />

            <Controller
              control={control}
              // rules={{
              //   required: true,
              //   min: 0.1
              // }}
              defaultValue={totalPay}
              render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.totalPrice && 'border-danger'}`}>
                    Tổng tiền
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.totalPrice && 'border-danger'}`}
                    disabled={true}
                    type='number'
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={totalPay}
                  />
                  <InputGroup.Text>VND</InputGroup.Text>
              </InputGroup>
              )}
              name='totalPrice'
            />
          </>
        </div>
        <div className='group card p-5 me-3'>
          <Controller
            control={control}
            // rules={{
            //   required: true,
            // }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup className="mb-3">
                <InputGroup.Text className={`group-text ${errors?.sendPay && 'border-danger'}`}>
                  Người gửi thanh toán
                </InputGroup.Text>
                <Form.Control
                  className={`text-dark ${errors?.sendPay && 'border-danger'}`}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  name='sendPay'
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
                <InputGroup.Text>VND</InputGroup.Text>
              </InputGroup>
            )}
            name="sendPay"
          />
        </div>
        <div className='group card p-5 ms-3'>
          <Controller
            control={control}
            // rules={{
            //   required: true,
            // }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup className="mb-3">
                <InputGroup.Text className={`group-text ${errors?.receiptPay && 'border-danger'}`}>
                  Phải thu người nhận
                </InputGroup.Text>
                <Form.Control
                  className={`text-dark ${errors?.receiptPay && 'border-danger'}`}
                  disabled={true}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  name='sendPay'
                  onBlur={onBlur}
                  onChange={onChange}
                  value={receiptPayValue}
                />
                <InputGroup.Text>VND</InputGroup.Text>
              </InputGroup>
              )}
            name="receiptPay"
          />
        </div>
      </div>
      <div className='row mt-6'>
        <div className='col justify-content-end d-flex'>
          <Button href="#" className="btn btn-secondary me-10" onClick={() => reset()}>Reset</Button>
          <Button type="submit" className="btn btn-primary">Add</Button>
        </div>
      </div>
    </form>
  )
}

export {BuilderPage}

