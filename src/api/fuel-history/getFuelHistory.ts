export async function getFuelHistory(token: string, fuelId: number): Promise<any> {
    try {
        const response = await fetch(`http://fleetmanager-api.com:81/fuel-history/${fuelId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch fuel-history data: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching fuel-history data:', error);
        throw error;
    }
}
