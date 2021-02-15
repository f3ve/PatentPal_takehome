<template>
  <main class="main">
    <section>
      <h2 class="title">Graph</h2>
      <draggable
        v-model="store.nodes"
        draggable=".item"
        group="nodes"
        tag="ul"
        class="tree root"
      >
        <li
          v-for="(node, nodeIndex) in store.nodes"
          :key="node.id"
          class="item"
        >
          <GraphEditor
            v-bind:node="node"
            v-bind:index="nodeIndex"
            v-bind:arr="store.nodes"
          />
        </li>
      </draggable>
    </section>
    <button @click="showJson = true" class="button">
      <font-awesome-icon icon="arrow-right" />
    </button>
    <mq-layout mq="lg+">
      <section>
        <h2 class="title">JSON Preview</h2>
        <div class="root" id="json">
          <transition name="slide-fade">
            <div v-if="showJson">
              <JsonViewer :value="store.nodes" :expand-depth="5" />
            </div>
          </transition>
        </div>
      </section>
    </mq-layout>
    <Fob v-bind:store="store" />
  </main>
</template>

<script>
import store from '../../store';
import GraphEditor from '../components/GraphEditor';
import draggable from 'vuedraggable';
import JsonViewer from 'vue-json-viewer';
import Fob from '../components/fab';

export default {
  name: 'Draft',
  data: () => ({
    store,
    showJson: false,
  }),
  components: {
    GraphEditor,
    draggable,
    JsonViewer,
    Fob,
  },
};
</script>

<style>
.title {
  font-size: 20px;
  display: inline;
}

.slide-fade-enter-active {
  transition: all 0.5s;
}

.slide-fade-enter {
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
  padding-top: 150px;
}

.root {
  background-color: white;
  width: 100vw;
  max-width: 600px;
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

@media only screen and (max-width: 960px) {
  .button {
    display: none;
  }
}
</style>
