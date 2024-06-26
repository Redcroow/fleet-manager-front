export async function getAllMaintenanceHistoryByUser(accessToken: string, userId: number): Promise<any> {
    try {
        const url = `http://fleetmanager-api.com:81/maintenance-history?userId=${userId}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to get maintenance-history: ${errorMessage}`);
        }

        const maintenanceData = await response.json();
        return maintenanceData;
    } catch (error) {
        console.error('Error during get maintenance-history:', error);
        throw error;
    }
}
