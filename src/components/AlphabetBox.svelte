<script>
  import {
    afterUpdate
  } from 'svelte';
  import {
    createEventDispatcher
  } from 'svelte';
  const dispatch = createEventDispatcher();

  afterUpdate(() => {
    if (input != self.innerText) input = self.innerText;
  });

  let self;
  export let active = null;
  export let answer;
  export let input = "_";
  export let correct;
  $: correct = (answer == input);
</script>

<style>
  span {
    display: inline-block;
    border: 1px solid black;
    width: 48px;
    margin: 5px;
  }

  span.elevated {
    box-shadow: 0 2px 4px -1px rgba(255, 62, 0, .2), 0 4px 5px 0 rgba(255, 62, 0, .14), 0 1px 10px 0 rgba(255, 62, 0, .12);
    border: 1px solid #ff3e00;
  }
</style>

<span 
  bind:this={self}
  class:elevated="{self === active}"
  on:click={()=> dispatch("click", self)} >{input}</span>
