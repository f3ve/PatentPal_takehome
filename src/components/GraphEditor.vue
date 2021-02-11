<template>
  <vue-nestable v-model="store.nodes">
    <vue-nestable-handle slot-scope="{ item }" :item="item">
      <div>
        <input v-model="item.text" v-on:keypress.enter.prevent="addNode"/>
      </div>
    </vue-nestable-handle>
  </vue-nestable>
</template>

<script>
import store from '../../store'
import {VueNestable, VueNestableHandle} from 'vue-nestable'


export default {
  name: 'GraphEditor',
  components: {
    VueNestable,
    VueNestableHandle
  },
  methods: {
    addNode() {
      console.log('yeet')
    }
  },
  data: () => ({
    store
  }),
}
</script>