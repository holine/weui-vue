<template>
  <div ref="weui-vtabs" class="weui-vtabs">
    <div class="weui-vtabs-bar__wrp" :class="tabBarClass | parseClassName">
      <scroll-view scroll-y class="weui-vtabs-bar__scrollview" :scroll-into-view="`weui-vtabs-item__${currentView}`">
        <div class="weui-vtabs-bar__content">
          <template v-for="(item, index) in vtabs">
            <div :key="item.title" :id="`weui-vtabs-item__${index}`" class="weui-vtabs-bar__item" :data-index="index"
              :style="{
                'background-color': activeTab === index ? tabActiveBgColor : tabInactiveBgColor,
                color: activeTab === index ? tabActiveTextColor : tabInactiveTextColor,
                'border-left-color': activeTab === index ? tabLineColor : tabInactiveBgColor,
              }" @click="handleTabClick">
              <div class="weui-vtabs-bar__title" :class="(activeTab === index ? activeClass : '') | parseClassName">
                {{ item.title }}
              </div>
            </div>
          </template>
        </div>
      </scroll-view>
    </div>
    <div class="weui-vtabs-content__wrp">
      <scroll-view scroll-y class="weui-vtabs-content__scrollview" :scroll-top="contentScrollTop"
        :scroll-with-animation="animation" @scroll="handleContentScroll">
        <div class="weui-vtabs-content">
          <slot></slot>
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
import ScrollView from '../../scroll-view';
export default {
  components: {
    ScrollView
  },
  props: {
    vtabs: { type: Array, default: () => [] },
    tabBarClass: { type: String, default: '' },
    activeClass: { type: String, default: '' },
    tabLineColor: { type: String, default: '#ff0000' },
    tabInactiveTextColor: { type: String, default: '#000000' },
    tabActiveTextColor: { type: String, default: '#ff0000' },
    tabInactiveBgColor: { type: String, default: '#eeeeee' },
    tabActiveBgColor: { type: String, default: '#ffffff' },
    activeTab: { type: Number, default: 0 },
    animation: { type: Boolean, default: true }
  },
  data() {
    return {
      currentView: 0,
      contentScrollTop: 0,
      heightRecords: [],
      contentHeight: {},
      calcHeightTimer: null
    }
  },
  watch: {
    activeTab(_activeTab) {
      this.scrollTabBar(_activeTab);
    }
  },
  created() {
    this.$watch(() => ({
      heightRecords: this.heightRecords,
      activeTab: this.activeTab
    }), () => this.setData({
      contentScrollTop: this.heightRecords[this.activeTab - 1] || 0
    }), {
      immediate: true
    });
  },
  relations: {
    '../vtabs-content/index': {
      type: 'child',
      unlinked: function unlinked(target) {
        delete this.contentHeight[target.tabIndex];
      }
    }
  },
  lifetimes: {
    attached: function attached() { }
  },
  methods: {
    linked(index, height) {
      this.contentHeight[index] = height;
      if (this.calcHeightTimer) {
        clearTimeout(this.calcHeightTimer);
      }
      this.calcHeightTimer = setTimeout(() => {
        this.calcHeight();
      }, 100);
    },
    unlinked(index) {
      delete this.contentHeight[index];
    },
    calcHeight() {
      var length = this.vtabs.length;
      var contentHeight = this.contentHeight;
      var heightRecords = [];
      var temp = 0;
      for (var i = 0; i < length; i++) {
        heightRecords[i] = temp + (contentHeight[i] || 0);
        temp = heightRecords[i];
      }
      this.heightRecords = heightRecords;
    },
    scrollTabBar(index) {
      var len = this.vtabs.length;
      if (len === 0) return;
      var currentView = index < 6 ? 0 : index - 5;
      if (currentView >= len) currentView = len - 1;
      this.setData({ currentView: currentView });
    },
    handleTabClick(e) {
      var index = e.currentTarget.dataset.index * 1;
      this.triggerEvent('tabclick', { index: index });
      this.$emit('update:activeTab', index)
    },
    handleContentScroll(e) {
      var heightRecords = this.heightRecords;
      if (heightRecords.length === 0) return;
      var length = this.vtabs.length;
      var scrollTop = e.currentTarget.scrollTop + 0.5;
      var index = 0;
      if (scrollTop >= heightRecords[0]) {
        for (var i = 1; i < length; i++) {
          if (scrollTop >= heightRecords[i - 1] && scrollTop < heightRecords[i]) {
            index = i;
            break;
          }
        }
      }
      if (this.$refs['weui-vtabs'].getBoundingClientRect().height + e.currentTarget.scrollTop + 0.5 < heightRecords[heightRecords.length - 1]) {
        if (index !== this.activeTab) {
          this.triggerEvent('change', { index: index * 1 });
          this.$emit('update:activeTab', index * 1)
        }
      }
    }
  }
}
</script>
<style scoped>
.weui-vtabs {
  width: 100%;
  height: 100%;
  display: flex
}

.weui-vtabs-bar__wrp {
  width: 110px;
  height: 100%
}

.weui-vtabs-bar__scrollview {
  height: 100%
}

.weui-vtabs-bar__content {
  width: 110px;
  height: 100%
}

.weui-vtabs-bar__item {
  display: inline-block;
  width: 110px;
  height: 55px;
  border-left: 4px solid transparent
}

.weui-vtabs-bar__title {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden
}

.weui-vtabs-content__wrp {
  overflow: hidden;
  flex: 1;
  height: 100%
}

.weui-vtabs-content__scrollview {
  max-height: 100%;
}

.weui-vtabs-content {
  height: 100%
}
</style>