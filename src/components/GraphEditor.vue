<template>
  <div>
    <draggable>
      <div :key="1">
        <h1>Draggable section</h1>
        <draggable>
          <p :key="'child1'">Child 1</p>
          <p :key="'child2'" >Child 2</p>
          <p :key="'child3'">Child 3</p>
        </draggable>
      </div>
      <h2 :key="2">Drag me</h2>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'GraphEditor',
  components: {
    draggable
  }
}
</script>