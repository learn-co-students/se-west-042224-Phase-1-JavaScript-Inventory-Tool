---
theme : "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: false
title: "P1L1 - Functions & Scope slides"
---

# Functions & Scope

---

#### Guidelines

<div style="display: flex; flex-direction: row">
  <div style="width: 30%">
    <iframe src="https://giphy.com/embed/UtKQmptld4nXOTBBdQ" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/cbc-schitts-creek-UtKQmptld4nXOTBBdQ">via GIPHY</a></p>
  </div>
  <div style="width: 70%">

  - The more you participate the more you learn! 
  - Use Zoom's Raise Hand feature {.fragment}
  - Protect the Zoom chat! {.fragment}
  - 🤯 The moment you are confused, raise your hand. You're not alone! {.fragment}
  - "I don't know" is OK. Guessing is also OK! Mistakes => Learning! {.fragment}
  - 📷 on 🙏 {.fragment}


  </div>

</div>

---

#### Coding Along (not required!)

<div style="display: flex; flex-direction: row">
  <div style="width: 30%">
    <iframe src="https://giphy.com/embed/VTc0g9IKEpLAk" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/funny-everyone-VTc0g9IKEpLAk">via GIPHY</a></p>
  </div>
  <div style="width: 70%">

  - it can help
  - it can also hurt 😬 {.fragment}
  - If you get stuck, take a screenshot and refocus on our discussion {.fragment}
  - 💡Everything is recorded! {.fragment}
  - Focus on high level understanding > implementation {.fragment}
  - Comfort solving errors and fixing bugs will come with practice and experience {.fragment}


  </div>

</div>


---

<div style="font-size: 0.75em">

### My Setup

##### VSCode extensions:

Extension | Description |
---------|----------|
 [Draw.io Integation](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) | for making diagrams from within VSCode 
 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) | for opening a webpage in the browser that will reload when the code is saved 
 [vscode-reveal](https://marketplace.visualstudio.com/items?itemName=evilz.vscode-reveal) | for opening the slide.md files in the browser to display slideshows
 [Tabnine AI Autocomplete](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode) | for code completion suggestions based on context

</div>

---

## Lecture Goals

- Describe what functions are
- Regular functions vs arrow functions syntax
- Explain the difference between:
  - Block scope
  - Function scope
  - Global scope
- Understand functions as first-class objects
- Identify higher-order functions
- Define callback functions and higher-order functions


---

## Functions

![functions](./functions.drawio.svg)


---

### () => {} vs function() {}

![regular to arrow function conversion](https://res.cloudinary.com/dlzuobe8h/image/upload/v1670868682/phase1/reg-to-arrow-function_bqrtqj.gif)

- syntax {.fragment}
- simplified vs fully featured {.fragment}
- interchangeable for now (hoisting! 😅) {.fragment}
- read more about [differences](https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/) (or feel free to bookmark for later) {.fragment}

![arrow function to reegular function conversion](https://res.cloudinary.com/dlzuobe8h/image/upload/v1670868681/phase1/arrow-to-reg-function_snfnkx.gif)

---

#### Scope & The Scope Chain
![Scope and the Scope Chain](https://res.cloudinary.com/dlzuobe8h/image/upload/v1665447423/1_S9gu5XK8LBTSVddsGdBtGg_kq2mnh.png)

[Awesome Blog post on Scope and the Scope Chain](https://medium.com/joonsikyang/scope-and-the-scope-chain-27216a853a4e)

---

#### Visualizing Scope
![Scope Castle Visual Metaphor](./scope-castle.png)

---

### Callbacks and HOF

![Callbacks pt1](./callbacks-pt-1.drawio.svg)

<div style="font-size: 0.75em">

#### Higher Order Functions

- accept a function as a parameter
- (and/or) return a function

</div>

---

<div style="font-size: 0.75em">

### Let's Code!

Function | Parameters | Behavior
---------|----------|---------
 helloWorld | none | returns "Hello, world!"
 formatPrice | price (float) | returns the price like so: "$2.99" 
 blurb | book (obj) | returns a string representation of the book with title author and price

</div>

---

### Callbacks and Iteration

![Callbacks pt2](./callbacks-pt-2.drawio.svg)

---

<div style="font-size: 0.75em">

### Links!


Resource | Location | Description
---------|----------|---------
 Starter Code | [GitHub Repo](https://github.com/learn-co-students/se-west-042224-Phase-1-JavaScript-Inventory-Tool) | separate folder for each day's lecture contains the code and any related assets
 Recordings | [Google Sheet](https://docs.google.com/spreadsheets/d/1Wbw7L5muVIcYXOJ9Vo50FVKov5imoUva2O-Q7rh_U_s/edit?usp=sharing) | Links to the starter & solution code for each days video along with the video link and a notetaking doc you can use for practice 

</div>

---

## Resources

- [Differences between arrow functions and regular functions](https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/)
- [Awesome Blog post on Scope and the Scope Chain](https://medium.com/joonsikyang/scope-and-the-scope-chain-27216a853a4e)