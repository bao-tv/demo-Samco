/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useEffect, useState, useRef} from 'react'
import Select from 'react-select';
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form"
import {InputGroup, Button, Form, OverlayTrigger } from 'react-bootstrap';
import { IFormInput } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import ToastError from '../../../_metronic/helpers/crud-helper/Toast';
import dayjs from 'dayjs';
import { calculatePrice, renderTooltip } from '../../../_metronic/helpers';
import _ from 'lodash';
import { NumericFormat } from 'react-number-format';
import { watch } from 'fs';

const BuilderPage: React.FC<any> = ({handleClose}: any) => {
  const optionsCoefficient: any[] = [
    { value: 1, label: 'Hàng bình thường (1)', code: 1 },
    { value: 2, label: 'Hàng quá tải (1.2)', code: 1.2 },
    { value: 3, label: 'Hàng quá khổ (1.2)', code: 1.2 },
    { value: 4, label: 'Hàng quá tải và quá khổ (1.2)', code: 1.2 },
  ]

  const optionsShipName: any[] = [
    { value: 'option 1', label: 'Samco', fullName: 'Công ty TNHH Kumho Samco Buslines' },
    { value: 'option 2', label: 'Phương Trang', fullName: 'Công ty TNHH Phương Trang' },
    { value: 'option 3', label: 'Thành Bưởi', fullName: 'Công ty TNHH Thành Bưởi' },
    { value: 'option 4', label: 'Bus Line', fullName: 'Công ty TNHH Bus Line' },
    { value: 'option 5', label: 'Vận chuyển siêu tốc', fullName: 'Công ty TNHH Vận chuyển siêu tốc' },
]
const [provinceData, setProvinceData] = useState<any[]>([]);
const [priceData, setPriceData] = useState<any[]>([]);
console.log('bao priceData: ', priceData)
const [packingServiceData, setPackingServiceData] = useState<any[]>([]);
const getData=(pathJson: string, setter: any)=>{
  fetch(pathJson)
    .then(response => {
      return response.json()
    })
    .then(data => {
      // Process the JSON data here
      setter(data);
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });
}
useEffect(()=>{
  getData("/data/province.json", setProvinceData);
  getData("/data/remainingPrice.json", setPriceData);
  getData("/data/packagingService.json", setPackingServiceData);
},[])
  const {rowDataOrder, setRowDataOrder, setRowDataCouponReciept, showCreateAppModal} = usePageData();
  console.log('bao showCreateAppModal: ', showCreateAppModal)
  // const [totalPay, setTotalPay] = useState<number>(0);

  const receiptDate = dayjs().add(3, 'day').toDate();

  const { control, watch, setValue, getValues, handleSubmit, clearErrors, reset, formState: { errors }, } = useForm<IFormInput>({
    mode: 'all',
    defaultValues: {
      sendDate: showCreateAppModal.sendDate || new Date(),
      sendName: showCreateAppModal.sendName || '',
      sendIdPer: showCreateAppModal.sendIdPer || '',
      sendPhone: showCreateAppModal.sendPhone || '',
      sendAddress: showCreateAppModal.sendAddress || '',
      receiptDate: receiptDate,
      receiptName: showCreateAppModal.receiptName || '',
      receiptIdPer: showCreateAppModal.receiptIdPer || '',
      receiptPhone: showCreateAppModal.receiptPhone || '',
      receiptProvinceAddress: showCreateAppModal.receiptProvinceAddress || '',
      receiptAddress: showCreateAppModal.receiptAddress || '',
      packageName: showCreateAppModal.packageName || '',
      packageValue: showCreateAppModal.packageValue || '',
      packageWeight: showCreateAppModal.packageWeight || 0,
      packageQuantity: showCreateAppModal.packageQuantity || 0,
      shipName: showCreateAppModal.shipName || '',
      price: showCreateAppModal.price || 0,
      coefficient: showCreateAppModal.coefficient || { value: 1, label: 'Hàng bình thường (1)', code: 1 },
      packagingService: showCreateAppModal?.packagingService,
      packagingServicePrice: showCreateAppModal?.packagingServicePrice?.price || 0,
      totalPrice: showCreateAppModal.totalPrice || 0,
      sendPay: showCreateAppModal.sendPay || 0,
      receiptPay: showCreateAppModal.receiptPay || 0,
      indexRow: showCreateAppModal.indexRow || (rowDataOrder?.length ? rowDataOrder?.length + 1 : 1),
     },
     shouldUnregister: false,
    })
  const [receiptPayValue, setRecipePayValue] = useState<number>(0);

  const handleShowPreImport: any = () => {
    const dataForm:any = getValues();
    setRowDataCouponReciept && setRowDataCouponReciept({...dataForm, receiptPay: receiptPayValue, indexRow: (rowDataOrder?.length ? rowDataOrder?.length + 1 : 1)});
  }
  // handle form ====================
  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    // console.log('bao data: ', data);
    if (!showCreateAppModal.indexRow) {
      setRowDataOrder && await setRowDataOrder((prevRowData: any) => [...prevRowData, data]);
    } else {
      const cloneRowData = _.cloneDeep(rowDataOrder);
      console.log('bao cloneRowData: ', cloneRowData);

      const updateRowData = cloneRowData?.map(item => {
        if (item.indexRow === data.indexRow) return data;
        return item
      });
      console.log('bao updateRowData: ', updateRowData);
      setRowDataOrder && setRowDataOrder(updateRowData);
    }

    handleClose();
    clearErrors();
  }

  const onErrors = async (e: any) => {
    // setShowModalPreImport(true);
    if (Object.keys(e).length) {
      ToastError("Bạn nhập thiếu thông tin!");
    }
  }
  
  const  IsolateReRenderPriceService: any = ({ control }: any) => {
    const data: any = useWatch({
      control,
      name: ['packageWeight', 'packageQuantity', 'receiptAddress']
    })
    const priceObject: any = priceData.filter(item => item.distance_code === data[2]?.value)
    let pri: number = 0;
    if (priceObject[0]?.price.length && data[0]) {
      pri = calculatePrice(priceObject[0].price, +data[0]);
    }
    setValue("price", pri * +data[1]);
    return (
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
            <NumericFormat
              value={pri * +data[1]}
              className={`text-dark ${errors?.price && 'border-danger'} form-control`}
              onBlur={onBlur}
              onChange={onChange}
              allowLeadingZeros thousandSeparator=","
              disabled
              decimalScale={0}
            />
            <InputGroup.Text className={`${errors?.price && 'border-danger'}`}>VND</InputGroup.Text>
          </InputGroup>
          )}
        name='price'
      />
    )
  }

  // price dịch vụ ddoings gói
  const IsolateReRenderPricePackingService: React.FC<{ control: any }> = ({ control }) => {
    const packagingService = useWatch({
      control,
      name: 'packagingService',
    });
  
    const packageQuantity = useWatch({
      control,
      name: 'packageQuantity',
    });

    
    // Calculate the price based on the watched fields
    const calculatedPrice: number = (+packagingService?.price || 0) * +packageQuantity;
    useEffect(() => {
      setValue("packagingServicePrice", calculatedPrice)
    }, [calculatedPrice])
    return (
      <Controller
        control={control}
        rules={{
          required: true,
          min: 0
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <div className='d-flex justify-content-center align-items-center'>
            <InputGroup className="mb-3">
              <InputGroup.Text className={`group-text ${errors?.packagingServicePrice && 'border-danger'}`}>
                Giá dịch vụ đóng gói
              </InputGroup.Text>
              <NumericFormat
                value={calculatedPrice}
                disabled
                className={`text-dark ${errors?.packagingServicePrice && 'border-danger'} form-control`}
                // type='number'
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onBlur={onBlur}
                onChange={onChange}
                allowLeadingZeros thousandSeparator=","
                decimalScale={0}
              />
              <InputGroup.Text className={`${errors?.packagingServicePrice && 'border-danger'}`}>VND</InputGroup.Text>
            </InputGroup>
            {/* <Button variant="light" className='mb-3 px-3'><i className="bi bi-box-arrow-in-up-left fs-2"></i></Button> */}
          </div>
        )}
        name='packagingServicePrice'
      />
    );
  }
  
  const  IsolateReRenderTotalPrice: any = ({ control }: any) => {
    const data: any = useWatch({
      control,
      name: ['coefficient', 'price', 'packagingServicePrice'],
    })
    setValue("sendPay", data[1]*data[0].code + data[2]);
    setValue("totalPrice", data[1]*data[0].code + data[2]);
    return (
      <Controller
        control={control}
        // defaultValue={totalPay}
        render={({ field: { onChange, onBlur, value } }) => (
        <InputGroup className="mb-3">
            <InputGroup.Text className={`group-text ${errors?.totalPrice && 'border-danger'}`}>
              Tổng tiền
            </InputGroup.Text>
            <NumericFormat
                value={value}
                disabled
                className={`text-dark ${errors?.totalPrice && 'border-danger'} form-control`}
                // type='number'
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onBlur={onBlur}
                onChange={onChange}
                allowLeadingZeros thousandSeparator=","
                decimalScale={0}
              />
            <InputGroup.Text>VND</InputGroup.Text>
        </InputGroup>
        )}
        name='totalPrice'
      />
    )
  }

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
              name="receiptProvinceAddress"
              control={control}
              rules={{
                required: true,
                min: 0.1
              }}
              render={({ field: { onChange, onBlur, value } }) => {
                // console.log('bao value receiptProvinceAddress: ', value)
                return (
                  <div className={`d-flex align-items-center w-100 mb-3 ${errors?.receiptProvinceAddress && 'border-danger'}`}>
                  <label className='form-label d-block me-5'>Tỉnh nhận hàng</label>
                    <Select 
                      className={`react-select-styled w-50 ${errors?.receiptProvinceAddress && 'rounded border border-danger'}`}
                      classNamePrefix='react-select text-dark' 
                      options={provinceData}
                      onBlur={onBlur}
                      onChange={(selectedOption) => {
                        onChange(selectedOption);
                        setValue("receiptAddress", '');
                    }}
                      value={value}
                      placeholder='Chọn một tỉnh'
                    />
                  </div>
                  )
              }
              }
            />
            <Controller
              name="receiptAddress"
              control={control}
              rules={{
                required: true,
                min: 0.1
              }}
              render={({ field: { onChange, onBlur, value } }) => {
                // console.log('bao value receiptAddress: ', value);
                return (
                  <div className={`d-flex align-items-center w-100 mb-3 ${errors?.receiptAddress && 'border-danger'}`}>
                  <label className='form-label d-block me-5'>Nơi nhận hàng</label>
                    <Select 
                      className={`react-select-styled w-50 ${errors?.receiptAddress && 'rounded border border-danger'}`}
                      classNamePrefix='react-select text-dark'
                      isDisabled={!watch("receiptProvinceAddress")?.transportation_route?.length}
                      options={watch("receiptProvinceAddress")?.transportation_route}
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      // defaultValue={showCreateAppModal.receiptAddress}
                      placeholder='Chọn nơi nhận hàng' 
                    />
                  </div>
                )}}
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
              render={({ field: { onChange, onBlur, value } }: any) => (
                <InputGroup className="mb-3">
                    <InputGroup.Text className={`group-text ${errors?.packageValue && 'border-danger'}`}>
                    Trị giá
                    </InputGroup.Text>
                    <NumericFormat
                      value={value}
                      className={`text-dark ${errors?.packageValue && 'border-danger'} form-control`}
                      onBlur={onBlur}
                      onChange={onChange}
                      allowLeadingZeros thousandSeparator="," />
                    <InputGroup.Text className={`${errors?.packageValue && 'border-danger'}`}>VND</InputGroup.Text>
                </InputGroup>
                )}
            />

            <Controller
              name="packageWeight"
              control={control}
              rules={{
                required: true,
                min: 0.001
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
                min: 0.001
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
            <IsolateReRenderPriceService control={control} />
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
              name="packagingService"
              control={control}
              rules={{
                required: true,
                min: 0.1
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <div className={`d-flex align-items-center w-100 mb-3 ${errors?.packagingService && 'border-danger'}`}>
                <label className='form-label d-block me-5'>Dịch vụ đóng gói</label>
                  <Select 
                    className={`react-select-styled w-50 ${errors?.packagingService && 'rounded border border-danger'}`}
                    classNamePrefix='react-select text-dark' 
                    options={packingServiceData}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    placeholder='Chọn dịch vụ đóng gói'
                  />
                </div>
                )}
            />
            <IsolateReRenderPricePackingService control={control} />
            <IsolateReRenderTotalPrice control={control} />
          </>
        </div>
        <div className='group card p-5 me-3'>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup className="mb-3">
                <InputGroup.Text className={`group-text ${errors?.sendPay && 'border-danger'}`}>
                  Người gửi thanh toán
                </InputGroup.Text>
                <NumericFormat
                  value={value}
                  className={`text-dark ${errors?.sendPay && 'border-danger'} form-control`}
                  // type='number'
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onBlur={onBlur}
                  onChange={onChange}
                  allowLeadingZeros thousandSeparator=","
                  decimalScale={0}
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
                  name='receiptPay'
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
        <div className='col justify-content-between d-flex'>
          <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
          >
            <Button href="#" className="btn btn-secondary me-10" onClick={handleShowPreImport}><i className="bi bi-zoom-in"></i></Button>
          </OverlayTrigger>
          {/* <div>
          </div> */}
          <div>
            <Button href="#" className="btn btn-secondary me-10" onClick={() => reset()}>Reset</Button>
            <Button type="submit" className="btn btn-primary">{showCreateAppModal.indexRow ? 'Update' : 'Add'}</Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export {BuilderPage}

