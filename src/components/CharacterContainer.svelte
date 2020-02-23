<script>
  import AlphabetBox from './AlphabetBox.svelte';

  export let blocks = []
  export let active;

  export let remaining = 0;
  $: remaining = blocks.map((b) => {
    return b.en.filter((e) => e.input == "_").length
  }).reduce((a, b) => a + b, 0);

  export let incorrect = 0;
  $: incorrect = blocks.map((b) => {
    return b.en.filter((e) => !e.correct).length
  }).reduce((a, b) => a + b, 0);

  function onclick(e) {
    active = e.detail;
  }
</script>

<style>
  .character-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 60px;
  }

  .character-block .ja,
  .character-block .en {
    text-align: center;
    margin: 15px;
  }
</style>

<div class="character-container">
  {#each blocks as b}
    <div class="character-block">
      <div class="ja">
        {#each b.ja as j}
          <span>{j}</span>
        {/each}
      </div>
      <div class="en">
        {#each b.en as e}
          <AlphabetBox 
            on:click={onclick}
            bind:active={active}
            bind:answer={e.text}
            bind:correct={e.correct}
            bind:input={e.input} />
        {/each}
      </div>
    </div>
  {/each}
</div>
