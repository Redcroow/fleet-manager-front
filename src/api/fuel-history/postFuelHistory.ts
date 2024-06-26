export async function postFuelHistory(token: string, fuelHistoryData: any): Promise<any> {
    try {
        const response = await fetch('http://fleetmanager-api.com:81/fuel-history', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fuelHistoryData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to register fuel History: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering fuel History:', error);
        throw error;
    }
}
