// Função para obter valores aleatórios entre 0 e 100
function getRandomInitialValue() {
    return Math.floor(Math.random() * 101);  // Valor aleatório entre 0 e 100
}

// Função para obter valores aleatórios que mudam gradualmente
function getRandomValue(currentValue) {
    const randomChange = Math.floor(Math.random() * 11) - 5;  // Valor aleatório entre -5 e 5
    let newValue = currentValue + randomChange;
    newValue = Math.max(0, Math.min(newValue, 100));  // Limita entre 0 e 100
    return newValue;
}

// Função para atualizar o valor, a cor e o preenchimento do gauge
function updateGauge(value, textId, ringId) {
    // Atualiza o texto
    const textEntity = document.getElementById(textId);
    textEntity.setAttribute('value', textId.split('-')[1] + ': ' + value + '%');
    
    // Atualiza a cor com base no valor (0% = vermelho, 100% = verde)
    const ringEntity = document.getElementById(ringId);
    const greenValue = Math.floor((value / 100) * 255);
    const redValue = 255 - greenValue;
    const color = `rgb(${redValue}, ${greenValue}, 0)`;
    ringEntity.setAttribute('color', color);

    // Atualiza o preenchimento do gauge (theta-length)
    const thetaLength = (value / 100) * 360;  // Converte a porcentagem em graus
    ringEntity.setAttribute('theta-length', thetaLength);
}

// Função para inicializar os gauges com valores aleatórios
function initializeGauges() {
    let oeeValue = getRandomInitialValue();
    let dispValue = getRandomInitialValue();
    let perfValue = getRandomInitialValue();
    let qualValue = getRandomInitialValue();

    // Atualiza os gauges com os valores iniciais
    updateGauge(oeeValue, 'text-OEE', 'ring-OEE');
    updateGauge(dispValue, 'text-Disponibilidade', 'ring-Disponibilidade');
    updateGauge(perfValue, 'text-Performance', 'ring-Performance');
    updateGauge(qualValue, 'text-Qualidade', 'ring-Qualidade');
}

// Função para atualizar os valores de todos os gauges de forma gradual
function randomUpdate() {
    let oeeValue = parseInt(document.getElementById('text-OEE').getAttribute('value').split(': ')[1].replace('%', ''));
    let dispValue = parseInt(document.getElementById('text-Disponibilidade').getAttribute('value').split(': ')[1].replace('%', ''));
    let perfValue = parseInt(document.getElementById('text-Performance').getAttribute('value').split(': ')[1].replace('%', ''));
    let qualValue = parseInt(document.getElementById('text-Qualidade').getAttribute('value').split(': ')[1].replace('%', ''));

    // Gera novos valores aleatórios gradualmente
    oeeValue = getRandomValue(oeeValue);
    dispValue = getRandomValue(dispValue);
    perfValue = getRandomValue(perfValue);
    qualValue = getRandomValue(qualValue);

    // Atualiza os gauges
    updateGauge(oeeValue, 'text-OEE', 'ring-OEE');
    updateGauge(dispValue, 'text-Disponibilidade', 'ring-Disponibilidade');
    updateGauge(perfValue, 'text-Performance', 'ring-Performance');
    updateGauge(qualValue, 'text-Qualidade', 'ring-Qualidade');
}

// Função para exibir os gauges ao clicar no botão
function showGauges() {
    const gauges = document.querySelectorAll('a-entity');
    gauges.forEach(gauge => gauge.setAttribute('visible', true));
}

// Configuração inicial quando a página carregar
window.onload = function() {
    // Inicializa os gauges com valores aleatórios
    initializeGauges();

    // Configura a atualização dos valores a cada 2 segundos
    setInterval(randomUpdate, 2000);

    // Configura o evento do botão para mostrar os gauges
    document.getElementById('showGaugesButton').addEventListener('click', showGauges);
};
