import {useForm, SubmitHandler, Controller} from 'react-hook-form'
import {InputGroup, Button, Form} from 'react-bootstrap'
import {IFormPackageInput} from './interface'
import { useThemeMode } from '../../../_metronic/partials'
import ToastError, { ToastSuccess } from '../../../_metronic/helpers/crud-helper/Toast';
import { usePageData } from '../../../_metronic/layout/core'
import { useDispatch } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import { packageCreatedAPI, packageEditAPIByID } from '../../../apis/packageAPI'
import { packages } from '../../../slices/packSlices'

const ModalShowAndAddPackage = (props: any) => {
  const {setShowModalPackage, dataModalPackage, setDataModalPackage} = usePageData();
  const dispath = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<any>({
    mode: 'all',
    defaultValues: {
      label: dataModalPackage.label || '',
      packagingName: dataModalPackage.packagingName || '',
      price: dataModalPackage.price || 0,
      uom: dataModalPackage.uom || '',
      value: dataModalPackage.value || '',
      id: dataModalPackage.id || 0,
     },
    shouldUnregister: false,
  })
  const onSubmit: SubmitHandler<IFormPackageInput> = async(data: IFormPackageInput) =>{
    console.log('bao data: ', data)
    try{
      if(data.id) {
        await packageEditAPIByID(data);
        ToastSuccess("Bạn đã cập nhật thành công");
      } else {
        await packageCreatedAPI(data);
        ToastSuccess("Bạn đã tạo mới thành công");
      }
      dispath(packages());
      setDataModalPackage && setDataModalPackage({});
      setShowModalPackage && setShowModalPackage(false);
    }catch (err) {
    ToastError("Có lỗi xảy ra!");

    }
    reset();
  }
  const onErrors = async (e: any) => {
    if (Object.keys(e).length) {
      ToastError("Bạn nhập thiếu thông tin!");
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
                    <InputGroup.Text className={`group-text ${errors?.label && 'border-danger'}`}>
                      Loại đóng gói
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
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.packagingName && 'border-danger'}`}>
                      Tên viết tắt
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.packagingName && 'border-danger'}`}
                      aria-label='Default'
                      aria-describedby='inputGroup-sizing-default'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                  </InputGroup>
                )}
                name='packagingName'
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.value && 'border-danger'}`}>
                      Mã loại đóng gói
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.value && 'border-danger'}`}
                      aria-label='Default'
                      aria-describedby='inputGroup-sizing-default'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                  </InputGroup>
                )}
                name='value'
              />

              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup className="mb-3">
                    <InputGroup.Text className={`group-text ${errors?.price && 'border-danger'}`}>
                        Giá
                    </InputGroup.Text>
                    <NumericFormat
                        value={value}
                        className={`text-dark ${errors?.price && 'border-danger'} form-control`}
                        onBlur={onBlur}
                        onChange={onChange}
                        allowLeadingZeros thousandSeparator=","
                        decimalScale={0}
                    />
                    <InputGroup.Text className={`${errors?.price && 'border-danger'}`}>VND</InputGroup.Text>
                </InputGroup>
                )}
                name='price'
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputGroup className='mb-3'>
                    <InputGroup.Text className={`group-text ${errors?.uom && 'border-danger'}`}>
                      Đơn vị tính
                    </InputGroup.Text>
                    <Form.Control
                      className={`text-dark ${errors?.uom && 'border-danger'}`}
                      aria-label='Default'
                      aria-describedby='inputGroup-sizing-default'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                  </InputGroup>
                )}
                name='uom'
              />
            </>
          </div>
        </div>
        <div className='row'>
          <div className='col justify-content-end d-flex'>
            <div>
              <Button type="submit" className="btn btn-primary">{`${dataModalPackage.id ? "Cập nhật" : "Tạo mới"} ${props.title}`}</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ModalShowAndAddPackage

