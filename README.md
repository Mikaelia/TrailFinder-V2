# TrailFinderV2

Welcome to TrailfinderV2!

> View Live at https://intense-tundra-32731.herokuapp.com/login

TrailfinderV1 was first dive into React. Reviewing it after a bit more learning, I've decided to improve this application by refactoring my code and design!

## Features

This application is built with React, styled with Sass, and integrates Firebase for user authentication, and database management.

In this version of Trailfinder, I removed Redux because I felt that for an application of this size it was unnessary, and I also wanted practice in working with Firebase without Redux.

TrailFinder2 adds a Facebook OAuth login option, trail search filters, and an automatically updating, pre-populated trail list. In addition, I switched my styling strategy from CSSModules to Sass, and have improved the responsiveness of the application layout.

This app can:

- [x] Allow you to create your own account, and login with either email/pass or via Facebook
- [x] Return a list of trails near you, based off of your geolocation
- [x] Give you the power to pre-filter the trails that are returned, and select your own region on a map
- [x] Select and save your favorite trails, which may then be viewed in the "Trailmarks" section of the application

Goals:

- [] Provide modals with extensive trail details, pictures, and a link to trailhead directions
- [] Create necessary alerts for user interaction
- [] Sort trailmarks based of various features

### ScreenShots

![intro](public/screenShots/intro.png)
![color-cards](public/screenShots/colorCards.png)
![palette options](public/screenShots/paletteOptions.png)
