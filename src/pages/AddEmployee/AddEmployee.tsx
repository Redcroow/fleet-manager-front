import React, { useRef, useState } from 'react';
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
    IonProgressBar,
    IonImg,
    IonToast
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import './AddEmployee.scss';
import { postEmployee } from '../../api/employee/postEmployee';

const AddEmployee: React.FC = () => {
    const [step, setStep] = useState(1);
    const [name, setFirstName] = useState('');
    const [surname, setLastName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [position, setPosition] = useState('Employee');
    const [showToast, setShowToast] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const passwordRef = useRef<HTMLIonInputElement>(null);
    const history = useHistory();
    const token = localStorage.getItem('access_token');

    const clearInputs = () => {
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
        setStep(1);
    };

    const handleNextStep = async () => {
        if (step === 1) {
            setStep(2);
        } else {
            setIsButtonDisabled(true);
            const enteredPassword = passwordRef.current?.value || '';
            const employeeData = { name, surname, phone_number, email, password: enteredPassword, position };
            try {
                if (token) {
                    const response = await postEmployee(token, employeeData);
                    if (response) {
                        setShowToast(true);
                        setTimeout(() => {
                            setShowToast(false);
                            clearInputs();
                            history.push('/employees');
                            setIsButtonDisabled(false);
                            window.location.reload();
                        }, 3000);
                    }
                }
            } catch (error) {
                console.error('Error registering employee:', error);
                setIsButtonDisabled(false);
            }
        }
    };

    const handleBack = () => {
        clearInputs();
        history.push('/employees');
        window.location.reload();
    };

    return (
        <IonPage>
            <IonContent>
                <div className="addemployee-container">
                    <IonGrid>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <IonImg src="src/assets/images/fleetmanager-white-logo.png" alt="Logo" />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonInput disabled={true}>
                                    {position}
                                </IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonInput
                                    type="text"
                                    placeholder="Nom"
                                    value={name}
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
                                    value={surname}
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
                                    value={phone_number}
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
                                            ref={passwordRef}
                                        ></IonInput>
                                    </IonCol>
                                </IonRow>
                            </>
                        }
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <IonButton expand="block" onClick={handleNextStep} disabled={isButtonDisabled}>
                                    {step === 1 ? 'Suivant' : 'Ajouter'}
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
                                <IonButton fill="clear" color="light" onClick={handleBack} className="white-button">
                                    <IonIcon icon={arrowBack} slot="start" />
                                    Retour
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
                <IonToast
                    isOpen={showToast}
                    message="Profil bien créé 🎉"
                    duration={3000}
                    color="success"
                />
            </IonContent>
        </IonPage>
    );
};

export default AddEmployee;
