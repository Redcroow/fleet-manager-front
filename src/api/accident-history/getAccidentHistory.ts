export async function getAccidentHistory(token: string, accidentId: number): Promise<any> {
    try {
        const response = await fetch(`http://fleetmanager-api.com:81/accident-history/${accidentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch accident-history data: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching accident-history data:', error);
        throw error;
    }
}
