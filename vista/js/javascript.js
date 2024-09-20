import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'; // Asegúrate de importar axios si no está disponible globalmente

// Función para hacer la llamada a la API de ChatGPT
const fetchChatGPTResponse = async (inputData) => {
    const apiKey = 'sk-1h9dC2D6HhsYUszrBm1_dU9ZRCGKm9ej3Cr-C-zfloT3BlbkFJD0wftMgnProC7fryibppZWOb9Y0tBRfiqI9kyUO3cA';  // Reemplaza con tu API Key de OpenAI
    const url = 'https://api.openai.com/v1/chat/completions';

    const messages = [
        { role: 'system', content: 'Eres un asistente experto en análisis agrícola.' },
        { role: 'user', content: `Analiza los siguientes datos de cultivo: ${JSON.stringify(inputData)}` }
    ];

    try {
        const response = await axios.post(url, {
            model: 'gpt-3.5-turbo',
            messages: messages
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content; // Devuelve la respuesta de ChatGPT
    } catch (error) {
        console.error('Error al llamar a la API de ChatGPT:', error);
        throw error;
    }
};

// Captura el evento de envío del formulario
document.getElementById('proyeccionForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evita la recarga de la página

    // Obtén los datos del formulario
    const inputData = {
        altitud: document.getElementById('altitud').value,
        NDVI: document.getElementById('ndvi').value,
        temperatura_suelo: document.getElementById('temperatura_suelo').value,
        humedad_relativa: document.getElementById('humedad_relativa').value,
        CIgreen: document.getElementById('cigreen').value,
    };

    try {
        // Obtén la respuesta de la API de ChatGPT
        const chatGPTResponse = await fetchChatGPTResponse(inputData);

        // Guarda los resultados en el localStorage
        localStorage.setItem('proyeccionResultados', chatGPTResponse);

        // Redirige a la pantalla de resultados
        window.location.href = 'resultados-proyeccion.html';
    } catch (error) {
        console.error('Error al obtener la respuesta de ChatGPT:', error);
    }
});
