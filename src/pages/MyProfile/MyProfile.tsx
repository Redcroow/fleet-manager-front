import React, { useRef, useState } from 'react';
import { IonPage, IonContent, IonIcon, IonInput, IonButton, IonBreadcrumbs, IonBreadcrumb } from '@ionic/react';
import { arrowBack, personOutline } from 'ionicons/icons';
import HeaderEmployee from '../../components/Header/Employee/HeaderEmployee';
import './MyProfile.scss';
import { useHistory } from 'react-router-dom';

const MyProfile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const nomRef = useRef<HTMLIonInputElement>(null);
    const prenomRef = useRef<HTMLIonInputElement>(null);
    const emailRef = useRef<HTMLIonInputElement>(null);
    const telephoneRef = useRef<HTMLIonInputElement>(null);
    const history = useHistory();

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        const updatedFormData = {
            nom: nomRef.current?.value || '',
            prenom: prenomRef.current?.value || '',
            email: emailRef.current?.value || '',
            telephone: telephoneRef.current?.value || ''
        };
        console.log('Données enregistrées :', updatedFormData);
    };


    return (
        <IonPage>
            <HeaderEmployee />
            <IonBreadcrumbs style={{marginTop:'2em', marginLeft: '10px'}}>
                <IonBreadcrumb href="/homepage-employee">Home</IonBreadcrumb>
                <IonBreadcrumb href="/my-profile">Profile</IonBreadcrumb>
            </IonBreadcrumbs>
            <IonContent>
                <div className='icon-profile-section'>
                    <IonIcon icon={personOutline} className='user-profile-icon' />
                </div>
                <div className='input-profile-group'>
                    <IonInput
                        placeholder="Nom"
                        className='profile-input'
                        disabled={!isEditing}
                        ref={nomRef}
                    />
                    <IonInput
                        placeholder="Prénom"
                        className='profile-input'
                        disabled={!isEditing}
                        ref={prenomRef}
                    />
                    <IonInput
                        placeholder="Adresse email"
                        className='profile-input'
                        disabled={!isEditing}
                        ref={emailRef}
                    />
                    <IonInput
                        placeholder="Numéro de téléphone"
                        className='profile-input'
                        disabled={!isEditing}
                        ref={telephoneRef}
                    />
                </div>
                <div className='input-profile-group'>
                    <IonButton onClick={isEditing ? handleSave : toggleEditing} className='profile-button'>
                        {isEditing ? "Enregistrer" : "Modifier"}
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default MyProfile;
