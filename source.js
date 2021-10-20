

/////////////////////////////////
//             GAME            //
/////////////////////////////////

// Var for current mode & subject
var mode;
var subject;

// Random Int for random question
var randomint;

// Array containing the answers
var arrayAnswers = [];

// Var of currentAnswer
var currentAnswer = "noch nicht definiert ;)"

// Last Random Int (no repeats)
var last = 1;

// Var that tells if it started
var started = false;

// Var for Timer
var going = false;

// Correct Counter
var correct = 0;

// Max Questions for Learn Mode
var length;

// Vars for Button Delay
var delay = 1000;
var lastClick = 0;

// Counter for Correcly Solved Board
var counter = 1;



// Antworten für Kanton Mode (Array)
let cantonAnswers = ["Zürich", "Bern", "Luzern", "Uri", "Schwyz", "Obwalden", "Nidwalden", "Glarus", "Zug", "Freiburg", "Solothurn", "Basel Stadt", "Basel Land", "Schaffhausen", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "Sankt Gallen", "Graubünden", "Aargau", "Thurgau", "Tessin", "Waadt", "Wallis", "Neuenburg", "Genf", "Jura"];

// Antworten für Stadt Mode (Array)
let stadtAnswers = ["Aarau", "Herisau", "Appenzell", "Liestal", "Basel", "Bern", "Biel", "Thun", "Freiburg", "Genf", "Glarus", "Chur", "Delémont", "Luzern", "La Chaux-de-Fonds", "Neuenburg", "Stans", "Sarnen", "Schaffhausen", "Schwyz", "Olten", "Solothurn", "Sankt Gallen", "Bellinzona", "Chiasso", "Lugano", "Frauenfeld", "Altdorf", "Lausanne", "Sion", "Zug", "Winterthur", "Zürich"];

// Antworten für Pass Mode (Array)
let passAnwers = ["Bernina", "Bözberg", "Col du Mollendruz", "Furka", "Gemmi", "Gotthard", "Greina", "Grimsel", "Grosser Sankt Bernhard", "Hauenstein", "Julier", "Lötschberg", "Lukmanier", "Maloja", "Monte Moro", "Nufenen", "Ofen", "Panixer", "San Bernadino", "Septimer", "Simplon", "Vue des Alpes"];

// Antworten für Seen Mode (Array)
let seenAnswers = ["Bielersee", "Bodensee", "Genfersee", "Langensee", "Luganersee", "Neuenburgersee", "Sankt Moritzersee", "Thunersee", "Vierwaldstättersee", "Walensee", "Zugersee", "Zürichsee"];

// Antworten für Fluss Mode (Array)
let flussAnswers = ["Aare", "Birs", "Broye", "Doubs", "Grosse Emme", "Hinterrhein", "Inn", "Kander", "Kleine Emme", "Landquart", "Limmat", "Linth", "Maggia", "Reuss", "Rhein", "Rhone", "Saane", "Simme", "Sitter", "Tessin", "Thur", "Vorderrhein"];

// Antworten für Berge, Gebirge Mode (Array)
let bergAnswers = ["Alpen", "Chasseral", "Churfirsten", "Dom", "Dufourspitze", "Eiger", "Jungfrau", "Jura", "Les Diablerets", "Matterhorn", "Mythen", "Napf", "Pilatus", "Piz Bernina", "Rigi", "San Salvatore", "Säntis", "Weissenstein"];

// Antworten für Special Mode (Array)
let specialAnswers = ["Berner Oberland", "Engadin", "Mittelland", "Seeland"];

// Hide Expand Menu & Info Buttons
document.getElementById(400).style.display = "none";
document.getElementById(700).style.display = "none";

// listen for Enter Button
document.addEventListener("keypress", function(event) {
    if(event.keyCode === 13) {
        checkSolution();
    }
})

