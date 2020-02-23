<script>
  import {createEventDispatcher} from 'svelte';
  const dispatch = createEventDispatcher();

  import IconButton from '@smui/icon-button';
  import Card, {
    Content,
    PrimaryAction,
    ActionButtons,
    Actions,
    ActionIcons
  } from '@smui/card';
  import Button, {
    Label
  } from '@smui/button';

  export let project;

</script>

<style>
  .props,
  .numbers {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .props {
    align-items: flex-start;
  }

  .numbers {
    align-items: flex-end;
  }

  .prop,
  .number {
    flex-grow: 1;
    text-align: center;
  }

  .prop {
    color: #888;
  }

  .number {
    font-size: xx-large;
  }

  :global(.mdc-card__actions) {
    justify-content: center;
  }
</style>

<Card style="width: 100%;">
  <PrimaryAction>
    <Content class="mdc-typography--body2">
      <h2 class="mdc-typography--headline6" style="margin: 0 0 10px;">{project.name}</h2>
      <div class="props">
        <span class="prop mdc-typography--subtitle2">Quizzes</span>
      </div>
      <div class="numbers">
        <span class="number mdc-typography--headline6">{project.quizzes.length}</span>
      </div>
    </Content>
  </PrimaryAction>
  <Actions>
    <ActionButtons>
      <Button on:click={ () => dispatch("start", project) }>
        <Label>Start</Label>
      </Button>
    </ActionButtons>
  </Actions>
</Card>
