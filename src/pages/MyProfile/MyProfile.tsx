import React, { useRef, useState } from 'react';
import { IonPage, IonContent, IonIcon, IonInput, IonButton } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import HeaderEmployee from '../../components/Header/Employee/HeaderEmployee';

const MyProfile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const nomRef = useRef<HTMLIonInputElement>(null);
    const prenomRef = useRef<HTMLIonInputElement>(null);
    const emailRef = useRef<HTMLIonInputElement>(null);
    const telephoneRef = useRef<HTMLIonInputElement>(null);

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
            <IonContent>
                <div style={{ textAlign: 'center', marginBottom: '4em', marginTop: '4em' }}>
                    <IonIcon icon={personOutline} style={{ fontSize: '10em' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <IonInput
                        placeholder="Nom"
                        style={{ width: '90%', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '2em' }}
                        disabled={!isEditing}
                        ref={nomRef}
                    />
                    <IonInput
                        placeholder="Prénom"
                        style={{ width: '90%', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '2em' }}
                        disabled={!isEditing}
                        ref={prenomRef}
                    />
                    <IonInput
                        placeholder="Adresse email"
                        style={{ width: '90%', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '2em' }}
                        disabled={!isEditing}
                        ref={emailRef}
                    />
                    <IonInput
                        placeholder="Numéro de téléphone"
                        style={{ width: '90%', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '4em' }}
                        disabled={!isEditing}
                        ref={telephoneRef}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <IonButton onClick={isEditing ? handleSave : toggleEditing} style={{ width: '50%'}}>
                        {isEditing ? "Enregistrer" : "Modifier"}
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default MyProfile;
