<template>
  <button class="fab" @click="handleClick">
    {{ text }}
  </button>
</template>

<script>
import { fillerNodes } from '../../store';

export default {
  name: 'Fab',
  data() {
    return {
      fillerNodes, // dummy data
    };
  },
  props: {
    store: Object, // global store
  },
  methods: {
    insertDummyData() {
      // Inserts dummy data into global store
      this.store.setNodes(this.fillerNodes);
    },

    clearData() {
      // clears any data in store
      this.store.clearNodes();
    },

    handleClick() {
      // if text is clear data clears data
      if (this.text === 'Clear Data') {
        this.store.clearNodes();
      } else {
        // else insert dummy data
        this.store.setNodes(this.fillerNodes);
      }
    },
  },

  computed: {
    text: function() {
      // determines what text should be displayed on button
      if (
        this.store.nodes.length > 1 ||
        this.store.nodes[0].children.length > 0
      ) {
        return 'Clear Data';
      }
      return 'Use Demo Data';
    },
  },
};
</script>

<style scoped>
.fab {
  position: fixed;
  z-index: 2;
  bottom: 5%;
  right: 5%;
  background-color: #e04c4c;
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 16px;
  padding: 10px;
}

.fab:hover {
  cursor: pointer;
}
</style>
