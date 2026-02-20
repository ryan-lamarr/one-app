/** 配置 store 入口 */

import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { useTabbarStore } from "./modules/tabbar"

// 创建pinia实例
const pinia = createPinia()

// 使用持久化插件（可选）
pinia.use(piniaPluginPersistedstate)

// 导出store实例
export { pinia }

// 导出各个模块的store，方便直接引用
export { useTabbarStore }

// 如果需要统一导出类型
export * from "./types"
