import { defineStore } from "pinia"
import type { TabbarState } from "../types"

export const useTabbarStore = defineStore("tabbar", {
  state: (): TabbarState => ({
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/static/icons/home.png",
        selectedIconPath: "/static/icons/home-active.png",
      },
      {
        pagePath: "/pages/category/category",
        text: "分类",
        iconPath: "/static/icons/category.png",
        selectedIconPath: "/static/icons/category-active.png",
      },
      {
        pagePath: "/pages/cart/cart",
        text: "购物车",
        iconPath: "/static/icons/cart.png",
        selectedIconPath: "/static/icons/cart-active.png",
        badge: 0,
      },
      {
        pagePath: "/pages/user/user",
        text: "我的",
        iconPath: "/static/icons/user.png",
        selectedIconPath: "/static/icons/user-active.png",
      },
    ],
    currentIndex: 0,
    showTabbar: true,
    animation: true,
    imagesLoaded: false, // 添加图片加载状态
  }),

  getters: {
    // 获取当前选中的tabbar项
    currentTabbarItem: (state) => state.list[state.currentIndex],

    // 判断是否应该显示tabbar（可以添加路由判断逻辑）
    shouldShowTabbar: (state) => (path: string) => {
      return (
        state.list.some((item) => item.pagePath === path) && state.showTabbar
      )
    },
  },

  actions: {
    // 切换tabbar选中项
    setCurrentIndex(index: number) {
      // 使用 Promise 微任务，比 nextTick 更早执行
      Promise.resolve().then(() => {
        this.currentIndex = index
      })
    },

    // 根据路径设置当前选中项
    setCurrentByPath(path: string) {
      const index = this.list.findIndex((item) => item.pagePath === path)
      if (index !== -1) {
        this.setCurrentIndex(index)
      }
    },

    // 更新角标
    updateBadge(index: number, count: number | string) {
      if (this.list[index]) {
        this.list[index].badge = count
      }
    },

    // 显示/隐藏tabbar
    toggleTabbar(show: boolean) {
      // 预加载，避免闪烁
      setTimeout(() => {
        this.showTabbar = show
      }, 10)
    },

    // 启用/禁用动画
    setAnimation(enable: boolean) {
      this.animation = enable
    },
  },
  persist: {
    key: "tabbar-storage", // 存储的键名
    storage: {
      getItem: (key: string) => {
        return uni.getStorageSync(key)
      },
      setItem: (key: string, value: any) => {
        uni.setStorageSync(key, value)
      },
    },
    pick: ["currentIndex", "list"], // 注意这里是 pick 不是 paths！
  },
})
