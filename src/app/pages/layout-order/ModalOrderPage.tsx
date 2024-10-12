/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import Select from 'react-select'
// import { ColourOption, colourOptions } from '../data';
import {useForm, SubmitHandler, Controller, useWatch} from 'react-hook-form'
import {InputGroup, Button, Form, OverlayTrigger} from 'react-bootstrap'
import {IFormInput} from './component/interface'
import {usePageData} from '../../../_metronic/layout/core'
import ToastError, {ToastSuccess} from '../../../_metronic/helpers/crud-helper/Toast'
import {
  calculatePriceByKG,
  calculatePriceByCBM,
  renderTooltip,
  calculatePricePackageByCBM,
  getMaxValue,
  NumberConverterRejectSystax,
  renderTooltipSubPackage,
} from '../../../_metronic/helpers'
import _, {values} from 'lodash'
import {NumericFormat} from 'react-number-format'
import Sender from './component/Sender'
import Receiver from './component/Receiver'
import Parcelnformation from './component/Parcelnformation'
import {useSelector} from 'react-redux'
import {RootState} from '../../../store'
import {number} from 'yup'
import {provinceLiteAPIGetById} from '../../../apis/provinceAPI'
import {receiptCreatedAPI, receiptEditAPIByID} from '../../../apis/receiptAPI'
import SubPackages from './component/SubPackages'

type Props = {
  title: string
  refreshData?: any
  handleClose?: any
}