// Set mode if Button was clicked
function setMode(inputmode, buttonId) {

    // Set ArrayAnswers for safety reasons
    switch(subject) {
        case "kantone":  
            arrayAnswers = cantonAnswers;
            break;
        case "staedte":  
            arrayAnswers = stadtAnswers;
            break;
        case "paesse":
            arrayAnswers = passAnwers;
            break;
        case "seen":
            arrayAnswers = seenAnswers;
            break;
        case "fluesse":
            arrayAnswers = flussAnswers;
            break;
        case "berge":
            arrayAnswers = bergAnswers;
            break;
        case "special":
            arrayAnswers = specialAnswers;
            break;
    }


    // Reset Timer on Left Side
    resetTimer();

    // set Correct counter back to 1
    counter = 1;
    correct = 0;

    // Reset Correctly Solved List
    document.getElementById(500).innerHTML = "<p id='502' style='color: red; text-align: center;'>keine</p><p id=501></p>";
    document.getElementById(333).innerHTML = "Korrekt gelöst";

    // set all buttons to normal
    document.getElementById(101).style.backgroundColor = "white";
    document.getElementById(102).style.backgroundColor = "white";
    document.getElementById(103).style.backgroundColor = "white";

    // fill clicked button
    document.getElementById(buttonId).style.backgroundColor = "#6cb104";

    // set the mode in var
    mode = inputmode;

    // Start game if a Subject has been selected
    if(subject != null) {
        Game();
    }

    // Reset Game Started Value if Game has Started
    if(started == true) {
        started = false;
    }

    // Start Section for Speed Mode
    if(started === false && mode === "speed" && subject != null) {

        // Set Started to True
        started = true;

        // Hide Menu
        hideMenu();

        // Hide Timer Controls
        document.getElementById(555).style.display = "none";
        document.getElementById(556).style.display = "none";

        // Ste Text Overlay
        document.getElementById("overlay").style.display = "block";
        document.getElementById("overlay").innerHTML = "<p class='textoverlay2'>3</p>";


        // display 3
        setTimeout(() => {
            document.getElementById("overlay").innerHTML = "<p class='textoverlay2'>2</p>";
        }, 1000);

        // display 2
        setTimeout(() => {
            document.getElementById("overlay").innerHTML = "<p class='textoverlay2'>1</p>";
        }, 2000);

        // display 1
        setTimeout(() => {
            document.getElementById("overlay").innerHTML = "<p class='textoverlay2'>GO!</p>";
        }, 3000);

        // display GO
        setTimeout(() => {
            document.getElementById("overlay").style.display = "none";
            startTimer();
        }, 3300);

        
    }

    
    // Return the selected Mode and if game started
    return mode, started, arrayAnswers;
}


// set subject if button was clicked
function setSubject(inputsubject, buttonId) {
    
    // Reset Timer on Left Side
    resetTimer();

    // Reset Correct Counter
    counter = 1;
    correct = 0;

    // Reset Correctly Solved List
    document.getElementById(500).innerHTML = "<p id='502' style='color: red; text-align: center;'>keine</p><p id=501></p>";

    // Set all Buttons back to normal
    for (let i = 1; i < 8; i++) {
        document.getElementById("20" + i).style.backgroundColor = "white";
    }

    // Fill Clicked Button
    document.getElementById(buttonId).style.backgroundColor = "#2d73f3";

    // set the subject in var
    subject = inputsubject;


    // Switch ArrayAnswers Array to the Answers
    switch(inputsubject) {
        case "kantone":  
            arrayAnswers = cantonAnswers;
            break;
        case "staedte":  
            arrayAnswers = stadtAnswers;
            break;
        case "paesse":
            arrayAnswers = passAnwers;
            break;
        case "seen":
            arrayAnswers = seenAnswers;
            break;
        case "fluesse":
            arrayAnswers = flussAnswers;
            break;
        case "berge":
            arrayAnswers = bergAnswers;
            break;
        case "special":
            arrayAnswers = specialAnswers;
            break;
    }
    


    // Set Length var for Correctly Solved Board
    length = arrayAnswers.length;
    

    // Start Game if Mode has been set
    if(mode != null) {
        Game();
    }

    

    // Reset Game Started Value if Game has Started
    if(started == true) {
        started = false;
    }

    if(started === false && mode === "speed" && subject != null) {
        started = true;
        hideMenu();
        document.getElementById(555).style.display = "none";
        document.getElementById(556).style.display = "none";
        document.getElementById("overlay").style.display = "block";
        document.getElementById("overlay").innerHTML = "<p class='textoverlay2'>3</p>";

        setTimeout(() => {
            document.getElementById("overlay").innerHTML = "<p class='textoverlay2'>2</p>";
        }, 1000);

        setTimeout(() => {
            document.getElementById("overlay").innerHTML = "<p class='textoverlay2'>1</p>";
        }, 2000);

        setTimeout(() => {
            document.getElementById("overlay").innerHTML = "<p class='textoverlay2'>GO!</p>";
        }, 3000);

        setTimeout(() => {
            document.getElementById("overlay").style.display = "none";
            startTimer();
        }, 3300);

        
    }
    

    // Return Values
    return subject, arrayAnswers, started, length;
}

