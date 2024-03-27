import React, { useState, useRef } from 'react';
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

const AuthPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef<HTMLIonInputElement>(null);
    const history = useHistory();

    const handleLogin = async () => {
        const enteredPassword = passwordRef.current?.value || '';
        const enteredPass = enteredPassword.toString();
        console.log('Email: ', email);
        console.log('Mot de passe: ', enteredPass);
        try {
            const userData = await loginUser(email, enteredPass);
            console.log('Utilisateur connecté : ', userData);
            history.push('/homepage-admin');
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
                        <IonRow>
                            <IonCol>
                                <IonText>Vous n'avez pas de compte ? </IonText>
                                <IonRouterLink routerLink="/signup">Inscrivez-vous</IonRouterLink>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AuthPage;
