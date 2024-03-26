import React from 'react';
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
                                <IonInput type="email" placeholder="Email"></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonInput type="password" placeholder="Mot de passe"></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="ion-text-end">
                                <IonRouterLink routerLink="/forgot-password">Mot de passe oublié</IonRouterLink>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton expand="block">Se connecter</IonButton>
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
