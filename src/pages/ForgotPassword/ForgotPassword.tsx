import React, { useRef } from 'react';
import {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/react';

import './ForgotPassword.scss';

const ForgotPage: React.FC = () => {
    const emailRef = useRef<HTMLIonInputElement>(null);

    const handleSendEmail = () => {
        const emailValue = emailRef.current?.value;
        console.log('Email envoyé : ', emailValue);
    };

    return (
        <IonPage>
            <IonContent>
                <div className="forgot-password-container">
                    <IonGrid>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <h1>Réinitialisation du mot de passe</h1>
                                <p>Veuillez saisir votre adresse e-mail pour réinitialiser votre mot de passe.</p>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <IonInput
                                    type="email"
                                    placeholder="Email"
                                    ref={emailRef}
                                ></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <IonButton expand="block" onClick={handleSendEmail}>Envoyer</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ForgotPage;
