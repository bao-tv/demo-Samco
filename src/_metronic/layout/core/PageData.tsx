/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, createContext, useContext, useEffect, useState, useRef} from 'react'
import {WithChildren} from '../../helpers'

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
  gridRef?: any
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => {},
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
  setPageDescription: (_description: string) => {},
  setRowDataOrder: (_datas: any) => {},
  setRowDataCouponReciept: (_datas: any) => {},
  setShowCreateAppModal: (_datas: any) => {},
})

const PageDataProvider: FC<WithChildren> = ({children}) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  const [pageDescription, setPageDescription] = useState<string>('')
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
  const [rowDataOrder, setRowDataOrder] = useState<any[]>([])
  const [rowDataCouponReciept, setRowDataCouponReciept] = useState<any>(false)
  const [showCreateAppModal, setShowCreateAppModal] = useState<any>(false)
  const gridRef = useRef(null);
  const value: PageDataContextModel = {
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
