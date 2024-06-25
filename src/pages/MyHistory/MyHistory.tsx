import React, { useState, useEffect } from 'react';
import { IonBreadcrumb, IonBreadcrumbs, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, IonButton, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons } from "@ionic/react";
import HeaderEmployee from "../../components/Header/Employee/HeaderEmployee";
import { checkmark, eye, close } from 'ionicons/icons';
import './MyHistory.scss';
import { getAllFuelHistory } from '../../api/fuel-history/getAllFuelHistory';
import { getAllAccidentHistory } from '../../api/accident-history/getAllAccidentHistory';
import { getAllMaintenanceHistory } from '../../api/maintenance-history/getAllMaintenanceHistory';
import { fr } from 'date-fns/locale'
import { format } from 'date-fns';

const HistoryPage: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<{ id: number, type: string, date: string, status: string } | null>(null);
    const [tableData, setTableData] = useState<{ id: number, type: string, date: string, status: string }[]>([]);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        async function fetchData() {
            try {
                if (token) {
                    const fuelData = await getAllFuelHistory(token);
                    const accidentData = await getAllAccidentHistory(token);
                    const maintenanceData = await getAllMaintenanceHistory(token);

                    const formattedData = [
                        ...fuelData.map((item: any) => ({
                            id: item.id,
                            type: 'Facture',
                            date: isValidDate(item.created_at) ? format(new Date(item.created_at), 'dd/MM/yyyy', { locale: fr }) : '',
                            status: ''
                        })),
                        ...accidentData.map((item: any) => ({
                            id: item.id,
                            type: 'Sinistre',
                            date: isValidDate(item.created_at) ? format(new Date(item.created_at), 'dd/MM/yyyy', { locale: fr }) : '',
                            status: ''
                        })),
                        ...maintenanceData.map((item: any) => ({
                            id: item.id,
                            type: 'Facture',
                            date: isValidDate(item.created_at) ? format(new Date(item.created_at), 'dd/MM/yyyy', { locale: fr }) : '',
                            status: ''
                        }))
                    ];
    
                    setTableData(formattedData);
                }
            } catch (error) {
                console.error('Error fetching history data:', error);
            }
        }
        fetchData();
    }, [token]);

    const isValidDate = (dateString: string | undefined | null) => {
        const date = dateString ? new Date(dateString) : NaN;
        return date instanceof Date && !isNaN(date.getTime());
    };

    const openModal = (item: { id: number, type: string, date: string, status: string }) => {
        console.log(item)
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
                            {tableData.map((item, index) => (
                                <tr key={item.id + '-' + index}>
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
