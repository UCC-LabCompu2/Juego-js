/**
 * Created by martin on 24/05/17.
 */

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');


var fondo;
var teclado = [];
var enemigos = [];

var nave = {
    posX: 400,
    posY: 300,
    vel: 5
};

function Dibujar() {
    // Limpio con la imagen de fondo
    ctx.drawImage(fondo, 0, 0);

    // Dibujo Nave
    ctx.fillStyle = 'white';
    ctx.fillRect(nave.posX, nave.posY, 20, 20);

    // Dibujo Enemigos

    for (var i = 0; i < enemigos.length; i++) {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemigos[i].posX, enemigos[i].posY, 20, 20);
    }

}

function ActualizarEstado() {

    // Teclas Nave
    if (teclado[38]) {
        nave.posY -= nave.vel;
    }
    if (teclado[40]) {
        nave.posY += nave.vel;
    }
    if (teclado[37]) {
        nave.posX -= nave.vel;
    }
    if (teclado[39]) {
        nave.posX += nave.vel;
    }
    if (nave.posY < 0)
        nave.posY = 0;

    if (nave.posX < 0)
        nave.posX = 0;

    if (nave.posY > canvas.height)
        nave.posY = canvas.height;

    if (nave.posX > canvas.width)
        nave.posX = canvas.width;


    if (enemigos.length < 5) {
        enemigos.push({
            posX: Math.random() * canvas.width,
            posY: 0,
            vel: 4
        });
    }
    for (var i = 0; i < enemigos.length; i++) {
        enemigos[i].posY += enemigos[i].vel;
        if (enemigos[i].posY > canvas.height) {
            enemigos[i].posY = 0;
            enemigos[i].posX = Math.random() * canvas.width;
        }
    }
}

function LeeEntradas() {

}


// Cargo fondo
fondo = new Image();
fondo.src = 'space.jpeg';

fondo.onload = function () {
    setInterval(function () {
        LeeEntradas();
        ActualizarEstado();
        Dibujar();
    }, 1000 / 30);
};

function teclaAbajo(e) {
    teclado[e.keyCode] = true;
    console.log(e.keyCode);
}
function teclaArriba(e) {
    teclado[e.keyCode] = false;
}