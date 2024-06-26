export async function getEmployee(token: string, employeeId: number): Promise<any> {
    try {
        const response = await fetch(`http://fleetmanager-api.com:81/employee/${employeeId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch profile data: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error;
    }
}
