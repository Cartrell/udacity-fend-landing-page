# Udacity Landing Page Project - Featuring Video Poker Demo

![](./assets/readme-banner.webp)

[Live project available here](https://gameplaycoder.com/projects/udacity/udacity-fend-landing-page/)

## About this Project
Udacity: You will be building a multi-section landing page. Often times, we don’t know how much content will be added to a page through a CMS or an API. To circumvent this problem, we can dynamically add the content to the page. We will be demonstrating this with the navigation menu. Additionally, dynamically building the navigation is a great precursor to understanding the virtual DOM which you will experience when you begin working with JavaScript frameworks.

### Udacity's Standout Functionality
✅ Hide fixed navigation bar while not scrolling (it should still be present on page load).

✅ Update/change the design/content.

✅ Add a scroll-to-top button on the page that's only visible when the user scrolls below the [fold](https://en.wikipedia.org/wiki/Above_the_fold#In_web_design) of the page.

✅ Make sections collapsible.

### My own Standout Functionality
✅ Added a simple video poker game to the bottom of the page (I am a game programmer, after all)

✅ Sample poker hands are built dynamically, depending on the cards specified in their `data-card-ids` data attribute.

## Getting Started
If you're already familiar with node and npm, see the [Quick Start](#quick-start) section. Otherwise, see the [Installing Node](#installing-node) section.

### Quick Start
1. Download or clone this repository.
1. In the project's root folder, run `npm install`.
1. To run the app, run `npm run start`. The app should open in your default browser.

### Installing Node

You must have node.js installed on your system.

To check if you already have Node.js installed, open your terminal application and run the following command from your command line tool:

```
node -v
```

If Node.js is installed, a version will be returned--something like `v16.14.2`.

If Node.js is not installed, you can install it from their website: [Nodejs.org](https://nodejs.org/en/). Make sure to select the **LTS**, "Recommended for most users," version.

#### Accessing the Working Directory

Once Node.js is installed, you will need to change your working directory to your project's root directory. All the scripts, like `npm start` or `npm lint` should run within the directory. If using a tool like Visual Studio Code, the terminal window will automatically place you in your project folder. If using your terminal application, type `cd` then drag the root project folder onto the terminal pane and hit [**enter**]. The result should be something similar to the following:

```
$ cd /Users/username/Documents/udacity-fend-landing-page
```

The path you enter will differ from the above but do note the space between `cd` and the start of the path.

#### Install Dependencies

Once in the working directory, you need to add all of the node.js dependencies for the live server and Jest to work. Anytime we download a Node.js project, this is the first step we take.

```
npm install
```

You will see a new folder has been created named `node_modules`. You can ignore this folder. Just know it holds all the stuff that makes the live server and Eslint work, and that it's pretty huge. Because of its size, we don't push it or pull it from repositories. We just rebuild it by running the previous command.

#### Accesing the working files

The application's main source file is `js/app.js`. This is the only file required by the project. However, it was getting quite stuffed due to all the functionality (including the standout functionality and the game!).

So, I created a few other `js` source files to start organizing code into smaller modules. They are also in the `js` folder.


### Running the Live Server

The live server is a tool that will auto update every time you make a change to a file in the src directory. So if you update any file in the project, there's no need to refresh. The live server will handle that for you. To view your project in the workspace, the live server is mandatory.

To start the live server, enter the following code into your terminal application or the terminal workspace pane:

```
npm run start
```

Once you have entered this code, the live server will continue to run. If you would like to stop the server, type **[control] [c]**. You will see the terminal window exit the live server.

### Using ESLint to lint your code

Linting is like a code spellchecker for JavaScript! It helps catch mistakes you might miss while writing, like typos in variable names, forgetting a semicolon, or other syntax issues. Linters can also point out suspicious code that might cause problems later.

Linters are often opinionated, and can be like tiny code dictators! While they catch errors, some also enforce specific styles, like how many spaces to indent or where to put curly braces. This can be good because it keeps your code consistent and readable for everyone working on the project. However, it can also feel restrictive at first. As you gain more experience, you may appreciate certain rules more - or even disagree with some of them. The linter rules can be adjusted to fit your needs.

By using a linter regularly, you'll write cleaner code, fewer bugs, and your projects will be easier to understand for you and other developers.

This project uses ESLint. You can lint your code at any time by running the following command:
```
npm run lint
```

If using VS Code, you can also run the lint task from with the editor. To do so:
1. Select `View` -> `Command Palette...` from the main menu.
1. Select `Tasks: Run Task`.
1. Select `npm`.
1. Select `npm lint` from the list of tasks.
1. Select `Continue without scanning the task output`.
The linting task will run.

After running it once, the task will then appear in the recently used list after selecting `Tasks: Run Task`.

Running the linter from within VS Code has the extra benefit of allowing you to go quickly navigate to the files that have errors or warnings in them.

**Note**: These instruction were taken from version `1.89.1` of VS Code. They may differ if you're using a different version.

## Built With

- Node.js (https://nodejs.com) - A JavaScript runtime for creating JavaScript servers
- Live Server (https://www.npmjs.com/package/live-server) - Live reloading for your workspace
- ESLint (https://eslint.org/) - A code analysis tool for identifying problematic patterns found in JavaScript code.
