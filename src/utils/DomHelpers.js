/* 
  Helpers methods for navigating DOM
*/

export default {
  SearchForNextNodeDown(id) {
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

  SearchForNextNodeUp(id) {
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
};
