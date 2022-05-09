(function( $ ) {
    $.fn.diceGame = function() {
        imagesLink = ["https://www.svgrepo.com/show/198916/dice.svg",
        "https://www.svgrepo.com/show/198914/dice.svg",
        "https://www.svgrepo.com/show/198915/dice.svg",
        "https://www.svgrepo.com/show/198921/dice.svg",
        "https://www.svgrepo.com/show/198920/dice.svg",
        "https://www.svgrepo.com/show/198919/dice.svg"];

        let tossLimiter = 6; // число бросков до победы
        let playerOneWins = 0; // число побед первого игрока
        let playerTwoWins = 0; // число побед второго игрока

        const gameHtmlStructure = '<h1>Dice Game</h1>' +
        '<div class="buttons">'+
            '<button id="start" aria-label="Start the game">Start the game</button>'+
            '<button id="giveUp" aria-label="Give up">Give up</button>'+
        '</div>'+
        '<div class="radio-group">'+
            '<input type="radio" id="option-one" name="selector" value="1" checked><label for="option-one">One</label>'+
            '<input type="radio" id="option-two" name="selector" value="2"><label for="option-two">Two</label>'+
            '<input type="radio" id="option-three" name="selector" value="3"><label for="option-three">Three</label>'+
        '</div>'+
        '<h2 id="howToPlay">Press Start the Game button if you want to play</h2>'+
        '<main>'+
            '<div class="stat">'+
                '<p id="playerOneWins">Player 1 wins:</p>'+
                '<p id="playerTwoWins">Player 2 wins:</p>'+
                '<p id="limiter">Toss limiter: 6</p>'+
            '</div>'+
            '<h2 id="winner"></h2>'+
            '<div class="toss-dice">'+
                '<img src="'+imagesLink[0] +'" width="100px" alt="">'+
                '<img src="'+imagesLink[1] +'" width="100px" alt="">'+
                '<img src="'+imagesLink[2] +'" width="100px" alt="">'+
            '</div>'+
            '<div>'+
                '<button id="tossText">Player toss the Dice</button>'+
                '<button id="toss" aria-label="Toss the Dice">Toss the Dice</button>'+
            '</div>'+
        '</main>';
        this.empty(); // очищение структуры внутри блока
        this.html(gameHtmlStructure);
        $('#dice main').hide();

        $('#dice #start').on('click', function() {
            // для перезапуска игры и запуска игры
            tossLimiter = 6;
            playerOneWins = 0;
            playerTwoWins = 0;
            $('#playerOneWins').text('Player 1 wins: '+playerOneWins);
            $('#playerTwoWins').text('Player 2 wins: '+playerOneWins);
            $('#limiter').text('Toss limiter: '+tossLimiter);
            $('#toss').show();
            

            $('#winner').hide();
            $('#howToPlay').hide();
            $('#tossText').hide();
            $('main').show();
            switch($('input[type="radio"][name="selector"]:checked').val()) {
                case '1':
                    $('#dice img:nth-child(1)').show();
                    $('#dice img:nth-child(2), #dice img:nth-child(3)').hide();
                    break;
                case '2':
                    $('#dice img:nth-child(2), #dice img:nth-child(1)').show();
                    $('#dice img:nth-child(3)').hide();
                    break;
                case '3':
                    $('#dice img').show();
                    break;
            }
        });

        $('#dice input[type="radio"][name="selector"]').on('change', function() {
            switch($(this).val()) {
                case '1':
                    $('#dice img:nth-child(1)').show();
                    $('#dice img:nth-child(2), #dice img:nth-child(3)').hide();
                    break;
                case '2':
                    $('#dice img:nth-child(2), #dice img:nth-child(1)').show();
                    $('#dice img:nth-child(3)').hide();
                    break;
                case '3':
                    $('#dice img').show();
                    break;
            }
        });

        let state = 1; // позволяет отслеживать действия со стороны текущего игрока
        let playerOne;
        let playerTwo;

        $('#toss').on('click', function() {
            if (tossLimiter != 0) {
                if (state === 1) {
                    state = 2;
                    $('#toss').hide();
                    $('#tossText').show();
                    $('#tossText').html('Player 1 toss the Dice');
                    playerOne = $.tossDice();
                } else if (state === 2) {
                    state = 1;
                    $('#toss').hide();
                    $('#tossText').show();
                    $('#tossText').html('Player 2 toss the Dice');
                    playerTwo = $.tossDice();
                    setTimeout(function(){
                        if (playerOne > playerTwo) {
                            playerOneWins++;
                            $('#playerOneWins').text('Player 1 wins: '+playerOneWins);
                        } else if (playerOne == playerTwo) {
                            playerOneWins++;
                            playerTwoWins++;
                            $('#playerOneWins').text('Player 1 wins: '+playerOneWins);
                            $('#playerTwoWins').text('Player 2 wins: '+playerTwoWins);
                        } else {
                            playerTwoWins++;
                            $('#playerTwoWins').text('Player 2 wins: '+playerTwoWins);
                        }
                        tossLimiter--;
                        $('#limiter').text('Toss limiter: '+tossLimiter);
                        playerOne = 0;
                        playerTwo = 0;
                        if (tossLimiter == 0) {
                            $('#toss').hide();
                            $('#dice img').hide();
                        if (playerOneWins > playerTwoWins) {
                            $('#winner').show();
                            $('#winner').html('Player 1 WIN this GAME!');
                        } else if (playerOneWins == playerTwoWins) {
                            $('#winner').show();
                            $('#winner').html('Friendship has won!');
                        } else {
                            $('#winner').show();
                            $('#winner').html('Player 2 WIN this GAME!');
                        }
                    }
                    }, 1200);
                    
                    
                
                }
                
            }
        });

        $('#giveUp').on('click', function () {
            $('#toss').hide();
            $('#dice img').hide();
            if (state == 2) {
                $('#winner').show();
                $('#winner').html('Player 1 WIN this GAME!');
            } else {
                $('#winner').show();
                $('#winner').html('Player 2 WIN this GAME!');
            }
        });


    };

    $.tossDice = function () {
        let oneDice = Math.floor(Math.random() * 6) + 1;
        let twoDice = Math.floor(Math.random() * 6) + 1;
        let threeDice = Math.floor(Math.random() * 6) + 1;

        $('#dice img').each(function (index, value) {
            $(this).addClass('shake');
        });
        setTimeout(function(){
            $('#dice img').each(function (index, value) {
                $(this).removeClass('shake');
            });
            console.log(imagesLink[oneDice-1]);
            console.log(imagesLink[twoDice-1]);
            console.log(imagesLink[threeDice-1]);
            $('#dice img:nth-child(1)').attr('src', imagesLink[oneDice-1]);
            $('#dice img:nth-child(2)').attr('src', imagesLink[twoDice-1]);
            $('#dice img:nth-child(3)').attr('src', imagesLink[threeDice-1]);
            $('#toss').show();
        }, 1200);
    
        switch($('input[type="radio"][name="selector"]:checked').val()) {
            case '1':
                return oneDice;
                break;
            case '2':
                return oneDice+twoDice;
                break;
            case '3':
                return oneDice+twoDice+threeDice;
                break;
        }
    };

})(jQuery);