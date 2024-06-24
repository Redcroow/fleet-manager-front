export async function postEmployee(employeeData: any): Promise<any> {
    try {
        const response = await fetch('http://fleetmanager-api.com:81/employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to register employee: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering employee:', error);
        throw error;
    }
}
