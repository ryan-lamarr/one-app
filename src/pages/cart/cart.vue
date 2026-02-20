<template>
  <view class="content tabbar-page">
    <text>购物车</text>
    <button @click="updateCartBadge">更新购物车角标</button>
  </view>
  <view>
    <CustomTabbar />
  </view>
</template>

<script setup lang="ts">
import CustomTabbar from '@/components/CustomTabbar.vue'
import { useTabbarStore } from '@/stores'
import { onShow } from '@dcloudio/uni-app'

const tabbarStore = useTabbarStore()

// 页面显示时确保tabbar可见
onShow(() => {
  //tabbarStore.toggleTabbar(true)
})

// 示例：更新购物车角标
// const updateCartBadge = () => {
//   const cartCount = Math.floor(Math.random() * 100)
//   tabbarStore.updateBadge(2, cartCount) // 索引2是购物车
// }
</script>