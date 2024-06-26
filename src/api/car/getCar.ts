export async function getCar(accessToken: string, employeeId: number): Promise<any> {
    try {
        const response = await fetch(`http://fleetmanager-api.com:81/car/${employeeId}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to get car: ${errorMessage}`);
        }

        const carData = await response.json();
        return carData;
    } catch (error) {
        console.error('Error during car:', error);
        throw error;
    }
}