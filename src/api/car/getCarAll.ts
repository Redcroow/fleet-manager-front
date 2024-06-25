export async function getCarAll(accessToken: string): Promise<any> {
    try {
        const response = await fetch('http://fleetmanager-api.com:81/car', {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to get all cars: ${errorMessage}`);
        }

        const carData = await response.json();
        return carData;
    } catch (error) {
        console.error('Error during get all cars:', error);
        throw error;
    }
}