// Game!
function Game() {

    // Show Timer Controls
    document.getElementById(555).style.display = "inline-block";
    document.getElementById(556).style.display = "inline-block";

    // Reset show Solution Button
    document.getElementById(222).className = " ";
    document.getElementById(222).innerHTML = "<button class='submit' onclick='showSolution()'>Lösung Anzeigen</button>";

    // Reset Box Shadows and Answer
    document.getElementById(1000).style.boxShadow = "0px 0px 3px 3px #0000006e";
    document.getElementById(420).style.boxShadow = "none";
    document.getElementById(420).value = "";




    // ENDLESS MODE
    if(mode === "endless") {

        // Set Loading Image
        document.getElementById(1000).src = "images/loading.jpg";
        

        // Choose Random Answer
        randomNumber = Math.floor(Math.random() * arrayAnswers.length + 1);

        // Make Sure it does not repeat itself ;)
        if(randomNumber === last) {
            randomNumber = Math.floor(Math.random() * arrayAnswers.length + 1);

            if(randomNumber == last) {
                randomNumber = Math.floor(Math.random() * arrayAnswers.length + 1);
            }
        }



        // Set current Answers Var for CheckSolution
        currentAnswer = arrayAnswers[randomNumber - 1];

        // Set Last Var to new Answers for next run
        last = randomNumber;

        // Set Picture Name Var to change ä ü ö for more compatability!
        let picturename = currentAnswer;

        // change ae oe and ue to ä ö and ü
        if(picturename.includes("ä")) {
            picturename = picturename.replace("ä", "ae");
        } else if(picturename.includes("ö")) {
            picturename = picturename.replace("ö", "oe");
        } else if(picturename.includes("ü")) {
            picturename = picturename.replace("ü", "ue");
        } 

        // Set Image
        setTimeout(() => {
            document.getElementById(1000).src = "images/" + subject + "/" +  picturename + ".jpg"
        }, 150); 
        
        

        
        // Return Var
        return last, randomNumber, currentAnswer;



    // SPEED MODE
    } else if(mode == "speed") {
        
        // Hide Timer Controls
        document.getElementById(555).style.display = "none";
        document.getElementById(556).style.display = "none";
               
        // Set Loading Image
        document.getElementById(1000).src = "images/loading.jpg";
        

        // Choose Random Answer
        randomNumber = Math.floor(Math.random() * arrayAnswers.length + 1);

        // Make Sure it does not repeat itself ;)
        if(randomNumber === last) {
            randomNumber = Math.floor(Math.random() * arrayAnswers.length + 1);

            if(randomNumber == last) {
                randomNumber = Math.floor(Math.random() * arrayAnswers.length + 1);
            }
        }


        // Set current Answers Var for CheckSolution
        currentAnswer = arrayAnswers[randomNumber - 1];

        // Set Last Var to new Answers for next run
        last = randomNumber;

        // Set Picture Name Var to change ä ü ö for more compatability!
        let picturename = currentAnswer;

        // change ae oe and ue to ä ö and ü
        if(picturename.includes("ä")) {
            picturename = picturename.replace("ä", "ae");
        } else if(picturename.includes("ö")) {
            picturename = picturename.replace("ö", "oe");
        } else if(picturename.includes("ü")) {
            picturename = picturename.replace("ü", "ue");
        } 

        // Set Image
        setTimeout(() => {
            document.getElementById(1000).src = "images/" + subject + "/" +  picturename + ".jpg"
        }, 150); 
        
        

        // Start Var to True
        started = true;

        // return Vars
        return started, last, randomNumber, currentAnswer;




    // LEARN MODE
    } else if (mode == "learn") {
        

        // check if everything has already been learned
        if(correct == length) {
            document.getElementById(1000).src = "images/finish.jpg";
            document.getElementById(333).innerHTML = "Korrekt gelöst " + correct + "/" + length;
            return last, randomNumber, currentAnswer;
        }


        // update correct counter
        document.getElementById(333).innerHTML = "Korrekt gelöst " + correct + "/" + length;


        // Set Loading Image
        document.getElementById(1000).src = "images/loading.jpg";

        // Generate Random Question
        randomNumber = Math.floor(Math.random() * arrayAnswers.length + 1);


        // Set current Answers Var for CheckSolution
        currentAnswer = arrayAnswers[randomNumber - 1];

        // Set Last Var to new Answers for next run
        last = randomNumber;

        // Set Picture Name Var to change ä ü ö for more compatability!
        let picturename = currentAnswer;

        // change ae oe and ue to ä ö and ü
        if(picturename.includes("ä")) {
            picturename = picturename.replace("ä", "ae");
        } else if(picturename.includes("ö")) {
            picturename = picturename.replace("ö", "oe");
        } else if(picturename.includes("ü")) {
            picturename = picturename.replace("ü", "ue");
        } 

        // Set Started var to true
        started = true;


        // Set Image
        setTimeout(() => {
            document.getElementById(1000).src = "images/" + subject + "/" +  picturename + ".jpg"
        }, 150); 

        
        // Return Vars
        return last, randomNumber, currentAnswer, started;
    }
}

