import React, { useState, useEffect } from 'react';
import { IonBreadcrumb, IonBreadcrumbs, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, IonButton, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons } from "@ionic/react";
import HeaderEmployee from "../../components/Header/Employee/HeaderEmployee";
import { checkmark, eye, close } from 'ionicons/icons';
import './MyHistory.scss';
import { getAllFuelHistoryByUser } from '../../api/fuel-history/getAllFuelHistoryByUser';
import { getAllMaintenanceHistoryByUser } from '../../api/maintenance-history/getAllMaintenanceHistoryByUser';
import { getAllAccidentHistoryByUser } from '../../api/accident-history/getAllAccidentHistoryByUser';
import { getFuelHistory } from '../../api/fuel-history/getFuelHistory';
import { getMaintenanceHistory } from '../../api/maintenance-history/getMaintenanceHistory';
import { getAccidentHistory } from '../../api/accident-history/getAccidentHistory';
import { fr } from 'date-fns/locale'
import { format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

const HistoryPage: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<{ id: number, type: string, date: string, status: string } | null>(null);
    const [tableData, setTableData] = useState<{ id: number, type: string, date: string, status: string }[]>([]);
    const [fuelDataById, setFuelDataById] = useState<any>(null);
    const [maintenanceDataById, setMaintenanceDataById] = useState<any>(null);
    const [accidentDataById, setAccidentDataById] = useState<any>(null);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        async function fetchData() {
            try {
                if (token) {
                    const decodedToken: any = jwtDecode(token);

                    const fuelData = await getAllFuelHistoryByUser(token, decodedToken.id);
                    const accidentData = await getAllAccidentHistoryByUser(token, decodedToken.id);
                    const maintenanceData = await getAllMaintenanceHistoryByUser(token, decodedToken.id);

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
                            type: 'Maintenance',
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

    const openModal = async (item: { id: number, type: string, date: string, status: string }) => {
        if (token) {
            setSelectedItem(item);
            setShowModal(true);

            try {
                if (item.type === "Facture") {
                    const fuelDataById = await getFuelHistory(token, item.id);
                    setFuelDataById(fuelDataById);
                } else if (item.type === "Maintenance") {
                    const maintenanceDataById = await getMaintenanceHistory(token, item.id);
                    setMaintenanceDataById(maintenanceDataById);
                } else if (item.type === "Sinistre") {
                    const accidentDataById = await getAccidentHistory(token, item.id);
                    setAccidentDataById(accidentDataById);
                }
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        }
    };

    const closeModal = () => {
        setSelectedItem(null);
        setShowModal(false);
        setFuelDataById(null);
        setMaintenanceDataById(null);
        setAccidentDataById(null);
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
                        Date : 🚧/🚧/🚧
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

                <IonModal isOpen={showModal} onDidDismiss={closeModal}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Détails</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={closeModal}>Close</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonCard color="warning">
                        <IonCardHeader>
                            <IonCardSubtitle>Le status n'est pas encore disponible. 🚧</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                    <IonContent>
                        <IonCard>
                            <IonCardContent>
                                {selectedItem && (
                                    <>
                                        <div style={{ display:'flex', flexDirection:'column' }}>
                                            <div style={{ display:'flex', justifyContent: 'center', margin:'0.5em 1em 2em 1em'}}>
                                                <h1>{selectedItem.type} du {selectedItem.date}</h1>
                                            </div>
  
                                            {selectedItem.type === "Facture" && fuelDataById && (
                                                <div>
                                                    <p>ID : FA0{fuelDataById.id}</p>
                                                    <p>Lieu : {fuelDataById.description}</p>
                                                    <p>Quantité : {fuelDataById.quantity} litres</p>
                                                    <p>Prix : {fuelDataById.cost}euros</p>
                                                </div>
                                            )}
                                            {selectedItem.type === "Maintenance" && maintenanceDataById && (
                                                <div>
                                                    <p>Maintenance ID : MA0{maintenanceDataById.id}</p>
                                                    <p>Description : {maintenanceDataById.description}</p>
                                                    <p>Prix : {maintenanceDataById.cost}</p>
                                                    <p>Kilométrage : {maintenanceDataById.mileage}</p>
                                                </div>
                                            )}
                                            {selectedItem.type === "Sinistre" && accidentDataById && (
                                                <div>
                                                    <p>ID : SI0{accidentDataById.id}</p>
                                                    <p>Details : {accidentDataById.description}</p>
                                                    <p>Prix : {accidentDataById.cost}</p>
                                                    <p>Assurance : {accidentDataById.insuranceClaimNumber}</p>
                                                </div>
                                            )}
                                            <IonButton disabled>Télécharger</IonButton>
                                        </div>
                                    </>
                                )}
                            </IonCardContent>
                        </IonCard>
                    <IonCard color="warning">
                        <IonCardHeader>
                            <IonCardSubtitle>La fonction de téléchargement n'est pas encore disponible. 🚧</IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                    </IonContent>
                </IonModal>

            </IonContent>
        </IonPage>
    );
};

export default HistoryPage;
