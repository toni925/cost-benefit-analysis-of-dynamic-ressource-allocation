# Cost-Benefit Analysis of Dynamic Resource Allocation

This project was developed as part of my bachelor's thesis titled "Development of a web application for cost-benefit analysis of HPC innovations."
It provides an interactive web application that allows users to analyze and evaluate dynamic resource allocation strategies—particularly regarding cost efficiency and performance in high-performance computing (HPC) environments.

The app enables users to simulate different scenarios and visualize their effects on utilization, costs, and optimization potential.

## Overview

The goal of this project is to offer a tool that helps decision-makers in HPC environments understand when switching from static to dynamic resource allocation becomes cost-effective.
It allows modeling of various parameters such as resource costs, workload characteristics, and runtime durations, and displays the resulting trade-offs through charts and performance metrics.

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
