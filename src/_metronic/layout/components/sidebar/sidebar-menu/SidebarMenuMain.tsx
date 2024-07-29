/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to='/thong-tin-chung'
        icon='element-11'
        title={intl.formatMessage({id: 'MENU.THONGTINCHUNG'})}
        fontIcon='bi-app-indicator'
      />
      {/* <SidebarMenuItem to='/builder' icon='switch' title={intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})} fontIcon='bi-layers' /> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Quản lý đơn hàng</span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/quan-ly-don-hang/don-hang'
        title='Đơn hàng'
        fontIcon='bi-archive'
        icon='bi fs-3 bi-archive'
      >
        <SidebarMenuItem
          to='/quan-ly-don-hang/don-hang/phieu-nhan-hang'
          title={intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/quan-ly-don-hang/don-hang/phieu-nhan-hang-da-xoa'
          title={intl.formatMessage({id: 'MENU.PHIEUNHANHANGDAXOA'})}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/quan-ly-don-hang/bao-cao'
        title='Báo cáo'
        icon='bi fs-3 bi-clipboard2-data'
        fontIcon='bi-person'
      >
        <SidebarMenuItem
          to='/quan-ly-don-hang/bao-cao/ket-ca'
          title={intl.formatMessage({id: 'MENU.KETCA'})}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/quan-ly-don-hang/bao-cao/bao-cao'
          title={intl.formatMessage({id: 'MENU.BAOCAO'})}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Quản lý kho</span>
        </div>
      </div>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            {intl.formatMessage({id: 'MENU.THONGDAUVAO'})}
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/dinh-nghia'
        title={intl.formatMessage({id: 'MENU.VITRI'})}
        fontIcon='bi-chat-left'
        icon='bi bi-geo-alt'
      >
        <SidebarMenuItem
          icon='bi bi-pin-map'
          to='/dinh-nghia/vi-tri/khu-vuc'
          title={intl.formatMessage({id: 'MENU.KHUVUC'})}
        />
        <SidebarMenuItem
          icon='bi bi-map'
          to='/dinh-nghia/vi-tri/tinh'
          title={intl.formatMessage({id: 'MENU.TINHNHANHANG'})}
        />
        <SidebarMenuItem
          icon='bi bi-compass'
          to='/dinh-nghia/vi-tri/huyen'
          title={intl.formatMessage({id: 'MENU.HUYENNHANHANG'})}
        />
        <SidebarMenuItem
          icon='bi bi-crosshair'
          to='/dinh-nghia/vi-tri/xa'
          title={intl.formatMessage({id: 'MENU.XANHANHANG'})}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to='/dinh-nghia/gia'
        title={intl.formatMessage({id: 'MENU.GIACUOCTHEOKG'})}
        fontIcon='bi-chat-left'
        icon='bi bi-cash-coin'
      >
        <SidebarMenuItem icon="bi bi-radar" to='/dinh-nghia/gia/vung' title={intl.formatMessage({id: 'MENU.VUNGGIA'})}/>
        <SidebarMenuItem icon="bi bi-cash-coin" to='/dinh-nghia/gia/kg' title={intl.formatMessage({id: 'MENU.GIAKG'})}/>
        <SidebarMenuItem icon="bi bi-cash-coin" to='/dinh-nghia/gia/cbm' title={intl.formatMessage({id: 'MENU.GIACBM'})}/>

      </SidebarMenuItemWithSub>

      {/* <SidebarMenuItemWithSub
        to='/dinh-nghia/gia-cbm'
        title={intl.formatMessage({id: 'MENU.GIACUOCTHEOCBM'})}
        fontIcon='bi-chat-left'
        icon='bi bi-cash-coin'
      >
        <SidebarMenuItem icon="bi bi-radar" to='/dinh-nghia/gia-cbm/vung' title={intl.formatMessage({id: 'MENU.VUNGCBM'})}/>
        <SidebarMenuItem icon="bi bi-cash-coin" to='/dinh-nghia/gia-cbm/gia' title={intl.formatMessage({id: 'MENU.GIACBM'})}/>
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItem
        to='/apps/user-management/users'
        icon='abstract-28'
        title='User management'
        fontIcon='bi-layers'
      />
      <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTIcon iconName='code' className='fs-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  )
}

export {SidebarMenuMain}
