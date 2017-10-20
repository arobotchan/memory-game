/*
 * Create a list that holds all of your cards
 */

var card_array = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 
'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'],
card_values = [],
card_box_ids = [],
matched_ids_list = [],
first_id,
box_flipped = 0,
moves = 0;
//$container = jQuery('.container');
//$deck = jQuery('.deck');
//$moveNum = $(".moves");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//var listElements;
//listElements = $('li');
//document.write(listElements);

function newGame() {
	//$('#card-board').empty();
	var moves = 0;
    //$moveNum = $('.moves');
    //$moveNum.text('0');
	var box_flipped = 0;
	var output = '';
	//$(".moves").text('0');
	//$moveNum.text('0');
	card_array = shuffle(card_array);
	for (var i = 0; i < card_array.length; i++) {
		output +=  '<li id="card_'+i+'" class="card" onclick="storeValueClickBox(this,\''+card_array[i]+'\')"><i class="fa fa-'+card_array[i]+'"></i></li>';
	}
			document.getElementById('card_board').innerHTML = '<ul class="deck">' +output+ '</ul>';
}



function storeValueClickBox(box,val){

	//document.write(box.id);
	//document.write(matched_ids_list);
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
				checkCardMatch();
				moves++;
				//document.write('hello');
				//$(document.body).append('hello');
				
			}
	} 
}
function checkCardMatch(){
	if (card_values[0] == card_values[1]) {
		//box.innerHTML = '<li id ="'+card_box_ids[0]+'" class="card show open"><i class="fa fa-'+card_values[0]+'"></i></li>';
		//box.innerHTML = '<li id ="'+card_box_ids[1]+'" class="card show open"><i class="fa fa-'+card_values[1]+'"></i></li>';
		matched_ids_list.push(card_box_ids[0]);
		matched_ids_list.push(card_box_ids[1]);
		card_values = [];
        card_box_ids = [];      
	}
	else {
			//box.innerHTML = '<li class="card show open"><i class="fa fa-'+val+'"></i></li>';
		  	function cardNoMatch() {
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
	//moves++;
	//document.write(moves);
    //document.write(moves);
    //document.write($(".moves"));

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function find(box_id,matched_id){
    var count=matched_id.length;
    for(var i=0;i<count;i++)
    {
        if(matched_id[i]===box_id){return true;}
    }
    return false;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
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
 

newGame();
