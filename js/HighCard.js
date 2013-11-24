var cardPositions = new Array(53);
var cardImages = new Array(53);
cardImages[1] = ["2c.png", "2", "Two of Clubs"];
cardImages[2] = ["2d.png", "2", "Two of Diamonds"];
cardImages[3] = ["2h.png", "2", "Two of Hearts"];
cardImages[4] = ["2s.png", "2", "Two of Spades"];
cardImages[5] = ["3c.png", "3", "Three of Clubs"];
cardImages[6] = ["3d.png", "3", "Three of Diamonds"];
cardImages[7] = ["3h.png", "3", "Three of Hearts"];
cardImages[8] = ["3s.png", "3", "Three of Spades"];
cardImages[9] = ["4c.png", "4", "Four of Clubs"];
cardImages[10] = ["4d.png", "4", "Four of Diamonds"];
cardImages[11] = ["4h.png", "4", "Four of Hearts"];
cardImages[12] = ["4s.png", "4", "Four of Spades"];
cardImages[13] = ["5c.png", "5", "Five of Clubs"];
cardImages[14] = ["5d.png", "5", "Five of Diamonds"];
cardImages[15] = ["5h.png", "5", "Five of Hearts"];
cardImages[16] = ["5s.png", "5", "Five of Spades"];
cardImages[17] = ["6c.png", "6", "Six of Clubs"];
cardImages[18] = ["6d.png", "6", "Six of Diamonds"];
cardImages[19] = ["6h.png", "6", "Six of Hearts"];
cardImages[20] = ["6s.png", "6", "Six of Spades"];
cardImages[21] = ["7c.png", "7", "Seven of Clubs"];
cardImages[22] = ["7d.png", "7", "Seven of Diamonds"];
cardImages[23] = ["7h.png", "7", "Seven of Hearts"];
cardImages[24] = ["7s.png", "7", "Seven of Spades"];
cardImages[25] = ["8c.png", "8", "Eight of Clubs"];
cardImages[26] = ["8d.png", "8", "Eight of Diamonds"];
cardImages[27] = ["8h.png", "8", "Eight of Hearts"];
cardImages[28] = ["8s.png", "8", "Eight of Spades"];
cardImages[29] = ["9c.png", "9", "Nine of Clubs"];
cardImages[30] = ["9d.png", "9", "Nine of Diamonds"];
cardImages[31] = ["9h.png", "9", "Nine of Hearts"];
cardImages[32] = ["9s.png", "9", "Nine of Spades"];
cardImages[33] = ["10c.png", "10", "Ten of Clubs"];
cardImages[34] = ["10d.png", "10", "Ten of Diamonds"];
cardImages[35] = ["10h.png", "10", "Ten of Hearts"];
cardImages[36] = ["10s.png", "10", "Ten of Spades"];
cardImages[37] = ["jc.png", "11", "Jack of Clubs"];
cardImages[38] = ["jd.png", "11", "Jack of Diamonds"];
cardImages[39] = ["jh.png", "11", "Jack of Hearts"];
cardImages[40] = ["js.png", "11", "Jack of Spades"];
cardImages[41] = ["qc.png", "12", "Queen of Clubs"];
cardImages[42] = ["qd.png", "12", "Queen of Diamonds"];
cardImages[43] = ["qh.png", "12", "Queen of Hearts"];
cardImages[44] = ["qs.png", "12", "Queen of Spades"];
cardImages[45] = ["kc.png", "13", "King of Clubs"];
cardImages[46] = ["kd.png", "13", "King of Diamonds"];
cardImages[47] = ["kh.png", "13", "King of Hearts"];
cardImages[48] = ["ks.png", "13", "King of Spades"];
cardImages[49] = ["ac.png", "14", "Ace of Clubs"];
cardImages[50] = ["ad.png", "14", "Ace of Diamonds"];
cardImages[51] = ["ah.png", "14", "Ace of Hearts"];
cardImages[52] = ["as.png", "14", "Ace of Spades"];
var playerCardVal = [0, 0];
var playerScore = [0, 0];
var playerIndex = 0;
var NEXT_BUTTON_SRC = "/images/1mn_next_button.jpg";
var START_BUTTON_SRC = "/images/button-startgame.jpg";

function GetCardValue(cardId) {
	return parseInt(cardImages[parseInt(cardId, 10)][1], 10);
}

function GetCardImageNm(cardId) {
	return cardImages[cardId][0];
}

function GetAltText(cardId) {
	return cardImages[cardId][2];
} /*   Event Handlers   */
$('#CardBack').click(function() {
	var options = {
		type: 'get',
		url: 'http://www.random.org/sequences/?min=1&max=52&col=1&format=plain&rnd=new',
		beforeSubmit: function() {},
		async: false,
		success: function(response) {
			var cards = response.split('\n');
			$('#ShuffleArea').css('visibility', 'hidden');
			var topPos = 255;
			var leftPos = 115;
			for (var i = 1; i < 53; i++) {
				// Clone the 
				var newCard = $('#CardBack').clone();
				var id = "card" + cards[i - 1];
				newCard.attr("id", id);
				newCard.attr('alt', 'Card ' + i.toString());
				// A class so we can position cards on the table on the
				newCard.addClass("CardsOnTable");
				newCard.css('top', topPos.toString() + "px");
				newCard.css('left', leftPos.toString() + "px");
				// Inject the new image on top of the card table
				$("#CardTable").prepend(newCard);
				leftPos = leftPos + 15;
			}
		}
	};
	$.ajax(options);
});
$('#CardTable').on('click', '.CardsOnTable', function() {
	var cardIndex = parseInt($(this).attr('id').slice(4), 10);
	playerCardVal[playerIndex] = GetCardValue(cardIndex);
	if (playerIndex === 0) {
		$('#ShuffleArea').css('visibility', 'visible');
		$('#Player1Pick').attr('src', "/images/" + GetCardImageNm(cardIndex));
		$('#Player1Pick').attr('alt', GetAltText(cardIndex));
		$('#Player1Pick').css('visibility', 'visible');
		$('#PointPlayer1').css('visibility', 'hidden');
		$('#PointPlayer2').css('visibility', 'visible');
		playerIndex = 1;
	} else {
		$('#Player2Pick').attr('src', "/images/" + GetCardImageNm(cardIndex));
		$('#Player2Pick').attr('alt', GetAltText(cardIndex));
		$('#Player2Pick').css('visibility', 'visible');
		if (playerCardVal[0] > playerCardVal[1]) {
			playerScore[0] += playerCardVal[0];
			$('#Player1WinningHand').css('visibility', 'visible');
			$(Player1Score).html(playerScore[0].toString());
		} else if (playerCardVal[0] < playerCardVal[1]) {
			playerScore[1] += playerCardVal[1];
			$('#Player2WinningHand').css('visibility', 'visible');
			$(Player2Score).html(playerScore[1].toString());
		} else {
			// Do nothing
		}
		if (playerScore[0] >= 100) {
			$('#TrophyPlayer1').css('display', 'block');
			$('#FunctionButton').attr('src', START_BUTTON_SRC);
		} else if (playerScore[1] >= 100) {
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
	if ($('#FunctionButton').attr('src') === START_BUTTON_SRC) {
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