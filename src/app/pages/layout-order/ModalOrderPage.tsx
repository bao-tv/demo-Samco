/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useEffect, useState, useRef} from 'react'
import Select, { ActionMeta, OnChangeValue, StylesConfig } from 'react-select';
// import { ColourOption, colourOptions } from '../data';
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form"
import {InputGroup, Button, Form, OverlayTrigger } from 'react-bootstrap';
import { IFormInput } from './component/interface';
import { usePageData } from '../../../_metronic/layout/core';
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import dayjs from 'dayjs';
import { calculatePrice, calculatePriceVehicle, renderTooltip } from '../../../_metronic/helpers';
import _, { cloneDeep } from 'lodash';
import { NumericFormat } from 'react-number-format';
import { useIntl } from 'react-intl';
import Sender from './component/Sender';
import Receiver from './component/Receiver';
import Parcelnformation from './component/Parcelnformation';
import { useSelector } from 'react-redux';

const ModalOrderPage: React.FC<any> = ({handleClose, title}: any) => {
  const intl = useIntl();

  const optionsShipName: any[] = [
    { value: 'option 1', label: 'Samco', fullName: 'Công ty TNHH Kumho Samco Buslines' },
    { value: 'option 2', label: 'Phương Trang', fullName: 'Công ty TNHH Phương Trang' },
    { value: 'option 3', label: 'Thành Bưởi', fullName: 'Công ty TNHH Thành Bưởi' },
    { value: 'option 4', label: 'Bus Line', fullName: 'Công ty TNHH Bus Line' },
    { value: 'option 5', label: 'Vận chuyển siêu tốc', fullName: 'Công ty TNHH Vận chuyển siêu tốc' },
  ]
  const [priceVehicleData, setPriceVehicleData] = useState<any[]>([]);
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

  const {rowDataOrder, setRowDataOrder, setRowDataCouponReciept, showModalOrder} = usePageData();

  const receiptDate = dayjs().add(3, 'day').toDate();

  const { control, watch, setValue, getValues, handleSubmit, clearErrors, formState: { errors }, } = useForm<IFormInput>({
    mode: 'all',
    defaultValues: {
      sendDate: showModalOrder.sendDate || new Date(),
      sendName: showModalOrder.sendName || '',
      sendIdPer: showModalOrder.sendIdPer || '',
      sendPhone: showModalOrder.sendPhone || '',
      sendAddress: showModalOrder.sendAddress || '',

      receiptDate: receiptDate,
      receiptName: showModalOrder.receiptName || '',
      receiptIdPer: showModalOrder.receiptIdPer || '',
      receiptPhone: showModalOrder.receiptPhone || '',
      receiptProvincesAddress: showModalOrder.receiptProvincesAddress || '',
      receiptDistrictsAddress: showModalOrder.receiptDistrictsAddress || '',
      receiptCommunesAddress: showModalOrder.receiptCommunesAddress || '',
      
      packageName: showModalOrder.packageName || '',
      // vehicle: showModalOrder.vehicle || '',
      packageValue: showModalOrder.packageValue || 0,
      packageLength: showModalOrder.packageLength || 0,
      packageWidth: showModalOrder.packageWidth || 0,
      packageHeight: showModalOrder.packageHeight || 0,
      packageWeight: showModalOrder.packageWeight || 0,
      packageQuantity: showModalOrder.packageQuantity || 1,
      shipName: showModalOrder.shipName || '',
      price: showModalOrder.price || 0,
      coefficient: showModalOrder.coefficient || '',
      packagingService: showModalOrder?.packagingService,
      numberOfPackagingService: showModalOrder?.numberOfPackagingService || 1,
      packagingServiceData: showModalOrder?.packagingServiceData,
      packagingServicePrice: showModalOrder?.packagingServicePrice?.price || 0,
      totalPrice: showModalOrder.totalPrice || 0,
      indexRow: showModalOrder.indexRow || (rowDataOrder?.length ? rowDataOrder?.length + 1 : 1),
     },
     shouldUnregister: false,
    })

  const handleShowPreImport: any = () => {
    const dataForm:any = getValues();
    setRowDataCouponReciept && setRowDataCouponReciept({...dataForm, indexRow: (rowDataOrder?.length ? rowDataOrder?.length + 1 : 1)});
  }
  // handle form ====================
  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    console.log('bao data: ', data);
    if (!showModalOrder.indexRow) {
      setRowDataOrder && await setRowDataOrder((prevRowData: any) => [...prevRowData, data]);
    } else {
      const cloneRowData = _.cloneDeep(rowDataOrder);
      // console.log('bao cloneRowData: ', cloneRowData);

      const updateRowData = cloneRowData?.map(item => {
        if (item.indexRow === data.indexRow) return data;
        return item
      });
      setRowDataOrder && setRowDataOrder(updateRowData);
    }
    ToastSuccess(showModalOrder.indexRow ? 'Cập nhật thành công' : 'Tạo mới thành công')
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
      name: ['receiptProvincesAddress', 'packageWeight', 'packageQuantity', 'packageLength', 'packageWidth', 'packageHeight']
    })
    console.log('bao data IsolateReRenderPriceService: ', data[0]?.region);
    // const priceObject: any = data[0]?.filter((item: any) => item?.distance_code === data[2]?.value)
    const priceObjectForVehicle: any = priceVehicleData.filter(item => item.distance_code === data[2]?.value)
    let pri: any = 0;
    // if (priceObject[0]?.price.length && data[0] && data[3]?.code === 'D0') {
    //   pri = calculatePrice(priceObject[0].price, +data[0]);
    //   setValue("price", pri * +data[1]);
    // } else if (priceObjectForVehicle[0]?.price.length && data[3]?.code !== 'D0') {
    //   pri = calculatePriceVehicle(priceObjectForVehicle[0].price, data[3]?.code);
    //   setValue("price", pri * +data[1]);

    // }
    return (
      <Controller
        control={control}
        // rules={{
        //   required: true,
        //   min: 0.1
        // }}
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
        // rules={{
        //   required: true,
        //   min: 0.1
        // }}
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
        <div className='group card p-5 pt-0 me-3'>
          <Sender control={control} errors={errors} />
        </div>
        <div className='group card p-5 pt-0 ms-3'>
          <Receiver control={control} errors={errors} watch={watch} setValue={setValue}/>
        </div>
        <div className='group card p-5 me-3'>
          <Parcelnformation control={control} errors={errors} watch={watch}/>
        </div>
        <div className='group card p-5 ms-3'>
          <>
            <p className='list-unstyled text-gray-700 fw-bold fs-3'>Tiền dịch vụ</p>
            <IsolateReRenderPriceService control={control} />
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
            <Button type="submit" className="btn btn-primary">{showModalOrder.indexRow ? 'Cập nhật' : 'Tạo mới'}</Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ModalOrderPage
