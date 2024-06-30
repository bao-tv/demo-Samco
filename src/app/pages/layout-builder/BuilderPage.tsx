/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useEffect, useState, useRef} from 'react'
import Select, { ActionMeta, OnChangeValue, StylesConfig } from 'react-select';
// import { ColourOption, colourOptions } from '../data';
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form"
import {InputGroup, Button, Form, OverlayTrigger } from 'react-bootstrap';
import { IFormInput } from './interface';
import { usePageData } from '../../../_metronic/layout/core';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import dayjs from 'dayjs';
import { calculatePrice, calculatePriceVehicle, renderTooltip } from '../../../_metronic/helpers';
import _, { cloneDeep } from 'lodash';
import { NumericFormat } from 'react-number-format';
import { useIntl } from 'react-intl';
// import { watch } from 'fs';

const BuilderPage: React.FC<any> = ({handleClose}: any) => {
  const intl = useIntl();
  const optionsCoefficient: any[] = [
    { value: 1, label: 'Không', code: 1 },
    { value: 2, label: 'Có', code: 1.3 },
  ]

  const optionsVehicle: any[] = [
    { value: 1, label: 'Không sử dụng', code: 'D0' },
    { value: 2, label: 'Xe đạp < 5tr', code: 'D1' },
    { value: 3, label: 'Xe đạp ≥ 5tr', code: 'D2' },
    { value: 4, label: 'Xe đạp điện < 5tr', code: 'D3' },
    { value: 5, label: 'Xe đạp điện ≥ 5tr', code: 'D4' },
    { value: 6, label: 'Xe máy số', code: 'D5' },
    { value: 7, label: 'Xe tay ga loại 1' , code: 'D6' },
    { value: 8, label: 'Xe tay ga loại 2 ' , code: 'D7' },
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
  const [priceVehicleData, setPriceVehicleData] = useState<any[]>([]);
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
    getData("/data/remainingPriceForVehicle.json", setPriceVehicleData);
    getData("/data/packagingService.json", setPackingServiceData);
  },[])

  const {rowDataOrder, setRowDataOrder, setRowDataCouponReciept, showCreateAppModal} = usePageData();

  const receiptDate = dayjs().add(3, 'day').toDate();

  const { control, watch, setValue, getValues, handleSubmit, clearErrors, formState: { errors }, } = useForm<IFormInput>({
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
      vehicle: showCreateAppModal.vehicle || '',
      packageValue: showCreateAppModal.packageValue || '',
      packageWeight: showCreateAppModal.packageWeight || 0,
      packageQuantity: showCreateAppModal.packageQuantity || 0,
      shipName: showCreateAppModal.shipName || '',
      price: showCreateAppModal.price || 0,
      coefficient: showCreateAppModal.coefficient || '',
      packagingService: showCreateAppModal?.packagingService,
      numberOfPackagingService: showCreateAppModal?.numberOfPackagingService || 1,
      packagingServiceData: showCreateAppModal?.packagingServiceData,
      packagingServicePrice: showCreateAppModal?.packagingServicePrice?.price || 0,
      totalPrice: showCreateAppModal.totalPrice || 0,
      indexRow: showCreateAppModal.indexRow || (rowDataOrder?.length ? rowDataOrder?.length + 1 : 1),
     },
     shouldUnregister: false,
    })

  const handleShowPreImport: any = () => {
    const dataForm:any = getValues();
    setRowDataCouponReciept && setRowDataCouponReciept({...dataForm, indexRow: (rowDataOrder?.length ? rowDataOrder?.length + 1 : 1)});
  }
  // handle form ====================
  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    // console.log('bao data: ', data);
    if (!showCreateAppModal.indexRow) {
      setRowDataOrder && await setRowDataOrder((prevRowData: any) => [...prevRowData, data]);
    } else {
      const cloneRowData = _.cloneDeep(rowDataOrder);
      // console.log('bao cloneRowData: ', cloneRowData);

      const updateRowData = cloneRowData?.map(item => {
        if (item.indexRow === data.indexRow) return data;
        return item
      });
      console.log('bao updateRowData: ', updateRowData);
      setRowDataOrder && setRowDataOrder(updateRowData);
    }
    ToastSuccess(showCreateAppModal.indexRow ? 'Cập nhật thành công' : 'Tạo mới thành công')
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
      name: ['packageWeight', 'packageQuantity', 'receiptAddress', 'vehicle']
    })
    const priceObject: any = priceData.filter(item => item.distance_code === data[2]?.value)
    const priceObjectForVehicle: any = priceVehicleData.filter(item => item.distance_code === data[2]?.value)
    let pri: any = 0;
    console.log('bao data: ', data);
    if (priceObject[0]?.price.length && data[0] && data[3]?.code === 'D0') {
      pri = calculatePrice(priceObject[0].price, +data[0]);
      console.log('bao pri nor: ', pri)
      setValue("price", pri * +data[1]);
    } else if (priceObjectForVehicle[0]?.price.length && data[3]?.code !== 'D0') {
      pri = calculatePriceVehicle(priceObjectForVehicle[0].price, data[3]?.code);
      console.log('bao pri: ', pri)
      setValue("price", pri * +data[1]);

    }
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

  const [packagingServiceData, setPackagingServiceData] = useState<any[]>([]);
  const IsolateReRenderOptionsPackingService: React.FC<{ control: any }> = ({ control }) => {
  
    const packagingService = useWatch({
      control,
      name: 'packagingService',
    });

    const clonepackagingService = _.cloneDeep(packagingService);

    useEffect(() => {
      if (clonepackagingService?.value) {
        // Check if packagingService is already present in packagingServiceData
        const isExists = packagingServiceData.some(item => item.value === clonepackagingService.value);
        
        // If packagingService doesn't exist, add it to packagingServiceData
        const number = _.cloneDeepWith(+getValues("numberOfPackagingService"));
        if (!isExists) {
          setPackagingServiceData(prevData => [...prevData, {...clonepackagingService, quality: number}]);
          setValue('packagingService', '');
        }
      }
    }, [clonepackagingService]);

    // console.log('bao packagingServiceData: ', packagingServiceData)
  
    const orderOptions = (values: readonly any[]) => {
      const fixedOptions = values.filter((v) => v.isFixed);
      const nonFixedOptions = values.filter((v) => !v.isFixed);
      return [...fixedOptions, ...nonFixedOptions];
    };
  
    const onChange = (newValue: any, actionMeta: any) => {
      let updatedData = newValue;
      switch (actionMeta.action) {
        case 'remove-value':
        case 'pop-value':
          if (actionMeta.removedValue.isFixed) {
            return;
          }
          break;
        case 'clear':
          newValue = packagingServiceData.filter((v) => v.isFixed);
          break;
      }
      setPackagingServiceData(orderOptions(updatedData));
    };
    
    return (
      <Controller
        control={control}
        name='packagingServiceData'
        render={({ field }) => (
          <Select
            className='mb-3 basic-multi-select'
            classNamePrefix='select'
            isMulti
            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
            isClearable={packagingServiceData.some((v) => !v.isFixed)}
            value={packagingServiceData}
            onChange={(newValue, actionMeta) => {
              field.onChange(newValue);
              onChange(newValue, actionMeta);
            }}
            getOptionLabel={(option) => `${option.packagingName} (SL: ${option.quality})`}
          />
        )}
      />
    );
  };
  

  // price dịch vụ ddoings gói
  const IsolateReRenderPricePackingService: React.FC<{ control: any }> = ({ control }) => {
    // Calculate the price based on the watched fields
    let calculatedPrice: number = 0
    packagingServiceData.length && packagingServiceData?.forEach((item: any) => calculatedPrice += (+item.price * +item.quality));
    setValue("packagingServicePrice", +calculatedPrice)
    return (
      <Controller
        control={control}
        name="packagingServicePrice"
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
                value={+calculatedPrice}
                disabled
                className={`text-dark ${errors?.packagingServicePrice && 'border-danger'} form-control`}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onBlur={onBlur}
                onChange={onChange}
                allowLeadingZeros thousandSeparator=","
                decimalScale={0}
              />
              <InputGroup.Text className={`${errors?.packagingServicePrice && 'border-danger'}`}>VND</InputGroup.Text>
            </InputGroup>
          </div>
        )}
      />
    );
  }
  
  const  IsolateReRenderTotalPrice: React.FC<{ control: any }> = ({ control }) => {
    const data: any = useWatch({
      control: control,
      name: ['coefficient', 'price', 'packagingServicePrice'],
      exact: true,
    })
    // console.log('bao data: ', data)
    // setValue("sendPay", data[1]*data[0].code + data[2]);
    setValue("totalPrice", data[1]*data[0].code + data[2] || 0);
    return (
      <Controller
        control={control}
        // defaultValue={totalPay}
        rules={{
          required: true,
          min: 0.1
        }}
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
                  <label className='form-label d-block me-5'>{intl.formatMessage({id: 'MENU.TINHNHANHANG'})}</label>
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
                      getOptionValue={(option) => `${option['transportation_route_code']}`}
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

            <InputGroup className="mb-3">
              <Controller
                name="vehicle"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <div className={`d-flex align-items-center w-100 ${errors?.vehicle && 'border-danger'}`}>
                  <label className='form-label d-block me-5'>Loại xe</label>
                  <Select 
                      className={`react-select-styled w-50 ${errors?.vehicle && 'rounded border border-danger'}`}
                      classNamePrefix='react-select' 
                      options={optionsVehicle} 
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      placeholder='Chọn một loại xe' 
                  />
                  </div>
                )}
              />
            </InputGroup>

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
                required: watch('vehicle')?.code == 'D0' ? true : false,
                min: watch('vehicle')?.code == 'D0' ? 0.001 : 0,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup className="mb-3">
                  <InputGroup.Text className={`group-text ${errors?.packageWeight && 'border-danger'}`}>
                  Trọng lượng
                  </InputGroup.Text>
                  <Form.Control
                      className={`text-dark ${errors?.packageWeight && 'border-danger'}`}
                      type='number'
                      disabled={watch('vehicle')?.code == 'D0' ? false : true}
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
                <label className='form-label d-block me-5'>Giao hàng tận nơi</label>
                  <Select 
                    className={`react-select-styled w-50 ${errors?.coefficient && 'rounded border border-danger'}`}
                    classNamePrefix='react-select text-dark' 
                    options={optionsCoefficient}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    placeholder='Dịch vụ giao hàng tận nơi' 
                  />
                </div>
                )}
            />
            <div className='d-flex'>
              <Controller
                name="packagingService"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <div className={`d-flex align-items-center w-75 mb-3 ${errors?.packagingService && 'border-danger'}`}>
                  <label className='form-label d-block me-1'>Dịch vụ đóng gói</label>
                    <Select
                      className={`react-select-styled w-100 ${errors?.packagingService && 'rounded border border-danger'}`}
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
              <Controller
                name="numberOfPackagingService"
                control={control}
                rules={{
                  required: true,
                  // min: 1
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <div className={`d-flex align-items-center w-25 mb-3 ${errors?.numberOfPackagingService && 'border-danger'}`}>
                  {/* <span className='ms-3'>x</span> */}
                  <label className='form-label d-block ms-3 mb-0'>Số lượng</label>
                    <InputGroup className='ms-3 w-100'>
                      <Form.Control
                          className={`text-dark ${errors?.numberOfPackagingService && 'border-danger'}`}
                          type='number'
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                      />
                    </InputGroup>
                  </div>
                  )}
              />
            </div>
            <IsolateReRenderOptionsPackingService control={control} />
            <IsolateReRenderPricePackingService control={control} />
            <IsolateReRenderTotalPrice control={control} />
          </>
        </div>
        {/* <div className='group card p-5 me-3'>
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
        </div> */}
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
            {/* <Button href="#" className="btn btn-secondary me-10" onClick={() => reset()}>Nhập lại</Button> */}
            <Button type="submit" className="btn btn-primary">{showCreateAppModal.indexRow ? 'Cập nhật' : 'Tạo mới'}</Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export {BuilderPage}

