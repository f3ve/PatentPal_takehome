/* 
  Helpers methods for navigating DOM
*/

export default {
  searchForNextNodeDown(id) {
    /*
      Searches for next node down by looping through nodeInputs until it finds 
      specified input.
    */
    const inputs = document.getElementsByClassName('nodeInput');
    for (let i = 0, inputLength = inputs.length; i < inputLength; i++) {
      if (inputs[i].id === id) {
        document.getElementById(inputs[i + 1].id).focus();
        return;
      }
    }
  },

  searchForNextNodeUp(id) {
    /* 
      Searches for next node up by looping through nodeInputs until it finds 
      specified input.
    */
    const inputs = document.getElementsByClassName('nodeInput');
    for (let i = 0, inputLength = inputs.length; i < inputLength; i++) {
      if (inputs[i].id === id) {
        document.getElementById(inputs[i - 1].id).focus();
      }
    }
  },

  tabBack(args) {
    /* 
      Copies current node as a child of parent array, sets the new node as 
      target and removes current node from array.
    */
    args.parentArray.splice(args.parentIndex + 1, 0, args.node);
    document.getElementById(args.node.id).id = 'clear';
    args.store.setTarget(args.node.id);
    args.arr.splice(args.index, 1);
  },

  tabForward(args, nodeAbove) {
    /* 
      Copies current node as a child of sibling above, sets new node as target,
      and removes current node from array.
    */
    nodeAbove.children.push(args.node);
    args.store.setTarget(args.node.id);
    args.arr.splice(args.index, 1);
  },

  targetLastChildOfNode(node) {
    /* 
      targets last child of specified node
    */
    document.getElementById(node.children[node.children.length - 1].id).focus();
  },
};
