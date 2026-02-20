<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app';

//const tabbarStore = useTabbarStore()

//const showTabbar = computed(() => tabbarStore.showTabbar)

onLaunch(() => {
  console.log('App Launch...')
})

// onAppShow(() => {
//   // 初始化tabbar显示状态
//   const pages = getCurrentPages()
//   if (pages.length > 0) {
//     const currentPage = pages[pages.length - 1]
//     // @ts-ignore
//     const route = `/${currentPage.route}`
//     tabbarStore.setCurrentByPath(route)
//   }
// })
</script>

<style lang="scss">
/* 全局样式 */
@use '@/styles/global.scss' as global;
</style>