<template>
    <draggable 
      v-model="store.nodes" 
      draggable=".item"
      group="nodes"
    >
      <div v-for="node in store.nodes" :key="node.id" class="item">
        <font-awesome-icon :icon="node.children.length < 1 ? 'circle' : 'caret-down'"  :class="node.children.length < 1 ? 'circle' : 'caret-down'" /> 
        <input type="text" v-model="node.text" class="nodeInput">
        <draggable 
          v-model="node.children"
          draggable=".child"
          group="nodes"
          class="childContainer"
        >
          <div 
            v-for="child in node.children" 
            :key="child.id" 
            class="child"
          >
            <font-awesome-icon :icon="child.children.length < 1 ? 'circle' : 'caret-down'"  :class="child.children.length < 1 ? 'circle' : 'caret-down'" /> 
            <input 
              type="text" 
              v-model="child.text" 
              class="nodeInput"
            />
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

  input.nodeInput {
    border: none;
  }

  input.nodeInput:focus {
    border: none;
    outline: none;
  }

  .circle {
    font-size: 10px;
    margin-right: 10px;
  }

  .caret-down {
    font-size: 16px;
    margin-right: 10px;
  }
</style>