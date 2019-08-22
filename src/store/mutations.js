import Vue from 'vue'
import * as types from './mutation-types'

export default {
  [types.SELECT_WIDGET] (state, widget) {
    Vue.set(state, 'selectWg', widget)
  }
}
