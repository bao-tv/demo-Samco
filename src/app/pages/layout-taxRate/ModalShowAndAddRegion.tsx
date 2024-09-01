import {useForm, SubmitHandler, Controller} from 'react-hook-form'
import {InputGroup, Button, Form} from 'react-bootstrap'
import {IFormTaxRateRateInput} from './interface'
import ToastError, {ToastSuccess} from '../../../_metronic/helpers/crud-helper/Toast'
import {usePageData} from '../../../_metronic/layout/core'
import {taxRateCreatedAPI, taxRateEditAPIByID} from '../../../apis/taxRateAPI'
import { useDispatch } from 'react-redux'
import { taxRate } from '../../../slices/taxRateSlices'

type Props = {
  title: string
  refreshData?: any
  handleClose?: any
}

const ModalShowAndAddTaxRate = (props: Props) => {
  const {dataModalTaxRate} = usePageData()
  const dispath = useDispatch()
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<any>({
    mode: 'all',
    defaultValues: {
      code: dataModalTaxRate.code || '',
      name: dataModalTaxRate.name || '',
      tax: dataModalTaxRate.tax || '',
      id: dataModalTaxRate.id || 0,
    },
    shouldUnregister: false,
  })
  const onSubmit: SubmitHandler<IFormTaxRateRateInput> = async (data: IFormTaxRateRateInput) => {
    const objectConvert = {...data, provinces: [], prices: []}
    try {
      if (data.id) {
        await taxRateEditAPIByID(objectConvert)
        ToastSuccess('Bạn đã cập nhật thành công')
      } else {
        await taxRateCreatedAPI(objectConvert)
        ToastSuccess('Bạn đã tạo mới thành công')
      }
      dispath( taxRate());
      props.handleClose()
    } catch (err) {
      ToastError('Có lỗi xảy ra!')
    }
    reset()
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
                    <InputGroup.Text className={`group-text ${errors?.code && 'border-danger'}`}>
                      Mã thuế suất
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
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.name && 'border-danger'}`}>
                      Tên thuế suất
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
                    <InputGroup.Text className={`group-text ${errors?.taxRate && 'border-danger'}`}>
                      Thuế suất
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.taxRate && 'border-danger'}`}
                      aria-label='Default'
                      aria-describedby='inputGroup-sizing-default'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                    <InputGroup.Text className={`group-text ${errors?.taxRate && 'border-danger'}`}>
                      %
                    </InputGroup.Text>
                  </InputGroup>
                )}
                name='tax'
              />
            </>
          </div>
        </div>
        <div className='row'>
          <div className='col justify-content-end d-flex'>
            <div>
              <Button type='submit' className='btn btn-primary'>{`${
                dataModalTaxRate.id ? 'Cập nhật' : 'Tạo mới'
              } ${props.title}`}</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ModalShowAndAddTaxRate
