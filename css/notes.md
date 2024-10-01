body, html {
    margin: 0;
    padding: 0;
    overflow: hidden; /* Evita rolagem */
    height: 100%; /* Garante que o body ocupe 100% da altura */
}

a-scene {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
}

button {
    position: absolute;
    z-index: 2; /* Garante que o botão fique acima da cena */
    background-color: rgba(255, 255, 255, 0.7); /* Fundo semi-transparente */
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
}

a-entity[camera] {
    position: 0 0 -3; /* Afastar a câmera do marcador */
}

a-entity {
    transition: transform 0.3s ease-in-out; /* Suaviza a movimentação dos elementos */
}


**HTML**

<a-entity id="gauge-OEE" position="-1.5 0 0" scale="1.2 1.2 1.2" material="color: blue;">
<a-plane position="0 0 0" rotation="-90 0 0" width="1" height="1" color="blue"></a-plane>