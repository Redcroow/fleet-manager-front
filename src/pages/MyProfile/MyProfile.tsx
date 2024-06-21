import React, { useEffect, useRef, useState } from 'react';
import { IonPage, IonContent, IonIcon, IonInput, IonButton, IonBreadcrumbs, IonBreadcrumb, IonCard, IonCardHeader, IonCardSubtitle } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import HeaderEmployee from '../../components/Header/Employee/HeaderEmployee';
import { getEmployee } from '../../api/employee/getEmployee';
import { patchEmployee } from '../../api/employee/patchEmployee';
import './MyProfile.scss';

const MyProfile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        id: '',
        name: '',
        surname: '',
        email: '',
        phone_number: ''
    });
    const nameRef = useRef<HTMLIonInputElement>(null);
    const surnameRef = useRef<HTMLIonInputElement>(null);
    const emailRef = useRef<HTMLIonInputElement>(null);
    const phoneRef = useRef<HTMLIonInputElement>(null);
    const [showAlert, setShowAlert] = useState(false);


    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('userData');

    useEffect(() => {
        const fetchProfileData = async () => {
            if (token && userData) {
                const { id } = JSON.parse(userData);
                try {
                    const data = await getEmployee(token, id);
                    setProfileData(data);
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                }
            }
        };

        fetchProfileData();
    }, [token, userData]);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        const updatedFormData = {
            name: nameRef.current?.value || '',
            surname: surnameRef.current?.value || '',
            email: emailRef.current?.value || '',
            phone_number: phoneRef.current?.value || '',
        };
    
        if (token && userData) {
            try {
                const { id } = JSON.parse(userData);
                await patchEmployee(token,id, updatedFormData);
    
                const updatedProfileData = await getEmployee(token, id);
                setProfileData(updatedProfileData);
    
                setIsEditing(false);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            } catch (error) {
                console.error('Error saving profile data:', error);
            }
        }
    };
    
    return (
        <IonPage>
            <HeaderEmployee />
            <IonBreadcrumbs style={{ marginTop: '2em', marginLeft: '10px' }}>
                <IonBreadcrumb href="/homepage-employee">Home</IonBreadcrumb>
                <IonBreadcrumb href="/my-profile">Profile</IonBreadcrumb>
            </IonBreadcrumbs>
            <IonCard color="success">
                <IonCardHeader>
                    <IonCardSubtitle>Vous pouvez consulter ou modifier vos informations personnelles</IonCardSubtitle>
                </IonCardHeader>
            </IonCard>
            <IonContent>
                {showAlert && (
                    <div className="alert-container">
                        <IonCard color="success">
                            <IonCardHeader>
                                <IonCardSubtitle>Profile Data saved successfully 🎉</IonCardSubtitle>
                            </IonCardHeader>
                        </IonCard>
                    </div>
                )}
                <div className='icon-profile-section'>
                    <IonIcon icon={personOutline} className='user-profile-icon' />
                </div>
                <div className='input-profile-group'>
                    <IonInput
                        placeholder="Nom"
                        className='profile-input'
                        disabled={!isEditing}
                        value={profileData.name}
                        ref={nameRef}
                    />
                    <IonInput
                        placeholder="Prénom"
                        className='profile-input'
                        disabled={!isEditing}
                        value={profileData.surname}
                        ref={surnameRef}
                    />
                    <IonInput
                        placeholder="Adresse email"
                        className='profile-input'
                        disabled={!isEditing}
                        value={profileData.email}
                        ref={emailRef}
                    />
                    <IonInput
                        placeholder="Numéro de téléphone"
                        className='profile-input'
                        disabled={!isEditing}
                        value={profileData.phone_number}
                        ref={phoneRef}
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
