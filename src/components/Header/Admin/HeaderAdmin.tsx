import './HeaderAdmin.scss';
import React, { useState, useEffect } from 'react';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonPopover,
    IonList,
    IonItem,
    IonLabel,
    IonImg
} from '@ionic/react';
import { personCircleOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface ContainerProps { }

const HeaderAdmin: React.FC<ContainerProps> = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [popoverEvent, setPopoverEvent] = useState<Event | undefined>(undefined);
    const [userName, setUserName] = useState<string>('');
    const history = useHistory();

    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const fullName = `${userData.first_name} ${userData.last_name}`;
            setUserName(fullName);
        }
    }, []);

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

    const openProfileMenu = (e: React.MouseEvent) => {
        setShowProfileMenu(true);
        setPopoverEvent(e.nativeEvent);
    };

    const closeProfileMenu = () => {
        setShowProfileMenu(false);
    };

    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle className="ion-text-center">Fleet Manager</IonTitle>
                <IonButtons slot="start">
                    <IonImg className="header-logo-img" src="src/assets/images/fleetmanager-white-logo.png" alt="Logo" />
                </IonButtons>
                <IonButtons slot="end">
                    <IonButton onClick={openProfileMenu}>
                        <IonIcon icon={personCircleOutline} size="large" />
                    </IonButton>
                </IonButtons>
            </IonToolbar>

            <IonPopover
                isOpen={showProfileMenu}
                event={popoverEvent}
                onDidDismiss={closeProfileMenu}
            >
                <IonList>
                    <IonItem>
                        <IonLabel>{userName}</IonLabel>
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

export default HeaderAdmin;
