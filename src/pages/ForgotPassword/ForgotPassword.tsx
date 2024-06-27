import React, { useRef, useState } from 'react';
import {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardSubtitle
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import './ForgotPassword.scss';
import { arrowBack } from 'ionicons/icons';

const ForgotPage: React.FC = () => {
    const emailRef = useRef<HTMLIonInputElement>(null);
    const history = useHistory();
    const [showAlert, setShowAlert] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleSendEmail = () => {
        const emailValue = emailRef.current?.value;

        setShowAlert(true);
        setButtonDisabled(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 4000);

        // Add 5-second delay before proceeding
        setTimeout(() => {
            console.log('Email sent to:', emailValue);
            // Additional logic after timeout (e.g., sending email request)
            setButtonDisabled(false);
        }, 5000);
    };

    const handleBack = () => {
        history.push('/auth');
    };

    return (
        <IonPage>
            <IonContent>
                <IonCard color="warning">
                    <IonCardHeader>
                        <IonCardSubtitle>L'envoie de mail n'est pas encore disponible. 🚧</IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>
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
                                <IonButton expand="block" onClick={handleSendEmail} disabled={buttonDisabled}>Envoyer</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton fill="clear" color="light" onClick={handleBack} className="white-button">
                                    <IonIcon icon={arrowBack} slot="start" />
                                    Retour
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    {showAlert && (
                        <div className="alert-container">
                            <IonCard color="success">
                                <IonCardHeader>
                                    <IonCardSubtitle>Email envoyé avec succès 🎉</IonCardSubtitle>
                                </IonCardHeader>
                            </IonCard>
                        </div>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ForgotPage;
