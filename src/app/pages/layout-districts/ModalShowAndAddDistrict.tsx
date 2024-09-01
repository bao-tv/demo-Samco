import {useForm, SubmitHandler, Controller} from 'react-hook-form'
import {InputGroup, Button, Form} from 'react-bootstrap'
import {IFormDistrictsInput, PropsModalShowAndAddDistrict} from './interface'
import ToastError, {ToastSuccess} from '../../../_metronic/helpers/crud-helper/Toast'
import {usePageData} from '../../../_metronic/layout/core'
import {useSelector} from 'react-redux'
import Select from 'react-select'
import {districtCreatedAPI, districtEditAPIByID} from '../../../apis/districtAPI'

const ModalShowAndAddDistrict = (props: PropsModalShowAndAddDistrict) => {
  const {dataModalDistrict} = usePageData()
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<IFormDistrictsInput>({
    mode: 'all',
    defaultValues: {
      code: dataModalDistrict.code || '',
      name: dataModalDistrict.name || '',
      province: dataModalDistrict.province || 0,
      id: dataModalDistrict.id || 0,
    },
    shouldUnregister: false,
  })

  const {listProvinceLite} = useSelector((state: any) => state.provinceLites)
  const onSubmit: SubmitHandler<IFormDistrictsInput> = async (data: IFormDistrictsInput) => {
    const districtObjConvert = {
      ...data,
      province: {id: data.province.id || data.province},
    }
    try {
      if (districtObjConvert.id) {
        await districtEditAPIByID(districtObjConvert)
        ToastSuccess('Bạn đã cập nhật thành công')
      } else {
        await districtCreatedAPI(districtObjConvert)
        ToastSuccess('Bạn đã tạo mới thành công')
      }
      props.refreshData();
      props.handleClose();
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
    <form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <div className='row'>
        <div className=' card mb-5 p-5 pt-0 me-3'>
          <>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <InputGroup.Text className={`group-text ${errors?.name && 'border-danger'}`}>
                    Huyện
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
                    Mã Huyện
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
                min: 0.1,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <p className='fs-5 group-text align-content-center'>Thuộc Tỉnh</p>
                  <Select
                    className={`react-select-styled h-43 w-50 ${
                      errors?.province && 'rounded border border-danger'
                    }`}
                    classNamePrefix='react-select text-dark'
                    options={listProvinceLite}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    placeholder='Chọn một Tỉnh/Thành phố'
                  />
                </InputGroup>
              )}
              name='province'
            />
          </>
        </div>
      </div>
      <div className='row'>
        <div className='col justify-content-end d-flex'>
          <div>
            <Button type='submit' className='btn btn-primary'>{`${
              dataModalDistrict.id ? 'Cập nhật' : 'Tạo mới'
            } ${props.title}`}</Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ModalShowAndAddDistrict
