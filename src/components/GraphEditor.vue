<template>
  <span>
    <font-awesome-icon :icon="renderClass" :class="renderClass" />
    <input
      v-model="node.text"
      type="text"
      class="nodeInput"
      v-on:keydown.delete="removeNode"
      v-on:keypress.enter="addNewNode"
      v-on:keydown.up="handleUp"
      v-on:keydown.down="handleDown"
      v-on:keydown.exact.tab="handleTab"
      v-on:keydown.exact.shift.tab="handleShiftTab"
      :id="node.id"
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
  },
  data: () => ({
    store,
  }),
  mounted: function() {
    if (this.store.target !== null) {
      console.log('mounted');
      document.getElementById(this.store.target).focus();
      this.store.clearTarget();
    }
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
      const { arr, index } = this;
      const parId = this.parArr ? this.parArr[this.parIndex].id : null; // parent id to assign to new node

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
        this.removeNode(e);
        return;
      }

      // if there is a node with children and it's last child does not have children target last child
      if (
        nodeUp &&
        nodeUp.children.length > 0 &&
        nodeUp.children[nodeUp.children.length - 1].children.length === 0
      ) {
        document
          .getElementById(nodeUp.children[nodeUp.children.length - 1].id)
          .focus();
        this.removeNode(e);
        return;
      }

      // if current node is a child and it does not have a sibling node above, target parent
      if (!nodeUp && parIndex !== null) {
        document.getElementById(parArr[parIndex].id).focus();
        this.removeNode(e);
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
        this.removeNode(e);
        return;
      }

      // if no children and there is a node below, target next node
      if (children.length === 0 && arr.length > index + 1) {
        document.getElementById(arr[index + 1].id).focus();
        this.removeNode(e);
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
        this.removeNode(e);
        return;
      }

      /*
        if node is a child with no children and it's parent does not have a 
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
  },
};
</script>

<style scoped>
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
  margin-left: -5px;
}

.caret-down {
  font-size: 16px;
  margin-right: 10px;
}
</style>
