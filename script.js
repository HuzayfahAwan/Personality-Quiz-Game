console.log("script running");

// Accessing the blue figure using the class "card-image"
let picture = document.querySelector(".card-image");

console.log(picture.id); // Prints the id of "picture"

// Accessing all of the figures/pictures on the site using the class "card-image"

let pictures = document.querySelectorAll(".card-image");

pictures.forEach((picture) => console.log(picture.id)); // Prints the ids of all the elements stored in the "pictures" array

// This object holds arrays for each section/question of the quiz. The indices of each array correspond to the picture clicked on the website.

let quizValues = {
  "color": ["logical", "creative", "logical", "creative"],
  "vacation": ["extrovert", "introvert", "extrovert", "introvert"],
  "pizza": ["creative", "logical", "creative", "logical"],
  "house": ["introvert", "extrovert", "introvert", "extrovert"],
  "fruit": ["logical", "creative", "logical", "creative"],
  "activity": ["extrovert", "introvert", "extrovert", "introvert"],
  "comic": ["extrovert", "introvert", "introvert", "extrovert"]
};

// This object keeps track of the points a user gets for a certain category based on their choices on the website.

let quizTaker = {
  logical: 0,
  creative: 0,
  extrovert: 0,
  introvert: 0,
};

// This variable holds an array of all the elements in the HTML that have the class name "otherQ"

let hideIt = document.querySelectorAll(".otherQ");

// This for-loop goes through each element in the "hideIt" array and hides those sections on the site.

for (let hide of hideIt) {
  hide.classList.toggle("hidden");
};

// This object holds each image's id on the site. The indices of each array correspond to the image clicked on the site.

let hideOthers = {
  colors: ["color-0", "color-1", "color-2", "color-3"],
  vacations: ["vacation-0", "vacation-1", "vacation-2", "vacation-3"],
  pizzas: ["pizza-0", "pizza-1", "pizza-2", "pizza-3"],
  houses: ["house-0", "house-1", "house-2", "house-3"],
  fruits: ["fruit-0", "fruit-1", "fruit-2", "fruit-3"],
  activities: ["activity-0", "activity-1", "activity-2", "activity-3"],
  comics: ["comic-0", "comic-1", "comic-2", "comic-3"]
};

// This for-loop goes through each element in the "pictures" array and adds an event listener for each image on the site.


pictures.forEach((picture) => {
  picture.addEventListener("click", (event) => {
    
    // When the user clicks an image, they are asked if they are sure that is their answer for that section of the quiz.
    
    if (confirm("Are you sure you want this to be your answer? (OK for yes and Cancel for no)") === true) {

      // Save the user's choice in the variable "choice" which is an array (0th index holds the name of the section that they were choosing an answer for and the 1st index holds the number corresponding to that image clicked on the site).

      let choice = picture.id.split("-");


      console.log(choice); // Prints the "choice" array to the console

      // Changes the background to yellow for the picture that is clicked on the site, signaling that the user chose that option.

      picture.classList.remove("has-background-light");
      picture.classList.add("has-background-warning");

      // choice[0] refers to the property name of the picture and choice[1] refers to the index value of the array corresponding to that property

      let answer = quizValues[choice[0]][choice[1]];

      console.log(answer); // Prints the "answer" variable to the console

      // Adds 1 to the category that corresponds with the user's choice on the site.

      quizTaker[answer]++;

      console.log(quizTaker); // Prints the "quizTaker" object to the console

      // If the user's choice for the picture that they clicked on the site is equal to "color", then a for-loop will go through every other picture in that row and hide it by adding "is-hidden" to the classList of the elements with the ids that correspond to the color figures on the site.

      if (choice[0] === "color") {
        for (let i = 0; i < quizValues.color.length; i++) {
          if (i != choice[1]) {
            document.getElementById(hideOthers.colors[i]).classList.add("is-hidden");
          }
          else {
            document.getElementById(hideOthers.colors[i]).setAttribute("style", "pointer-events: none;")
          };
        };
        // Unhides the next section/question on the site
        hideIt[0].classList.toggle("hidden");
      };

      // The if-statements below do the same thing as the if-statement above for every other section of the site.

      if (choice[0] === "vacation") {
        for (let i = 0; i < quizValues.vacation.length; i++) {
          if (i != choice[1]) {
            document.getElementById(hideOthers.vacations[i]).classList.add("is-hidden");
          }
          else {
            document.getElementById(hideOthers.vacations[i]).setAttribute("style", "pointer-events: none;")
          };
        };
        hideIt[1].classList.toggle("hidden");
      };

      if (choice[0] === "pizza") {
        for (let i = 0; i < quizValues.pizza.length; i++) {
          if (i != choice[1]) {
            document.getElementById(hideOthers.pizzas[i]).classList.add("is-hidden");
          }
          else {
            document.getElementById(hideOthers.pizzas[i]).setAttribute("style", "pointer-events: none;")
          };
        };
        hideIt[2].classList.toggle("hidden");
      };

      if (choice[0] === "house") {
        for (let i = 0; i < quizValues.house.length; i++) {
          if (i != choice[1]) {
            document.getElementById(hideOthers.houses[i]).classList.add("is-hidden");
          }
          else {
            document.getElementById(hideOthers.houses[i]).setAttribute("style", "pointer-events: none;")
          };
        };
        hideIt[3].classList.toggle("hidden");
      };

      if (choice[0] === "fruit") {
        for (let i = 0; i < quizValues.fruit.length; i++) {
          if (i != choice[1]) {
            document.getElementById(hideOthers.fruits[i]).classList.add("is-hidden");
          }
          else {
            document.getElementById(hideOthers.fruits[i]).setAttribute("style", "pointer-events: none;")
          };
        };
        hideIt[4].classList.toggle("hidden");
      };

      if (choice[0] === "activity") {
        for (let i = 0; i < quizValues.activity.length; i++) {
          if (i != choice[1]) {
            document.getElementById(hideOthers.activities[i]).classList.add("is-hidden");
          }
          else {
            document.getElementById(hideOthers.activities[i]).setAttribute("style", "pointer-events: none;")
          };
        };
        hideIt[5].classList.toggle("hidden");
      };

      // If the user's choice equals "comic", then that means that they've answered the last question of the personality quiz.

      if (choice[0] === "comic") {
        for (let i = 0; i < quizValues.comic.length; i++) {
          if (i != choice[1]) {
            document.getElementById(hideOthers.comics[i]).classList.add("is-hidden");
          }
          else {
            document.getElementById(hideOthers.comics[i]).setAttribute("style", "pointer-events: none;")
          };
        };
        let resultID; // Declares the variable "resultID" which will have data stored in it later

        // Compares the values of each property in the "quizTaker" object, and depending on which property is greater, the following ids are stored in the variable "resultID".

        if (quizTaker.logical > quizTaker.creative) {
          resultID = "#logical-";
        } else {
          resultID = "#creative-";
        }

        if (quizTaker.introvert > quizTaker.extrovert) {

          // The += completes the full name of the id by adding either extrovert or introvert to the id, depending on whether the if-statement above is true or false.

          resultID += "introvert";
        } else {
          resultID += "extrovert";
        }

        // Selects the element with the id stored in "resultID" and unhides the section of the HTML that shows the user their result of the personality quiz.

        let result = document.querySelector(resultID);
        console.log(result);
        result.classList.toggle("hidden");

        // The <button> element in the HTML is selected by locating it using the id #retake. The button is unhidden. If the user wants to retake the quiz, they simply click the button and the page refreshes.

        let button = document.querySelector("#retake");
        button.classList.remove("hidden");
      };
    };
  });
});
