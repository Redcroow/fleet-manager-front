// Dans Infos.tsx
import React, { useEffect } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Infos.scss';

const InfosPage: React.FC = () => {
    const history = useHistory();
    const hasCar = localStorage.getItem('hasCar');
    const userDataString = localStorage.getItem('userData');
    
    let userPosition = '';
    let messagePosition = '';
    let messageCar = '';
    
    if(userDataString) {
        const userData = JSON.parse(userDataString);
        userPosition = userData.position;
    }

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            history.replace('/auth');
        }
    }, [history]);

    const handleLogout = () => {
        localStorage.clear();
        history.replace('/auth');
    };

    if (!userPosition) {
        messagePosition = 'Vous n\'avez pas encore de rôles attribués, veuillez en informer votre RH.';
    }

    if (hasCar) {
        messageCar = 'Vous n\'avez pas encore de voiture attribués, veuillez en informer votre RH.';
    }

    return (
        <IonPage>
            <IonContent>
                <div className="infos-container">
                    <IonGrid>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <IonImg src="src/assets/images/fleetmanager-white-logo.png" alt="Logo" />
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <p>{messagePosition}</p>
                                <p>{messageCar}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <IonButton expand="block">Alerter la RH</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton fill="clear" color="light" onClick={handleLogout} className="white-button">
                                    Déconnexion
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default InfosPage;
