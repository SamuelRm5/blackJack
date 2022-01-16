
const miModulo = (() => {
    'use strict'

    let   deck       = [];
    const tipos      = ['D','H','S','C'],
          especiales = ['A','K','J','Q'];

    let puntosJugadores=[];

    const btnPeticion = document.querySelector( '#btnPedir' ),
          btnDetener = document.querySelector( '#btnDetener' ),
          btnNuevoJuego = document.querySelector( '#btnNuevo' );

    const playerScore = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');


    const inicializarJuego = ( numeroJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];

        for (let i = 0; i < numeroJugadores; i++) {
            puntosJugadores.push(0);
        }

        playerScore.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    }
    // Esta función me permite crear una varaja
    const crearDeck = () => {

        deck = [];
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

        return _.shuffle( deck );
    }

    //Esta función me permite pedir una ccarta

    const pedirCarta = () => {

        if ( deck.length === 0 ){
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    // Esta función permite extraer el valor de la carta
    const valorCarta = (carta) => {

        const valor = carta.substring( 0, carta.length - 1);
        return ( isNaN( valor )) ?
                (valor === 'A' ) ? 11 : 10
                : valor * 1;
    }

    // Turno 0 = primer jugador, ultima posiscion = computadora
    const acumularPuntos = ( turno, carta ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        playerScore[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );

    };

    const determinarGanador = () => {

        const [ puntosMin, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if ( puntosComputadora === puntosMin ){
                alert(' -- EMPATE -- ');
            } else if ( puntosMin === 21 ) {
                alert(' -- GANASTE -- ');
            } else if ( puntosMin > 21 ) {
                alert(' -- PERDISTE -- ');
            } else if ( puntosComputadora > 21 ) {
                alert(' -- GANASTE -- ');
            } else {
                alert(' -- PERDISTE -- ');
            }
        }, 100 );

    };

    const turnoComputadora = ( puntosMin ) => {

        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( puntosJugadores.length -1, carta );
            crearCarta(carta, puntosJugadores.length -1 );

        } while ( (puntosComputadora < puntosMin) && (puntosMin <= 21 ) );
        
        determinarGanador();
    }




    // Eventos 
    btnPeticion.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( 0, carta );

        crearCarta( carta, 0 )


        if ( puntosJugador > 21 ){
            console.warn( "Has perdido" );
            btnPeticion.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        } else if ( puntosJugador === 21 ){
            console.warn( "Has ganado" );
            btnPeticion.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }

        
    });

    btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true;
        btnPeticion.disabled = true;
        turnoComputadora( puntosJugadores[0] );

    });

    btnNuevoJuego.addEventListener('click', () => {

        inicializarJuego();

    });

    return {
        nuevoJuego: inicializarJuego
    };

})();