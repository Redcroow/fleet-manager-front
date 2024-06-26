export async function patchEmployee(token: string, employeeId: number, updatedFormData: any): Promise<any> {
    try {
        const response = await fetch(`http://fleetmanager-api.com:81/employee/${employeeId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFormData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to update profile data: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating profile data:', error);
        throw error;
    }
}
