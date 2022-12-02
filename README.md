# Inspos - Production Branch

Next, Tailwind & Contentful app bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Add elements that inspire you in a form of a data model in Contentful and see them in a clean Tailwind UI with a blazing fast loading time thanks to the Next.js server side logic ✨

## Setup ⚙

Project uses [Yarn](//yarnpkg.com/) as a front-end dependency manager. Make sure your development machine has installed following dependencies:

- [Node](//nodejs.org/)
- [Yarn](//yarnpkg.com/)

When this is ready, start with cloning the repository to the current working directory.

```bash
# Clones project to the `next-contentful-poc` directory
$ git clone https://github.com/KacperBiedka/next-contentful-poc.git
```

To properly bootstrap project, you have to fetch some required dependencies and generate its assets. Before that, make sure that you are in the root folder where package.json file is located. Then simply run yarn's installation command.

```bash
# Installs all project dependencies.
$ yarn install
```

## Development 👨‍💻

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Building 🏗

In order to generate static files that are production-ready, you need to build and export the project

```bash
# Outputs static `.html` files and website assets to the `out/` directory.
$ yarn export
```

## Reasoning behind this project 💡

I've came up with the idea for this project to learn Tailwind & Contentful integration with Next. This example incorporates path generation based on slugs coming from the Contentful data model.

It also poses a challenge in a form of integrating the Contentful models with proper Typescript support (I've used a nifty codegen to acheive that automatically).

Possible improvement: Include schema codegen in CI instead of including the files in the repo :)

## Vercel 🔼

This project has been deployed on he [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). The environment keys used by the deployment has also been setup there.
