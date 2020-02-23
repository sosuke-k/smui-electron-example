<script>
  // svelte
  import {
    onMount
  } from 'svelte';
  import {
    createEventDispatcher
  } from 'svelte';
  const dispatch = createEventDispatcher();

  // smui component
  import Dialog, {
    Title,
    Content,
    Actions,
    InitialFocus
  } from '@smui/dialog';
  import Button, {
    Label
  } from '@smui/button';

  // my component
  import CharacterContainer from './CharacterContainer.svelte';
  import CandidateContainer, {
    createCandidates
  } from './CandidateContainer.svelte';

  export let quiz;
  export let num; // to know the last quiz
  let active = null;
  let candidates;
  let hint = "";
  let remaining;
  let incorrect;
  let dialog;
  $: next = quiz.idx >= (num - 1) ? "終わり" : "次の問題"

  onMount(async () => {
    candidates = createCandidates(quiz.blocks);
  });

  function onCandidateClicked(e) {
    active.innerText = e.detail;
    console.log("onCandidateClicked", remaining, incorrect);
    // a remaining variable is not update yet because input binding variables were updated by afterUpdate function
    if (remaining <= 1) setTimeout(onFinished, 500);
  }

  function onFinished() {
    console.log("onFinished", remaining, incorrect);
    if (remaining > 0) return;
    if (incorrect == 0) {
      dialog.open();
    } else {
      hint = quiz.hint;
    }
  }
</script>

<style>
  .description-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 40px;
  }
</style>

<Dialog bind:this={dialog} aria-labelledby="simple-title" aria-describedby="simple-content">
  <Title id="simple-title">正解！</Title>
  <Actions>
    <Button on:click={() => dispatch("finish", next)}>
      <Label>{next}</Label>
    </Button>
  </Actions>
</Dialog>

<div class="description-container" style="width: 100%; height: 30%; background-color: white;">
  <div>ヒント：{hint}</div>
  <div>不正解数：{incorrect}</div>
  <div>{quiz.desc}</div>
</div>
<div style="width: 100%; height: 30%; background-color: white; border-top: 1px solid black;">
  <CharacterContainer bind:blocks={quiz.blocks} bind:active bind:remaining bind:incorrect />
</div>
<div style="width: 100%; height: 40%; background-color: white; border-top: 1px solid black;">
  <CandidateContainer bind:candidates bind:active on:click={onCandidateClicked} />
</div>
