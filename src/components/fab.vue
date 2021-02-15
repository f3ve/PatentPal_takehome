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
      fillerNodes,
    };
  },
  props: {
    store: Object,
  },
  methods: {
    insertDummyData() {
      this.store.setNodes(this.fillerNodes);
    },

    clearData() {
      this.store.clearNodes();
    },

    handleClick() {
      if (this.text === 'Clear Data') {
        this.store.clearNodes();
      } else {
        this.store.setNodes(this.fillerNodes);
      }
    },
  },

  computed: {
    text: function() {
      if (
        this.store.nodes.length > 1 ||
        this.store.nodes[0].children.length > 0
      ) {
        return 'Clear Data';
      }
      return 'Demo Data';
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
  font-size: 20px;
  width: 75px;
  height: 75px;
}

.fab:hover {
  cursor: pointer;
}
</style>
