<script>
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
  // import Card, {
  //   Content,
  //   PrimaryAction,
  //   Media,
  //   MediaContent,
  //   Actions,
  //   ActionButtons,
  //   ActionIcons
  // } from '@smui/card';
  // import List, {
  //   Item,
  //   Text
  // } from '@smui/list';
  import Page, {
    go
  } from './Page.svelte';
  import ProjectCard from '../components/ProjectCard.svelte';

  // import { ipcRenderer as ipc } from 'electron';
  // const ipc = require('electron').ipcRenderer;

  function showLeftDrawer() {

  }

  function createProject() {

  }

  let clicked = 0;

  let p = {
    id: "1",
    name: "Project One",
    nodes: [{}, {}, {}],
    links: [],
    start: 1980,
    end: 2020
  }

  function openDialog() {
    ipc.send('open-dialogue', null);
  }
</script>

<style>
  .fab {
    position: fixed;
    bottom: 30px;
    right: 30px;
  }
</style>

<Page>
  <nav slot="bar">
    <Row>
      <Section>
        <IconButton class="material-icons" on:click={showLeftDrawer}>menu</IconButton>
        <Title>Projects</Title>
      </Section>
      <Section align="end" toolbar>
        <IconButton class="material-icons" on:click={openDialog}>settings</IconButton>
      </Section>
    </Row>
  </nav>
  <div slot="content" style="padding: 30px;">

    <ProjectCard bind:project={p} />
    <ProjectCard bind:project={p} />
    <ProjectCard bind:project={p} />
    <ProjectCard bind:project={p} />
    <ProjectCard bind:project={p} />

    <div class="fab">
      <Fab on:click={createProject}>
        <Icon class="material-icons">add</Icon>
      </Fab>
    </div>
  </div>
</Page>
