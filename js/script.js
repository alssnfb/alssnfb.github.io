// Variáveis para armazenar os valores atuais dos KPIs
let currentKPIValues = {
    "OEE": Math.random(),
    "Disponibilidade": Math.random(),
    "Performance": Math.random(),
    "Qualidade": Math.random()
};

let maxChangePerStep = 0.05; // Máxima mudança permitida por atualização
let gaugeElements = {}; // Para armazenar os elementos de gauges criados
let isSimulating = false;

// Função para gerar e atualizar os valores dos KPIs
function updateKPIValues() {
    if (!isSimulating) return;

    for (let kpiName in currentKPIValues) {
        let currentValue = currentKPIValues[kpiName];

        // Gera um novo valor alvo com base no valor atual, limitando a mudança
        let targetValue = currentValue + (Math.random() * 2 - 1) * maxChangePerStep;
        targetValue = Math.max(0, Math.min(1, targetValue)); // Clampa entre 0 e 1

        // Atualiza o valor suavemente
        currentKPIValues[kpiName] = lerp(currentValue, targetValue, 0.1);

        // Atualiza o gauge visualmente
        if (gaugeElements[kpiName]) {
            let scale = currentKPIValues[kpiName]; 
            gaugeElements[kpiName].setAttribute('scale', `${scale} 1 1`);
        }
    }
}

// Função de interpolação linear (similar ao Mathf.Lerp no Unity)
function lerp(a, b, t) {
    return a + (b - a) * t;
}

// Atualizar a cada 3 segundos
setInterval(updateKPIValues, 3000);

// Relaciona os elementos HTML com os KPIs
gaugeElements["OEE"] = document.querySelector('#gauge-OEE');
gaugeElements["Disponibilidade"] = document.querySelector('#gauge-Disponibilidade');
gaugeElements["Performance"] = document.querySelector('#gauge-Performance');
gaugeElements["Qualidade"] = document.querySelector('#gauge-Qualidade');

// Controle dos botões
const arButton = document.getElementById("arButton");
const backButton = document.getElementById("backButton");

arButton.addEventListener("click", () => {
    arButton.style.display = "none";
    backButton.style.display = "block";
    isSimulating = true;
});

backButton.addEventListener("click", () => {
    arButton.style.display = "block";
    backButton.style.display = "none";
    isSimulating = false;
});