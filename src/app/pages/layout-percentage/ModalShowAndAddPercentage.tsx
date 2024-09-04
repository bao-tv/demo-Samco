import {useForm, SubmitHandler, Controller} from 'react-hook-form'
import {InputGroup, Button, Form} from 'react-bootstrap'
import {IFormPercentageInput} from './interface'
import ToastError, {ToastSuccess} from '../../../_metronic/helpers/crud-helper/Toast'
import {usePageData} from '../../../_metronic/layout/core'
import {deliveryConfigCreatedAPI, deliveryConfigEditAPIByID} from '../../../apis/deliveryConfigAPI'
import {useDispatch} from 'react-redux'
import {Percentage} from '../../../slices/percentageSlices'

type Props = {
  title: string
  refreshData?: any
  handleClose?: any
}

const ModalShowAndAddPercentage = (props: Props) => {
  const {dataModalPercentage} = usePageData()
  const dispath = useDispatch()
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<any>({
    mode: 'all',
    defaultValues: {
      code: dataModalPercentage.code || '',
      name: dataModalPercentage.name || '',
      percentage: dataModalPercentage.percentage || '',
      note: dataModalPercentage.note || '',
      id: dataModalPercentage.id || 0,
    },
    shouldUnregister: false,
  })
  const onSubmit: SubmitHandler<IFormPercentageInput> = async (data: IFormPercentageInput) => {
    const objectConvert = {...data, provinces: [], prices: []}
    try {
      if (data.id) {
        await deliveryConfigEditAPIByID(objectConvert)
        ToastSuccess('Bạn đã cập nhật thành công')
      } else {
        await deliveryConfigCreatedAPI(objectConvert)
        ToastSuccess('Bạn đã tạo mới thành công')
      }
      dispath(Percentage())
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
                      Mã Phí/Thuế
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.code && 'border-danger'}`}
                      aria-label='Default'
                      disabled={dataModalPercentage.id}
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
                      Tên Phí/Thuế
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
                    <InputGroup.Text
                      className={`group-text ${errors?.percentage && 'border-danger'}`}
                    >
                      Phí/Thuế
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.percentage && 'border-danger'}`}
                      aria-label='Default'
                      aria-describedby='inputGroup-sizing-default'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                    <InputGroup.Text
                      className={`group-text ${errors?.percentage && 'border-danger'}`}
                    >
                      %
                    </InputGroup.Text>
                  </InputGroup>
                )}
                name='percentage'
              />

              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.note && 'border-danger'}`}>
                      Ghi chí
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
                dataModalPercentage.id ? 'Cập nhật' : 'Tạo mới'
              } ${props.title}`}</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ModalShowAndAddPercentage
