# patentpal_take_home

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## Description

This is a demo graph editor built for the patentPal team. It features a full functional Graph Editor with intuitive controls. Keyboard controls were largely inspired by editors like VScode and Atom.

To the team at PatentPal, Thank you very much for taking the time to review my project and considering me for this role. I Look forward to presenting this to you and receiving your feedback

- Visit the live [Demo](https://patent-pal-takehome.vercel.app/)
- Or follow the the project set up instructions to run locally.

## Core Tech Libraries/Frameworks

- [VueJS](https://vuejs.org/)
- [VueDraggable](https://github.com/SortableJS/Vue.Draggable)

## How to Use

### Inserting Demo Data and clearing Data

Press the floating action button on the Draft page to insert Demo data, You can also press it to clear any data you currently have entered

### Controls

- `ENTER`: Creates a new node
- `TAB`: Indents current node
- `SHIFT-TAB`: Un-indents current node
- `UP-ARROW`: Moves cursor up one node
- `DOWN-ARROW`: Moves cursor down one node
- `LEFT and RIGHT ARROWS`: moves cursor left and right inside input.
- `BACKSPACE`: Removes text and deletes node it it is empty
- `DELETE`: Deletes node and all it's content

### Showing JSON Preview

_Only on large screens_

Click the arrow button in the middle of the screen to toggle the JSON preview on and off

### Drag and Drop

You can click and drag any node in the editor. Grabbing a parent node will move all of it's children also.
