<template>
  <draggable
    v-model="store.nodes"
    draggable=".item"
    group="nodes"
    @change="focusId = null"
  >
    <div v-for="(node, nodeIndex) in store.nodes" :key="node.id" class="item">
      <font-awesome-icon
        :icon="node.children.length < 1 ? 'circle' : 'caret-down'"
        :class="node.children.length < 1 ? 'circle' : 'caret-down'"
      />
      <input
        v-model="node.text"
        type="text"
        class="nodeInput"
        v-on:keypress.enter="addNewNode(store.nodes, nodeIndex)"
        ref="node"
        :id="node.id"
      />
      <draggable
        v-model="node.children"
        draggable=".child"
        group="nodes"
        class="childContainer"
        @change="focusId = null"
      >
        <div
          v-for="(child, childIndex) in node.children"
          :key="child.id"
          class="child"
        >
          <font-awesome-icon
            :icon="child.children.length < 1 ? 'circle' : 'caret-down'"
            :class="child.children.length < 1 ? 'circle' : 'caret-down'"
          />
          <input
            type="text"
            v-model="child.text"
            class="nodeInput"
            v-on:keypress.enter="addNewNode(node.children, childIndex, node.id)"
            ref="child"
            :id="child.id"
          />
        </div>
      </draggable>
    </div>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';
import { v4 as uuid } from 'uuid';
import store from '../../store';

export default {
  name: 'GraphEditor',
  updated: function() {
    console.log(this.store);
    if (this.focusId) {
      document.getElementById(this.focusId).focus();
    }
  },
  components: {
    draggable,
  },
  data: () => ({
    store,
    focusId: null,
  }),
  methods: {
    addNewNode(arr, index, parId = null) {
      const newNode = {
        id: uuid(),
        text: 'New Node',
        type: 'concept',
        concepts: [],
        parent: parId,
        children: [],
      };

      this.focusId = newNode.id;

      arr.splice(index + 1, 0, newNode);

      // arr.push(newNode);
    },
  },
};
</script>

<style scoped>
.child {
  margin-left: 20px;
}

.childContainer {
  padding: 10px;
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
