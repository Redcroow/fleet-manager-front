export async function getAllAccidentHistoryByUser(accessToken: string, userId: number): Promise<any> {
    try {
        const url = `http://fleetmanager-api.com:81/accident-history?userId=${userId}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to get accident-history: ${errorMessage}`);
        }

        const accidentData = await response.json();
        return accidentData;
    } catch (error) {
        console.error('Error during get accident-history:', error);
        throw error;
    }
}
