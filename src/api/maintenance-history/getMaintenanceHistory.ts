export async function getMaintenanceHistory(token: string, maintenanceId: number): Promise<any> {
    try {
        const response = await fetch(`http://fleetmanager-api.com:81/maintenance-history/${maintenanceId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch maintenance-history data: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching maintenance-history data:', error);
        throw error;
    }
}
