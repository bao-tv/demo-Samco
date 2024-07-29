import {useForm, SubmitHandler, Controller, useWatch} from 'react-hook-form'
import {InputGroup, Button, Form} from 'react-bootstrap'
import {IFormPackageCBMPriceInput} from './interface'
import {useThemeMode} from '../../../_metronic/partials'
import ToastError, {
  ToastSuccess,
  covertNumberWithReject,
} from '../../../_metronic/helpers/crud-helper/Toast'
import {usePageData} from '../../../_metronic/layout/core'
import {useDispatch} from 'react-redux'
import {NumericFormat} from 'react-number-format'
import {
  packageCBMPriceCreatedAPI,
  packageCBMPriceEditAPIByID,
} from '../../../apis/packageCBMPriceAPI'
import { packagesCBMPrice } from '../../../slices/packageCBMPriceSlice'

const ModalShowAndAddPackageCBMPrice = (props: any) => {
  const {setShowModalPackageCBMPrice, dataModalPackageCBMPrice, setDataModalPackageCBMPrice} =
    usePageData()
  const dispath = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<any>({
    mode: 'all',
    defaultValues: {
      code: dataModalPackageCBMPrice.code || '',
      name: dataModalPackageCBMPrice.name || '',
      fromCbm: dataModalPackageCBMPrice.fromCbm || 0,
      toCbm: dataModalPackageCBMPrice.toCbm || 0,
      price: dataModalPackageCBMPrice.price || 0, // giá
      additionalWeightAfterPacking: dataModalPackageCBMPrice.additionalWeightAfterPacking || 0, //trọng lượng cộng thêm
      maxWeightPerPackage: dataModalPackageCBMPrice.maxWeightPerPackage || 0, // max trọng lượng
      additionalPrice: dataModalPackageCBMPrice.additionalPrice || 0, // chi phí đóng kiện
      priceCoefficient: dataModalPackageCBMPrice.priceCoefficient || 1, // hệ số tính giá
      vat: dataModalPackageCBMPrice.vat || 0, // thuế
      note: dataModalPackageCBMPrice.note || '',
      id: dataModalPackageCBMPrice.id || 0,
    },
    shouldUnregister: false,
  })
  const onSubmit: SubmitHandler<IFormPackageCBMPriceInput> = async (
    data: IFormPackageCBMPriceInput
  ) => {
    console.log('bao data: ', data)
    try {
      if (data.id) {
        await packageCBMPriceEditAPIByID(data)
        ToastSuccess('Bạn đã cập nhật thành công')
      } else {
        await packageCBMPriceCreatedAPI(data)
        ToastSuccess('Bạn đã tạo mới thành công')
      }
      dispath(packagesCBMPrice())
      setDataModalPackageCBMPrice && setDataModalPackageCBMPrice({})
      setShowModalPackageCBMPrice && setShowModalPackageCBMPrice(false)
    } catch (err) {
      ToastError('Có lỗi xảy ra!')
    }
    // reset()
  }
  const onErrors = async (e: any) => {
    if (Object.keys(e).length) {
      ToastError('Bạn nhập thiếu thông tin!')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div className='row'>
          <div className='card mb-5 p-5 pt-0 me-3'>
            <>
              <p className='list-unstyled text-gray-700 fw-bold fs-3'>{`Tên ${props.title}`}</p>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.name && 'border-danger'}`}>
                      Tên nấc CBM
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.name && 'border-danger'}`}
                      aria-label='Default'
                      aria-describedby='inputGroup-sizing-default'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                  </InputGroup>
                )}
                name='name'
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.code && 'border-danger'}`}>
                      Mã loại đóng gói CBM
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.code && 'border-danger'}`}
                      aria-label='Default'
                      aria-describedby='inputGroup-sizing-default'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                  </InputGroup>
                )}
                name='code'
              />

              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.fromCbm && 'border-danger'}`}>
                      Từ CBM
                    </InputGroup.Text>
                    <NumericFormat
                      value={value}
                      className={`text-dark ${errors?.fromCbm && 'border-danger'} form-control`}
                      onBlur={onBlur}
                      onChange={onChange}
                      allowLeadingZeros
                      thousandSeparator=','
                      decimalScale={3}
                    />
                  </InputGroup>
                )}
                name='fromCbm'
              />

              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.toCbm && 'border-danger'}`}>
                      Đến CBM
                    </InputGroup.Text>
                    <NumericFormat
                      value={value}
                      className={`text-dark ${errors?.toCbm && 'border-danger'} form-control`}
                      onBlur={onBlur}
                      onChange={onChange}
                      allowLeadingZeros
                      thousandSeparator=','
                      decimalScale={2}
                    />
                  </InputGroup>
                )}
                name='toCbm'
              />

              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.price && 'border-danger'}`}>
                      Giá
                    </InputGroup.Text>
                    <NumericFormat
                      value={value}
                      className={`text-dark ${errors?.price && 'border-danger'} form-control`}
                      onBlur={onBlur}
                      onValueChange={(values) => {
                        const {formattedValue, value, floatValue} = values
                        onChange(floatValue)
                      }}
                      allowLeadingZeros
                      thousandSeparator=','
                      decimalScale={0}
                    />
                    <InputGroup.Text className={`${errors?.price && 'border-danger'}`}>
                      VND
                    </InputGroup.Text>
                  </InputGroup>
                )}
                name='price'
              />

              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text
                      className={`group-text ${
                        errors?.additionalWeightAfterPacking && 'border-danger'
                      }`}
                    >
                      Trọng lượng cộng thêm
                    </InputGroup.Text>
                    <NumericFormat
                      value={value}
                      className={`text-dark ${
                        errors?.additionalWeightAfterPacking && 'border-danger'
                      } form-control`}
                      onBlur={onBlur}
                      onChange={onChange}
                      allowLeadingZeros
                      thousandSeparator=','
                      decimalScale={0}
                    />
                    <InputGroup.Text
                      className={`${errors?.additionalWeightAfterPacking && 'border-danger'}`}
                    >
                      KG
                    </InputGroup.Text>
                  </InputGroup>
                )}
                name='additionalWeightAfterPacking'
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text
                      className={`group-text ${errors?.maxWeightPerPackage && 'border-danger'}`}
                    >
                      Trọng lượng tối đa
                    </InputGroup.Text>
                    <NumericFormat
                      value={value}
                      className={`text-dark ${
                        errors?.maxWeightPerPackage && 'border-danger'
                      } form-control`}
                      onBlur={onBlur}
                      onValueChange={(values) => {
                        const {formattedValue, value, floatValue} = values
                        onChange(floatValue)
                      }}
                      allowLeadingZeros
                      thousandSeparator=','
                      decimalScale={0}
                    />
                    <InputGroup.Text
                      className={`${errors?.maxWeightPerPackage && 'border-danger'}`}
                    >
                      KG
                    </InputGroup.Text>
                  </InputGroup>
                )}
                name='maxWeightPerPackage'
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text
                      className={`group-text ${errors?.additionalPrice && 'border-danger'}`}
                    >
                      Phí đóng kiện
                    </InputGroup.Text>
                    <NumericFormat
                      value={value}
                      className={`text-dark ${
                        errors?.additionalPrice && 'border-danger'
                      } form-control`}
                      onBlur={onBlur}
                      onValueChange={(values) => {
                        const {formattedValue, value, floatValue} = values
                        onChange(floatValue)
                      }}
                      allowLeadingZeros
                      thousandSeparator=','
                      decimalScale={0}
                    />
                    <InputGroup.Text className={`${errors?.additionalPrice && 'border-danger'}`}>
                      VND
                    </InputGroup.Text>
                  </InputGroup>
                )}
                name='additionalPrice'
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.vat && 'border-danger'}`}>
                      Thuế
                    </InputGroup.Text>
                    <NumericFormat
                      value={value}
                      className={`text-dark ${errors?.vat && 'border-danger'} form-control`}
                      onBlur={onBlur}
                      onValueChange={(values) => {
                        const {formattedValue, value, floatValue} = values
                        onChange(floatValue)
                      }}
                      allowLeadingZeros
                      thousandSeparator=','
                      decimalScale={0}
                    />
                    <InputGroup.Text className={`${errors?.vat && 'border-danger'}`}>
                      %
                    </InputGroup.Text>
                  </InputGroup>
                )}
                name='vat'
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text
                      className={`group-text ${errors?.priceCoefficient && 'border-danger'}`}
                    >
                      Hệ số tính giá
                    </InputGroup.Text>
                    <NumericFormat
                      value={value}
                      className={`text-dark ${
                        errors?.priceCoefficient && 'border-danger'
                      } form-control`}
                      onBlur={onBlur}
                      onChange={onChange}
                      allowLeadingZeros
                      thousandSeparator=','
                      decimalScale={2}
                    />
                  </InputGroup>
                )}
                name='priceCoefficient'
              />

              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.note && 'border-danger'}`}>
                      Note
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.note && 'border-danger'}`}
                      aria-label='Default'
                      aria-describedby='inputGroup-sizing-default'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                  </InputGroup>
                )}
                name='note'
              />
            </>
          </div>
        </div>
        <div className='row'>
          <div className='col justify-content-end d-flex'>
            <div>
              <Button type='submit' className='btn btn-primary'>{`${
                dataModalPackageCBMPrice.id ? 'Cập nhật' : 'Tạo mới'
              } ${props.title}`}</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ModalShowAndAddPackageCBMPrice
