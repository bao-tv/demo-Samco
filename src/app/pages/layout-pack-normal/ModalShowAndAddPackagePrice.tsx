import {useForm, SubmitHandler, Controller, useWatch} from 'react-hook-form'
import {InputGroup, Button, Form} from 'react-bootstrap'
import {IFormPackagePriceInput} from './interface'
import {useThemeMode} from '../../../_metronic/partials'
import ToastError, {
  ToastSuccess,
  covertNumberWithReject,
} from '../../../_metronic/helpers/crud-helper/Toast'
import {usePageData} from '../../../_metronic/layout/core'
import {useDispatch} from 'react-redux'
import {NumericFormat} from 'react-number-format'
import {packagePriceCreatedAPI, packagePriceEditAPIByID} from '../../../apis/packagePriceAPI'
import {packagesPrice} from '../../../slices/packagePriceSlice'

const ModalShowAndAddPackagePrice = (props: any) => {
  const {setShowModalPackagePrice, dataModalPackagePrice, setDataModalPackagePrice} = usePageData()
  const dispath = useDispatch()
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
  } = useForm<any>({
    mode: 'all',
    defaultValues: {
      code: dataModalPackagePrice.code || '',
      size: dataModalPackagePrice.size || '', // kích thước
      name: dataModalPackagePrice.name || '',
      unit: dataModalPackagePrice.unit || '',
      note: dataModalPackagePrice.note || '',
      discount: dataModalPackagePrice.discount || 0, // giảm giá
      price: dataModalPackagePrice.price || 0, // giá
      total_price_new: dataModalPackagePrice.total_price_new || 0, // giá sau thuế
      total_price_reuse: dataModalPackagePrice.total_price_reuse || 0, // giá sau thuế hàng tsai sử dụng
      laborCost: dataModalPackagePrice.laborCost || 0, // chi phí nhân công
      reusePrice: dataModalPackagePrice.reusePrice || 0, // giá tái sử dụng
      vat: dataModalPackagePrice.vat || 0, // thuế
      id: dataModalPackagePrice.id || 0,
    },
    shouldUnregister: false,
  })
  const onSubmit: SubmitHandler<IFormPackagePriceInput> = async (data: IFormPackagePriceInput) => {
    try {
      if (data.id) {
        await packagePriceEditAPIByID(data)
        ToastSuccess('Bạn đã cập nhật thành công')
      } else {
        await packagePriceCreatedAPI(data)
        ToastSuccess('Bạn đã tạo mới thành công')
      }
      dispath(packagesPrice())
      setDataModalPackagePrice && setDataModalPackagePrice({})
      setShowModalPackagePrice && setShowModalPackagePrice(false)
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

  const IsolateReRenderPriceTotalNew: any = ({control}: any) => {
    const data: any = useWatch({
      control,
      name: ['price', 'vat', 'laborCost'],
    })
    let pri: any = data[0] * (1 + data[1] / 100) + data[2]
    return (
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text className={`group-text ${errors?.total_price_new && 'border-danger'}`}>
              Giá dịch vụ (đã có VAT)
            </InputGroup.Text>
            <NumericFormat
              value={pri}
              className={`text-dark ${errors?.total_price_new && 'border-danger'} form-control`}
              onBlur={onBlur}
              onChange={onChange}
              allowLeadingZeros
              thousandSeparator=','
              disabled
              decimalScale={0}
            />
            <InputGroup.Text className={`${errors?.total_price_new && 'border-danger'}`}>
              VND
            </InputGroup.Text>
          </InputGroup>
        )}
        name='total_price_new'
      />
    )
  }

  const IsolateReRenderPriceTotalReuse: any = ({control}: any) => {
    const data: any = useWatch({
      control,
      name: ['reusePrice', 'vat', 'laborCost'],
    })
    let pri: any = data[0] * (1 + data[1] / 100) + data[2]
    return (
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <InputGroup className='mb-3'>
            <InputGroup.Text
              className={`group-text ${errors?.total_price_reuse && 'border-danger'}`}
            >
              Giá dịch vụ hàng tài sử dụng (đã có VAT)
            </InputGroup.Text>
            <NumericFormat
              value={pri}
              className={`text-dark ${errors?.total_price_reuse && 'border-danger'} form-control`}
              onBlur={onBlur}
              onChange={onChange}
              allowLeadingZeros
              thousandSeparator=','
              disabled
              decimalScale={0}
            />
            <InputGroup.Text className={`${errors?.total_price_reuse && 'border-danger'}`}>
              VND
            </InputGroup.Text>
          </InputGroup>
        )}
        name='total_price_reuse'
      />
    )
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
                      Loại đóng gói
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.name && 'border-danger'}`}
                      aria-size='Default'
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
                    <InputGroup.Text className={`group-text ${errors?.size && 'border-danger'}`}>
                      Kích thước
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.size && 'border-danger'}`}
                      aria-size='Default'
                      aria-describedby='inputGroup-sizing-default'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                  </InputGroup>
                )}
                name='size'
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.unit && 'border-danger'}`}>
                      Đơn vị
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.unit && 'border-danger'}`}
                      aria-size='Default'
                      aria-describedby='inputGroup-sizing-default'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                  </InputGroup>
                )}
                name='unit'
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.code && 'border-danger'}`}>
                      Mã loại đóng gói
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.code && 'border-danger'}`}
                      aria-size='Default'
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
                      className={`group-text ${errors?.reusePrice && 'border-danger'}`}
                    >
                      Giá hàng tái sử dụng
                    </InputGroup.Text>
                    <NumericFormat
                      value={value}
                      className={`text-dark ${errors?.reusePrice && 'border-danger'} form-control`}
                      onBlur={onBlur}
                      onValueChange={(values) => {
                        const {formattedValue, value, floatValue} = values
                        onChange(floatValue)
                      }}
                      allowLeadingZeros
                      thousandSeparator=','
                      decimalScale={0}
                    />
                    <InputGroup.Text className={`${errors?.reusePrice && 'border-danger'}`}>
                      VND
                    </InputGroup.Text>
                  </InputGroup>
                )}
                name='reusePrice'
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
                      className={`group-text ${errors?.laborCost && 'border-danger'}`}
                    >
                      Chi phí nhân công
                    </InputGroup.Text>
                    <NumericFormat
                      value={value}
                      className={`text-dark ${errors?.laborCost && 'border-danger'} form-control`}
                      onBlur={onBlur}
                      onValueChange={(values) => {
                        const {formattedValue, value, floatValue} = values
                        onChange(floatValue)
                      }}
                      allowLeadingZeros
                      thousandSeparator=','
                      decimalScale={0}
                    />
                    <InputGroup.Text className={`${errors?.laborCost && 'border-danger'}`}>
                      VND
                    </InputGroup.Text>
                  </InputGroup>
                )}
                name='laborCost'
              />

              <IsolateReRenderPriceTotalNew control={control} />
              <IsolateReRenderPriceTotalReuse control={control} />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.note && 'border-danger'}`}>
                      Note
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.note && 'border-danger'}`}
                      aria-size='Default'
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
                dataModalPackagePrice.id ? 'Cập nhật' : 'Tạo mới'
              } ${props.title}`}</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ModalShowAndAddPackagePrice
