export async function getAllMaintenanceHistory(accessToken: string): Promise<any> {
    try {
        const response = await fetch('http://fleetmanager-api.com:81/maintenance-history', {
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

        const carData = await response.json();
        return carData;
    } catch (error) {
        console.error('Error during get maintenance-history:', error);
        throw error;
    }
}
