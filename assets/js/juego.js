
let deck       = []
const tipos      = ['D','H','S','C']
const especiales = ['A','K','J','Q']

let puntosJugador = 0,
    puntosComputadora = 0;

const btnPeticion = document.querySelector( '#btnPedir' );
const btnDetener = document.querySelector( '#btnDetener' );
const btnNuevoJuego = document.querySelector( '#btnNuevo' );

const playerScore = document.querySelectorAll('small');

const cartasJugador = document.querySelector('#jugador-cartas');
const cartasComputadora = document.querySelector('#computadora-cartas');

// Esta función me permite crear una varaja
const crearDeck = () => {

    for (let i = 2; i <=10; i++){
        for ( let tipo of tipos){
            deck.push( i + tipo );
        }
    }

    for ( let esp of especiales){
        for ( let tipo of tipos){
            deck.push( esp + tipo );
        }
    }

    deck =_.shuffle( deck );
    return deck;
}
crearDeck();

//Esta función me permite pedir una ccarta

const pedirCarta = () => {

    if ( deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;

}

const valorCarta = (carta) => {

    const valor = carta.substring( 0, carta.length - 1);
    return ( isNaN( valor )) ?
            (valor === 'A' ) ? 11 : 10
            : valor * 1;
}

const turnoComputadora = ( puntosMin ) => {

    do {
        const carta = pedirCarta();
    
        puntosComputadora = puntosComputadora + valorCarta( carta );

        playerScore[1].innerText = puntosComputadora

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');

        cartasComputadora.append( imgCarta );

        if ( puntosMin > 21 ){
            break;
        } 

    } while ( (puntosComputadora < puntosMin) && (puntosMin <= 21 ) );

    setTimeout(() => {
        if ( puntosComputadora === puntosJugador ){
            alert('Esto es empate');
        } else if ( puntosComputadora > 21 ) {
            alert('Felicidades!! ganaste');
        } else if ( puntosComputadora === 21 ) {
            alert('Que mal!! perdiste');
        } else if ( (puntosComputadora < puntosJugador) && ( puntosJugador <= 21) ){
            alert('Felicidades!! ganaste');
        } else if ( (puntosComputadora > puntosJugador) && puntosComputadora <= 21 ){
            alert('Que mal!! perdiste');
        }else if ( (puntosJugador > 21 ) &&  puntosComputadora < 21 ){
            alert(' Que mal!! perdiste ');
        }
    }, 100 );
    

}




// Eventos 
btnPeticion.addEventListener('click', () => {

    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta( carta );

    playerScore[0].innerText = puntosJugador

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');

    cartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ){
        console.warn( "Defeat, you're an asshole" );
        btnPeticion.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugador );
    } else if ( puntosJugador === 21 ){
        console.warn( "You won, you're insane" );
        btnPeticion.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugador );
    }

    
});

btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnPeticion.disabled = true;
    turnoComputadora( puntosJugador );

});

btnNuevoJuego.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;
    
    playerScore[0].innerText = 0;
    playerScore[1].innerText = 0;

    cartasComputadora.innerHTML = '';
    cartasJugador.innerHTML = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;

});

