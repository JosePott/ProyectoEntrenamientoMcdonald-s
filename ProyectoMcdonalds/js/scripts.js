document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "Tiempo de duración de la cebolla rehidratada en la mesa de condimentación:",
            options: ["2 horas", "3 horas", "4 horas", "5 horas"],
            answer: 2
        },
        {
            question: "Menciona lugar de almacenamiento y tiempo de la cebolla una vez rehidratada:",
            options: ["En el refrigerador, por 12 horas, con tapa y fecha", "En el refrigerador, por 24 horas, con tapa y fecha", "En el congelador, por 24 horas, con tapa y fecha", "En el refrigerador, por 24 horas, sin tapa"],
            answer: 1
        },
        {
            question: "¿Cuáles son los departamentos que conforman RDM?",
            options: ["Gestión de personas, Experiencia de clientes, Producción y Sustentabilidad", "Marketing, Finanzas, Operaciones", "Recursos Humanos, IT, Ventas", "Atención al cliente, Producción, Logística"],
            answer: 0
        },
        {
            question: "Cuando en cocina están todos los puestos, ¿cuándo se borra el pedido del kvs?",
            options: ["Cuando el iniciador comienza el pedido", "Cuando el condimentador/finalizador le toma los productos al iniciador", "Cuando el cliente recibe su pedido", "Cuando el gerente lo aprueba"],
            answer: 1
        },
        {
            question: "¿Cuánta agua debemos agregar a la cebolla para hidratarla?",
            options: ["Hasta 1 cm debajo del borde", "Hasta 2,5 cm debajo del borde", "Hasta el borde", "No se le agrega agua"],
            answer: 1
        }
    ];

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let points = 0;

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const resultContainer = document.getElementById("result-container");
    const pointsElement = document.getElementById("points");

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.classList.add("btn");
            optionButton.addEventListener("click", () => checkAnswer(optionButton, index));
            optionsElement.appendChild(optionButton);
        });
    }

    function checkAnswer(button, selectedOption) {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedOption === currentQuestion.answer) {
            button.classList.add("correct", "animate__animated", "animate__bounceIn");
            correctAnswers++;
            points += 100;
            pointsElement.textContent = points;
        } else {
            button.classList.add("incorrect", "animate__animated", "animate__shakeX");
            navigator.vibrate(200); // Vibrar por 200ms
        }
        disableButtons();
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }, 1000);
    }

    function disableButtons() {
        const buttons = document.querySelectorAll('#options button');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    function showResults() {
        questionElement.style.display = 'none';
        optionsElement.style.display = 'none';
        resultContainer.style.display = 'block';
        const totalQuestions = questions.length;
        const percentage = (correctAnswers / totalQuestions) * 100;
        const resultText = document.getElementById('result-text');

        resultText.textContent = `Tu porcentaje: ${percentage.toFixed(2)}%`;
        if (percentage >= 80) {
            resultText.style.color = 'green';
        } else {
            resultText.style.color = 'red';
        }
    }

    loadQuestion(); // Cargar la primera pregunta al iniciar
});
