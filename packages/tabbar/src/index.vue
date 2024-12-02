<template>
  <div class="weui-tabbar" :class="[{
    'weui-tabbar__reactive': reactive
  }, extClass] | parseClassName" aria-role="tablist">
    <div v-for="(item, index) in list" :key="index" :data-index="index" @click="tabChange" class="weui-tabbar__item"
      :class="{
        'weui-tabbar__item_on': index === current
      }" aria-role="tab" :aria-labelledby="`t${index}_title`" :aria-describedby="`t${index}_tips`"
      :aria-selected="index === current">
      <div :id="`t${index}_tips`" aria-hidden="true" style="position: relative;display:inline-block;">
        <weui-image :src="current === index ? item.selectedIconPath : item.iconPath" class="weui-tabbar__icon" />
        <weui-badge v-if="item.badge || item.dot" :content="item.badge" :aria-label="item.ariaLabel || ''"
          style="position: absolute;top:-2px;left:calc(100% - 3px)" />
      </div>
      <div :id="`t${index}_title`" aria-hidden="true" class="weui-tabbar__label">{{ item.text }}</div>
    </div>
  </div>
</template>
<script>
import WeuiImage from "../../image";
import WeuiBadge from "../../badge";

export default {
  components: {
    WeuiImage, WeuiBadge
  },
  props: {
    extClass: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: () => []
    },
    current: {
      type: Number,
      default: 0
    },
    reactive: {
      type: Boolean,
      default: !0
    }
  },
  methods: {
    tabChange: function (e) {
      var t = e.currentTarget.dataset.index * 1;
      t !== this.current && (this.$emit('update:current', t), this.triggerEvent("change", {
        index: t,
        item: this.list[t]
      }))
    }
  }
}
</script>