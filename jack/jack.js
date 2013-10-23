/**
 *
 */


const x_num = 2;
const y_num = 3;

const time_interval = 100; //msec

var Score = function(){};
var score;

var timer;

var opening_card;
var last_opened_card;
var is_opened_phase;
var remaining_card_num;


function initialize(){

	var x, y;
	var objBody = document.getElementsByTagName("body").item(0);

	score = new Score();
	score.value = 0;
    score.view = document.createElement("span");
	score.view.id = "score";
	score.view.innerHTML = "Score : " + score.value;
	score.add = function(){
	               this.value += time_interval / 1000;
	               this.value = Math.round(this.value * 10) / 10;
	               this.view.innerHTML = "Score : " + this.value;
	            }

	objBody.appendChild(score.view);
	objBody.appendChild(document.createElement("br"));


	opening_card = null;
	last_opened_card = null;
	is_opened_phase = false;
	remaining_card_num = x_num * y_num;

	var card_val_array =[];
	var count;
	for(count = 1; count <= remaining_card_num / 2; count++ ){
		card_val_array.push(count); //2回！
		card_val_array.push(count);
	}


	if ( !(x_num % 2 == 0 || y_num % 2 == 0) ) {
		alert("カードあまっちゃいます！");
	} else {

		for (y = 0; y < y_num; y++){
			for (x = 0; x < x_num; x++){

				var btn = document.createElement("input");

				btn.id = "card_" + x + "-" + y;
				btn.type = "button";
				btn.value = " ? ";
				btn.onclick = function(){ card_click(this);};

				btn.opened = false;

				var random_index = Math.floor(Math.random() * card_val_array.length);
				btn.card_val = card_val_array[random_index];
				card_val_array.splice(random_index, 1);

				objBody.appendChild(btn);

			}
			objBody.appendChild(document.createElement("br"));
		}
	}

	timer = setInterval("score.add()", time_interval);
}




function card_click(card){
	if(card.opened) {
		return;
	}

	if(is_opened_phase){
		if(card === opening_card){
			alert("おんなじカードじゃないですかー！");
		} else {
			is_opened_phase = false;
			card.value = card.card_val;

			if(card.card_val == opening_card.card_val) {
				remaining_card_num -= 2;
				card.opened = true;
				opening_card.opened = true;
				opening_card = null;

				//alert("now " + remaining_card_num + " card remains.");
				if (remaining_card_num <= 0) {
				    clearInterval(timer);
				    alert("clear!!!!!!  score : "+ score.value);
				}
			} else {
				last_opened_card = opening_card;
				opening_card = null;

				setTimeout(
					function(){
						card.value = " ? ";
						last_opened_card.value = " ? ";
					},
					1000
				);
			}
		}
	} else {
		is_opened_phase = true;
		opening_card = card;
		card.value = card.card_val;
	}
}

