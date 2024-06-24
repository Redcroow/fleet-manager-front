export async function postAccidentHistory(token: string, accidentHistoryData: any): Promise<any> {
    try {
        const response = await fetch('http://fleetmanager-api.com:81/accident-history', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accidentHistoryData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to register accident History: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering accident History:', error);
        throw error;
    }
}
