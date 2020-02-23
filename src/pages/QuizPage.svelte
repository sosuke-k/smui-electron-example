<script>
  // svelte
  import {
    createEventDispatcher
  } from 'svelte';
  const dispatch = createEventDispatcher();

  // my component
  import QuizContainer from "../components/QuizContainer.svelte";

  // If you use dummy quizzes
  // import dummies from '../data/dummy.js';
  // let quizzes = dummies;

  export let quizzes = [];

  let qIdx = 0;

  function onFinish(e) {
    if (e.detail == "次の問題") {
      qIdx = qIdx + 1;
    } else {
      dispatch("finish");
    }
  }
</script>

<style>
  .quiz-container {
    width: 100%;
    height: 100%;
  }
</style>

{#each quizzes as q}
  {#if qIdx == q.idx}
    <div class="quiz-container">
      <QuizContainer bind:quiz={q} bind:num={quizzes.length} on:finish={onFinish} />
    </div>
  {/if}
{/each}
