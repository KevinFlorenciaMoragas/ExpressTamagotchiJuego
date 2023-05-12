import React, { useState, useEffect } from 'react';

function Home(){
    return (
        <div>
            <h1>Bienvenido a los juegos de React con Express</h1>
            <h2>Selecciona el juego que deseas jugar</h2>
            <a href="/Tamagotchi">Tamagotchi</a>
            <a href='/Game'>Piedra, Papel o Tijera</a>
            
        </div>
    );
}
export default Home;