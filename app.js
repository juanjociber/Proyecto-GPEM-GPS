async function obtenerDireccion(latitud, longitud) {
    var url = `https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const address = data.display_name;
        document.getElementById("direccion").textContent = address;
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

obtenerGeolocalizacion();