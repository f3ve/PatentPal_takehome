<template>
  <div>
    <font-awesome-icon :icon="renderClass" :class="renderClass" />
    <input
      v-model="node.text"
      type="text"
      class="nodeInput"
      v-on:keydown.delete="removeNode"
      v-on:keypress.enter="addNewNode"
      v-on:keydown.up="handleUp"
      v-on:keydown.down="handleDown"
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
        <!-- Using recursion to render children of node -->
        <GraphEditor
          v-bind:node="child"
          v-bind:index="childIndex"
          v-bind:arr="node.children"
          v-bind:parArr="arr"
          v-bind:parIndex="index"
        />
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { v4 as uuid } from 'uuid';

export default {
  name: 'GraphEditor',
  components: {
    draggable,
  },
  props: {
    node: Object, // current node
    index: Number, // node index
    arr: Array, // array containing node
    parArr: Array, // array containing parent
    parIndex: Number, // parent index
  },
  data: () => ({
    focusId: null, // id used for targeting newly created nodes
  }),
  watch: {
    focusId: function(val) {
      /* 
        focuses newly created nodes
      */
      if (val) {
        document.getElementById(val).focus();
        this.focusId = null;
      }
    },
  },
  computed: {
    renderClass: function() {
      /* 
        simple function that determines if a circle or caret should be rendered
      */
      if (this.node.children.length < 1) {
        return 'circle';
      }
      return 'caret-down';
    },
  },
  methods: {
    addNewNode(e) {
      const { arr, index } = this;
      const parId = this.parArr[this.parIndex].id; // parent id to assign to new node

      // if length of current input is greater than 0 creates new node
      if (e.target.value.length > 0) {
        const newNode = {
          id: uuid(),
          text: '',
          type: 'concept',
          concepts: [],
          parent: parId,
          children: [],
        };

        // sets focusId to target newly created node
        this.focusId = newNode.id;

        // using splice to insert as next index array
        arr.splice(index + 1, 0, newNode);
      }
    },
    removeNode(e) {
      const { index, arr } = this;

      // if current input length is less than 1 or "Delete" key is press removes node
      if (e.target.value.length < 1 || e.key === 'Delete') {
        e.preventDefault();
        arr.splice(index, 1);
        document.getElementById(arr[index - 1].id).focus();
      }
    },
    handleUp(e) {
      e.preventDefault();

      const { index, arr, parArr, parIndex } = this;
      const nodeUp = arr[index - 1];

      // if there is a node above current node with no children target that node
      if (nodeUp && nodeUp.children.length === 0) {
        document.getElementById(nodeUp.id).focus();
        return;
      }

      // if there is a node with children target it's last child
      if (nodeUp && nodeUp.children.length > 0) {
        document
          .getElementById(nodeUp.children[nodeUp.children.length - 1].id)
          .focus();
        return;
      }

      // if current node is a child and it does not have a sibling node above, target parent
      if (!nodeUp && parIndex !== null) {
        document.getElementById(parArr[parIndex].id).focus();
        return;
      }
    },
    handleDown(e) {
      e.preventDefault();
      const {
        node: { children },
        arr,
        index,
        parIndex,
        parArr,
      } = this;

      // if length of children is greater than 0, target first child
      if (children.length > 0) {
        document.getElementById(children[0].id).focus();
        return;
      }

      // if no children and there is a node below, target next node
      if (children.length === 0 && arr.length > index + 1) {
        document.getElementById(arr[index + 1].id).focus();
        return;
      }

      /* 
        if node is a child with no children and no siblings below, and parent 
        has a sibling node, target parent's sibling node.
      */
      if (
        children.length === 0 &&
        parIndex !== null &&
        parArr.length > parIndex + 1
      ) {
        console.log(parArr[parIndex + 1].id);
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
