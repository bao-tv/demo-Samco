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
        <SidebarMenuItem to='/quan-ly-don-hang/don-hang/phieu-nhan-hang' title={intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})} hasBullet={true} />
        <SidebarMenuItem to='/quan-ly-don-hang/don-hang/phieu-nhan-hang-da-xoa' title={intl.formatMessage({id: 'MENU.PHIEUNHANHANGDAXOA'})} hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/quan-ly-don-hang/bao-cao'
        title='Báo cáo'
        icon='bi fs-3 bi-clipboard2-data'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/quan-ly-don-hang/bao-cao/ket-ca' title={intl.formatMessage({id: 'MENU.KETCA'})} hasBullet={true} />
        <SidebarMenuItem to='/quan-ly-don-hang/bao-cao/bao-cao' title={intl.formatMessage({id: 'MENU.BAOCAO'})} hasBullet={true} />
      </SidebarMenuItemWithSub>
      {/* <SidebarMenuItemWithSub to='/error' title='Errors' fontIcon='bi-sticky' icon='cross-circle'>
        <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='element-7'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Quản lý kho</span>
        </div>
      </div>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Định nghĩa giá cước</span>
        </div>
      </div>
      <SidebarMenuItem icon="bi bi-align-start" to='/gia-cuoc/khoang-cach' title={intl.formatMessage({id: 'MENU.KHOANGCACH'})}/>
      <SidebarMenuItem icon="bi bi-sign-turn-right" to='/gia-cuoc/tuyen-duong' title={intl.formatMessage({id: 'MENU.TUYENDUONG'})}/>
      <SidebarMenuItem icon="bi bi-box-seam" to='/gia-cuoc/dong-goi' title={intl.formatMessage({id: 'MENU.DONGGOI'})}/>
      {/* <SidebarMenuItemWithSub
        to='/gia-cuoc'
        title='Định nghĩa giá cước'
        fontIcon='bi-chat-left'
        icon='message-text-2'
      >
        <SidebarMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
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
