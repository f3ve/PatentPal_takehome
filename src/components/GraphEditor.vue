<template>
    <draggable 
      v-model="store.nodes" 
      draggable=".item"
      group="nodes"
    >
      <div v-for="node in store.nodes" :key="node.id" class="item">
        <!-- {{node.text}} -->
        <input type="text" v-model="node.text">
        <draggable 
          v-model="node.children"
          draggable=".child"
          group="nodes"
          class="childContainer"
        >
          <div v-for="child in node.children" :key="child.id" class="child">
            <input type="text" v-model="child.text" />
          </div>
        </draggable>
      </div>
    </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import store from '../../store'

export default {
  name: 'GraphEditor',
  components: {
    draggable
  },
  data: () => ({
    store
  })
}
</script>

<style scoped>
  .child {
    margin-left: 20px;
  }

  .childContainer {
    padding: 10px
  }
</style>