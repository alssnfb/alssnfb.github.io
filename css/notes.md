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

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>AR KPI Dashboard</title>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
    <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar.js"></script>
    <style>
        a-scene {
            width: 100vw;
            height: 100vh;
            position: absolute;
            top: 0;
            left: 0;
        }
        body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <script>
        // Função para gerar um valor aleatório entre dois números
        function getRandomValue(min, max) {
            return Math.random() * (max - min) + min;
        }

        // Atualiza os gauges gradualmente
        function simulateGaugeChange(textId, ringId, currentValue) {
            const newValue = getRandomValue(0, 100); // Gera um novo valor aleatório
            let step = (newValue - currentValue) / 100; // Define o passo de mudança gradual

            const interval = setInterval(() => {
                if (Math.abs(newValue - currentValue) < Math.abs(step)) {
                    currentValue = newValue; // Finaliza o valor
                    clearInterval(interval);
                } else {
                    currentValue += step; // Atualiza gradualmente
                }
                updateGauge(currentValue, textId, ringId);
            }, 50); // Atualiza a cada 50ms para uma transição suave
        }

        // Inicializa os gauges
        function initializeGauges() {
            let OEEValue = 100, DispValue = 100, PerfValue = 100, QualValue = 100;

            setInterval(() => {
                simulateGaugeChange('text-OEE', 'ring-OEE', OEEValue);
                simulateGaugeChange('text-Disponibilidade', 'ring-Disponibilidade', DispValue);
                simulateGaugeChange('text-Performance', 'ring-Performance', PerfValue);
                simulateGaugeChange('text-Qualidade', 'ring-Qualidade', QualValue);
            }, 5000); // A cada 5 segundos, simula uma nova atualização de todos os gauges
        }

        // Atualiza os gauges
        function updateGauge(value, textId, ringId) {
            const textEntity = document.getElementById(textId);
            const ringEntity = document.getElementById(ringId);

            if (textEntity && ringEntity) {
                textEntity.setAttribute('value', textId.split('-')[1] + ': ' + Math.round(value) + '%');

                const greenValue = Math.floor((value / 100) * 255);
                const redValue = 255 - greenValue;
                const color = `rgb(${redValue}, ${greenValue}, 0)`;
                ringEntity.setAttribute('color', color);

                const thetaLength = (value / 100) * 360;
                ringEntity.setAttribute('theta-length', thetaLength);
            } else {
                console.error("Element not found:", textId, ringId);
            }
        }

        // Inicializa os gauges quando a página carrega
        document.addEventListener('DOMContentLoaded', () => {
            initializeGauges();
            document.getElementById("gauges-group").setAttribute("visible", "false"); // Esconde os gauges no início

            // Adiciona o evento de clique para o botão de Status
            const statusButton = document.getElementById("status-button");
            const gaugesGroup = document.getElementById("gauges-group");
            
            statusButton.addEventListener("click", function () {
                console.log("Botão clicado!");
                const isVisible = gaugesGroup.getAttribute("visible") === "true";
                gaugesGroup.setAttribute("visible", !isVisible);
                console.log("Gauges visibility:", !isVisible);
            });
        });
    </script>

    <a-scene embedded arjs='sourceType:webcam; sourceWidth:1280; sourceHeight:960; displayWidth:1280; displayHeight:960; videoTexture:true;'>
        <!-- Botão de Status -->
        <a-entity id="status-button" class="clickable" position="-0.5 0 -3" geometry="primitive: box; depth: 0.3; height: 0.3; width: 0.5" material="color: green">
            <a-text value="Status" align="center" position="0 0.3 0"></a-text>
        </a-entity>

        <!-- Botão de Manutenção -->
        <a-entity id="manut-button" class="clickable" position="0.5 0 -3" geometry="primitive: box; depth: 0.3; height: 0.3; width: 0.5" material="color: red">
            <a-text value="Manutencao" align="center" position="0 0.3 0"></a-text>
        </a-entity>

        <!-- Grupo de gauges -->
        <a-entity id="gauges-group" visible="false"> <!-- Inicialmente invisível -->
            <a-entity id="gauge-OEE" position="-1.5 0.5 -3" scale="0.5 0.5 0.5">
                <a-ring id="ring-OEE" color="blue" radius-inner="0.5" radius-outer="0.6" theta-start="0" theta-length="0"></a-ring>
                <a-text id="text-OEE" value="OEE: 100%" position="0 0.8 0" align="center" color="white"></a-text>
            </a-entity>

            <a-entity id="gauge-Disponibilidade" position="-0.5 0.5 -3" scale="0.5 0.5 0.5">
                <a-ring id="ring-Disponibilidade" color="orange" radius-inner="0.5" radius-outer="0.6" theta-start="0" theta-length="0"></a-ring>
                <a-text id="text-Disponibilidade" value="Disp: 100%" position="0 0.8 0" align="center" color="white"></a-text>
            </a-entity>

            <a-entity id="gauge-Performance" position="0.5 0.5 -3" scale="0.5 0.5 0.5">
                <a-ring id="ring-Performance" color="green" radius-inner="0.5" radius-outer="0.6" theta-start="0" theta-length="0"></a-ring>
                <a-text id="text-Performance" value="Perf: 100%" position="0 0.8 0" align="center" color="white"></a-text>
            </a-entity>

            <a-entity id="gauge-Qualidade" position="1.5 0.5 -3" scale="0.5 0.5 0.5">
                <a-ring id="ring-Qualidade" color="yellow" radius-inner="0.5" radius-outer="0.6" theta-start="0" theta-length="0"></a-ring>
                <a-text id="text-Qualidade" value="Qual: 100%" position="0 0.8 0" align="center" color="white"></a-text>
            </a-entity>
        </a-entity>

        <!-- AR -->
        <a-entity camera look-controls>
            <a-entity cursor="fuse: false" raycaster="objects: .clickable"
            position="0 0 -1" geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: black; shader: flat"></a-entity>
        </a-entity>
    </a-scene>
</body>
</html>
