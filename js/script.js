// document.addEventListener('DOMContentLoaded', () => {
//     // Inicializa o valor dos gauges ao carregar a página
//     initializeGauges();

//     // Seleciona o botão de Status
//     const statusButton = document.querySelector('#status-button');

//     // Adiciona evento de clique ao botão de Status
//     statusButton.addEventListener('click', () => {
//         const gaugeGroup = document.getElementById('gauge-group');
//         gaugeGroup.setAttribute('visible', true); // Exibe os gauges
//     });
// });

// // Função para inicializar os gauges com valores aleatórios
// function initializeGauges() {
//     let oeeValue = getRandomInitialValue();
//     let dispValue = getRandomInitialValue();
//     let perfValue = getRandomInitialValue();
//     let qualValue = getRandomInitialValue();

//     // Atualiza os gauges com os valores iniciais
//     updateGauge(oeeValue, 'text-OEE', 'ring-OEE');
//     updateGauge(dispValue, 'text-Disponibilidade', 'ring-Disponibilidade');
//     updateGauge(perfValue, 'text-Performance', 'ring-Performance');
//     updateGauge(qualValue, 'text-Qualidade', 'ring-Qualidade');
// }

// // Função para atualizar os gauges
// function updateGauge(value, textId, ringId) {
//     document.getElementById(textId).setAttribute('value', `${value}%`);
//     document.getElementById(ringId).setAttribute('theta-length', (value / 100) * 360);
// }

// // Gera valores aleatórios para inicialização dos gauges
// function getRandomInitialValue() {
//     return Math.floor(Math.random() * 100);
// }
