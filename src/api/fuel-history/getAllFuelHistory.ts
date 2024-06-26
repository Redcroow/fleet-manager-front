export async function getAllFuelHistory(accessToken: string): Promise<any> {
    try {
        const response = await fetch('http://fleetmanager-api.com:81/fuel-history', {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to get fuel-history: ${errorMessage}`);
        }

        const fuelData = await response.json();
        return fuelData;
    } catch (error) {
        console.error('Error during get fuel-history:', error);
        throw error;
    }
}
