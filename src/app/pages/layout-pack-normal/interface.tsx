import {ColDef} from 'ag-grid-community'
import ButtonActionEdit_Delete from '../../../_metronic/helpers/components/ButtonActionEdit_Delete'
import {usePageData} from '../../../_metronic/layout/core'
import {useState} from 'react'
import ToastError, {ToastSuccess} from '../../../_metronic/helpers/crud-helper/Toast'
import {useDispatch} from 'react-redux'
import ModalToasts from '../../../_metronic/helpers/components/ModalToasts'
import {useIntl} from 'react-intl'
import {packagePriceAPIDeleteById} from '../../../apis/packagePriceAPI'
import {packagesPrice} from '../../../slices/packagePriceSlice'

const ButtonActionPackge = (props: any) => {
  const intl = useIntl()
  const dispath = useDispatch()
  const {setDataModalPackagePrice, setShowModalPackagePrice} = usePageData()
  const handleEditRow = () => {
    setDataModalPackagePrice && setDataModalPackagePrice(props?.data)
    setShowModalPackagePrice && setShowModalPackagePrice(true)
  }
  const [titlePackagePrice, setTitlePackagePrice] = useState<any>('')
  const handleRemoveRow = () => {
    setTitlePackagePrice(
      `Bạn có muốn xóa ${intl.formatMessage({id: 'MENU.DONGGOI'})} ${props?.data?.label}`
    )
  }
  const buttonOK = async () => {
    try {
      const response = props?.data?.id && (await packagePriceAPIDeleteById(props?.data?.id))
      response.status === 'OK' && ToastSuccess('Bạn đã xóa thành công!')
      dispath(packagesPrice())
    } catch (err) {
      ToastError('Bạn xóa không thành công!')
    }
  }
  return (
    <>
      <ButtonActionEdit_Delete handleEditRow={handleEditRow} handleRemoveRow={handleRemoveRow} />
      <ModalToasts
        title={titlePackagePrice}
        onClickOK={buttonOK}
        handleClose={() => setTitlePackagePrice('')}
      />
    </>
  )
}

const ServiceNew = (props: any) => {
  const pri = props?.data?.price * (1 + props?.data?.v1Price / 100) + props?.data?.laborCost
  return pri
}

const ServiceReuse = (props: any) => {
  const pri = props?.data?.reusePrice * (1 + props?.data?.v1Price / 100) + props?.data?.laborCost
  return pri
}

export const columnDefsPackagePriceSetupPage: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    width: 60,
  },
  {
    headerName: 'Hành động',
    cellRenderer: ButtonActionPackge,
    width: 150,
  },
  {
    headerName: 'Mã',
    field: 'code',
    width: 100,
  },
  {
    headerName: 'Loại đóng gói',
    field: 'name',
    width: 200,
  },
  {
    headerName: 'Kích thước',
    field: 'size',
    width: 150,
  },
  {
    headerName: 'Đơn vị',
    field: 'unit',
    width: 150,
  },
  {
    headerName: 'Giá',
    field: 'price',
    width: 150,
  },
  {
    headerName: 'Giá hàng tái chế',
    field: 'reusePrice',
    width: 150,
  },
  {
    headerName: 'Thuế(%)',
    field: 'vat',
    width: 150,
  },
  {
    headerName: 'Giá dịch vụ mới',
    cellRenderer: ServiceNew,
    width: 150,
  },
  {
    headerName: 'Giá dịch vụ tái chế',
    cellRenderer: ServiceReuse,
    width: 150,
  },
  {
    headerName: 'Chi phí nhân công',
    field: 'price',
    width: 150,
  },
  {
    headerName: 'Note',
    field: 'note',
    width: 150,
  },
]

export interface IFormPackagePriceInput {
  code?: string
  size: string
  name: string
  unit: string
  note: string
  discount: number
  price: number
  laborCost: number
  reusePrice: number
  vat: number
  id: number
}
