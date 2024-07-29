import {useForm, SubmitHandler, Controller} from 'react-hook-form'
import {InputGroup, Button, Form} from 'react-bootstrap'
import {IFormCBMsInput} from './interface'
import ToastError, {ToastSuccess} from '../../../_metronic/helpers/crud-helper/Toast'
import {usePageData} from '../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import Select from 'react-select'
import {useEffect} from 'react'
import {cbm_rateCreatedAPI, cbm_rateEditAPIByID} from '../../../apis/cbm-rateAPI'
import { region_priceAPIGetAll } from '../../../apis/region-priceAPI'

const ModalShowAndAdd_CBM_Rate = (props: any) => {
  const intl = useIntl()
  const {
    dataModalCBM_Rate,
    listRegion_Freight_Prices,
    setListRegion_Freight_Prices,
  } = usePageData();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<any>({
    mode: 'all',
    defaultValues: {
      fromVolume: dataModalCBM_Rate.fromVolume || 0,
      toVolume:  dataModalCBM_Rate.toVolume === null ? null : (dataModalCBM_Rate.toVolume || 0 ),
      price: dataModalCBM_Rate.price || 0,
      note: dataModalCBM_Rate.note || '',
      additionalPrice: dataModalCBM_Rate.additionalPrice,
      // additionalWeight: dataModalCBM_Rate.additionalWeight,
      regionFreightPrice: dataModalCBM_Rate.regionFreightPrice || {},
      id: dataModalCBM_Rate.id || 0,
    },
    shouldUnregister: false,
  })

  const getListCBMs = async () => {
    try {
      const response = await region_priceAPIGetAll()
      response.status === 'OK' && setListRegion_Freight_Prices && setListRegion_Freight_Prices(response?.data)
    } catch (error) {
      ToastError('Có lỗi xả ra!')
    }
  }
  useEffect(() => {
    getListCBMs()
  }, [])
  const onSubmit: SubmitHandler<IFormCBMsInput> = async (data: IFormCBMsInput) => {
    const cbm_rateObjConvert = {
      ...data,
      regionFreightPrice: {id: data.regionFreightPrice.id || data.regionFreightPrice},
      additionalPrice: data.additionalPrice ? 1 : 0,
      // additionalWeight: data.additionalWeight ? 1 : 0,
    }
    try {
      if (cbm_rateObjConvert.id) {
        await cbm_rateEditAPIByID(cbm_rateObjConvert)
        ToastSuccess('Bạn đã cập nhật thành công')
      } else {
        await cbm_rateCreatedAPI(cbm_rateObjConvert)
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
                  <InputGroup.Text className={`group-text ${errors?.fromVolume && 'border-danger'}`}>
                    CBM từ
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.fromVolume && 'border-danger'}`}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
              )}
              name='fromVolume'
            />
            <Controller
              control={control}
              rules={{
                // required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <InputGroup.Text className={`group-text ${errors?.toVolume && 'border-danger'}`}>
                    CBM đến
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.toVolume && 'border-danger'}`}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
              )}
              name='toVolume'
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <InputGroup.Text className={`group-text ${errors?.price && 'border-danger'}`}>
                    Giá
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.price && 'border-danger'}`}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
              )}
              name='price'
            />
            
            {/* <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => {
                return (
                  <InputGroup className='mb-3'>
                    <Form.Check // prettier-ignore
                      type='checkbox'
                      id='default-checkbox'
                      label='Giá tối đa'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      defaultChecked={value}
                    />
                  </InputGroup>
                )
              }
            }
              name='additionalWeight'
            /> */}
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => {
                return (
                  <InputGroup className='mb-3'>
                    <Form.Check // prettier-ignore
                      type='checkbox'
                      id='default-checkbox'
                      label='Giá loại lũy tiến'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      defaultChecked={value}
                    />
                  </InputGroup>
                )
              }
            }
              name='additionalPrice'
            />
            <Controller
              control={control}
              rules={{
                required: true,
                min: 0.1,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <p className='fs-5 group-text align-content-center'>Thuộc Khu vực</p>
                  <Select
                    className={`react-select-styled h-43 w-50 ${
                      errors?.regionFreightPrice && 'rounded border border-danger'
                    }`}
                    classNamePrefix='react-select text-dark'
                    options={listRegion_Freight_Prices}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    placeholder='Chọn một Khu vực'
                  />
                </InputGroup>
              )}
              name='regionFreightPrice'
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
              dataModalCBM_Rate.id ? 'Cập nhật' : 'Tạo mới'
            } ${props.title}`}</Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ModalShowAndAdd_CBM_Rate
