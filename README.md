# Svelte SPA with Tailwind CSS and SPA Router on GAS

## About

I initially built a club signup for a CS50 project and then used an updated version in school for club signup. After using it and getting feedback, it has been updated.

Instead of vanilla Javascript and Bootstrap, I tried out Svelte and TailwindCSS.  Instead of pages rendered by Appscript, the app is a single page app, and uses a router.

Svelte simplified a lot of the patterns and there were always examples in the REPL that demonstrated functionality that was similar to what I was trying, so I usually didn't get stuck for very long. I tried to use as many of the built in features as possible, not because they were necessary for the app, but to try out more of Svelte's features and just to have a bit of fun.

Tailwind was easy to learn and it just took a bit of time to transition from the Bootstrap syntax.  Once I got used to it, making updates and styling was enjoyable, things generally worked in the way I expected. I still struggle with the screen sizing, and seem to have the wrong mental model for it, but it wasn't needed much in this project, so I decided to leave that learning stretch for another time.

I'm not sharing this as an example of how things "should" work together, but instead I'm sharing it in case others want to try it out or are working on something similar. 

I have been constrained by Appscript in all of my recent projects and am thinking of trying a project without the constraints of Apps Script and a spreadsheet. I am hesitant because these projects are completely free, and if you can tolerate a bit of loading time, having a database in a spreadsheet is about as accessible as you can get.

![Club Page](https://timsampson.github.io/sveltClubForm2021/clubs.gif "Club Page")

## Steps
Clone the [Svelte repo](https://svelte.dev/)

Configure tailwind with svelte, Samson Omojola’s article [How to Use Tailwind on a Svelte Site](https://css-tricks.com/how-to-use-tailwind-on-a-svelte-site/)

Add routing with svelte-spa-router,  Alessandro (Ale) Segala [ItalyPaleAle](https://github.com/ItalyPaleAle/svelte-spa-router)

Add clasp and config for Google App Script deployment,  Classroom Tech Tools [appscripts-modules-ft-svelte](https://github.com/classroomtechtools/appscripts-modules-ft-svelte)

Add tailwind forms to get better forms styling [Tailwind css-forms](https://github.com/tailwindlabs/tailwindcss-forms)
