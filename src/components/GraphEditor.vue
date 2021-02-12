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
        v-on:keydown.delete="removeNode($event, nodeIndex, store.nodes)"
        v-on:keypress.enter="addNewNode($event, store.nodes, nodeIndex)"
        v-on:keydown.up="
          handleUp({
            e: $event,
            arr: store.nodes,
            index: nodeIndex,
          })
        "
        v-on:keydown.down="
          handleDown({
            e: $event,
            node,
            arr: store.nodes,
            index: nodeIndex,
          })
        "
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
            v-on:keydown.delete="removeNode($event, childIndex, node.children)"
            v-on:keypress.enter="
              addNewNode($event, node.children, childIndex, node.id)
            "
            ref="child"
            v-on:keydown.up="
              handleUp({
                e: $event,
                arr: node.children,
                index: childIndex,
                parArr: store.nodes,
                parIndex: nodeIndex,
              })
            "
            v-on:keydown.down="
              handleDown({
                e: $event,
                node: child,
                arr: node.children,
                index: childIndex,
                parArr: store.nodes,
                parIndex: nodeIndex,
              })
            "
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
    if (this.focusId) {
      document.getElementById(this.focusId).focus();
      this.focusId = null;
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
    addNewNode(e, arr, index, parId = null) {
      if (e.target.value.length > 0) {
        const newNode = {
          id: uuid(),
          text: '',
          type: 'concept',
          concepts: [],
          parent: parId,
          children: [],
        };

        this.focusId = newNode.id;

        arr.splice(index + 1, 0, newNode);
      }
    },
    removeNode(e, index, arr) {
      if (e.target.value.length < 1 || e.key === 'Delete') {
        e.preventDefault();
        console.log(index, arr);
        arr.splice(index, 1);
        document.getElementById(arr[index - 1].id).focus();
      }
    },
    handleUp({ e, index, arr, parArr = [], parIndex = null }) {
      e.preventDefault();

      const nodeUp = arr[index - 1];

      if (nodeUp && nodeUp.children.length === 0) {
        document.getElementById(nodeUp.id).focus();
        return;
      }

      if (nodeUp && nodeUp.children.length > 0) {
        document.getElementById(nodeUp.children[0].id).focus();
        return;
      }

      if (!nodeUp && parIndex !== null) {
        document.getElementById(parArr[parIndex].id).focus();
        return;
      }
    },
    handleDown({ e, node, index, arr, parArr = [], parIndex = null }) {
      e.preventDefault();
      const { children } = node;

      if (children.length > 0) {
        document.getElementById(children[0].id).focus();
        return;
      }

      if (children.length === 0 && arr.length > index + 1) {
        document.getElementById(arr[index + 1].id).focus();
        return;
      }

      if (
        children.length === 0 &&
        parIndex !== null &&
        parArr.length > parIndex + 1
      ) {
        document.getElementById(parArr[parIndex + 1].id).focus();
        return;
      }
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
