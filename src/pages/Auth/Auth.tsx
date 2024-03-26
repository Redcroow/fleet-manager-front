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
    IonRouterLink
} from '@ionic/react';

import './Auth.scss';

const AuthPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const passwordRef = useRef<HTMLIonInputElement>(null); // Utilisation d'une référence pour le champ de mot de passe

    const handleLogin = () => {
        // Utiliser les valeurs de l'email et du mot de passe ici
        const enteredPassword = passwordRef.current?.value || ''; // Obtenir la valeur actuelle du champ de mot de passe
        console.log('Email: ', email);
        console.log('Mot de passe: ', enteredPassword);
    };

    return (
        <IonPage>
            <IonContent>
                <div className="auth-container">
                    <IonGrid>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <img src="src/theme/Assets/fleetmanager-white-logo.png" alt="Logo" />
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
                                    ref={passwordRef} // Utilisation de la référence pour le champ de mot de passe
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
