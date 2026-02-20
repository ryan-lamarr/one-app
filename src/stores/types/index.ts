/** tabbar项的类型定义 */

export interface TabbarItem {
  pagePath: string
  text: string
  iconPath: string
  selectedIconPath: string
  badge?: string | number
  dot?: boolean
  custom?: boolean
}

export interface TabbarState {
  list: TabbarItem[]
  currentIndex: number
  showTabbar: boolean
  animation: boolean
  imagesLoaded: boolean
}
