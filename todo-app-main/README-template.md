# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot] 
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![Desktop view light screenshot](./screenshot.jpg)

![Desktop view dark screenshot](./screenshot.jpg)

!Mobile view light screenshot[](./screenshot.jpg)

![Mobile view dark screenshot](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla Javascript (DOM manipulation, Event Delegation, MutationObserver)

### What I learned

-I learnt how to use Event Delegation on the the container to handle dynamically created items and delete buttons efficiently.

-I implemented a MutationObserver to keep the item counter dynamically updated whenever taks were added or removed.
```js
const observer = new MutationObserver(function() {
    listAmount();
});

observer.observe(todoListContainer, {
    childList: true
});
```

-I styled my native HTML checkboxes (appearance: none) to support custom gradients.

- I handled the theme switching by toggling a class on the <body> and dynamically swapping desktop and mobile background images using 
``` js 
const isMobile = window.innerWidth <= 768; 
```

### Continued development

The areas i want to focus on in future is calling APIs, saving user data even after page reload i.e cookies.

### AI Collaboration

- Google Gemini AI
- Used Gemini AI assistant for debugging guidance and conceptual explanations on vanilla JS event handling
- What worked well: 
Drag and Drop to reorder,
Mutation Observer.
- What didn't work well: adding a gradient to my ```html 
<input type="checkbox">
``` Border.

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/Naeemah Codes)
- Twitter - [@yourusername](https://www.twitter.com/anebira_dev)
