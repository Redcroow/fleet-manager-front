export async function loginUser(email: string, password: string): Promise<any> {

    try {
        const response = await fetch('https://0a7b-81-255-86-73.ngrok-free.app/auth/login', {
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
