export async function loginUser(email: string, password: string): Promise<any> {
    try {
        const response = await fetch('http://34.155.43.177:3000/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const userData = await response.json();
            return userData;
        } else {
            throw new Error('Échec de l\'authentification');
        }
    } catch (error) {
        console.error('Erreur lors de l\'authentification : ', error);
        throw error;
    }
}
