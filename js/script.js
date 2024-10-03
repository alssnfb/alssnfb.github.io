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

// Função para exibir os gauges como um modelo 3D na tela
function showGauges() {
    const gaugeGroup = document.getElementById('gauge-group');
    gaugeGroup.setAttribute('visible', true);
}

// Função para permitir manipulação dos gauges (gestos)
AFRAME.registerComponent('gesture-handler', {
    schema: {
        enabled: {default: true}
    },
    init: function () {
        this.initialScale = this.el.object3D.scale.clone();
        this.deltaScale = new THREE.Vector3();
        this.initialRotation = this.el.object3D.rotation.clone();
    },
    play: function () {
        this.el.sceneEl.canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.el.sceneEl.canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
    },
    pause: function () {
        this.el.sceneEl.canvas.removeEventListener('touchstart', this.onTouchStart.bind(this));
        this.el.sceneEl.canvas.removeEventListener('touchmove', this.onTouchMove.bind(this));
    },
    onTouchStart: function (event) {
        if (event.touches.length === 2) {
            this.initialDistance = this.getDistance(event.touches[0], event.touches[1]);
            this.initialScale.copy(this.el.object3D.scale);
        } else if (event.touches.length === 1) {
            this.initialX = event.touches[0].pageX;
        }
    },
    onTouchMove: function (event) {
        if (event.touches.length === 2) {
            // Pinch to scale
            const currentDistance = this.getDistance(event.touches[0], event.touches[1]);
            const scaleFactor = currentDistance / this.initialDistance;
            this.el.object3D.scale.copy(this.initialScale).multiplyScalar(scaleFactor);
        } else if (event.touches.length === 1) {
            // Single finger rotate
            const deltaX = event.touches[0].pageX - this.initialX;
            this.el.object3D.rotation.y = this.initialRotation.y + deltaX * 0.01;
        }
    },
    getDistance: function (touch1, touch2) {
        const dx = touch1.pageX - touch2.pageX;
        const dy = touch1.pageY - touch2.pageY;
        return Math.sqrt(dx * dx + dy * dy);
    }
});

// Função para atualizar os valores de todos os gauges de forma gradual
function randomUpdate() {
    let oeeValue = parseInt(document.getElementById('text-OEE').getAttribute('value').split(': ')[1].replace('%', ''));
    let dispValue = parseInt(document.getElementById('text-Disponibilidade').getAttribute('value').split(': ')[1].replace('%', ''));
    let perfValue = parseInt(document.getElementById('text-Performance').getAttribute('value').split(': ')[1].replace('%', ''));
    let qualValue = parseInt(document.getElementById('text-Qualidade').getAttribute('value').split(': ')[1].replace('%', ''));

    oeeValue = getRandomValue(oeeValue);
    dispValue = getRandomValue(dispValue);
    perfValue = getRandomValue(perfValue);
    qualValue = getRandomValue(qualValue);

    updateGauge(oeeValue, 'text-OEE', 'ring-OEE'); updateGauge(dispValue, 'text-Disponibilidade', 'ring-Disponibilidade'); updateGauge(perfValue, 'text-Performance', 'ring-Performance'); updateGauge(qualValue, 'text-Qualidade', 'ring-Qualidade'); }

    