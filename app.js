"use strict";

const wrapper = document.querySelector( '.wrapper' );
let counter = 0;
let activeCards = [];
let firstPlayerName = prompt( 'First player name : ') || 'Player 1';
let secondPlayerName = prompt( 'Second player name : ') || 'Player 2';

let icons = [   
        'icons/SVG/airplane.svg', 'icons/SVG/airplane.svg',
        'icons/SVG/clubs.svg', 'icons/SVG/clubs.svg',
        'icons/SVG/compass.svg', 'icons/SVG/compass.svg',
        'icons/SVG/hammer.svg', 'icons/SVG/hammer.svg',
        'icons/SVG/hammer2.svg', 'icons/SVG/hammer2.svg',
        'icons/SVG/hipster.svg', 'icons/SVG/hipster.svg',
        'icons/SVG/man.svg', 'icons/SVG/man.svg',
        'icons/SVG/pacman.svg', 'icons/SVG/pacman.svg',
        'icons/SVG/price-tags.svg', 'icons/SVG/price-tags.svg',
        'icons/SVG/woman.svg', 'icons/SVG/woman.svg',
        'icons/SVG/tongue.svg', 'icons/SVG/tongue.svg',
        'icons/SVG/rss.svg', 'icons/SVG/rss.svg',

    ];

let players = [
    
    {
        name: firstPlayerName,
        score: 0,
        background: '#FF3B3B'
    },
    {
        name: secondPlayerName,
        score: 0,
        background: '#64A3FF'
    }
    
];

let activePlayer = players[0];

function winnerMessage( player ){

    let winMsg = document.createElement( 'div' );
    winMsg.className = 'winner__msg';
    if ( player ){

        winMsg.innerHTML = `The winner is ${ player }!`;

    }
    else {

        winMsg.innerHTML = `It's draw!`;

    }


    return document.body.appendChild( winMsg );
}

function isEqual ( activeCards ){

    let contentOfActiveCards = [];
    
    activeCards.forEach( ( activeCard ) => {
        
        contentOfActiveCards.push( activeCard.nextElementSibling.lastElementChild.attributes[0].nodeValue );
        
        console.log( activeCard.nextElementSibling.lastElementChild.attributes[0].nodeValue )
    });
    
    if ( contentOfActiveCards[0] === contentOfActiveCards[1] ){

        return true;

    }
    else {

        return false;

    }

}

function createCard ( content ){

    const card = document.createElement( 'div' );
    const frontSide = document.createElement( 'div' );
    const backSide = document.createElement( 'div' );
    const icon = document.createElement( 'img' );
    
    card.className = 'card';
    frontSide.classList.add( 'card__side', 'card__side--front' );
    backSide.classList.add( 'card__side', 'card__side--back' );
    icon.setAttribute( "src", content );

    backSide.appendChild( icon );
    
    card.appendChild( frontSide );
    card.appendChild( backSide );
    wrapper.appendChild( card );

}

function playerInfo ( objArr ){

    let playerInfoWrapper = document.createElement( 'div' );
    playerInfoWrapper.className = 'player__wrapper';

    objArr.forEach( ( obj ) => {

        let playerInfoDiv = document.createElement( 'div' );
        
        playerInfoDiv.classList.add( 'player__info' );
        playerInfoDiv.innerHTML = `Player : ${ obj.name } </br> Score : ${ obj.score } `;
        playerInfoDiv.style.backgroundColor = obj.background;

        playerInfoWrapper.appendChild( playerInfoDiv );

    });


    return document.body.appendChild( playerInfoWrapper );
}

playerInfo( players );

let ranNumArr = [];

while ( ranNumArr.length < icons.length )
{

    let randomNum = Math.floor( Math.random() * icons.length );
    
    if ( ranNumArr.indexOf( randomNum ) == -1 ){
        
        ranNumArr.push( randomNum );
        createCard( icons[ randomNum ] );
    }

}

const cards = document.querySelectorAll('.card');
const cardFront = document.querySelectorAll('.card__side--front');

cardFront.forEach( ( card ) => {
    
    card.addEventListener( 'click', ( e ) => {
        
        if ( counter < 2 ){
            
            counter++;
            
            card.style.transform = 'rotateY(-180deg)';
            card.nextElementSibling.style.transform = 'rotateY(0deg)';
            card.classList.add( 'active' );
            
            card.classList.forEach( ( element ) => {

                if ( counter <= 2 ){
                    
                    if ( element === 'active' ){
                        
                        activeCards.push( card );
                        
                    }
                    
                }
            });
            
            
            if ( activeCards.length == 2 ){
                
                setTimeout( () => {
                    
                    if ( isEqual( activeCards ) ){
                       
                        activeCards.forEach( ( card ) => {

                            card.offsetParent.style.opacity = '0';
                            card.nextElementSibling.remove();

                        });

                        let playInf = document.querySelectorAll( '.player__wrapper' );

                        playInf.forEach( ( playIn ) => {

                            playIn.remove();

                        })

                        activePlayer.score += 1;

                        playerInfo( players );
                        
                    }
                    else {
                        
                        activeCards.forEach( ( card ) => {
                            
                            card.nextElementSibling.style.transform = 'rotateY(180deg)';
                            card.style.transform = 'rotateY(0deg)';
                            
                        });

                        activePlayer == players[0] ? activePlayer = players[1] : activePlayer = players[0];

                        document.body.style.backgroundColor = activePlayer.background;
                        
                    }
                    
                    if ( document.querySelectorAll('.card__side--back').length == 0 ){
                        
                        if ( players[0].score > players[1].score ){

                            winnerMessage( players[0].name );

                        }
                        else if ( players[0].score < players[1].score ){

                            winnerMessage( players[1].name );

                        }
                        else {

                            winnerMessage();

                        }

                    }

                    counter = 0 ;
                    activeCards = [];

                }, 800 );
            
            }
            
            e.preventDefault();
            
        }
        
    });
    
});