// Check if Solution is Correct
function checkSolution() {

    // If answer is correct go here
    if(currentAnswer.toLowerCase() == document.getElementById(420).value.toLowerCase()) {
        
        // Block Clicks while evaluation
        if (lastClick >= (Date.now() - delay)) {
            lastClick = Date.now();
            return lastClick;
        }
        lastClick = Date.now();

        // Set Box Shadows to Green
        document.getElementById(1000).style.boxShadow = "0px 0px 10px 10px #2aaf1eb2";
        document.getElementById(420).style.boxShadow = "0px 0px 10px 10px #2aaf1eb2";

        // Show Correct Answer on Correct Answer Board
        showCorrect(currentAnswer);

        // Update Correct Var
        correct++;

        // Start New Game
        setTimeout(() => {
            Game();
        }, 1000); 

        // Delete Last Question while in Learm mode
        if (mode == "learn") {
            arrayAnswers.splice((randomNumber - 1), 1);
    
            return arrayAnswers;
        }
        // If answer is incorrect
    } else {
        // Set Box Shadow to Red
        document.getElementById(1000).style.boxShadow = "0px 0px 10px 10px #b91313ce";
        document.getElementById(420).style.boxShadow = "0px 0px 10px 10px #b91313ce";
    }

    
}


function showSolution() {
    // remove button
    document.getElementById(222).className = "text";

    // show answer
    document.getElementById(222).innerHTML = currentAnswer;
}


function hideMenu() {

    // fancy animation
    var menu = document.getElementById(99);
    var animation = [
        {transform: "translateX(-100%)"}
    ];
    var timing = {
        duration: 500,
        fill: 'forwards',
        iterations: 1
    }
    menu.animate(animation, timing);
    setTimeout(function() { document.getElementById(400).style.display = "block"; }, 500);
}


function expandMenu() {

    // fancy Animation
    var menu = document.getElementById(99);
    var animation = [
        {transform: "translateX(0%)"}
        
    ];
    var timing = {
        duration: 500,
        fill: 'forwards',
        iterations: 1
    }
    menu.animate(animation, timing);
    document.getElementById(400).style.display = "none";
}





