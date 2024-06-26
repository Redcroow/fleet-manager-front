import React, { useState, useRef, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonRouterLink,
    IonImg
} from '@ionic/react';

import { loginUser } from './../../api/auth/login';
import './Auth.scss';
import { useHistory } from 'react-router-dom';
import { getCarAll } from '../../api/car/getCarAll';


interface DecodedUserToken {
    id: number;
    carId: number;
    first_name: string;
    last_name: string;
    email: string;
    position: string;
}

const AuthPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef<HTMLIonInputElement>(null);
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        if (token) {
            const decoded: DecodedUserToken = jwtDecode(token);
            if (decoded.position === "RH") {
                history.push('/homepage-admin');
            } else if (decoded.position === "Employee") {
                history.push('/homepage-employee');
                if (decoded.carId) {
                    history.push('/homepage-employee');
                } else {
                    history.push('/infos');
                }     
            } else {
                history.push('/infos');
            }
        }
    }, []);

    const handleLogin = async () => {
        const enteredPassword = passwordRef.current?.value || '';
        const enteredPass = enteredPassword.toString();
        try {
            const userData = await loginUser(email, enteredPass);

            if (userData.access_token) {

                localStorage.setItem('access_token', userData.access_token);
                const decoded: DecodedUserToken = jwtDecode(userData.access_token);
                localStorage.setItem('userData', JSON.stringify(decoded));

                if (decoded.position === "RH") {
                    history.push('/homepage-admin');

                } else if (decoded.position === "Employee") {
                    try {
                        if (decoded.carId) {
                            history.push('/homepage-employee');
                        } else {
                            history.push('/infos');
                        }     
                    } catch (error) {
                        console.error('Erreur lors de la récupération des données de voiture : ', error);
                    }
                } else {
                    history.push('/infos');
                }
            }
        } catch (error) {
            console.error('Erreur lors de la connexion : ', error);
        }
    };
    

    return (
        <IonPage>
            <IonContent>
                <div className="auth-container">
                    <IonGrid>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <IonImg src="src/assets/images/fleetmanager-white-logo.png" alt="Logo" />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonInput
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onIonChange={(e) => setEmail(e.detail.value!)}
                                ></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonInput
                                    type="password"
                                    placeholder="Mot de passe"
                                    value={password}
                                    onIonChange={(e) => setPassword(e.detail.value!)}
                                    ref={passwordRef}
                                ></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="ion-text-end">
                                <IonRouterLink routerLink="/forgot-password">Mot de passe oublié</IonRouterLink>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton expand="block" onClick={handleLogin}>Se connecter</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AuthPage;
