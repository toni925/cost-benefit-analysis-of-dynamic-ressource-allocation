<script>
  import "../app.postcss";
  import Icon from "/src/lib/images/Logo_of_the_Technical_University_of_Munich.svg.png";
  import { getStores, navigating, page, updated } from '$app/stores';
  
  console.log($page.route.id)
  const nav = [
    {title: "Getting Started", path: "/"},
    {title: "General Project Information", path: "/generalprojectinformation"},
    {title: "Research Phase", path: "/researchphase"},
    {title: "Transition Phase", path: "/transitionphase"},
    {title: "Deployment Phase", path: "/deploymentphase"},
  ];
</script>
{#if $page.route.id !== "/costbenefitanalyse"}
<div class="navbar bg-base-100 shadow">
  <div class="navbar-start">
    <div class="w10 rounded-full">
    <img src={Icon} style="height: 50px; width: 100px;" alt="TUM Logo"/>
  </div>
</div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      {#each nav as item}
      <li><a class:active={$page.route.id === item.path} href={item.path} style="font-size: 16px; font-weight: bold;">{item.title}</a></li>
      {/each}
    </ul>
  </div>
  <div class="navbar-end">
    </div>
</div>
{/if}
<html/>
<style>
  .active {
    /*
    text-decoration: underline;
    text-decoration-color: #0065BD;
    */
  }
  html {
    height: 100%;
    background-color: #fafafa; 
    font-family: 'IBM Plex Sans';
  }
</style>

<slot />
