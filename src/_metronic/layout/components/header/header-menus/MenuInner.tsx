import {useIntl} from 'react-intl'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.THONGTINCHUNG'})} to='/thong-tin-chung' />
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

      <MenuInnerWithSub
        title='Quản lý kho'
        to='/quan-ly-kho'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        KHO
      </MenuInnerWithSub>

      <MenuInnerWithSub title='Thông tin đầu vào' to='/dinh-nghia' menuPlacement='bottom-start' menuTrigger='click'>
      <MenuInnerWithSub 
          icon="bi bi-cash-coin" 
          to='/dinh-nghia/chung' 
          title={intl.formatMessage({id: 'MENU.THONGTINCHUNG'})}
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem icon="bi bi-bookmarks" to='/dinh-nghia/chung/phan-tram' title={intl.formatMessage({id: 'MENU.PHI-THUE'})}/>
        </MenuInnerWithSub>
        <MenuInnerWithSub
          title='Vị trí'
          to='/dinh-nghia/vi-tri'
          icon='bi bi-geo-alt'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem icon="bi bi-pin-map" to='/dinh-nghia/vi-tri/khu-vuc' title={intl.formatMessage({id: 'MENU.KHUVUC'})}/>
          <MenuItem icon="bi bi-map" to='/dinh-nghia/vi-tri/tinh' title={intl.formatMessage({id: 'MENU.TINHNHANHANG'})}/>
          <MenuItem icon="bi bi-compass" to='/dinh-nghia/vi-tri/huyen' title={intl.formatMessage({id: 'MENU.HUYENNHANHANG'})}/>
          <MenuItem icon="bi bi-crosshair" to='/dinh-nghia/vi-tri/xa' title={intl.formatMessage({id: 'MENU.XANHANHANG'})}/>
        </MenuInnerWithSub>

        <MenuInnerWithSub 
          icon="bi bi-cash-coin" 
          to='/dinh-nghia/gia' 
          title={intl.formatMessage({id: 'MENU.GIA'})}
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem icon="bi bi-radar" to='/dinh-nghia/gia/vung' title={intl.formatMessage({id: 'MENU.VUNGGIA'})}/>
          <MenuItem icon="bi bi-cash-coin" to='/dinh-nghia/gia/kg' title={intl.formatMessage({id: 'MENU.GIAKG'})}/>
          <MenuItem icon="bi bi-cash-coin" to='/dinh-nghia/gia/cbm' title={intl.formatMessage({id: 'MENU.GIACBM'})}/>
        </MenuInnerWithSub>

        <MenuInnerWithSub
          icon="bi bi-box-seam" 
          to='/dinh-nghia/dong-goi' 
          title={intl.formatMessage({id: 'MENU.DONGGOI'})}
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem icon="bi bi-box-seam" to='/dinh-nghia/dong-goi/thuong' title={intl.formatMessage({id: 'MENU.DONGGOITHUONG'})}/>
          <MenuItem icon="bi bi-box-seam" to='/dinh-nghia/dong-goi/cbm' title={intl.formatMessage({id: 'MENU.DONGGOICBM'})}/>
        </MenuInnerWithSub>
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
