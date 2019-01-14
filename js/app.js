
//------------------Variables------------------
const startScreen = $('.start')[0];
const startLink = $('.btn__reset')[0];
const ulPuzzle = $('.section ul');
const button = $('button');
let tries = $('.tries');
let gameBoard = $('#phrase');

let phrasesArr = [
 ['FASHION MODEL TRAIN', 'BEFORE AND AFTER'],
 ['PUMPKIN SPICE LATTE', 'FOOD AND DRINK'],
 ['GAME OF THRONES', 'TV TO BINGE ON'],
 ['STATUE OF LIBERTY','LANDMARK'],
 ['EIGHT DAYS A WEEK', 'SONG TITLE']
];
//Variables for Random Hint and Random Phrase from Array
let getRandomPhraseArray;
let addPhraseToArray;
let hint = $('.hint');
let clue;

//Variables to Style individual letters & exclude whitespace
let phraseArray;
let liPuzzle;

//Variables for scoring
let score;
let resetTries;
let lives = 5;
let match = 0;
let wrong = 0;


//----------------Functions---------------------

//Change Game Start Screen Background to Glitter
$(startScreen).css('backgroundImage', 'url(images/backgroundGold.jpg)');
$(startScreen).css('backgroundSize', 'cover');


//Hide Start Screen and button & Set the Gameboard by Generating Hint & Puzzle
$(startLink).on('click', function(){
        $(startScreen).slideUp('slow');
        $('.message').remove();
        $(startLink).hide();

        //Generate new random phase and hint
        getRandomPhraseArray = Math.floor(Math.random() * phrasesArr.length);
        addPhraseToArray = phrasesArr[getRandomPhraseArray][0];
        clue = phrasesArr[getRandomPhraseArray][1];
        phraseArray = addPhraseToArray.split('');
        liPuzzle = $('#phrase li');


        // Hint  Generator
        $(hint).text('HINT: ' + clue);
        //Style individual letters in Phrase excluding whitespace
        for (let i = 0; i< phraseArray.length; i++){
            if( phraseArray[i] !== " " ) {
                let createLi = '<li class="letter">'+ (phraseArray[i]) +'</li>';
                $(ulPuzzle).append(createLi);
            } else {
                let spaceBtwn ='<li class="space">'+'</li>';
                $(ulPuzzle).append(spaceBtwn);
            }
        };
});


//Event Listener for Qwerty Keyboard
$(button).on('click', function(e){
        let selectButton = e.target;
        let guess = selectButton.innerText.toUpperCase();
        let showLetter = $('ul li');
        let space = $('li.space');
        tries = $('.tries');
        let score = [].pop.call($(tries));
        let resetTries = '<li class="tries"><img src="images/ladybug.png" height="40px" width="40px"></li>';

        //Check Letter for match or miss
        for (let i = 0; i< phraseArray.length ; i++) {
            // if correct reveal letter in puzzle
            if (guess === phraseArray[i]) {
                $(showLetter[i]).addClass('show').css('transition', 'background-color .5s ease-in');
                match = match + 1;
            } else {
                wrong = wrong + 1;
            }
            //designate key as chosen and disable
            $(this).addClass('chosen');
            $(this).prop('disabled', true);
        }

        // If wrong lose a life & a try
        if (wrong === phraseArray.length){
            lives = lives - 1;
            $(score).remove();
        }

        // Check Win, Reveal win screen and reset board
        if ((match + space.length) === (phraseArray.length)) {
            $(startScreen)
                .addClass('win a')
                .css('background-image', 'none')
                .removeClass('start lose')
                .slideDown('7000')
                .append('<h2 class="message">YOU WON!!</h2>');
            $(startLink).show().text('Play Again?');
            button.removeClass('chosen');
            button.prop('disabled', false);
            $(ulPuzzle).children().remove();
            //Reset Tries Count
            $(tries).remove();
            for (let i = 0; i< 5; i++){
              $('ol').append(resetTries);
            }
            match = 0;
            lives = 5;
        }
        //Check Loss, Reveal lose screen and reset board
        if (lives === 0) {
            $(startScreen)
                .addClass('lose a')
                .css('background-image', 'none')
                .removeClass('start win')
                .slideDown('7000')
                .append('<h2 class="message">SORRY YOU LOST</h2>');
            $(startLink).show().text('Play Again?');
            button.removeClass('chosen');
            button.prop('disabled', false);
            $(ulPuzzle).children().remove();
            //Reset Tries Count
            $(tries).remove();
            for (let i = 0; i< 5; i++){
              $('ol').append(resetTries);
            }
            match = 0;
            lives = 5;
        }
        //Reset wrong count for each try
        wrong = 0;
});