const ModalOrderPage = (props: Props) => {
  const [provinceDetail, setProvinceDetail] = useState<any>([])
  const [communeDetail, setCommuneDetail] = useState<any>([])
  const [priPackageByCBM, setPriPackageByCBM] = useState<any>(number)
  const {listPackagesPrice} = useSelector((state: RootState) => state.packagesPrice)
  const {listPackagesCBMPrice} = useSelector((state: RootState) => state.packagesCBMPrice)
  const {percentage} = useSelector((state: RootState) => state.Percentage)

  const {
    rowDataOrder,
    setRowDataCouponReciept,
    showModalOrder,
    rowDataSubPackage,
    setShowModalSubPackage,
    setRowDataSubPackage,
    gridRefSubPackage,
  } = usePageData()
  // console.log('bao showModalOrder: ', showModalOrder);

  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<IFormInput>({
    mode: 'all',
    defaultValues: {
      id: showModalOrder.id || 0,
      receiptCode: showModalOrder.receiptCode || `CODE${showModalOrder.id}`,
      billStatus: showModalOrder.billStatus || 'CREATED',
      settlementStatus: showModalOrder.settlementStatus || 'PENDING',
      subPackages: showModalOrder.subPackages || [],
      sendDate: showModalOrder.sendDate || new Date(),
      senderName: showModalOrder.senderName || '',
      senderIdCard: showModalOrder.senderIdCard || '',
      senderAddress: showModalOrder.senderAddress || '',
      senderPhone: showModalOrder.senderPhone || '',

      receiptDate: showModalOrder.receiverProvince?.regionFreightPrice?.deliveryTime || 0,
      receiverName: showModalOrder.receiverName || '',
      receiverIdCard: showModalOrder.receiverIdCard || '',
      receiverPhone: showModalOrder.receiverPhone || '',
      receiverProvince: showModalOrder.receiverProvince || '',
      receiverDistrict: showModalOrder.receiverDistrict || '',
      receiverCommune: showModalOrder.receiverCommune || '',
      receiverAddress: showModalOrder.receiverAddress || '',

      itemName: showModalOrder.itemName || '',
      itemValue: showModalOrder.itemValue || 0,
      itemLength: showModalOrder.itemLength || 0,
      itemWeight: showModalOrder.itemWeight || 0,
      itemHeight: showModalOrder.itemHeight || 0,
      itemWidth: showModalOrder.itemWidth || 0,
      itemFragile: showModalOrder.itemFragile || false,
      itemQuantity: showModalOrder.itemQuantity || 1,
      shipName: showModalOrder.shipName || '',

      serviceFee: showModalOrder.serviceFee || 0,
      packagingServiceQuantity: showModalOrder?.packagingServiceQuantity || 1,
      packagingServiceDetail: showModalOrder?.packagingServiceDetail || {},
      packagingServiceFee: showModalOrder?.packagingServiceFee || 0,
      totalAmount: showModalOrder.totalAmount || 0,
      indexRow: showModalOrder.indexRow || (rowDataOrder?.length ? rowDataOrder?.length + 1 : 1),
    },
    shouldUnregister: false,
  })
  const [packagingServiceData, setPackagingServiceData] = useState<any[]>(
    showModalOrder?.packagingServices || []
  )

  const handleShowPreImport: any = () => {
    const dataForm: any = getValues()
    setRowDataCouponReciept &&
      setRowDataCouponReciept({
        ...dataForm,
        // indexRow: rowDataOrder?.length ? rowDataOrder?.length + 1 : 1,
        isShowReceipt: true,
        isPrintReceipt: false,
      })
  }

  const handleShowSubPackage: any = () => {
    setShowModalSubPackage && setShowModalSubPackage(true)
  }
  // handle form ====================
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const dataConvert = {
      ...data,
      itemValue: NumberConverterRejectSystax(data.itemValue) || 0,
      packagingServices: packagingServiceData,
      subPackages: rowDataSubPackage,
    }
    try {
      if (dataConvert?.id) {
        await receiptEditAPIByID(dataConvert)
        ToastSuccess('Bạn đã cập nhật thành công')
      } else {
        await receiptCreatedAPI(dataConvert)
        ToastSuccess('Bạn đã tạo mới thành công')
      }
      props.refreshData()
      props.handleClose()
      clearErrors()
    } catch (err) {
      ToastError('Có lỗi xảy ra!')
    }
  }

  const onErrors = async (e: any) => {
    if (Object.keys(e).length) {
      ToastError('Bạn nhập thiếu thông tin!')
    }
  }

  const IsolateReRenderPriceService: any = ({control}: any) => {
    const dataInput: any = useWatch({
      control,
      name: [
        'itemLength',
        'itemHeight',
        'itemWidth',
        'itemWeight',
        'itemQuantity',
        'itemFragile',
        'receiverCommune',
        'receiverProvince',
        'itemValue',
      ],
    })
    const [province, setProvince] = useState<any>({})

    const fetchProvinceData = async () => {
      if (dataInput[7]?.id) {
        try {
          const response = await provinceLiteAPIGetById(dataInput[7]?.id)
          setProvince(response?.data || {})
        } catch (error) {
          console.error('Error fetching province detail:', error)
        }
      }
    }
    useEffect(() => {
      fetchProvinceData()
    }, [dataInput[7]?.id])

    let pri: any = 0

    // const percentage.TSDVVC: number = +listPercentage[0]?.tax || 0;
    // const taxPackage: number = +listPercentage[0]?.tax || 0;
    // console.log('bao percentage.TSDVVC: ', percentage.TSDVVC);
    const calPackageFragile = () => {
      const packageByCBM = (+dataInput[0] * +dataInput[1] * +dataInput[2]) / 1000000
      // console.log('bao packageByCBM: ', packageByCBM)
      const priPackageByCBM = calculatePricePackageByCBM(listPackagesCBMPrice, packageByCBM)
      setPriPackageByCBM(priPackageByCBM)
      return priPackageByCBM
    }
    // console.log('bao province: ', province);
    const priceByKGArray: any[] = province?.regionFreightPrice?.regionRates
    const priceByCBMArray: any[] = province?.regionFreightPrice?.cbmRates
    if (priceByKGArray?.length && dataInput[3]) {
      let calObjPackageFragile: any = {}
      if (dataInput[5]) {
        calObjPackageFragile = calPackageFragile()
      }
      const priByKG = calculatePriceByKG(
        priceByKGArray,
        +dataInput[3] +
          (calObjPackageFragile?.additionalWeightAfterPacking || 0,
          +province?.regionFreightPrice?.label)
      )
      const KGConvert =
        (+dataInput[0] * +dataInput[1] * +dataInput[2] * 3) / 10000 +
        (calObjPackageFragile?.additionalWeightAfterPacking || 0)
      const priKGConvert = calculatePriceByKG(
        priceByKGArray,
        KGConvert,
        +province?.regionFreightPrice?.label
      )
      const CBM = (+dataInput[0] * +dataInput[1] * +dataInput[2]) / 1000000
      const priByCBM = calculatePriceByCBM(priceByCBMArray, +CBM)
      // console.log('bao price kg - kg/c cmb: ', priByKG, priKGConvert, priByCBM)
      const valuePackage: number | string = NumberConverterRejectSystax(dataInput[8])
      pri =
        getMaxValue([
          priByKG * (1 + percentage.TSDVVC / 100),
          priKGConvert * (1 + percentage.TSDVVC / 100),
          priByCBM,
        ]) *
          (1 + percentage.PPXD / 100) *
          (dataInput[6]?.shipmentType === 'Nội Tuyến' ? 1 : 1 + percentage.PPGHNT / 100) *
          +dataInput[4] +
        (+valuePackage > 1000000 ? (+valuePackage - 1000000) * (percentage.PPHGTC / 100) : 0)
      setValue('serviceFee', pri)
    }
    return (
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text className={`group-text ${errors?.serviceFee && 'border-danger'}`}>
              Giá dịch vụ
            </InputGroup.Text>
            <NumericFormat
              value={pri}
              className={`text-dark ${errors?.serviceFee && 'border-danger'} form-control`}
              onBlur={onBlur}
              onChange={onChange}
              allowLeadingZeros
              thousandSeparator=','
              disabled
              decimalScale={0}
            />
            <InputGroup.Text className={`${errors?.serviceFee && 'border-danger'}`}>
              VND
            </InputGroup.Text>
          </InputGroup>
        )}
        name='serviceFee'
      />
    )
  }

  const IsolateReRenderOptionsPackingService: React.FC<{control: any}> = ({control}) => {
    // console.log('bao packagingServiceData: ', packagingServiceData);
    const handleRemove = (id: any) => {
      setPackagingServiceData(packagingServiceData.filter((e) => e.packagingPrice.id != id))
    }
    const handleChangeIsReused = (id: any) => {
      setPackagingServiceData(
        packagingServiceData.map((e) => {
          if (e.packagingPrice.id == id) return {...e, isReused: !e.isReused}
          return e
        })
      )
    }
    return (
      <div className='mb-3 d-flex justify-content-start align-items-center'>
        {packagingServiceData.map((item, index) => {
          return (
            <>
              <div className={`border rounded-3 ${index !== 0 ? 'ms-2' : ''}`}>
                <span>{item.packagingPrice.code}</span>
                <span className='ms-1'>(SL: {item.quantity})</span>
                <span className='ms-1'>
                  <Button
                    variant={`${item.isReused ? 'warning' : 'success'}`}
                    className='p-2'
                    size='sm'
                    onClick={() => handleChangeIsReused(item.packagingPrice.id)}
                  >{`${item.isReused ? 'TC' : 'Mới'}`}</Button>
                </span>
                <span className='ms-1'>
                  <Button
                    variant='outline-secondary'
                    className='p-2'
                    size='sm'
                    onClick={() => handleRemove(item.packagingPrice.id)}
                  >
                    X
                  </Button>
                </span>
              </div>
              <span className='ms-1'>;</span>
            </>
          )
        })}
      </div>
    )
  }

  // price dịch vụ ddoings gói
  const IsolateReRenderPricePackingService: React.FC<{control: any}> = ({control}) => {
    // Calculate the price based on the watched fields
    const priPackageServiceData = useWatch({
      control,
      name: ['itemFragile', 'itemQuantity'],
    })
    let calculatedPrice: number = 0
    // const percentage.TSDVVC: number = +listPercentage?.tax || 0;
    if (packagingServiceData.length > 0) {
      packagingServiceData.forEach((item: any) => {
        // console.log('bao item: ',item,)
        calculatedPrice +=
          item.quantity *
          (item.isReused ? item.packagingPrice.reusePrice : item.packagingPrice.price)
        // console.log(first)
        // console.log('bao calculatedPrice: ', calculatedPrice)
      })
    }
    setValue(
      'packagingServiceFee',
      (calculatedPrice + (priPackageServiceData[0] ? priPackageByCBM?.price : 0)) *
        +priPackageServiceData[1] *
        (1 + percentage.TSDVDG / 100)
    )
    return (
      <Controller
        control={control}
        name='packagingServiceFee'
        rules={{
          required: true,
          min: 0,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <div className='d-flex justify-content-center align-items-center'>
            <InputGroup className='mb-3'>
              <InputGroup.Text
                className={`group-text ${errors?.packagingServiceFee && 'border-danger'}`}
              >
                Giá dịch vụ đóng gói
              </InputGroup.Text>
              <NumericFormat
                value={value}
                disabled
                className={`text-dark ${
                  errors?.packagingServiceFee && 'border-danger'
                } form-control`}
                aria-label='Default'
                aria-describedby='inputGroup-sizing-default'
                onBlur={onBlur}
                onChange={onChange}
                allowLeadingZeros
                thousandSeparator=','
                decimalScale={0}
              />
              <InputGroup.Text className={`${errors?.packagingServiceFee && 'border-danger'}`}>
                VND
              </InputGroup.Text>
            </InputGroup>
          </div>
        )}
      />
    )
  }

  const IsolateReRenderTotalPrice: React.FC<{control: any}> = ({control}) => {
    const data: any = useWatch({
      control: control,
      name: ['serviceFee', 'packagingServiceFee'],
      exact: true,
    })
    setValue('totalAmount', data[0] + data[1])
    return (
      <Controller
        control={control}
        defaultValue={data[0] + data[1]}
        rules={{
          required: true,
          min: 0.1,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text className={`group-text ${errors?.totalAmount && 'border-danger'}`}>
              Tổng tiền
            </InputGroup.Text>
            <NumericFormat
              value={value}
              disabled
              className={`text-dark ${errors?.totalAmount && 'border-danger'} form-control`}
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              onBlur={onBlur}
              onChange={onChange}
              allowLeadingZeros
              thousandSeparator=','
              decimalScale={0}
            />
            <InputGroup.Text>VND</InputGroup.Text>
          </InputGroup>
        )}
        name='totalAmount'
      />
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div className='row'>
          <div className='group card p-5 pt-0 me-3'>
            <Sender control={control} errors={errors} />
          </div>
          <div className='group card p-5 pt-0 ms-3'>
            <Receiver
              control={control}
              getValues={getValues}
              errors={errors}
              watch={watch}
              setValue={setValue}
              setProvinceDetail={setProvinceDetail}
              provinceDetail={provinceDetail}
              setCommuneDetail={setCommuneDetail}
              communeDetail={communeDetail}
            />
          </div>
          <div className='group card p-5 pb-0 pt-0 me-3'>
            <Parcelnformation control={control} errors={errors} watch={watch} />
          </div>
          <div className='group card p-5 pb-0 pt-0 ms-3'>
            <>
              <p className='list-unstyled text-gray-700 fw-bold fs-3'>Tiền dịch vụ</p>
              <IsolateReRenderPriceService control={control} />
              <div className='d-flex'>
                <Controller
                  name='packagingServiceDetail'
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <div
                      className={`d-flex align-items-center w-75 mb-3 ${
                        errors?.packagingServiceDetail && 'border-danger'
                      }`}
                    >
                      <label className='form-label d-block me-1'>Chọn dịch vụ đóng gói</label>
                      <Select
                        className={`react-select-styled w-100 ${
                          errors?.packagingServiceDetail && 'rounded border border-danger'
                        }`}
                        classNamePrefix='react-select text-dark'
                        options={listPackagesPrice}
                        onBlur={onBlur}
                        onChange={(val: any) => {
                          onChange(val)
                          if (val?.code) {
                            // Check if packagingService is already present in packagingServiceDetail
                            const isExists = packagingServiceData?.some(
                              (item: any) => item.packagingPrice.id === val.id
                            )

                            // If packagingService doesn't exist, add it to packagingServiceDetail
                            const quantityPackaging = +getValues('packagingServiceQuantity')
                            if (!isExists) {
                              setPackagingServiceData((prevData) => [
                                ...prevData,
                                {packagingPrice: val, quantity: quantityPackaging, isReused: false},
                              ])
                            } else {
                              const newArray = packagingServiceData.map((item: any) => {
                                if (item.packagingPrice.id === val.id) {
                                  return {...item, quantity: quantityPackaging}
                                }
                                return item
                              })
                              setPackagingServiceData(newArray)
                            }
                          }
                          setValue('packagingServiceDetail', '')
                        }}
                        value={value}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        placeholder='Chọn dịch vụ đóng gói'
                      />
                    </div>
                  )}
                />
                <Controller
                  name='packagingServiceQuantity'
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <div
                      className={`d-flex align-items-center w-25 mb-3 ${
                        errors?.packagingServiceQuantity && 'border-danger'
                      }`}
                    >
                      <label className='form-label d-block ms-3 mb-0'>Số lượng</label>
                      <InputGroup className='ms-3 w-100'>
                        <Form.Control
                          className={`text-dark ${
                            errors?.packagingServiceQuantity && 'border-danger'
                          }`}
                          type='number'
                          aria-label='Default'
                          aria-describedby='inputGroup-sizing-default'
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
            <div className='position-relative'>
              <OverlayTrigger
                placement='top'
                delay={{show: 250, hide: 400}}
                overlay={renderTooltipSubPackage}
              >
                <Button href='#' className='btn btn-secondary me-10' onClick={handleShowSubPackage}>
                  <i className='bi bi-box2 fs-2 p-0'></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement='top'
                delay={{show: 250, hide: 400}}
                overlay={renderTooltip}
              >
                <Button href='#' className='btn btn-secondary me-10' onClick={handleShowPreImport}>
                  <i className='bi bi-zoom-in fs-2 p-0'></i>
                </Button>
              </OverlayTrigger>
            </div>
            <div></div>
            <Button type='submit' className='btn btn-primary'>
              {showModalOrder.id ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </div>
        </div>
      </form>
      <SubPackages data={showModalOrder.subPackages || []}/>
    </>
  )
}

export default ModalOrderPage
