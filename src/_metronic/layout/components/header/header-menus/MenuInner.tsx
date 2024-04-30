import {useIntl} from 'react-intl'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.THONGTINCHUNG'})} to='/thong-tin-chung' />
      {/* <MenuItem title={intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})} to='/phieu-nhan-hang' /> */}
      {/* <MenuItem title={intl.formatMessage({id: 'MENU.PHIEUNHANHANGDAXOA'})} to='/phieu-nhan-hang-da-xoa' /> */}
      <MenuInnerWithSub
        title='Quản lý đơn hàng'
        to='/quan-ly-don-hang'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuInnerWithSub
          title='Đơn hàng'
          to='/quan-ly-don-hang/don-hang'
          fontIcon='bi-archive'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/quan-ly-don-hang/don-hang/phieu-nhan-hang' title={intl.formatMessage({id: 'MENU.PHIEUNHANHANG'})} hasBullet={true} />
          <MenuItem to='/quan-ly-don-hang/don-hang/phieu-nhan-hang-da-xoa' title={intl.formatMessage({id: 'MENU.PHIEUNHANHANGDAXOA'})} hasBullet={true} />
        </MenuInnerWithSub>

        <MenuInnerWithSub
          title='Báo cáo'
          to='/quan-ly-don-hang/bao-cao'
          fontIcon='bi bi-clipboard2-data'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/quan-ly-don-hang/bao-cao/ket-ca' title={intl.formatMessage({id: 'MENU.KETCA'})} hasBullet={true} />
          <MenuItem to='/quan-ly-don-hang/bao-cao/bao-cao' title={intl.formatMessage({id: 'MENU.BAOCAO'})} hasBullet={true} />
        </MenuInnerWithSub>
      </MenuInnerWithSub>

      <MenuInnerWithSub title='Định nghĩa giá cước' to='/gia-cuoc' menuPlacement='bottom-start' menuTrigger='click'>

        <MenuItem icon="bi bi-align-start" to='/gia-cuoc/khoang-cach' title={intl.formatMessage({id: 'MENU.KHOANGCACH'})}/>
        <MenuItem icon="bi bi-sign-turn-right" to='/gia-cuoc/tuyen-duong' title={intl.formatMessage({id: 'MENU.TUYENDUONG'})}/>
        <MenuItem icon="bi bi-box-seam" to='/gia-cuoc/dong-goi' title={intl.formatMessage({id: 'MENU.DONGGOI'})}/>
        {/* <MenuInnerWithSub
          title='Khoản cách'
          to='/gia-cuoc/khoan-cach'
          icon='message-text-2'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
          <MenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
        </MenuInnerWithSub> */}
        {/* <MenuItem icon='abstract-28' to='/apps/user-management/users' title='User management' /> */}
      </MenuInnerWithSub>

      {/* <MenuInnerWithSub
        isMega={true}
        title='Mega menu'
        to='/mega-menu'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MegaMenu />
      </MenuInnerWithSub> */}
    </>
  )
}
