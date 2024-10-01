// Variáveis para armazenar os valores atuais dos KPIs
let currentKPIValues = {
    "OEE": Math.random(),
    "Disponibilidade": Math.random(),
    "Performance": Math.random(),
    "Qualidade": Math.random()
};

let maxChangePerStep = 0.05; // Máxima mudança permitida por atualização
let gaugeElements = {}; // Para armazenar os elementos de gauges criados
let textElements = {}; // Para armazenar os elementos de texto

// Função para gerar e atualizar os valores dos KPIs
function updateKPIValues() {
    for (let kpiName in currentKPIValues) {
        let currentValue = currentKPIValues[kpiName];

        // Gera um novo valor alvo com base no valor atual, limitando a mudança
        let targetValue = currentValue + (Math.random() * 2 - 1) * maxChangePerStep;
        targetValue = Math.max(0, Math.min(1, targetValue)); // Clampa entre 0 e 1

        // Atualiza o valor suavemente
        currentKPIValues[kpiName] = lerp(currentValue, targetValue, 0.1);

        // Atualiza o gauge visualmente (tamanho do anel)
        if (gaugeElements[kpiName]) {
            let scale = currentKPIValues[kpiName]; 
            gaugeElements[kpiName].setAttribute('scale', `${scale} 1 1`);
        }

        // Atualiza o texto com a porcentagem
        if (textElements[kpiName]) {
            let percentage = (currentKPIValues[kpiName] * 100).toFixed(1) + '%';
            textElements[kpiName].setAttribute('value', `${kpiName}: ${percentage}`);
        }
    }
}

// Função de interpolação linear (similar ao Mathf.Lerp no Unity)
function lerp(a, b, t) {
    return a + (b - a) * t;
}

// Atualiza os valores a cada 3 segundos
setInterval(updateKPIValues, 3000);

// Relaciona os elementos HTML com os KPIs
gaugeElements["OEE"] = document.querySelector('#gauge-OEE a-ring');
gaugeElements["Disponibilidade"] = document.querySelector('#gauge-Disponibilidade a-ring');
gaugeElements["Performance"] = document.querySelector('#gauge-Performance a-ring');
gaugeElements["Qualidade"] = document.querySelector('#gauge-Qualidade a-ring');

// Relaciona os textos com os KPIs
textElements["OEE"] = document.querySelector('#text-OEE');
textElements["Disponibilidade"] = document.querySelector('#text-Disponibilidade');
textElements["Performance"] = document.querySelector('#text-Performance');
textElements["Qualidade"] = document.querySelector('#text-Qualidade');

// // Evento para detectar quando o QR code é lido
// const qrMarker = document.getElementById('qrMarker');
// qrMarker.addEventListener('markerFound', () => {
//     console.log('QR Code detectado! Exibindo gauges...');
//     updateKPIValues(); // Atualiza os KPIs quando o QR code é detectado
// });

// qrMarker.addEventListener('markerLost', () => {
//     console.log('QR Code perdido. Pausando exibição dos gauges.');
// });
