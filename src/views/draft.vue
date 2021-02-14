<template>
  <main>
    <draggable
      v-model="nodes"
      draggable=".item"
      group="nodes"
      tag="ul"
      class="tree"
    >
      <li v-for="(node, nodeIndex) in nodes" :key="node.id" class="item">
        <GraphEditor
          v-bind:node="node"
          v-bind:index="nodeIndex"
          v-bind:arr="nodes"
        />
      </li>
    </draggable>
  </main>
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

<style>
.tree,
.tree ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tree ul {
  margin-left: 0.4em;
  position: relative;
}

.tree ul ul {
  margin-left: 0.3em;
}

.tree ul:before {
  content: '';
  display: block;
  width: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  border-left: 1px solid;
}

.tree li {
  margin: 0;
  padding: 0 0.8em;
  line-height: 2em;
  color: #555;
  font-weight: 700;
  position: relative;
}

.tree ul li:before {
  content: '';
  display: block;
  width: 10px;
  height: 0;
  border-top: 1px solid;
  margin-top: -1px;
  position: absolute;
  top: 1em;
  left: 0;
}

.tree ul li:last-child:before {
  background: #fff;
  height: auto;
  top: 1em;
  bottom: 0;
}
</style>
