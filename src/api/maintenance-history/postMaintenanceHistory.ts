export async function postMaintenanceHistory(token: string, maintenanceHistoryData: any): Promise<any> {
    try {
        const response = await fetch('http://fleetmanager-api.com:81/maintenance-history', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(maintenanceHistoryData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to register maintenance History: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering maintenance History:', error);
        throw error;
    }
}
