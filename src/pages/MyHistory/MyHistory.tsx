import React, { useState } from 'react';
import { IonBreadcrumb, IonBreadcrumbs, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, IonButton, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons } from "@ionic/react";
import HeaderEmployee from "../../components/Header/Employee/HeaderEmployee";
import { checkmark, eye, close } from 'ionicons/icons';
import './MyHistory.scss';

const HistoryPage: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<{ id: number, type: string, date: string, status: string } | null>(null);

    const tableData = [
        { id: 1, type: 'Facture', date: '01/05/2024', status: 'Completed' },
        { id: 2, type: 'Sinistre', date: '02/05/2024', status: 'Pending' },
        { id: 3, type: 'Sinistre', date: '03/05/2024', status: 'Pending' },
        { id: 4, type: 'Facture', date: '04/05/2024', status: 'Pending' },
    ];

    const openModal = (item: { id: number, type: string, date: string, status: string }) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setShowModal(false);
    };

    return (
        <IonPage>
            <HeaderEmployee />
            <IonContent>
                <IonBreadcrumbs style={{ marginTop: '2em', marginLeft: '10px' }}>
                    <IonBreadcrumb href="/homepage-employee">Home</IonBreadcrumb>
                    <IonBreadcrumb href="/my-history">History</IonBreadcrumb>
                </IonBreadcrumbs>
                <IonCard color="danger" style={{ marginTop: '2em' }}>
                    <IonCardHeader>
                        <IonCardTitle>Alert</IonCardTitle>
                        <IonCardSubtitle>Votre prochaine entretien arrive bientôt !</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Date : xx/xx/xxxx
                    </IonCardContent>
                </IonCard>

                <div className="ion-padding table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.type}</td>
                                    <td>{item.date}</td>
                                    <td>
                                        <IonIcon icon={item.status === 'Completed' ? checkmark : close} />
                                    </td>
                                    <td>
                                        <IonButton fill="clear" onClick={() => openModal(item)}>
                                            <IonIcon icon={eye} />
                                        </IonButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                <IonModal isOpen={showModal} onDidDismiss={closeModal}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Détails</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={closeModal}>Close</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonCard>
                            <IonCardContent>
                                {selectedItem && (
                                    <>
                                        <div style={{ display:'flex', flexDirection:'column' }}>
                                            <div style={{ display:'flex', justifyContent: 'center', margin:'0.5em 1em 2em 1em'}}>
                                                <h1>{selectedItem.type} du {selectedItem.date}</h1>
                                            </div>
                                            <div style={{ margin:'0px 1em 2em 1em'}}>
                                                <h2>Status: {selectedItem.status}</h2>
                                            </div>
                                            <IonButton>Télécharger</IonButton>
                                        </div>
                                    </>
                                )}
                            </IonCardContent>
                        </IonCard>
                    </IonContent>
                </IonModal>

            </IonContent>
        </IonPage>
    );
};

export default HistoryPage;
