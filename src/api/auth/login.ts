export async function loginUser(email: string, password: string): Promise<any> {

    try {
        console.log(email)
        console.log(password)
        const response = await fetch('http://fleetmanager-api.com/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            }
        });
        console.log(response)

        // if (response.ok) {
        //     const userData = await response.json();
        //     return userData;
        // } else {
        //     throw new Error('Échec de l\'authentification');
        // }

    } catch (error) {
        console.error('Erreur lors de l\'authentification : ', error);
        throw error;
    }
}
