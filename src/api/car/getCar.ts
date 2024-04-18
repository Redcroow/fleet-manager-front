export async function getCarAll(accessToken: string): Promise<any> {
    try {
        const response = await fetch('https://6e6e-2a02-8428-8440-f501-1fad-eb-9652-b896.ngrok-free.app/car', {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${accessToken}`,
                // a enlever quand l'api sera en ligne
                "ngrok-skip-browser-warning": "69420"
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to get car: ${errorMessage}`);
        }

        const carData = await response.json();
        return carData;
    } catch (error) {
        console.error('Error during get car:', error);
        throw error;
    }
}
