// Sélectionner les éléments du DOM
const billInput = document.getElementById('bill-input');
const tipButtons = document.querySelectorAll('.select-tip-item');
const customTipInput = document.getElementById('select-tip-item-custom');
const numberOfPeopleError = document.getElementById('number-of-people-error')
const numberOfPeopleInput = document.getElementById('number-of-people-input');
const totalTipDisplay = document.getElementById('total-tip');
const totalDisplay = document.getElementById('total');
const resetButton = document.getElementById('reset-button');

// Variables pour stocker les valeurs actuelles
let billValue = 0;
let tipPercentage = 0;
let numberOfPeople = 1;


// Fonction pour calculer et mettre à jour les résultats
function calculateTip() {
    if (numberOfPeople > 0) {
        const tipAmount = (billValue * tipPercentage) / numberOfPeople;
        const totalAmount = (billValue + billValue * tipPercentage) / numberOfPeople;
        
        totalTipDisplay.textContent = `$${tipAmount.toFixed(2)}`;
        totalDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    } 
}

// Mettre à jour les valeurs en fonction des entrées
billInput.addEventListener('input', () => {
    billValue = parseFloat(billInput.value);
    calculateTip();
});

tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        tipPercentage = parseFloat(button.textContent) / 100;
        calculateTip();
    });
});


customTipInput.addEventListener('input', () => {
    const customTip = customTipInput.value;
    if (customTip !== "") {
        tipPercentage = parseFloat(customTip) / 100;
        calculateTip();
    }
});
    
    customTipInput.addEventListener('focus', () => {
        customTipInput.placeholder = ''; // Efface le placeholder au focus
    });
    
    customTipInput.addEventListener('blur', () => {
        if (customTipInput.value === '') {
            customTipInput.placeholder = 'Custom'; // Rétablit le placeholder si l'input est vide
        }
    });

numberOfPeopleInput.addEventListener('input', () => {
    // Met à jour la variable numberOfPeople avec la valeur actuelle de l'input
    numberOfPeople = parseFloat(numberOfPeopleInput.value);

    // Vérifie si la valeur est 0 ou si le champ est vide
    if (numberOfPeople === 0) {   
        numberOfPeopleInput.style.border = "2px solid rgb(225, 116, 87)";
        numberOfPeopleError.textContent = "Can't be zero";
    } else {
        numberOfPeopleInput.style.border = ""; // Réinitialise la bordure à sa valeur par défaut
        numberOfPeopleError.textContent = ""; // Réinitialise le message d'erreur
    }

    // Recalcule le pourboire si la valeur est valide
    calculateTip();
});

// Réinitialiser les valeurs
resetButton.addEventListener('click', () => {
    billInput.value = '';
    customTipInput.value = '';
    customTipInput.placeholder ='Custom';
    numberOfPeopleInput.value = '';
    totalTipDisplay.textContent = '$0.00';
    totalDisplay.textContent = '$0.00';
    billValue = 0;
    tipPercentage = 0;
    numberOfPeople = 1;
});



