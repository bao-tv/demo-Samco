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
  searchData?: string,
  setSearchData?: (_title: string) => void

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
  dataModalOrder?: any
  setDataModalOrder?: (_datas: any) => void
  showModalOrder?: any
  setShowModalOrder?: (_datas: any) => void

  showModalTaxRate?: any
  setShowModalTaxRate?: (_datas: any) => void
  dataModalTaxRate?: any
  setDataModalTaxRate?: (_datas: any) => void
  // listTaxRates?: any
  // setListTaxRates?: (_datas: any) => void
  gridRefTaxRateSetup?: any,

  showModalRegion?: any
  setShowModalRegion?: (_datas: any) => void
  dataModalRegion?: any
  setDataModalRegion?: (_datas: any) => void
  listRegions?: any
  setListRegions?: (_datas: any) => void
  gridRefRegionSetup?: any,

  showModalProvince?: any
  setShowModalProvince?: (_datas: any) => void
  dataModalProvince?: any
  setDataModalProvince?: (_datas: any) => void
  listProvinces?: any
  setListProvinces?: (_datas: any) => void
  gridRefProvinceSetup?: any,

  showModalDistrict?: any
  setShowModalDistrict?: (_datas: any) => void
  dataModalDistrict?: any
  setDataModalDistrict?: (_datas: any) => void
  listDistricts?: any
  setListDistricts?: (_datas: any) => void
  gridRefDistrictSetup?: any,

  showModalCommune?: any
  setShowModalCommune?: (_datas: any) => void
  dataModalCommune?: any
  setDataModalCommune?: (_datas: any) => void
  listCommunes?: any
  setListCommunes?: (_datas: any) => void
  gridRefCommuneSetup?: any,

  showModalRegion_Freight_Price?: any
  setShowModalRegion_Freight_Price?: (_datas: any) => void
  dataModalRegion_Freight_Price?: any
  setDataModalRegion_Freight_Price?: (_datas: any) => void
  listRegion_Freight_Prices?: any
  setListRegion_Freight_Prices?: (_datas: any) => void
  gridRefRegion_Freight_PriceSetup?: any,

  showModalRegion_Rate?: any
  setShowModalRegion_Rate?: (_datas: any) => void
  dataModalRegion_Rate?: any
  setDataModalRegion_Rate?: (_datas: any) => void
  listRegion_Rates?: any
  setListRegion_Rates?: (_datas: any) => void
  gridRefRegion_RateSetup?: any,

  showModalCBM_Rate?: any
  setShowModalCBM_Rate?: (_datas: any) => void
  dataModalCBM_Rate?: any
  setDataModalCBM_Rate?: (_datas: any) => void
  listCBM_Rates?: any
  setListCBM_Rates?: (_datas: any) => void
  gridRefCBM_RateSetup?: any,

  showModalPackagePrice?: any
  setShowModalPackagePrice?: (_datas: any) => void
  dataModalPackagePrice?: any
  setDataModalPackagePrice?: (_datas: any) => void
  gridRefPackagePriceSetup?: any,

  showModalPackageCBMPrice?: any
  setShowModalPackageCBMPrice?: (_datas: any) => void
  dataModalPackageCBMPrice?: any
  setDataModalPackageCBMPrice?: (_datas: any) => void
  listPackageCBMPrice?: any
  setListPackageCBMPrice?: (_datas: any) => void
  gridRefPackageCBMPriceSetup?: any,

  gridRefOrderSetup?: any
  setIsLoading?: any,
  isLoading?: any,
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => {},
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
  setPageDescription: (_description: string) => {},
  setRowDataOrder: (_datas: any) => {},
  setRowDataCouponReciept: (_datas: any) => {},
  setShowModalOrder: (_datas: any) => {},
  setIsLoading: (_datas: any) => boolean,
})

