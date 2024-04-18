export async function loginUser(email: string, password: string): Promise<any> {

    try {
        const response = await fetch('https://6e6e-2a02-8428-8440-f501-1fad-eb-9652-b896.ngrok-free.app/auth/login', {
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
