/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, createContext, useContext, useEffect, useState, useRef} from 'react'
import {WithChildren} from '../../helpers'
import { boolean } from 'yup'

export interface PageLink {
  title: string
  path: string
  isActive: boolean
  isSeparator?: boolean
}

export interface PageDataContextModel {
  pageTitle?: string
  setPageTitle: (_title: string) => void
  pageDescription?: string
  setPageDescription: (_description: string) => void
  pageBreadcrumbs?: Array<PageLink>
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void
  rowDataOrder?: any[]
  setRowDataOrder?: (_datas: any) => void
  rowDataCouponReciept?: any
  setRowDataCouponReciept?: (_datas: any) => void
  showCreateAppModal?: any
  setShowCreateAppModal?: (_datas: any) => void

  showModalDistance?: any
  setShowModalDistance?: (_datas: any) => void
  dataModalDistance?: any
  setDataModalDistance?: (_datas: any) => void
  showModalDistancePriceObject?: any
  setShowModalDistancePriceObject?: (_datas: any) => void
  dataModalDistancePriceObject?: any
  setDataModalDistancePriceObject?: (_datas: any) => void
  gridRefDistanceSetup?: any,
  gridRefDistanPriceObjectSetup?: any,

  showModalProvince?: any
  setShowModalProvince?: (_datas: any) => void
  dataModalProvince?: any
  setDataModalProvince?: (_datas: any) => void
  showModalProvinceObject?: any
  setShowModalProvinceObject?: (_datas: any) => void
  dataModalProvinceObject?: any
  setDataModalProvinceObject?: (_datas: any) => void
  gridRefProvinceSetup?: any,
  gridRefProvinceObjectSetup?: any,

  showModalPackage?: any
  setShowModalPackage?: (_datas: any) => void
  dataModalPackage?: any
  setDataModalPackage?: (_datas: any) => void
  gridRefPackageSetup?: any,

  gridRef?: any
  setIsLoading?: any,
  isLoading?: any,
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => {},
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
  setPageDescription: (_description: string) => {},
  setRowDataOrder: (_datas: any) => {},
  setRowDataCouponReciept: (_datas: any) => {},
  setShowCreateAppModal: (_datas: any) => {},
  setIsLoading: (_datas: any) => boolean,
})

const PageDataProvider: FC<WithChildren> = ({children}) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  const [pageDescription, setPageDescription] = useState<string>('')
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
  const [rowDataOrder, setRowDataOrder] = useState<any[]>([])
  const [rowDataCouponReciept, setRowDataCouponReciept] = useState<any>(false)
  const [showCreateAppModal, setShowCreateAppModal] = useState<any>(false)

  const [showModalDistance, setShowModalDistance] = useState<any>(false)
  const [dataModalDistance, setDataModalDistance] = useState<any>({})
  const [showModalDistancePriceObject, setShowModalDistancePriceObject] = useState<boolean>(false);
  const [dataModalDistancePriceObject, setDataModalDistancePriceObject] = useState<any>({})
  const gridRefDistanceSetup = useRef(null);
  const gridRefDistancePricebjectSetup= useRef(null);


  const [showModalProvince, setShowModalProvince] = useState<boolean>(false);
  const [dataModalProvince, setDataModalProvince] = useState<any>({})
  const [showModalProvinceObject, setShowModalProvinceObject] = useState<boolean>(false);
  const [dataModalProvinceObject, setDataModalProvinceObject] = useState<any>({})
  const gridRefProvinceSetup = useRef<any>(null);
  const gridRefProvinceObjectSetup= useRef(null);

  const [showModalPackage, setShowModalPackage] = useState<boolean>(false);
  const [dataModalPackage, setDataModalPackage] = useState<any>({})
  const gridRefPackageSetup = useRef<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const gridRef = useRef(null);

  const value: PageDataContextModel = {
    gridRefDistanceSetup,
    gridRefProvinceSetup,
    gridRefProvinceObjectSetup,
    gridRefPackageSetup,
    gridRef,
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription,
    pageBreadcrumbs,
    setPageBreadcrumbs,
    rowDataOrder,
    setRowDataOrder,
    rowDataCouponReciept,
    setRowDataCouponReciept,
    showCreateAppModal,
    setShowCreateAppModal,

    showModalDistance,
    setShowModalDistance,
    dataModalDistance,
    setDataModalDistance,
    showModalDistancePriceObject,
    setShowModalDistancePriceObject,
    dataModalDistancePriceObject,
    setDataModalDistancePriceObject,

    showModalProvince,
    setShowModalProvince,
    dataModalProvince,
    setDataModalProvince,
    showModalProvinceObject,
    setShowModalProvinceObject,
    dataModalProvinceObject,
    setDataModalProvinceObject,

    showModalPackage,
    setShowModalPackage,
    dataModalPackage,
    setDataModalPackage,
    
    setIsLoading,
    isLoading,
  }
  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
  return useContext(PageDataContext)
}

type Props = {
  description?: string
  breadcrumbs?: Array<PageLink>
}

const PageTitle: FC<Props & WithChildren> = ({children, description, breadcrumbs}) => {
  const {setPageTitle, setPageDescription, setPageBreadcrumbs} = usePageData()
  useEffect(() => {
    if (children) {
      setPageTitle(children.toString())
    }
    return () => {
      setPageTitle('')
    }
  }, [children])

  useEffect(() => {
    if (description) {
      setPageDescription(description)
    }
    return () => {
      setPageDescription('')
    }
  }, [description])

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs)
    }
    return () => {
      setPageBreadcrumbs([])
    }
  }, [breadcrumbs])

  return <></>
}

const PageDescription: FC<WithChildren> = ({children}) => {
  const {setPageDescription} = usePageData()
  useEffect(() => {
    if (children) {
      setPageDescription(children.toString())
    }
    return () => {
      setPageDescription('')
    }
  }, [children])
  return <></>
}

export {PageDescription, PageTitle, PageDataProvider, usePageData}