function hideInfo() {

    // fancy Animation
    var menu = document.getElementById(800);
    var animation = [
        {transform: "translateX(100%)"}
    ];
    var timing = {
        duration: 500,
        fill: 'forwards',
        iterations: 1
    }
    menu.animate(animation, timing);
    setTimeout(function() { document.getElementById(700).style.display = "block"; }, 500);
}


function expandInfo() {

    // fancy Animation
    var menu = document.getElementById(800);
    var animation = [
        {transform: "translateX(0%)"}
        
    ];
    var timing = {
        duration: 500,
        fill: 'forwards',
        iterations: 1
    }
    menu.animate(animation, timing);
    document.getElementById(700).style.display = "none";
}




function showCorrect(name) {

    if(counter == 1) {
        document.getElementById(502).innerHTML = " ";
    }

    // Create a new Element to host all informations
    var container = document.getElementById(501);
    var p = document.createElement("p");
    p.id = counter;
    container.insertBefore(p, null);
    // Fill Element
    document.getElementById(counter).innerHTML = "<span class='material-icons md-18 png2 small'>check</span> " + name;
    

    counter++;
    return counter;
}



// Time Display on Info Board
setInterval(() => {
    var date = new Date();
    var weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    var months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

    var displaydate = weekdays[date.getDay()] + " " + date.getDate() + ". " + months[date.getMonth()] + " " + date.getFullYear() + "<br>" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(); 

    document.getElementById(600).innerHTML = displaydate;
    
}, 10);



//############################//
//           TIMER            //
//############################//
const timer = document.getElementById(690);

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
  if (stoptime == true) {
        stoptime = false;
        timerCycle();
    } else {
        stoptime = true;
    }
}

function timerCycle() {
    if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    if(mode == "speed") {
        going = true;
        timer.innerHTML = hr + ':' + min + ':' + (60 -sec);
        if(min == 1) {
            stoptime = true;
            going = false;

            // MAKE ENd SCREEN 

            let averagetime = (60.00 / correct).toFixed(2);
            var aneq = "Lorem Ipsum";

            document.getElementById("overlay").innerHTML = "<div class='textoverlay'><b class='end'><span class='material-icons md-18 '>celebration</span> Zeit um! <span class='material-icons md-18 '>celebration</span></b><br><br><div class='daten'>Gesammelte Daten:</div><div class='correct'>gesamte Zeit: 1min <br> Korrekt gelöst: " + correct + "<br> Ø Zeit pro Aufgabe: " + averagetime + " sec</div><br><div id='999' class='aneq'>" + aneq + "</div><button class='close' onclick='closeOverlay()'>Info schliessen</button> </div><canvas id='my-canvas'></canvas>";


            if(correct < 6) {
                document.getElementById(999).innerHTML = "Vielleicht solltest du noch ein wenig üben...";
                document.getElementById(999).style.color = "crimson";
            } else if(correct > 6 && correct < 10) {
                document.getElementById(999).innerHTML = "Du bist auf einem guten Weg!"
                document.getElementById(999).style.color = "orange";
            } else if(correct > 10 && correct < 15) {
                document.getElementById(999).innerHTML = "WOW! Du bist gut!"
                document.getElementById(999).style.color = "green";
            } else if(correct > 15) {
                document.getElementById(999).innerHTML = "UNFASSBAR! Du bist unaufhaltbar!"
                document.getElementById(999).style.color = "gold";
            }
            document.getElementById("overlay").style.display = "block";

            if(correct > 10) {
                var confettiSettings = { target: 'my-canvas' };
                var confetti = new ConfettiGenerator(confettiSettings);
                confetti.render();
            }
            resetTimer();
            correct = 0;
            return correct;
        }
    } else {
        timer.innerHTML = hr + ':' + min + ':' + sec;
    }

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
    timer.innerHTML = '00:00:00';
    stoptime = true;
    hr = 0;
    min = 0;
    sec = 0;

    return hr, min, sec;
}


// close overlay
function closeOverlay() {document.getElementById("overlay").style.display = "none";}



/////////////////////////////////////////////////////////////////////////////////
// CONFETTI.JS //
/////////////////////////////////////////////////////////////////////////////////



