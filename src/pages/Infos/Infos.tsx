import React, { useEffect } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import './Infos.scss';

const InfosPage: React.FC = () => {
    const history = useHistory();
    
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            history.replace('/auth');
        }
    }, [history]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        history.replace('/auth');
    };

    const position = localStorage.getItem('position');

    let message = '';
    if (!position) {
        message = 'Vous n\'avez pas encore de rôles attribués, veuillez en informer votre RH.';
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
