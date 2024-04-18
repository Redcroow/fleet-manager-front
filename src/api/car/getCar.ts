export async function getCarAll(): Promise<any> {

    try {
        const response = await fetch('https://6e6e-2a02-8428-8440-f501-1fad-eb-9652-b896.ngrok-free.app/car', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
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
