<template>
  <div :class="carouselClasses" :style="{
    height,
  }" @mouseenter.stop="handleMouseEnter" @mouseleave.stop="handleMouseLeave">
    <div class="el-carousel__container">
      <slot></slot>
    </div>
    <ul v-if="indicatorPosition !== 'none'" :class="indicatorsClasses">
      <li v-for="(item, index) in items" :key="index" :class="[
        'el-carousel__indicator',
        'el-carousel__indicator--' + direction,
        { 'is-active': index === activeIndex }]" @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)">
        <button class="el-carousel__button">
          <span v-if="hasLabel">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import throttle from 'throttle-debounce/throttle';
export default {
  props: {
    current: {
      type: Number,
      default: 0
    },
    indicatorDots: {
      type: Boolean,
      default: false
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 3000
    },
    indicator: {
      type: Boolean,
      default: true
    },
    type: String,
    loop: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    }
  },

  data() {
    return {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false,
      height: '',
    };
  },

  computed: {
    indicatorPosition() {
      return this.indicatorDots ? '' : 'none';
    },
    arrowDisplay() {
      return this.direction !== 'vertical';
    },

    hasLabel() {
      return this.items.some(item => item.label.toString().length > 0);
    },

    carouselClasses() {
      const classes = ['el-carousel', 'el-carousel--' + this.direction];
      if (this.type === 'card') {
        classes.push('el-carousel--card');
      }
      return classes;
    },

    indicatorsClasses() {
      const classes = ['el-carousel__indicators', 'el-carousel__indicators--' + this.direction];
      if (this.hasLabel) {
        classes.push('el-carousel__indicators--labels');
      }
      if (this.indicatorPosition === 'outside' || this.type === 'card') {
        classes.push('el-carousel__indicators--outside');
      }
      return classes;
    }
  },

  watch: {
    current: {
      handler(val) {
        this.setActiveItem(val);
      },
      immediate: true,
    },
    items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex);
    },

    activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal);
      if (oldVal > -1) {
        this.$emit('change', { detail: { current: val } });
      }
      this.$nextTick(() => {
        this.height = this.items[this.activeIndex].$el.getBoundingClientRect().height + 'px';
      });
    },

    autoplay(val) {
      val ? this.startTimer() : this.pauseTimer();
    },

    loop() {
      this.setActiveItem(this.activeIndex);
    },

    interval() {
      this.pauseTimer();
      this.startTimer();
    }
  },

  methods: {
    handleMouseEnter() {
      this.hover = true;
      this.pauseTimer();
    },

    handleMouseLeave() {
      this.hover = false;
      this.startTimer();
    },

    itemInStage(item, index) {
      const length = this.items.length;
      if (index === length - 1 && item.inStage && this.items[0].active ||
        (item.inStage && this.items[index + 1] && this.items[index + 1].active)) {
        return 'left';
      } else if (index === 0 && item.inStage && this.items[length - 1].active ||
        (item.inStage && this.items[index - 1] && this.items[index - 1].active)) {
        return 'right';
      }
      return false;
    },

    updateItems() {
      this.items = this.$children.filter(child => child.$options.name === 'WeuiSwiperItem');
    },

    resetItemPosition(oldIndex) {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex);
      });
    },

    playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else if (this.loop) {
        this.activeIndex = 0;
      }
    },

    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    startTimer() {
      if (this.interval <= 0 || !this.autoplay || this.timer) return;
      this.timer = setInterval(this.playSlides, this.interval);
    },

    resetTimer() {
      this.pauseTimer();
      this.startTimer();
    },

    setActiveItem(index) {
      if (typeof index === 'string') {
        const filteredItems = this.items.filter(item => item.name === index);
        if (filteredItems.length > 0) {
          index = this.items.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        console.warn('[Element Warn][Carousel]index must be an integer.');
        return;
      }
      let length = this.items.length;
      const oldIndex = this.activeIndex;
      if (index < 0) {
        this.activeIndex = this.loop ? length - 1 : 0;
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1;
      } else {
        this.activeIndex = index;
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex);
      }
      this.resetTimer();
    },

    prev() {
      this.setActiveItem(this.activeIndex - 1);
    },

    next() {
      this.setActiveItem(this.activeIndex + 1);
    },

    handleIndicatorClick(index) {
      this.activeIndex = index;
    },

    handleIndicatorHover(index) {
      if (this.trigger === 'hover' && index !== this.activeIndex) {
        this.activeIndex = index;
      }
    }
  },

  created() {
    this.throttledArrowClick = throttle(300, true, index => {
      this.setActiveItem(index);
    });
    this.throttledIndicatorHover = throttle(300, index => {
      this.handleIndicatorHover(index);
    });

    new PerformanceObserver(() => {
      this.height = this.items[this.activeIndex].$el.getBoundingClientRect().height + 'px';
    }).observe({ entryTypes: ["resource"] });
  },

  mounted() {
    this.updateItems();
    this.$nextTick(() => {
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex;
      }
      this.startTimer();
    });
  },

  beforeDestroy() {
    this.pauseTimer();
  }
};
</script>

<style scoped>
.el-carousel {
  position: relative
}

.el-carousel--horizontal {
  overflow-x: hidden;
  overflow-y: hidden;
}

.el-carousel--vertical {
  overflow-x: hidden;
  overflow-y: hidden
}

.el-carousel__container {
  position: relative;
}

.el-carousel__arrow {
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  height: 36px;
  width: 36px;
  cursor: pointer;
  -webkit-transition: .3s;
  transition: .3s;
  border-radius: 50%;
  background-color: rgba(31, 45, 61, .11);
  color: #FFF;
  position: absolute;
  top: 50%;
  z-index: 10;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
  font-size: 12px
}

.el-carousel__arrow--left {
  left: 16px
}

.el-carousel__arrow--right {
  right: 16px
}

.el-carousel__arrow:hover {
  background-color: rgba(31, 45, 61, .23)
}

.el-carousel__arrow i {
  cursor: pointer
}

.el-carousel__indicators {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 2
}

.el-carousel__indicators--horizontal {
  bottom: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%)
}

.el-carousel__indicators--vertical {
  right: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%)
}

.el-carousel__indicators--outside {
  bottom: 26px;
  text-align: center;
  position: static;
  -webkit-transform: none;
  transform: none
}

.el-carousel__indicators--outside .el-carousel__indicator:hover button {
  opacity: .64
}

.el-carousel__indicators--outside button {
  background-color: #C0C4CC;
  opacity: .24
}

.el-carousel__indicators--labels {
  left: 0;
  right: 0;
  -webkit-transform: none;
  transform: none;
  text-align: center
}

.el-carousel__indicators--labels .el-carousel__button {
  height: auto;
  width: auto;
  padding: 2px 18px;
  font-size: 12px
}

.el-carousel__indicators--labels .el-carousel__indicator {
  padding: 6px 4px
}

.el-carousel__indicator {
  background-color: transparent;
  cursor: pointer
}

.el-carousel__indicator:hover button {
  opacity: .72
}

.el-carousel__indicator--horizontal {
  display: inline-block;
  padding: 12px 4px
}

.el-carousel__indicator--vertical {
  padding: 4px 12px
}

.el-carousel__indicator--vertical .el-carousel__button {
  width: 2px;
  height: 15px
}

.el-carousel__indicator.is-active button {
  opacity: 1
}

.el-carousel__button {
  display: block;
  opacity: .48;
  width: 30px;
  height: 2px;
  background-color: #FFF;
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  -webkit-transition: .3s;
  transition: .3s
}
</style>