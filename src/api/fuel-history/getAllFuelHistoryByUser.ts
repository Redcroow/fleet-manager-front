export async function getAllFuelHistoryByUser(accessToken: string, userId: number): Promise<any> {
    try {
        const url = `http://fleetmanager-api.com:81/fuel-history?userId=${userId}`;

        const response = await fetch(url, {
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
