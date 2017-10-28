//Created array lists that holds all of cards, created variables
var card_array = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 
'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'],
card_values = [],
card_box_ids = [],
matched_ids_list = [],
card_matched = 0,
first_id = 0,
moves = 0,
min = 0,
sec = 0,
stop = 0,
starRating = 0,
$moveNum = $('.moves'),
$star1 = $('#star1'),
$star2 = $('#star2');

// Checks & updates star ratings by number of moves
function checkStars(){
	if (moves < 20) {
		starRating = 3;
	} else if (moves >=20 && moves <= 29){
		$star1.removeClass('fa-star').addClass('fa-star-o');
		starRating = 2;
	} else if (moves > 29){
		$star2.removeClass('fa-star').addClass('fa-star-o');
		starRating = 1;
	}
}

// Game timer that starts at beginning of game for tracking time
function gameTimer(){
    setInterval(function() {
        if (stop !== 1) {
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }
            if (sec < 10){
            	sec = "0" + sec;
            }
            $('.timer').html(min + ':' + sec)          
        }
    }, 1000)
}

// Popup with begin button that triggers start of game timer 
function gameStart(){
	swal({
		title:'Matching Game',
		text: 'Welcome! Press button to Begin!',
		type: 'success',
		confirmButtonColor: '#3085d6',
		confirmButtonText: 'Play Game'
	}).then(function(confirm) {
		if (confirm) {
			gameTimer();
		}
	})	
}

// Begin new game, shuffles and populate cards in their locations.
function newGame(){
	gameStart();
	$(".timer").text('0:00');
    $moveNum.text('0');
	output = '';
	card_array = shuffle(card_array);
	for (var i = 0; i < card_array.length; i++) {
		output +=  '<li id="card_'+i+'" class="card" onclick="storeValueClickBox(this,\''+card_array[i]+'\')"><i class="fa fa-'+card_array[i]+'"></i></li>';
	}
			document.getElementById('card_board').innerHTML = '<ul class="deck">' +output+ '</ul>';
}

// After clicked, stores value to list for comparison later in function checkCardMatch
// and keep card showing, increments # of moves after every 2 cards is clicked.
function storeValueClickBox(box,val){
	if (first_id !== box.id && find(box.id,matched_ids_list) == false && card_values.length < 2){
			box.innerHTML = '<li class="card show open"><i class="fa fa-'+val+'"></i></li>';	
			if(card_values.length == 0){
				card_values.push(val);
				card_box_ids.push(box.id);
				first_id = box.id;
			}
			else if (card_values.length == 1){
				card_values.push(val);
				card_box_ids.push(box.id);
				moves++;
				checkStars();
				$moveNum.html(moves);
				checkCardMatch();
			}
	} 
}
// Check if values of card matches, stores value, display game won popup if all matches, 
function checkCardMatch(){
	if (card_values[0] == card_values[1]) {
		matched_ids_list.push(card_box_ids[0]);
		matched_ids_list.push(card_box_ids[1]);
		card_values = [];
        card_box_ids = [];
        card_matched++;
        if (card_matched == 8){
        	gameWon();
        }      
	}
	else {  // otherwise if not matched it clears lists & box 
		  	function cardNoMatch(){
				var box_1 = document.getElementById(card_box_ids[0]);
				var box_2 = document.getElementById(card_box_ids[1]);
        		box_1.innerHTML = "";
        		box_2.innerHTML = "";
				card_values = [];
        		card_box_ids = [];
		    }
		  	setTimeout(cardNoMatch,1000);
	}
	first_id = "";
}

// Display game Won pop up with # of moves, star rating, time took and 'Play again' button
function gameWon(){
	swal({
		title:'You Won!',
		text: 'Your Scores - Moves:'+moves+ ' Star Rating:'+starRating+' Time:'+min+':'+sec,
		type: 'success',
		confirmButtonColor: '#3085d6',
		confirmButtonText: 'Play again!'
	}).then(function(confirm) {
		if (confirm) {
			location.reload();
		} 
	})	
}

// Search function
function find(box_id,matched_id){
    var count=matched_id.length;
    for(var i=0;i<count;i++)
    {
        if(matched_id[i]===box_id){return true;}
    }
    return false;
}

// Shuffle the list of cards using the provided "shuffle" method below
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array){
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Icon to restart game
$('.restart').on('click', function(){
    location.reload();
});

// Loads function newGame() when page loads
newGame();