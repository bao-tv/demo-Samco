import {useForm, SubmitHandler, Controller} from 'react-hook-form'
import {InputGroup, Button, Form} from 'react-bootstrap'
import {IFormRegionsInput} from './interface'
import ToastError, {ToastSuccess} from '../../../_metronic/helpers/crud-helper/Toast'
import {usePageData} from '../../../_metronic/layout/core'
import {useSelector} from 'react-redux'
import {useIntl} from 'react-intl'
import Select from 'react-select'
import {districtCreatedAPI, districtEditAPIByID} from '../../../apis/districtAPI'
import {regionAPIGetAll} from '../../../apis/regionAPI'
import {useEffect} from 'react'
import {region_priceCreatedAPI, region_priceEditAPIByID} from '../../../apis/region-priceAPI'

type Props = {}

const ModalShowAndAdd_Region_Freight_Price = (props: any) => {
  const intl = useIntl()
  const {
    dataModalRegion_Freight_Price,
    setShowModalRegion_Freight_Price,
    setDataModalRegion_Freight_Price,
    listRegions,
    setListRegions,
  } = usePageData()
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<any>({
    mode: 'all',
    defaultValues: {
      code: dataModalRegion_Freight_Price.code || '',
      name: dataModalRegion_Freight_Price.name || '',
      deliveryTime: dataModalRegion_Freight_Price.deliveryTime || '',
      discount: dataModalRegion_Freight_Price.discount || '',
      proposal: dataModalRegion_Freight_Price.proposal || '',
      label: dataModalRegion_Freight_Price.label || '',
      region: dataModalRegion_Freight_Price.region || 0,
      id: dataModalRegion_Freight_Price.id || 0,
    },
    shouldUnregister: false,
  })

  // const {listProvince} = useSelector((state: any) => state.provinces)
  // get list Region
  const getListRegions = async () => {
    try {
      const response = await regionAPIGetAll()
      response.status === 'OK' && setListRegions && setListRegions(response?.data)
    } catch (error) {
      ToastError('Có lỗi xả ra!')
    }
  }
  useEffect(() => {
    getListRegions()
  }, [])
  const onSubmit: SubmitHandler<IFormRegionsInput> = async (data: IFormRegionsInput) => {
    const region_priceObjConvert = {
      ...data,
      province: {id: data.region.id || data.region},
    }
    try {
      if (region_priceObjConvert.id) {
        await region_priceEditAPIByID(region_priceObjConvert)
        ToastSuccess('Bạn đã cập nhật thành công')
      } else {
        await region_priceCreatedAPI(region_priceObjConvert)
        ToastSuccess('Bạn đã tạo mới thành công')
      }
      props.refreshData()
      setDataModalRegion_Freight_Price && setDataModalRegion_Freight_Price({})
      setShowModalRegion_Freight_Price && setShowModalRegion_Freight_Price(false)
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
                    Tên giá cước theo KG
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
                    Mã giá cước theo KG
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
                    className={`group-text ${errors?.deliveryTime && 'border-danger'}`}
                  >
                    Thời gian dự kiến giao
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.deliveryTime && 'border-danger'}`}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
              )}
              name='deliveryTime'
            />

            <Controller
              control={control}
              rules={{
                required: true,
                min: 0.01,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <InputGroup.Text className={`group-text ${errors?.label && 'border-danger'}`}>
                    Bước nhảy giá
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.label && 'border-danger'}`}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
              )}
              name='label'
            />
            <Controller
              control={control}
              // rules={{
              //   required: true,
              //   min: 0.1,
              // }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <p className='fs-5 group-text align-content-center'>Thuộc Khu vực</p>
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
                    placeholder='Chọn một Khu vực'
                  />
                </InputGroup>
              )}
              name='region'
            />
            <Controller
              control={control}
              // rules={{
              //   required: true,
              // }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <InputGroup.Text className={`group-text ${errors?.discount && 'border-danger'}`}>
                    Mức giảm
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.discount && 'border-danger'}`}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                  <InputGroup.Text
                    className={`${errors?.discount && 'border-danger'}`}
                    style={{padding: '0.75rem 1.45rem'}}
                  >
                    %
                  </InputGroup.Text>
                </InputGroup>
              )}
              name='discount'
            />

            <Controller
              control={control}
              // rules={{
              //   required: true,
              // }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputGroup className='mb-3'>
                  <InputGroup.Text className={`group-text ${errors?.proposal && 'border-danger'}`}>
                    Đề xuất
                  </InputGroup.Text>
                  <Form.Control
                    className={`text-dark ${errors?.proposal && 'border-danger'}`}
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                </InputGroup>
              )}
              name='proposal'
            />
          </>
        </div>
      </div>
      <div className='row'>
        <div className='col justify-content-end d-flex'>
          <div>
            <Button type='submit' className='btn btn-primary'>{`${
              dataModalRegion_Freight_Price.id ? 'Cập nhật' : 'Tạo mới'
            } ${props.title}`}</Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ModalShowAndAdd_Region_Freight_Price
