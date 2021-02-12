<template>
  <div>
    <draggable v-model="nodes" draggable=".item" group="nodes">
      <div v-for="(node, nodeIndex) in nodes" :key="node.id" class="item">
        <GraphEditor
          v-bind:node="node"
          v-bind:index="nodeIndex"
          v-bind:arr="nodes"
        />
      </div>
    </draggable>
  </div>
</template>

<script>
import store from '../../store';
import GraphEditor from '../components/GraphEditor';
import draggable from 'vuedraggable';

export default {
  name: 'Draft',
  data: () => ({
    nodes: store.nodes,
  }),
  components: {
    GraphEditor,
    draggable,
  },
};
</script>
