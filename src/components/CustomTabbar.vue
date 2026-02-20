<template>
  <view class="custom-tabbar" :class="{ 'tabbar-hidden': !showTabbar, 'tabbar-animation': animation }"
    :style="tabbarStyle">
    <view v-for="(item, index) in processedTabbarList" :key="index" class="tabbar-item"
      :class="{ active: currentIndex === index }" @click="switchTab(index, item.pagePath)">
      <!-- 图标区域 -->
      <view class="tabbar-icon">
        <image :src="currentIndex === index ? item.selectedIconPath : item.iconPath" mode="aspectFill"
          :style="{ width: '24px', height: '24px' }" />
        <!-- 角标 -->
        <view v-if="item.badge" class="badge" :class="{ 'badge-dot': item.badge === 'dot' }">
          <text v-if="!item.isDot && item.displayBadge">{{ item.displayBadge }}</text>
        </view>
      </view>

      <!-- 文字区域 -->
      <text class="tabbar-text">{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useTabbarStore } from '@/stores'
import { onShow } from '@dcloudio/uni-app'
import { computed, onMounted } from 'vue'

const tabbarStore = useTabbarStore()

// 使用store中的数据
const tabbarList = computed(() => tabbarStore.list)
const currentIndex = computed(() => tabbarStore.currentIndex)
const showTabbar = computed(() => tabbarStore.showTabbar)
const animation = computed(() => tabbarStore.animation)

// 处理角标的计算属性
const processedTabbarList = computed(() => {
  return tabbarList.value.map(item => {
    // 创建一个新对象，处理 badge 的显示逻辑
    let displayBadge: string | number | null = null

    if (item.badge && item.badge !== 'dot') {
      const badgeNum = Number(item.badge)
      if (badgeNum > 0) {
        displayBadge = badgeNum > 99 ? '99+' : badgeNum
      }
    }

    return {
      ...item,
      displayBadge, // 处理后的显示文本
      isDot: item.badge === 'dot' // 是否显示小红点
    }
  })
})

// 动态样式，确保平滑过渡
const tabbarStyle = computed(() => ({
  transform: showTabbar.value ? 'translateY(0)' : 'translateY(100%)',
  opacity: showTabbar.value ? 1 : 0,
  transition: animation.value ? 'all 0.2s ease-out' : 'none'
}))

// 切换tab
const switchTab = (index: number, path: string) => {
  // 更新store中的选中索引
  tabbarStore.setCurrentIndex(index)

  // 使用uni.switchTab跳转，不会重新加载页面
  uni.switchTab({
    url: path,
    fail: (err) => {
      console.error('跳转失败:', err)
      // 降级使用reLaunch
      uni.reLaunch({ url: path })
    }
  })
}

// 临时使用 reLaunch 代替 switchTab 测试
// const switchTab = (index: number, path: string) => {
//   // uni.switchTab 换成 uni.reLaunch
//   uni.reLaunch({
//     url: path,
//     success: () => {
//       tabbarStore.setCurrentIndex(index)
//     }
//   })
// }

// 监听页面显示，确保选中状态正确
onShow(() => {
  const pages = getCurrentPages()
  if (pages.length > 0) {
    const currentPage = pages[pages.length - 1]
    // @ts-ignore
    const route = `/${currentPage.route}`
    tabbarStore.setCurrentByPath(route)
  }
})

// 添加一个 mounted 钩子
// 组件挂载时预加载所有图标
onMounted(() => {
  // 收集所有图标路径
  const allIcons = tabbarStore.list.reduce((acc, item) => {
    acc.push(item.iconPath)
    acc.push(item.selectedIconPath)
    return acc
  }, [] as string[])

  // 预加载
  allIcons.forEach(src => {
    uni.getImageInfo({
      src,
      success: () => console.log('图标加载成功:', src),
      fail: (err) => console.warn('图标加载失败:', src, err)
    })
  })
})
</script>

<style scoped>
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 50px;
  background-color: #ffffff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.06);
  z-index: 999;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.tabbar-icon {
  position: relative;
  width: 24px;
  height: 24px;
  margin-bottom: 2px;
}

.tabbar-icon image {
  width: 24px;
  height: 24px;
  display: block;
}

.tabbar-text {
  font-size: 10px;
  color: #999999;
  line-height: 1.2;
  transition: color 0.2s;
}

.tabbar-item.active .tabbar-text {
  color: #007aff;
}

/* 角标样式 */
.badge {
  position: absolute;
  top: -4px;
  right: -8px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background-color: #ff3b30;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #ffffff;
}

.badge-dot {
  width: 8px;
  height: 8px;
  min-width: 8px;
  padding: 0;
  border-radius: 4px;
  top: -2px;
  right: -2px;
}

/* 隐藏动画 */
.tabbar-hidden {
  pointer-events: none;
}

.tabbar-animation {
  transition: all 0.2s ease-out;
}
</style>