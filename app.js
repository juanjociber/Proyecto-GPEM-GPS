async function obtenerDireccion(latitud, longitud) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const address = data.display_name;
        document.getElementById("direccion").textContent = address;
        
        document.querySelector('#mapa').innerHTML = `
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d3903.8292716492524!2d${longitud}!3d${latitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d${latitud}!2d${longitud}!4m3!3m2!1d${latitud}!2d${longitud}!5e0!3m2!1ses-419!2spe!4v1717531069082!5m2!1ses-419!2spe" 
            width="600" 
            height="450" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    `;
    } catch (error) {
        console.error('Error al obtener la dirección:', error);
    }
}

async function obtenerGeolocalizacion() {
    if (navigator.geolocation) {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;

            document.getElementById("latitud").textContent = latitud;
            document.getElementById("longitud").textContent = longitud;

            await obtenerDireccion(latitud, longitud);

            // Verificación de las coordenadas
            console.log(`Latitud: ${latitud}, Longitud: ${longitud}`);

        } catch (error) {
            // Manejar errores
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("El usuario ha denegado la solicitud de geolocalización.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("La información de ubicación no está disponible.");
                    break;
                case error.TIMEOUT:
                    alert("Se ha agotado el tiempo para obtener la ubicación del usuario.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("Se ha producido un error desconocido.");
                    break;
            }
        }
    } else {
        alert("Geolocalización no soportada por este navegador.");
    }
}

setInterval(obtenerGeolocalizacion,60000);

