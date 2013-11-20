var cardPositions = new Array(53);
var cardImages = new Array(53);
cardImages[1] = ["2c.png", "2"];
cardImages[2] = ["2d.png", "2"];
cardImages[3] = ["2h.png", "2"];
cardImages[4] = ["2s.png", "2"];
cardImages[5] = ["3c.png", "3"];
cardImages[6] = ["3d.png", "3"];
cardImages[7] = ["3h.png", "3"];
cardImages[8] = ["3s.png", "3"];
cardImages[9] = ["4c.png", "4"];
cardImages[10] = ["4d.png", "4"];
cardImages[11] = ["4h.png", "4"];
cardImages[12] = ["4s.png", "4"];
cardImages[13] = ["5c.png", "5"];
cardImages[14] = ["5d.png", "5"];
cardImages[15] = ["5h.png", "5"];
cardImages[16] = ["5s.png", "5"];
cardImages[17] = ["6c.png", "6"];
cardImages[18] = ["6d.png", "6"];
cardImages[19] = ["6h.png", "6"];
cardImages[20] = ["6s.png", "6"];
cardImages[21] = ["7c.png", "7"];
cardImages[22] = ["7d.png", "7"];
cardImages[23] = ["7h.png", "7"];
cardImages[24] = ["7s.png", "7"];
cardImages[25] = ["8c.png", "8"];
cardImages[26] = ["8d.png", "8"];
cardImages[27] = ["8h.png", "8"];
cardImages[28] = ["8s.png", "8"];
cardImages[29] = ["9c.png", "9"];
cardImages[30] = ["9d.png", "9"];
cardImages[31] = ["9h.png", "9"];
cardImages[32] = ["9s.png", "9"];
cardImages[33] = ["10c.png", "10"];
cardImages[34] = ["10d.png", "10"];
cardImages[35] = ["10h.png", "10"];
cardImages[36] = ["10s.png", "10"];
cardImages[37] = ["jc.png", "11"];
cardImages[38] = ["jd.png", "11"];
cardImages[39] = ["jh.png", "11"];
cardImages[40] = ["js.png", "11"];
cardImages[41] = ["qc.png", "12"];
cardImages[42] = ["qd.png", "12"];
cardImages[43] = ["qh.png", "12"];
cardImages[44] = ["qs.png", "12"];
cardImages[45] = ["kc.png", "13"];
cardImages[46] = ["kd.png", "13"];
cardImages[47] = ["kh.png", "13"];
cardImages[48] = ["ks.png", "13"];
cardImages[49] = ["ac.png", "14"];
cardImages[50] = ["ad.png", "14"];
cardImages[51] = ["ah.png", "14"];
cardImages[52] = ["as.png", "14"];
var playerCardVal = [0, 0];
var playerScore = [0,0];
var playerIndex = 0;
var NEXT_BUTTON_SRC = "/images/1mn_next_button.jpg";
var START_BUTTON_SRC = "/images/button-startgame.jpg";

function GetCardValue(cardId) {
	return parseInt(cardImages[parseInt(cardId, 10)][1], 10);
}

function GetCardImageNm(cardId) {
	return cardImages[cardId][0];
}

function SetCardPositionArray(response) {
	var pos = response.indexOf('\n');
/*	var options = { 
	type: 'get',
	url: 'http://www.random.org/sequences/?min=1&max=52&col=1&format=plain&rnd=new',
	success: function(response) { 
		alert(response)
    } 
	}; 
	
 Then attach the ajax form plugin to this form so that when it's submitted, 
 it will be submitted via ajax    
	$('form').ajaxForm(options); 
*/
}



/*   Event Handlers   */

$('#CardBack').click(function() {
	$('#ShuffleArea').css('visibility', 'hidden');
	var topPos = 255;
	var leftPos = 115;
	for (var i = 1; i < 53; i++) {
		// Clone the sticker that was clicked
		var newCard = $(this).clone();
		var id = "card" + i.toString();
		newCard.attr("id", id);
		// A class so we can position cards on the table on the
		newCard.addClass("CardsOnTable");
		newCard.css('top', topPos.toString() + "px");
		newCard.css('left', leftPos.toString() + "px");
		// Inject the new image on top of the card table
		$("#CardTable").prepend(newCard);
		leftPos = leftPos + 15;
	}
});

$('#CardTable').on('click', '.CardsOnTable', function() {
	var cardIndex = parseInt($(this).attr('id').slice(4), 10);
	playerCardVal[playerIndex] = GetCardValue(cardIndex);
	if (playerIndex === 0) {
		$('#ShuffleArea').css('visibility', 'visible');
		$('#Player1Pick').attr('src', "/images/" + GetCardImageNm(cardIndex));
		$('#Player1Pick').css('visibility', 'visible');
		$('#PointPlayer1').css('visibility', 'hidden');
		$('#PointPlayer2').css('visibility', 'visible');

		playerIndex = 1;
	} else {
		$('#Player2Pick').attr('src', "/images/" + GetCardImageNm(cardIndex));
		$('#Player2Pick').css('visibility', 'visible');
		
		if(playerCardVal[0] > playerCardVal[1]){
			playerScore[0] += playerCardVal[0];
			$('#Player1WinningHand').css('visibility', 'visible');
			$(Player1Score).html(playerScore[0].toString());
		} else if(playerCardVal[0] < playerCardVal[1]){
			playerScore[1] += playerCardVal[1];
			$('#Player2WinningHand').css('visibility', 'visible');		
			$(Player2Score).html(playerScore[1].toString());		
		} else {
			// Do nothing
		}
		if(playerScore[0] >= 100)
		{
			$('#TrophyPlayer1').css('display', 'block');
			$('#FunctionButton').attr('src', START_BUTTON_SRC);
			
		} else if(playerScore[1] >= 100){
			$('#TrophyPlayer2').css('display', 'block');
			$('#FunctionButton').attr('src', START_BUTTON_SRC);			
		}
		$('#ShuffleArea').css('visibility', 'hidden');
		$('#PointPlayer2').css('visibility', 'hidden');
		$('#FunctionButton').css('visibility', 'visible');
	}
	$('.CardsOnTable').remove();
});

$('#MainWindow').on('click', '#FunctionButton', function() {
	if($('#FunctionButton').attr('src') === START_BUTTON_SRC)
	{
		$('#FunctionButton').attr('src', NEXT_BUTTON_SRC);
		$('#FunctionButton').css('visibility', 'hidden');
	}
	
	$('#PointPlayer1').css('visibility', 'visible');
	$('#ShuffleArea').css('visibility', 'visible');
	$('#Player1WinningHand').css('visibility', 'hidden');
	$('#Player2WinningHand').css('visibility', 'hidden');
	$('#Player1Pick').css('visibility', 'hidden');
	$('#Player2Pick').css('visibility', 'hidden');
	playerCardVal[0] = 0;
	playerCardVal[1] = 0;
	playerIndex = 0;
});