const PageDataProvider: FC<WithChildren> = ({children}) => {
  const [searchData, setSearchData] = useState<string>('')

  const [pageTitle, setPageTitle] = useState<string>('')
  const [pageDescription, setPageDescription] = useState<string>('')
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
  const [rowDataOrder, setRowDataOrder] = useState<any[]>([])
  const [rowDataCouponReciept, setRowDataCouponReciept] = useState<any>(false)
  const [dataModalOrder, setDataModalOrder] = useState<any>({})
  const [showModalOrder, setShowModalOrder] = useState<any>(false)

  const [showModalTaxRate, setShowModalTaxRate] = useState<any>(false)
  const [dataModalTaxRate, setDataModalTaxRate] = useState<any>({})
  // const [listTaxRates, setListTaxRates] = useState<any[]>([])
  const gridRefTaxRateSetup = useRef(null);

  const [showModalRegion, setShowModalRegion] = useState<any>(false)
  const [dataModalRegion, setDataModalRegion] = useState<any>({})
  const [listRegions, setListRegions] = useState<any[]>([])
  const gridRefRegionSetup = useRef(null);

  const [showModalProvince, setShowModalProvince] = useState<boolean>(false);
  const [dataModalProvince, setDataModalProvince] = useState<any>({})
  const [listProvinces, setListProvinces] = useState<any[]>([])
  const gridRefProvinceSetup = useRef<any>(null);

  const [showModalDistrict, setShowModalDistrict] = useState<any>(false)
  const [dataModalDistrict, setDataModalDistrict] = useState<any>({})
  const [listDistricts, setListDistricts] = useState<any[]>([])
  const gridRefDistrictSetup = useRef(null);

  const [showModalCommune, setShowModalCommune] = useState<any>(false)
  const [dataModalCommune, setDataModalCommune] = useState<any>({})
  const [listCommunes, setListCommunes] = useState<any[]>([])
  const gridRefCommuneSetup = useRef(null);

  const [showModalRegion_Freight_Price, setShowModalRegion_Freight_Price] = useState<any>(false)
  const [dataModalRegion_Freight_Price, setDataModalRegion_Freight_Price] = useState<any>({})
  const [listRegion_Freight_Prices, setListRegion_Freight_Prices] = useState<any[]>([])
  const gridRefRegion_Freight_PriceSetup = useRef(null);

  const [showModalRegion_Rate, setShowModalRegion_Rate] = useState<any>(false)
  const [dataModalRegion_Rate, setDataModalRegion_Rate] = useState<any>({})
  const [listRegion_Rates, setListRegion_Rates] = useState<any[]>([])
  const gridRefRegion_RateSetup = useRef(null);

  const [showModalCBM_Rate, setShowModalCBM_Rate] = useState<any>(false)
  const [dataModalCBM_Rate, setDataModalCBM_Rate] = useState<any>({})
  const [listCBM_Rates, setListCBM_Rates] = useState<any[]>([])
  const gridRefCBM_RateSetup = useRef(null);

  const [showModalPackagePrice, setShowModalPackagePrice] = useState<boolean>(false);
  const [dataModalPackagePrice, setDataModalPackagePrice] = useState<any>({})
  const gridRefPackagePriceSetup = useRef<any>(null);

  const [showModalPackageCBMPrice, setShowModalPackageCBMPrice] = useState<boolean>(false);
  const [dataModalPackageCBMPrice, setDataModalPackageCBMPrice] = useState<any>({})
  const [listPackageCBMPrice, setListPackageCBMPrice] = useState<any>([])
  const gridRefPackageCBMPriceSetup = useRef<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const gridRefOrderSetup = useRef(null);

  const value: PageDataContextModel = {
    searchData,
    setSearchData,

    gridRefOrderSetup,
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
    dataModalOrder,
    setDataModalOrder,
    showModalOrder,
    setShowModalOrder,

    showModalTaxRate,
    setShowModalTaxRate,
    dataModalTaxRate,
    setDataModalTaxRate,
    // listTaxRates,
    // setListTaxRates,
    gridRefTaxRateSetup,

    showModalRegion,
    setShowModalRegion,
    dataModalRegion,
    setDataModalRegion,
    listRegions,
    setListRegions,
    gridRefRegionSetup,

    showModalProvince,
    setShowModalProvince,
    dataModalProvince,
    setDataModalProvince,
    listProvinces,
    setListProvinces,
    gridRefProvinceSetup,

    showModalDistrict,
    setShowModalDistrict,
    dataModalDistrict,
    setDataModalDistrict,
    listDistricts,
    setListDistricts,
    gridRefDistrictSetup,

    showModalCommune,
    setShowModalCommune,
    dataModalCommune,
    setDataModalCommune,
    listCommunes,
    setListCommunes,
    gridRefCommuneSetup,

    showModalRegion_Freight_Price,
    setShowModalRegion_Freight_Price,
    dataModalRegion_Freight_Price,
    setDataModalRegion_Freight_Price,
    listRegion_Freight_Prices,
    setListRegion_Freight_Prices,
    gridRefRegion_Freight_PriceSetup,

    showModalRegion_Rate,
    setShowModalRegion_Rate,
    dataModalRegion_Rate,
    setDataModalRegion_Rate,
    listRegion_Rates,
    setListRegion_Rates,
    gridRefRegion_RateSetup,

    showModalCBM_Rate,
    setShowModalCBM_Rate,
    dataModalCBM_Rate,
    setDataModalCBM_Rate,
    listCBM_Rates,
    setListCBM_Rates,
    gridRefCBM_RateSetup,

    gridRefPackagePriceSetup,
    showModalPackagePrice,
    setShowModalPackagePrice,
    dataModalPackagePrice,
    setDataModalPackagePrice,

    gridRefPackageCBMPriceSetup,
    showModalPackageCBMPrice,
    setShowModalPackageCBMPrice,
    dataModalPackageCBMPrice,
    setDataModalPackageCBMPrice,
    listPackageCBMPrice,
    setListPackageCBMPrice,
    
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
