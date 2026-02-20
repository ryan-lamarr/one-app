<script setup lang="ts">
import { useTabbarStore } from '@/stores/modules/tabbar';
import { onLaunch, onShow } from '@dcloudio/uni-app';

const tabbarStore = useTabbarStore();

onLaunch(() => {
  console.log('App Launch...')
})

onShow(() => {
  // 初始化tabbar显示状态
  const pages = getCurrentPages()
  if (pages.length > 0) {
    const currentPage = pages[pages.length - 1]
    // @ts-ignore
    const route = `/${currentPage.route}`
    tabbarStore.setCurrentByPath(route)
  }
})
</script>

<style lang="scss">
/* 全局样式 */
@use '@/styles/global.scss' as global;
</style>