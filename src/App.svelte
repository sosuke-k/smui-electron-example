<script>
  // electron
  const ipc = require('electron').ipcRenderer;

  // smui component
  import Drawer, {
    AppContent,
    Content,
    Header,
    Subtitle,
    Scrim
  } from '@smui/drawer';
  import List, {
    Item,
    Text,
    Graphic,
    Separator,
    Subheader
  } from '@smui/list';
  import TopAppBar from '@smui/top-app-bar';
  import {
    Row,
    Section,
    Title
  } from '@smui/top-app-bar';
  import Button, {
    Label,
    Icon
  } from '@smui/button';
  import IconButton from '@smui/icon-button';
  import Fab from '@smui/fab';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text/index';

  // my component
  import ProjectCard from './components/ProjectCard.svelte';

  // page
  import QuizPage from './pages/QuizPage.svelte';

  // transition
  import slide from './transitions/svelte-transition-slide.js';

  let drawerOpened = false;
  let page = 'Projects';
  let dir = "$HOME/ASQ"
  let projects = [];
  let quizzes = []; // to forward it to a quiz page
  let testing = false;

  function setPage(value) {
    page = value;
    drawerOpened = false;
  }

  function createProject() {
    alert("Not implemented...");
  }

  function setDirectory() {
    alert("Not implemented...\nPleas put excel files under the $HOME/ASQ directory.");
  }

  function startQuiz(e) {
    console.log(`Start the ${e.detail.name} quiz`);
    quizzes = e.detail.quizzes;
    testing = true;
  }

  function handleKeydown(e) {
    if (e.key == "Escape") {
      testing = false;
    }
  }

  function loadProjects(d) {
    ipc.send("load-projects", d);
  }

  ipc.on("return-project", (event, args) => {
    projects.push(args);
    projects = projects.slice();
    console.log(`The number of projects is ${projects.length}.`);
  });

  loadProjects(dir);
</script>

<svelte:window on:keydown={handleKeydown} />

<style>
  .page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    margin: 0px;
    padding: 0px;
    overflow: scroll;
  }

  .page::-webkit-scrollbar {
    display: none;
  }

  .fab {
    position: fixed;
    bottom: 30px;
    right: 30px;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  }

  .card {
    width: 240px;
    margin: 20px;
  }

  .setting-container {
    display: flex;
    flex-direction: column;
    padding: 30px;
  }
</style>

<div class="page" style="z-index:0;">
  <!-- Drawer -->
  <Drawer variant="modal" bind:open={drawerOpened}>
    <Header>
      <Title>Alphabet Sorting Quiz</Title>
      <Subtitle>It's an application to give alphabet sorting quizzes.</Subtitle>
    </Header>
    <Content>
      <List>
        <Separator nav />
        <Item on:click={()=> setPage('Projects')} activated={page === 'Projects'}>
          <Graphic class="material-icons" aria-hidden="true">view_module</Graphic>
          <Text>Projects</Text>
        </Item>
        <Item on:click={()=> setPage('Settings')} activated={page === 'Settings'}>
          <Graphic class="material-icons" aria-hidden="true">settings</Graphic>
          <Text>Settings</Text>
        </Item>
      </List>
    </Content>
  </Drawer>

  <Scrim />

  <AppContent class="app-content">
    <!-- Toolbar -->
    <TopAppBar variant="static" color="primary">
      <Row>
        <Section>
          <IconButton class="material-icons" on:click={()=> drawerOpened = !drawerOpened}>menu</IconButton>
          <Title>{page}</Title>
        </Section>
      </Row>
    </TopAppBar>

    <!-- Main (Project page) -->
    {#if page === 'Projects'}
      <div class="card-container">
        {#each projects as p}
          <div class="card">
            <ProjectCard bind:project={p} on:start={startQuiz} />
          </div>
        {/each}
      </div>

      <div class="fab">
        <Fab on:click={createProject}>
          <Icon class="material-icons">add</Icon>
        </Fab>
      </div>
    {/if}

    <!-- Main (Setting page) -->
    {#if page === 'Settings'}
      <div class="setting-container">
        <div style="margin-bottom: 15px;">
          <Button variant="unelevated" on:click={setDirectory}>
            <Label>Choose Directory</Label>
          </Button>
        </div>
        <Textfield disabled variant="outlined" bind:value={dir} label="Label" input$aria-controls="helper-text-outlined" input$aria-describedby="helper-text-outlined" />
        <HelperText id="helper-text-outlined">Sorry, you can't choose the directory.</HelperText>
      </div>
    {/if}

  </AppContent>
</div>

<!-- Quiz -->
{#if testing}
  <div class="page" style="z-index:1;" transition:slide>
    <QuizPage bind:quizzes on:finish={()=> testing = false}/>
  </div>
{/if}
