import React, { useState } from 'react';
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
    IonIcon,
    IonProgressBar
} from '@ionic/react';

import { arrowBack } from 'ionicons/icons';
import './Signup.scss';

const SignupPage: React.FC = () => {
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNextStep = () => {
        if (step === 1) {
            setStep(2);
        } else {
            console.log('Informations de l\'utilisateur : ', { firstName, lastName, phoneNumber, email, password });
        }
    };

    return (
        <IonPage>
            <IonContent>
                <div className="signup-container">
                    <IonGrid>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <img src="src/theme/Assets/fleetmanager-white-logo.png" alt="Logo" />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonInput
                                    type="text"
                                    placeholder="Nom"
                                    value={firstName}
                                    onIonChange={(e) => setFirstName(e.detail.value!)}
                                    disabled={step === 2}
                                ></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonInput
                                    type="text"
                                    placeholder="Prénom"
                                    value={lastName}
                                    onIonChange={(e) => setLastName(e.detail.value!)}
                                    disabled={step === 2}
                                ></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonInput
                                    type="tel"
                                    placeholder="Téléphone"
                                    value={phoneNumber}
                                    onIonChange={(e) => setPhoneNumber(e.detail.value!)}
                                    disabled={step === 2}
                                ></IonInput>
                            </IonCol>
                        </IonRow>
                        {step === 2 &&
                            <>
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
                                        ></IonInput>
                                    </IonCol>
                                </IonRow>
                            </>
                        }
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <IonButton expand="block" onClick={handleNextStep}>
                                    {step === 1 ? 'Suivant' : 'S\'inscrire'}
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <IonProgressBar value={step === 1 ? 0.5 : 1}></IonProgressBar>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton fill="clear" color="light" onClick={() => window.history.back()} className="white-button">
                                    <IonIcon icon={arrowBack} slot="start" />
                                    Retour
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default SignupPage;
