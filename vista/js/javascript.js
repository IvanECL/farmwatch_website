// Función para hacer la llamada a la API de ChatGPT usando fetch
const fetchChatGPTResponse = async (inputData) => {
    const apiKey = '';
    const url = 'https://api.openai.com/v1/chat/completions';

    const messages = [
        { role: 'system', content: 'Eres un asistente experto en análisis agrícola.' },
        { role: 'user', content: `Analiza los siguientes datos de cultivo: ${JSON.stringify(inputData)}` }
    ];

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages
            })
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        const responseData = await response.json();
        return responseData.choices[0].message.content;

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

        // Muestra los resultados en el div con id="resultadosProyeccion" con formato
        const resultadosDiv = document.getElementById('resultadosProyeccion');
        resultadosDiv.innerHTML = `
            <h3>Resultados del Análisis</h3>
            <ul>
                <li><strong>Altitud:</strong> El cultivo se encuentra a una altitud de ${inputData.altitud} metros sobre el nivel del mar. La altitud puede influir en factores como la temperatura y la disponibilidad de oxígeno para las plantas.</li>
                <li><strong>NDVI (Normalized Difference Vegetation Index):</strong> El valor de NDVI es ${inputData.NDVI}, lo que indica un buen nivel de vegetación y salud de las plantas en el cultivo.</li>
                <li><strong>Temperatura del Suelo:</strong> La temperatura del suelo es de ${inputData.temperatura_suelo} grados Celsius, lo cual afecta la germinación y la absorción de nutrientes.</li>
                <li><strong>Humedad Relativa:</strong> La humedad relativa es del ${inputData.humedad_relativa}%, un factor crucial para el crecimiento de las plantas.</li>
                <li><strong>CIgreen (Clorofila índice verde):</strong> El valor de CIgreen es ${inputData.CIgreen}, lo que indica la salud de la clorofila en las plantas.</li>
            </ul>
            <p>En general, los datos sugieren que el cultivo se encuentra en buenas condiciones. Monitorea estos parámetros regularmente para optimizar el rendimiento.</p>
        `;

    } catch (error) {
        console.error('Error al obtener la respuesta de ChatGPT:', error);
        alert('Ocurrió un error al obtener los resultados.');
    }
});
