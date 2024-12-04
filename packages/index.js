import WeuiBadge from "./badge"
import WeuiCell from "./cell"
import WeuiCells from "./cells"
import WeuiDialog from "./dialog"
import WeuiIcon from "./icon"
import WeuiImage from "./image"
import WeuiRadio from "./radio"
import WeuiRootPortal from "./root-portal"
import WeuiScrollView from "./scroll-view"
import WeuiSearchbar from "./searchbar"
import WeuiSwiper from "./swiper"
import WeuiSwiperItem from "./swiper-item"
import WeuiTabbar from "./tabbar"
import WeuiTabs from "./tabs"
import WeuiToptips from "./toptips"
import WeuiVtabs from "./vtabs"
import WeuiVtabsContent from "./vtabs-content"
const components = [
  WeuiBadge,
    WeuiCell,
    WeuiCells,
    WeuiDialog,
    WeuiIcon,
    WeuiImage,
    WeuiRadio,
    WeuiRootPortal,
    WeuiScrollView,
    WeuiSearchbar,
    WeuiSwiper,
    WeuiSwiperItem,
    WeuiTabbar,
    WeuiTabs,
    WeuiToptips,
    WeuiVtabs,
    WeuiVtabsContent
]
const install = (Vue) => {
  if (install.installed) {
    return
  }
  components.map(component => Vue.component(component.name, component))
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export {
    install,
    WeuiBadge,
    WeuiCell,
    WeuiCells,
    WeuiDialog,
    WeuiIcon,
    WeuiImage,
    WeuiRadio,
    WeuiRootPortal,
    WeuiScrollView,
    WeuiSearchbar,
    WeuiSwiper,
    WeuiSwiperItem,
    WeuiTabbar,
    WeuiTabs,
    WeuiToptips,
    WeuiVtabs,
    WeuiVtabsContent
}
export default install