<template>
  <span>
    <font-awesome-icon :icon="renderClass" :class="renderClass" />
    <input
      v-model="node.text"
      class="nodeInput"
      v-on:keydown.delete="removeNode"
      v-on:keypress.enter="addNewNode"
      v-on:keydown.up="handleUp"
      v-on:keydown.down="handleDown"
      v-on:keydown.exact.tab="handleTab"
      v-on:keydown.exact.shift.tab="handleShiftTab"
      :id="node.id"
      :size="node.text"
      v-on:blur="onBlur"
      placeholder="New Node..."
    />
    <draggable
      v-model="node.children"
      draggable=".child"
      group="nodes"
      class="childContainer"
      tag="ul"
      @change="focusId = null"
    >
      <li
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
          v-bind:parId="node.id"
        />
      </li>
    </draggable>
  </span>
</template>

<script>
import draggable from 'vuedraggable';
import store from '../../store';
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
    parId: String, // Parent ID
  },
  data: () => ({
    store,
  }),
  mounted: function() {
    if (this.store.target !== null) {
      document.getElementById(this.store.target).focus();
      this.store.clearTarget();
    }
  },
  watch: {
    node: {
      immediate: true,
      deep: true,
      handler() {
        // if node has children set type to concept
        if (this.node.children.length > 0) {
          this.node.type = 'CONCEPT';
        } else {
          this.node.type = 'CONTEXT';
        }
      },
    },

    parId: {
      immediate: true,
      handler() {
        this.node.parent = this.parId;
      },
    },
  },
  computed: {
    renderClass: function() {
      /*
        determines if a circle or caret should be rendered
      */
      if (this.node.children.length < 1) {
        return 'circle';
      }
      return 'caret-down';
    },
  },
  methods: {
    addNewNode(e) {
      const { arr, index, parId } = this;

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
        this.store.setTarget(newNode.id);
        // using splice to insert new node as next index in array
        arr.splice(index + 1, 0, newNode);
      }
    },

    removeNode(e) {
      const { arr, index } = this;

      // if current input length is less than 1 or "Delete" key is pressed removes node
      if (
        (e.target.value.length < 1 || e.key === 'Delete') &&
        (this.parArr || (!this.parArr && arr.length > 1))
      ) {
        e.preventDefault();
        if (e.key === 'Delete') {
          arr.splice(index, 1);
        }
        if (e.key === 'Delete' || e.key === 'Backspace') {
          this.handleUp(e);
        }
      }
    },

    handleUp(e) {
      e.preventDefault();

      const { index, arr, parId } = this;
      const nodeUp = arr[index - 1];

      // if there is a node above current node with no children target that node
      if (nodeUp && nodeUp.children.length === 0) {
        document.getElementById(nodeUp.id).focus();
        return;
      }

      // if node above has children and it's last child does not have children target last child
      if (
        nodeUp &&
        nodeUp.children.length > 0 &&
        nodeUp.children[nodeUp.children.length - 1].children.length === 0
      ) {
        document
          .getElementById(nodeUp.children[nodeUp.children.length - 1].id)
          .focus();

        return;
      }

      // if current node is a child and it does not have a sibling node above, target parent
      if (!nodeUp && parId) {
        document.getElementById(parId).focus();
        return;
      }

      // if there is a node above with deeply nested children traverse DOM for next input
      if (
        nodeUp &&
        nodeUp.children[nodeUp.children.length - 1].children.length > 0
      ) {
        const inputs = document.getElementsByClassName('nodeInput');
        for (let i = 0, il = inputs.length; i < il; i++) {
          if (inputs[i].id === this.node.id) {
            document.getElementById(inputs[i - 1].id).focus();
          }
        }
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
        document.getElementById(parArr[parIndex + 1].id).focus();
        return;
      }

      /*
        if node is a child with no children and it's parent does not have a sibling
        search DOM for next input
      */
      if (children.length === 0 && parIndex !== null && !parArr[parIndex + 1]) {
        const inputs = document.getElementsByClassName('nodeInput');
        for (let i = 0, il = inputs.length; i < il; i++) {
          if (inputs[i].id === this.node.id) {
            document.getElementById(inputs[i + 1].id).focus();
            return;
          }
        }
      }
    },

    handleTab(e) {
      e.preventDefault();
      const { arr, node, index } = this;
      const nodeAbove = arr[index - 1];

      /*
        If sibling node above push current node into node above children and remove current node
      */
      if (nodeAbove) {
        nodeAbove.children.push(node);
        this.store.setTarget(node.id);
        arr.splice(index, 1);
      }
    },

    handleShiftTab(e) {
      e.preventDefault();

      const { parArr, arr, node, parIndex, index } = this;

      /*
        if node is a child insert it as next sibling to parent
      */
      if (parArr) {
        parArr.splice(parIndex + 1, 0, node);
        document.getElementById(node.id).id = 'clear';
        this.store.setTarget(node.id);
        arr.splice(index, 1);
      }
    },

    onBlur(e) {
      // removes node if value is less than 1 and it is not the only node in the editor
      // will not remove node if it has children, user can press delete to delete a node and it's children
      if (
        ((e.target.value.length < 1 && this.parArr) ||
          (e.target.value.length < 1 && this.arr.length > 1 && !this.parArr)) &&
        this.node.children.length === 0
      ) {
        this.arr.splice(this.index, 1);
      }
    },
  },
};
</script>

<style scoped>
.nodeInput {
  display: inline;
  border: none;
  padding: 0;
  margin: 0;
  width: 80%;
  background-color: transparent;
}

.nodeInput:focus {
  border: none;
  outline: 1px dotted lightblue;
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
