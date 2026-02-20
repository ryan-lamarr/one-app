import { pinia } from "@/stores"
import { createSSRApp } from "vue"
import App from "./App.vue"

export function createApp() {
  const app = createSSRApp(App)

  // 使用Pinia
  app.use(pinia)

  return {
    app,
    pinia, // 如果是SSR，需要返回pinia实例
  }
}
