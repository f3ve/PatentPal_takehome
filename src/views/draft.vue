<template>
  <main class="main">
    <draggable
      v-model="nodes"
      draggable=".item"
      group="nodes"
      tag="ul"
      class="tree root"
    >
      <li v-for="(node, nodeIndex) in nodes" :key="node.id" class="item">
        <GraphEditor
          v-bind:node="node"
          v-bind:index="nodeIndex"
          v-bind:arr="nodes"
        />
      </li>
    </draggable>
    <button @click="showJson = true" class="button">
      <font-awesome-icon icon="arrow-right" />
    </button>
    <div class="root" id="json">
      <transition name="slide-fade">
        <div v-if="showJson">
          <JsonViewer :value="nodes" :expand-depth="5" />
        </div>
      </transition>
    </div>
  </main>
</template>

<script>
import store from '../../store';
import GraphEditor from '../components/GraphEditor';
import draggable from 'vuedraggable';
import JsonViewer from 'vue-json-viewer';

export default {
  name: 'Draft',
  data: () => ({
    nodes: store.nodes,
    showJson: false,
  }),
  components: {
    GraphEditor,
    draggable,
    JsonViewer,
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.5s;
}

.slide-fade-enter {
  width: 0;
  opacity: 0;
}

.button {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 25px;
  background-color: #c8c8c8;
  position: absolute;
  z-index: 1;
}

.button:hover {
  cursor: pointer;
}

.slide-fade-enter-to {
  width: 600px;
  opacity: 1;
}

.main {
  background-color: #c8c8c8;
  height: 100vh;
  display: flex;
  justify-content: center;
  transition: all 0.5s;
  padding: 100px;
  padding-top: 20px;
  align-items: center;
}

.root {
  background-color: white;
  width: 600px;
  max-width: 100%;
  height: 80vh;
  border-radius: 5px;
  overflow: auto;
  transition: all 0.5s;
  margin: 2px;
}

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
  border-left: 2px solid;
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
  border-top: 2px solid;
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
