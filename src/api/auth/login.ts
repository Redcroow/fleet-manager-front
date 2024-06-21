export async function loginUser(email: string, password: string): Promise<any> {
    console.log("test")
    try {
        const response = await fetch('http://fleetmanager-api.com:81/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to login: ${errorMessage}`);
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}
