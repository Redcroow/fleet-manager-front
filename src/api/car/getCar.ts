export async function getCarAll(): Promise<any> {

    try {
        const response = await fetch('https://0a7b-81-255-86-73.ngrok-free.app/car', {
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
