/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import Select from 'react-select'
// import { ColourOption, colourOptions } from '../data';
import {useForm, SubmitHandler, Controller, useWatch} from 'react-hook-form'
import {InputGroup, Button, Form, OverlayTrigger} from 'react-bootstrap'
import {IFormInput} from './component/interface'
import {usePageData} from '../../../_metronic/layout/core'
import ToastError, {ToastSuccess} from '../../../_metronic/helpers/crud-helper/Toast'
import dayjs from 'dayjs'
import {
  calculatePriceByKG,
  calculatePriceByCBM,
  renderTooltip,
  calculatePricePackageByCBM,
  getMaxValue,
  NumberConverterRejectSystax,
} from '../../../_metronic/helpers'
import _ from 'lodash'
import {NumericFormat} from 'react-number-format'
import Sender from './component/Sender'
import Receiver from './component/Receiver'
import Parcelnformation from './component/Parcelnformation'
import {useSelector} from 'react-redux'
import {RootState} from '../../../store'
import {number} from 'yup'
import {provinceLiteAPIGetById} from '../../../apis/provinceAPI'
import {receiptCreatedAPI, receiptEditAPIByID} from '../../../apis/receiptAPI'

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

  const {rowDataOrder, setRowDataOrder, setRowDataCouponReciept, showModalOrder} = usePageData()
  const receiptDate = dayjs().add(3, 'day').toDate()

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
      sendDate: showModalOrder.sendDate || new Date(),
      senderName: showModalOrder.senderName || '',
      senderIdCard: showModalOrder.senderIdCard || '',
      senderAddress: showModalOrder.senderAddress || '',
      senderPhone: showModalOrder.senderPhone || '',

      receiptDate: receiptDate,
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
      packagingService: showModalOrder?.packagingService,
      packagingServiceQuantity: showModalOrder?.packagingServiceQuantity || 1,
      packagingServiceData: showModalOrder?.packagingServiceData,
      packagingServiceFee: showModalOrder?.packagingServiceFee?.price || 0,
      totalAmount: showModalOrder.totalAmount || 0,
      indexRow: showModalOrder.indexRow || (rowDataOrder?.length ? rowDataOrder?.length + 1 : 1),
    },
    shouldUnregister: false,
  })

  const handleShowPreImport: any = () => {
    const dataForm: any = getValues()
    setRowDataCouponReciept &&
      setRowDataCouponReciept({
        ...dataForm,
        indexRow: rowDataOrder?.length ? rowDataOrder?.length + 1 : 1,
      })
  }
  // handle form ====================
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    // console.log('bao data: ', data);
    try {
      if (data?.id) {
        await receiptEditAPIByID(data)
        ToastSuccess('Bạn đã cập nhật thành công')
      } else {
        await receiptCreatedAPI(data)
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
    // setShowModalPreImport(true);
    console.log('bao e: ', e)
    if (Object.keys(e).length) {
      ToastError('Bạn nhập thiếu thông tin!')
    }
  }

  const IsolateReRenderPriceService: any = ({control}: any) => {
    const dataInput: any = useWatch({
      control,
      name: [
        'itemLength',
        'itemWeight',
        'itemHeight',
        'itemWidth',
        'itemQuantity',
        'itemFragile',
        'receiverCommune',
        'receiverProvince',
        'itemValue',
      ],
    })
    // console.log('bao data: ', dataInput)
    const [province, setProvince] = useState<any>({})
    // console.log('bao province: ', province);
    useEffect(() => {
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

      fetchProvinceData()
    }, [dataInput[7]?.id])

    let pri: any = 0
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
      // console.log('bao KGConvert: ', KGConvert)
      const priKGConvert = calculatePriceByKG(
        priceByKGArray,
        KGConvert,
        +province?.regionFreightPrice?.label
      )
      const CBM = (+dataInput[0] * +dataInput[1] * +dataInput[2]) / 1000000
      // console.log('bao CBM: ', CBM)
      const priByCBM = calculatePriceByCBM(priceByCBMArray, +CBM)
      console.log('bao priByKG, priKGConvert, priByCBM: ', priByKG, priKGConvert, priByCBM)
      // console.log('bao ', NumberConverterRejectSystax(dataInput[8]) )
      const valuePackage: number | string = NumberConverterRejectSystax(dataInput[8])
      pri =
        getMaxValue([priByKG * 1.08, priKGConvert * 1.08, priByCBM]) *
          (dataInput[6]?.shipmentType === 'Nội Tuyến' ? 1 : 1.25) *
          +dataInput[4] +
        (+valuePackage > 1000000 ? (+valuePackage - 1000000) * 0.05 : 0)
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

  const [packagingServiceData, setPackagingServiceData] = useState<any[]>([])
  const IsolateReRenderOptionsPackingService: React.FC<{control: any}> = ({control}) => {
    const packagingServiceData = useWatch({
      control,
      name: 'packagingServiceData',
    })

    const packagingServiceDataClone = _.cloneDeep(packagingServiceData)

    useEffect(() => {
      if (packagingServiceDataClone?.code) {
        // Check if packagingService is already present in packagingServiceData
        const isExists = packagingServiceDataClone.some(
          (item: any) => item.code === packagingServiceDataClone.code
        )

        // If packagingService doesn't exist, add it to packagingServiceData
        const number = _.cloneDeepWith(+getValues('packagingServiceQuantity'))
        if (!isExists) {
          setPackagingServiceData((prevData) => [
            ...prevData,
            {...packagingServiceDataClone, quality: number},
          ])
          setValue('packagingService', '')
        }
      }
    }, [packagingServiceDataClone])

    // console.log('bao packagingServiceData: ', packagingServiceData)

    const orderOptions = (values: readonly any[]) => {
      const fixedOptions = values.filter((v) => v.isFixed)
      const nonFixedOptions = values.filter((v) => !v.isFixed)
      return [...fixedOptions, ...nonFixedOptions]
    }

    const onChange = (newValue: any, actionMeta: any) => {
      let updatedData = newValue
      switch (actionMeta.action) {
        case 'remove-value':
        case 'pop-value':
          if (actionMeta.removedValue.isFixed) {
            return
          }
          break
        case 'clear':
          newValue = packagingServiceDataClone.filter((v:any) => v.isFixed)
          break
      }
      setPackagingServiceData(orderOptions(updatedData))
    }

    return (
      <Controller
        control={control}
        name='packagingService'
        render={({field}) => (
          <Select
            className='mb-3 basic-multi-select'
            classNamePrefix='select'
            placeholder='Dịch vụ đóng gói'
            isMulti
            components={{DropdownIndicator: () => null, IndicatorSeparator: () => null}}
            isClearable={packagingServiceDataClone.some((v: any) => !v.isFixed)}
            value={packagingServiceDataClone}
            onChange={(newValue, actionMeta) => {
              field.onChange(newValue)
              onChange(newValue, actionMeta)
            }}
            getOptionLabel={(option) => `${option.code} (SL: ${option.quality})`}
          />
        )}
      />
    )
  }

  // price dịch vụ ddoings gói
  const IsolateReRenderPricePackingService: React.FC<{control: any}> = ({control}) => {
    // Calculate the price based on the watched fields
    const priPackageServiceData = useWatch({
      control,
      name: ['itemFragile', 'itemQuantity'],
    })
    // console.log('bao priPackageByCBM: ', priPackageByCBM)
    let calculatedPrice: number = 0
    packagingServiceData.length &&
      packagingServiceData?.forEach((item: any) => (calculatedPrice += +item.price * +item.quality))
    setValue(
      'packagingServiceFee',
      (+calculatedPrice + (priPackageServiceData[0] ? priPackageByCBM?.price : 0)) *
        +priPackageServiceData[1]
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
        <div className='group card p-5 pt-0 me-3'>
          <Parcelnformation control={control} errors={errors} watch={watch} />
        </div>
        <div className='group card p-5 pt-0 ms-3'>
          <>
            <p className='list-unstyled text-gray-700 fw-bold fs-3'>Tiền dịch vụ</p>
            <IsolateReRenderPriceService control={control} />
            <div className='d-flex'>
              <Controller
                name='packagingServiceData'
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <div
                    className={`d-flex align-items-center w-75 mb-3 ${
                      errors?.packagingServiceData && 'border-danger'
                    }`}
                  >
                    <label className='form-label d-block me-1'>Dịch vụ đóng gói</label>
                    <Select
                      className={`react-select-styled w-100 ${
                        errors?.packagingServiceData && 'rounded border border-danger'
                      }`}
                      classNamePrefix='react-select text-dark'
                      options={listPackagesPrice}
                      onBlur={onBlur}
                      onChange={onChange}
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
            {/* <IsolateReRenderOptionsPackingService control={control} /> */}
            <IsolateReRenderPricePackingService control={control} />
            <IsolateReRenderTotalPrice control={control} />
          </>
        </div>
      </div>
      <div className='row mt-6'>
        <div className='col justify-content-between d-flex'>
          <OverlayTrigger placement='top' delay={{show: 250, hide: 400}} overlay={renderTooltip}>
            <Button href='#' className='btn btn-secondary me-10' onClick={handleShowPreImport}>
              <i className='bi bi-zoom-in'></i>
            </Button>
          </OverlayTrigger>
          <div>
            <Button type='submit' className='btn btn-primary'>
              {showModalOrder.id ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ModalOrderPage
