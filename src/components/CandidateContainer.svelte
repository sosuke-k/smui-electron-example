<script context="module">
  function randomAlphabet() {
    let c = "abcdefghijklmnopqrstuvwxyz";
    let cl = c.length;
    return c[Math.floor(Math.random() * cl)];
  }

  function shuffle([...array]) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  export function createCandidates(blocks) {
    let cans = [];
    for (let b of blocks) {
      for (let e of b.en) {
        cans.push(e.text);
      }
    }
    cans.push(randomAlphabet());
    return shuffle(cans);
  }
</script>

<script>
  import {
    createEventDispatcher
  } from 'svelte';
  const dispatch = createEventDispatcher();

  export let candidates = [];
  export let active;

  function onclick(e) {
    deleteCandidate(e.target);
    if (active.innerText != "_") {
      candidates.push(active.innerText);
    }
    dispatch("click", e.target.innerText);
  }

  function deleteCandidate(target) {
    let i = Number.parseInt(target.getAttribute("i"));
    candidates = candidates.filter((_, index) => index !== i);
  }
</script>

<style>
  .candidate-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-size: 60px;
  }

  /* .character-block .ja, */
  .character-block .en {
    text-align: center;
    margin: 15px;
  }
</style>



<div class="candidate-container">
  {#each [...Array(candidates.length)].map((v, i) => i) as n}
    <div class="character-block">
      <div class="en">
        <span on:click={onclick} i={n}>{candidates[n]}</span>
      </div>
    </div>
  {/each}
</div>
