import React from 'react';
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon
} from '@ionic/react';

import { arrowBack } from 'ionicons/icons';
import './Infos.scss';

const InfosPage: React.FC = () => {
    const hasRole = false;
    const hasCar = false;

    let message = '';
    if (!hasRole && !hasCar) {
        message = 'Vous n\'avez pas encore de rôle défini et de voiture attribuée, veuillez en informer votre RH.';
    } else if (!hasRole) {
        message = 'Vous n\'avez pas encore de rôle défini, veuillez en informer votre RH.';
    } else if (!hasCar) {
        message = 'Vous n\'avez pas encore de voiture attribuée, veuillez en informer votre RH.';
    }

    return (
        <IonPage>
            <IonContent>
                <div className="infos-container">
                    <IonGrid>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <img src="src/theme/Assets/fleetmanager-white-logo.png" alt="Logo" />
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <p>{message}</p>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-md="6">
                                <IonButton expand="block">Alerter la RH</IonButton>
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

export default InfosPage;
