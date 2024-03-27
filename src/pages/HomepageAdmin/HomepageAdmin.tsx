import React from 'react';
import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './HomepageAdmin.scss';
import HeaderAdmin from '../../components/Header/Admin/HeaderAdmin';

const HomepageAdmin: React.FC = () => {
    const history = useHistory();

    const navigateToPage = (page: string) => {
        history.push(`/${page}`);
    };

    return (
        <IonPage>
            <HeaderAdmin />
            <IonContent>
                <div className="homepage-container">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" size-md="4">
                                <IonCard className="homepage-card" onClick={() => navigateToPage('flotte')}>
                                    <IonImg src="src/assets/images/ma-flotte.png" alt="Ma flotte" />
                                    <IonCardHeader>
                                        <IonCardSubtitle>Explorez</IonCardSubtitle>
                                        <IonCardTitle>Ma flotte</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                            <IonCol size="12" size-md="4">
                                <IonCard className="homepage-card" onClick={() => navigateToPage('employers')}>
                                    <IonImg src="src/assets/images/mes-employers.png" alt="Les employers" />
                                    <IonCardHeader>
                                        <IonCardSubtitle>Gérez</IonCardSubtitle>
                                        <IonCardTitle>Les employers</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                            <IonCol size="12" size-md="4">
                                <IonCard className="homepage-card" onClick={() => navigateToPage('factures')}>
                                    <IonImg src="src/assets/images/mes-factures.png" alt="Les factures" />
                                    <IonCardHeader>
                                        <IonCardSubtitle>Gérez</IonCardSubtitle>
                                        <IonCardTitle>Les factures</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default HomepageAdmin;
