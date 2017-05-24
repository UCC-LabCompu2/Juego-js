/**
 * Created by martin on 24/05/17.
 */

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');


var fondo;
var teclado = [];
var enemigos = [];
var balas = [];

var nave = {
    posX: 400,
    posY: 500,
    vel: 5
};

function Dibujar() {
    var i;
    // Limpio con la imagen de fondo
    ctx.drawImage(fondo, 0, 0);

    // Dibujo Nave
    ctx.fillStyle = 'white';
    ctx.fillRect(nave.posX, nave.posY, 20, 20);

    // Dibujo Enemigos

    for (i = 0; i < enemigos.length; i++) {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemigos[i].posX, enemigos[i].posY, 20, 20);
    }

    for (i = 0; i < balas.length; i++) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(balas[i].posX, balas[i].posY, 2, 4);
    }
}

function ActualizarEstado() {

    // Teclas Nave
    if (teclado[38]) { // arriba
        nave.posY -= nave.vel;
    }
    if (teclado[40]) { // abajo
        nave.posY += nave.vel;
    }
    if (teclado[37]) { // derecha
        nave.posX -= nave.vel;
    }
    if (teclado[39]) {  // izq
        nave.posX += nave.vel;
    }
    if (teclado[32]) {  // Disparo
        balas.push({    // Agrego una bala
            posX: nave.posX,
            posY: nave.posY,
            vel: -8
        });
    }

    // Verifico que la nave no salga de los bordes de la pantalla
    if (nave.posY < 0)
        nave.posY = 0;
    if (nave.posX < 0)
        nave.posX = 0;
    if (nave.posY > canvas.height)
        nave.posY = canvas.height;
    if (nave.posX > canvas.width)
        nave.posX = canvas.width;

    // Agrego enemigos si no hay
    if (enemigos.length < 15) {
        if (Math.random() > 0.9)
            enemigos.push({
                posX: Math.random() * canvas.width,
                posY: 0,
                vel: 4
            });
    }

    // Actualizo posición de los enemigos
    for (var i = 0; i < enemigos.length; i++) {
        enemigos[i].posY += enemigos[i].vel;
        if (enemigos[i].posY > canvas.height) {
            enemigos[i].posY = 0;
            enemigos[i].posX = Math.random() * canvas.width;
        }
    }

    balas.forEach(function (bala, idx) {
        bala.posY += bala.vel;
        if (bala.posY < 0)
            balas.splice(idx, 1);
    });
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
}
function teclaArriba(e) {
    teclado[e.keyCode] = false;
}