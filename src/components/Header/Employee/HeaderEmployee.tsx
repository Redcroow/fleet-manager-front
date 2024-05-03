import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { IonHeader, IonButtons, IonButton, IonIcon, IonPopover, IonList, IonItem, IonLabel, IonImg } from '@ionic/react';
import { menuOutline, personCircleOutline, logOutOutline, bookOutline, warningOutline } from 'ionicons/icons';
import './HeaderEmployee.scss'

const HeaderEmployee = () => {
    const history = useHistory();
    const location = useLocation();
    const [showPopover, setShowPopover] = useState(false);
    const [popoverEvent, setPopoverEvent] = useState<Event | undefined>(undefined);
    const isMyProfileActive = location.pathname === '/my-profile';
    const isMyHistoryActive = location.pathname === '/my-history';
    const isDeclarationActive = location.pathname === '/declaration';

    const openMenu = (e: React.MouseEvent) => {
        setShowPopover(true);
        setPopoverEvent(e.nativeEvent);
    };

    const closeMenu = () => {
        setShowPopover(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        setShowPopover(false);
        history.push('/auth');
    };

    const goToMyProfile = () => {
        history.push('/my-profile');
        setShowPopover(false);
    };
    const goToMyHistory = () => {
        history.push('/my-history');
        setShowPopover(false);
    };
    const goToDeclaration = () => {
        history.push('/declaration');
        setShowPopover(false);
    };

    return (
        <IonHeader>
            <IonImg src="src/assets/images/banner.png" className='image-header-employee' />
            <IonButtons className='button-header-employee'>
                <IonButton onClick={openMenu}>
                    <IonIcon icon={menuOutline} size="large" />
                </IonButton>
            </IonButtons>
            <IonPopover
                isOpen={showPopover}
                event={popoverEvent}
                onDidDismiss={closeMenu}
            >
                <IonList>
                    <IonItem button onClick={goToMyProfile} disabled={isMyProfileActive}>
                        <IonIcon slot="start" icon={personCircleOutline} />
                        <IonLabel>Mon Profil</IonLabel>
                    </IonItem>
                    <IonItem button onClick={goToMyHistory} disabled={isMyHistoryActive}>
                        <IonIcon slot="start" icon={bookOutline} />
                        <IonLabel>Mon Historique</IonLabel>
                    </IonItem>
                    <IonItem button onClick={goToDeclaration} disabled={isDeclarationActive}>
                        <IonIcon slot="start" icon={warningOutline} />
                        <IonLabel>Déclarer</IonLabel>
                    </IonItem>
                    <IonItem button onClick={handleLogout}>
                        <IonIcon slot="start" icon={logOutOutline} />
                        <IonLabel>Déconnexion</IonLabel>
                    </IonItem>
                </IonList>
            </IonPopover>
        </IonHeader>
    );
};

export default HeaderEmployee;
