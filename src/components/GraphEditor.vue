<template>
  <div>
    <font-awesome-icon
      :icon="node.children.length < 1 ? 'circle' : 'caret-down'"
      :class="node.children.length < 1 ? 'circle' : 'caret-down'"
    />
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
  updated: function() {
    if (this.focusId) {
      document.getElementById(this.focusId).focus();
      this.focusId = null;
    }
  },
  components: {
    draggable,
  },
  props: {
    node: Object,
    index: Number,
    arr: Array,
    parArr: Array,
    parIndex: Number,
  },
  data: () => ({
    focusId: null,
  }),
  watch: {
    focusId: function(val) {
      if (val) {
        document.getElementById(val).focus();
      }
    },
  },
  methods: {
    addNewNode(e) {
      const { arr, index } = this;
      const parId = this.parArr[this.parIndex].id;
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
    removeNode(e) {
      const { index, arr } = this;
      if (e.target.value.length < 1 || e.key === 'Delete') {
        console.log('remove');
        e.preventDefault();
        console.log(index, arr);
        arr.splice(index, 1);
        document.getElementById(arr[index - 1].id).focus();
      }
    },
    handleUp(e) {
      e.preventDefault();
      const { index, arr, parArr, parIndex } = this;

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
    handleDown(e) {
      e.preventDefault();
      const {
        node: { children },
        arr,
        index,
        parIndex,
        parArr,
      } = this;

      if (children.length > 0) {
        console.log('ran 1');
        document.getElementById(children[0].id).focus();
        return;
      }

      if (children.length === 0 && arr.length > index + 1) {
        console.log('ran 2');
        document.getElementById(arr[index + 1].id).focus();
        return;
      }

      if (
        children.length === 0 &&
        parIndex !== null &&
        parArr.length > parIndex + 1
      ) {
        console.log('ran 3');
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
