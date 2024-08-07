import {useEffect} from 'react'
import {useForm, SubmitHandler, Controller} from 'react-hook-form'
import {InputGroup, Button, Form} from 'react-bootstrap'
import Select from 'react-select'
import {IFormProvinceInput} from './interface'
import ToastError, {ToastSuccess} from '../../../_metronic/helpers/crud-helper/Toast'
import {provinceCreatedAPI, provinceEditAPIByID} from '../../../apis/provinceAPI'
import {usePageData} from '../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import {regionAPIGetAll} from '../../../apis/regionAPI'
import {region_priceAPIGetAll} from '../../../apis/region-priceAPI'

type Props = {
  title: string,
  refreshData?: any,
  handleClose?: any,
}


const ModalShowAndAddProvince = (props: Props) => {
  const intl = useIntl()
  const {
    setListRegions,
    dataModalProvince,
    listRegions,
    listRegion_Freight_Prices,
    setListRegion_Freight_Prices,
  } = usePageData()
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<any>({
    mode: 'all',
    defaultValues: {
      code: dataModalProvince.code || '',
      name: dataModalProvince.name || '',
      km: dataModalProvince.km || 0,
      licensePlateCode: dataModalProvince.licensePlateCode || '',
      routeCode: dataModalProvince.routeCode || 'code',
      region: dataModalProvince.region || 0,
      regionFreightPrice: dataModalProvince.regionFreightPrice || 0,
      id: dataModalProvince.id || 0,
    },
    shouldUnregister: false,
  })
  // get list Region
  const getListRegions = async () => {
    try {
      const response = await regionAPIGetAll()
      response.status === 'OK' && setListRegions && setListRegions(response?.data)
    } catch (error) {
      ToastError('Có lỗi xả ra!')
    }
  }
  // get list Region Freight Prices
  const getListRegion_Freight_Prices = async () => {
    try {
      const response = await region_priceAPIGetAll()
      response.status === 'OK' &&
        setListRegion_Freight_Prices &&
        setListRegion_Freight_Prices(response?.data)
    } catch (error) {
      ToastError('Có lỗi xả ra!')
    }
  }
  useEffect(() => {
    getListRegions()
    getListRegion_Freight_Prices()
  }, [])

  const onSubmit: SubmitHandler<IFormProvinceInput> = async (data: IFormProvinceInput) => {
    const provinceObjConvert = {
      ...data,
      region: {id: data.region.id || data.region},
      regionFreightPrice: {id: data.regionFreightPrice.id || data.regionFreightPrice},
    }

    try {
      if (provinceObjConvert.id) {
        await provinceEditAPIByID(provinceObjConvert)
        ToastSuccess('Bạn đã cập nhật thành công')
      } else {
        await provinceCreatedAPI(provinceObjConvert)
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
        <div className='card mb-5 p-5 pt-0 me-3'>
          <>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <InputGroup.Text className={`group-text ${errors?.name && 'border-danger'}`}>
                    Tỉnh
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
                    Mã tỉnh
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
                  <InputGroup.Text
                    className={`group-text ${errors?.licensePlateCode && 'border-danger'}`}
                  >
                    Mã biển số xe
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.licensePlateCode && 'border-danger'}`}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
              )}
              name='licensePlateCode'
            />
            <Controller
              control={control}
              rules={{
                required: true,
                min: 0.1,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <InputGroup.Text className={`group-text ${errors?.km && 'border-danger'}`}>
                    Khoảng cách BXMĐ
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.km && 'border-danger'}`}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                  <InputGroup.Text className={`${errors?.km && 'border-danger'}`}>
                    KM
                  </InputGroup.Text>
                </InputGroup>
              )}
              name='km'
            />

            <Controller
              control={control}
              rules={{
                required: true,
                min: 0.1,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <p className='fs-5 group-text align-content-center'>Khu vực</p>
                  <Select
                    className={`react-select-styled h-43 w-50 ${
                      errors?.region && 'rounded border border-danger'
                    }`}
                    classNamePrefix='react-select text-dark'
                    options={listRegions}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    placeholder='Chọn một Vùng'
                  />
                </InputGroup>
              )}
              name='region'
            />

            <Controller
              control={control}
              rules={{
                required: true,
                min: 0.1,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <p className='fs-5 group-text align-content-center'>Vùng</p>
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
          </>
        </div>
      </div>
      <div className='row'>
        <div className='col justify-content-end d-flex'>
          <div>
            <Button type='submit' className='btn btn-primary'>{`${
              dataModalProvince.id ? 'Cập nhật' : 'Tạo mới'
            } ${props.title}`}</Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ModalShowAndAddProvince
