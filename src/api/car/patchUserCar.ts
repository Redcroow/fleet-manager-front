export async function patchUserCar(token: string, carId: number, assignedIdData: { assignedEmployeeId: number }): Promise<any> {
    console.log(carId , assignedIdData)
    try {
        const response = await fetch(`http://fleetmanager-api.com:81/car/${carId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(assignedIdData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to update car data: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating car data:', error);
        throw error;
    }
}
