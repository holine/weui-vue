<template>
  <div>
    <div class="weui-search-bar" :class="[searchState ? 'weui-search-bar_focusing' : '', extClass] | parseClassName">
      <div class="weui-search-bar__form" aria-role="combobox" aria-haspopup :aria-expanded="searchState"
        aria-owns="searchResult">
        <div class="weui-search-bar__box">
          <icon class="weui-icon-search" icon="search" :size="24" color="var(--weui-FG-2)" />
          <input aria-controls="searchResult" type="text" class="weui-search-bar__input" :placeholder="placeholder"
            :value="value" :focus="focus" @blur="inputBlur" @focus="inputFocus" @input="inputChange" />
          <div class="weui-icon-clear" hover-class="weui-hover-active" v-if="value.length > 0" @click="clearInput"
            aria-role="button" aria-label="清除" />
        </div>
        <label id="searchText" class="weui-search-bar__label" @click="showInput">
          <icon class="weui-icon-search" icon="search" :size="24" color="var(--weui-FG-2)" />
          <span aria-hidden class="weui-search-bar__text">{{ placeholder }}</span>
        </label>
      </div>
      <div v-if="cancel && searchState" class="weui-search-bar__cancel-btn" @click="hideInput" aria-role="button">
        {{ cancelText }}
      </div>
    </div>
    <mp-cells id="searchResult" aria-role="listbox" :ext-class="['searchbar-result', extClass] | parseClassName"
      v-if="searchState && result.length > 0">
      <mp-cell class="result" @click="selectResult" body-class="weui-cell_primary" :data-index="index"
        v-for="(item, index) in result" :key="index" hover aria-role="option">
        <div>{{ item.text }}</div>
      </mp-cell>
    </mp-cells>
  </div>
</template>
<script>
import MpCells from "../../cells";
import MpCell from "../../cell";
import Icon from "../../icon";
export default {
  components: {
    MpCells, MpCell, Icon
  },
  props: {
    extClass: {
      type: String,
      default: ""
    },
    focus: {
      type: Boolean,
      default: !1
    },
    placeholder: {
      type: String,
      default: "搜索"
    },
    value: {
      type: String,
      default: "",
    },
    search: {
      type: null,
      default: null
    },
    throttle: {
      type: Number,
      default: 500
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    cancel: {
      type: Boolean,
      default: !0
    }
  },
  data() {
    return {
      result: [],
      searchState: !1
    }
  },
  lastSearch: Date.now(),
  lifetimes: {
    attached: function () {
      this.focus && this.setData({
        searchState: !0
      })
    }
  },
  watch: {
    value: {
      handler() {
        this.valueChange()
      },
      immediate: !0
    }
  },
  methods: {
    valueChange: function () {
      this.value && this.setData({
        searchState: !0
      })
    },
    clearInput: function () {
      this.$emit('update:focus', !1)
      this.$emit('update:value', "")
      this.setData({
        result: []
      })
      this.triggerEvent("clear")
    },
    inputFocus: function (t) {
      this.triggerEvent("focus", t.detail)
    },
    inputBlur: function (t) {
      this.$emit('update:focus', !1)
      this.triggerEvent("blur", t.detail)
    },
    showInput: function () {
      this.$emit('update:focus', !0)
      this.setData({
        searchState: !0
      })
    },
    hideInput: function () {
      this.setData({
        searchState: !1
      }), this.triggerEvent("cancel")
    },
    inputChange: function (t) {
      var e = this;
      this.$emit('update:value', t.currentTarget.value)
      this.triggerEvent("input", t.currentTarget.value), Date.now() - this.lastSearch < this.throttle || "function" == typeof this.search && (this.lastSearch = Date.now(), this.timerId = setTimeout((function () {
        e.search(e.value).then((function (t) {
          e.setData({
            result: t
          })
        })).catch((function (t) {
          console.error("search error", t)
        }))
      }), this.throttle))
    },
    selectResult: function (t) {
      var e = t.currentTarget.dataset.index,
        a = this.result[e];
      this.triggerEvent("selectresult", {
        index: e,
        item: a
      })
    }
  }
}
</script>
<style scoped>
.weui-search-bar__label text {
  display: inline-block;
  font-size: 14px;
  vertical-align: middle;
}

.weui-search-bar .weui-icon-search,
.weui-search-bar__box .weui-icon-search,
.weui-search-bar .weui-search-bar__box .weui-icon-clear {
  width: 22.578px;
  height: 22.578px;
}

.weui-search-bar .weui-icon-search,
.weui-search-bar__box .weui-icon-search {
  background-color: var(--weui-FG-2);
  /* skyline 不支持 currentColor */
}

.weui-search-bar__box .weui-icon-clear::before {
  background-color: var(--weui-FG-2);
  /* skyline 不支持 currentColor */
  width: 22.578px;
  height: 22.578px;
}
</style>