<template>
  <div class="weui-tabs">
    <div class="weui-tabs-bar__wrp">
      <scroll-view scroll-x :scroll-into-view="`item_${currentView}`" :scroll-with-animation="animation">
        <div class="weui-tabs-bar__content">
          <div v-for="(item, index) in tabs" :key="item.title" :id="`item_${index}`" class="weui-tabs-bar__item" :style="{
            backgroundColor: tabBackgroundColor,
            color: activeTab === index ? tabActiveTextColor : tabInactiveTextColor,
          }" @click="handleTabClick" :data-index="index">
            <div class="weui-tabs-bar__title"
              :class="[tabClass, activeTab === index ? activeClass : ''] | parseClassName"
              :style="{ borderBottomColor: activeTab === index ? tabUnderlineColor : 'transparent' }"
              v-text="item.title"></div>
          </div>
        </div>
      </scroll-view>
    </div>
    <swiper :class="swiperClass | parseClassName" :current="activeTab" :duration="duration"
      @change="handleSwiperChange">
      <swiper-item v-for="(item, index) in tabs" :key="item.title">
        <slot :name="`tab-content-${index}`"></slot>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import ScrollView from '../../scroll-view';
import Swiper from '../../swiper';
import SwiperItem from '../../swiper-item';
export default {
  components: {
    ScrollView, Swiper, SwiperItem
  },
  props: {
    tabs: { type: Array, default: [] },
    tabClass: { type: String, default: '' },
    swiperClass: { type: String, default: '' },
    activeClass: { type: String, default: '' },
    tabUnderlineColor: { type: String, default: '#07c160' },
    tabActiveTextColor: { type: String, default: '#000000' },
    tabInactiveTextColor: { type: String, default: '#000000' },
    tabBackgroundColor: { type: String, default: '#ffffff' },
    activeTab: { type: Number, default: 0 },
    swipeable: { type: Boolean, default: true },
    animation: { type: Boolean, default: true },
    duration: { type: Number, default: 500 }
  },
  data() {
    return {
      currentView: 0
    }
  },
  watch: {
    activeTab: {
      handler(_activeTab) {
        var len = this.tabs.length;
        if (len === 0) return;
        var currentView = _activeTab - 1;
        if (currentView < 0) currentView = 0;
        if (currentView > len - 1) currentView = len - 1;
        this.setData({ currentView: currentView });
      },
      immediate: true,
    }
  },
  methods: {
    handleTabClick: function handleTabClick(e) {
      var index = e.currentTarget.dataset.index * 1;
      this.$emit('update:activeTab', index);
      this.triggerEvent('tabclick', { index: index });
    },
    handleSwiperChange: function handleSwiperChange(e) {
      var index = e.detail.current * 1;
      this.$emit('update:activeTab', index);
      this.triggerEvent('change', { index: index });
    }
  }
}
</script>
<style scoped>
.weui-tabs {
  width: 100%;
}

.weui-tabs-bar__wrp {
  width: 100%;
  background: #fff
}

.weui-tabs-bar__content {
  width: 100%;
  white-space: nowrap
}

.weui-tabs-bar__item {
  display: inline-block
}

.weui-tabs-bar__title {
  display: inline-block;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: transparent
}
</style>