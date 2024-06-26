import {
    IonBreadcrumb,
    IonBreadcrumbs,
    IonContent,
    IonPage,
    IonSearchbar,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../components/Header/Admin/HeaderAdmin';
import { getAllAccidentHistory } from '../../api/accident-history/getAllAccidentHistory';
import { getAllMaintenanceHistory } from '../../api/maintenance-history/getAllMaintenanceHistory';
import { getAllFuelHistory } from '../../api/fuel-history/getAllFuelHistory';
import { getFuelHistory } from '../../api/fuel-history/getFuelHistory';
import { getAccidentHistory } from '../../api/accident-history/getAccidentHistory';
import { getMaintenanceHistory } from '../../api/maintenance-history/getMaintenanceHistory';
import { getEmployee } from '../../api/employee/getEmployee';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import './Invoices.scss';

interface TableData {
    id: number;
    type: string;
    employee: string;
    status: string;
    date: string;
    cost?: string;
    description?: string;
}

const InvoicesPage: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [tableData, setTableData] = useState<TableData[]>([]);
    const [filteredTableData, setFilteredTableData] = useState<TableData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<TableData | null>(null);
    const [downloadDisabled, setDownloadDisabled] = useState(true);

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        async function fetchData() {
            try {
                if (token) {
                    const fuelData = await getAllFuelHistory(token);
                    const accidentData = await getAllAccidentHistory(token);
                    const maintenanceData = await getAllMaintenanceHistory(token);

                    const allData = [
                        ...fuelData.map((item: any) => ({
                            id: item.id,
                            type: 'Facture',
                            date: isValidDate(item.created_at)
                                ? format(new Date(item.created_at), 'dd/MM/yyyy', { locale: fr })
                                : '',
                            status: '',
                            employeeId: item.car ? item.car.assignedEmployeeId : null,
                        })),
                        ...accidentData.map((item: any) => ({
                            id: item.id,
                            type: 'Sinistre',
                            date: isValidDate(item.created_at)
                                ? format(new Date(item.created_at), 'dd/MM/yyyy', { locale: fr })
                                : '',
                            status: '',
                            employeeId: item.car ? item.car.assignedEmployeeId : null,
                        })),
                        ...maintenanceData.map((item: any) => ({
                            id: item.id,
                            type: 'Maintenance',
                            date: isValidDate(item.created_at)
                                ? format(new Date(item.created_at), 'dd/MM/yyyy', { locale: fr })
                                : '',
                            status: '',
                            employeeId: item.car ? item.car.assignedEmployeeId : null,
                        })),
                    ];

                    const dataWithDetails = await Promise.all(
                        allData.map(async (item) => {
                            let cost = 'N/A';
                            let description = 'N/A';

                            if (item.type === 'Facture') {
                                const fuelDetail = await getFuelHistory(token, item.id);
                                cost = fuelDetail.cost;
                                description = fuelDetail.description;
                            } else if (item.type === 'Sinistre') {
                                const accidentDetail = await getAccidentHistory(token, item.id);
                                cost = accidentDetail.cost;
                                description = accidentDetail.description;
                            } else if (item.type === 'Maintenance') {
                                const maintenanceDetail = await getMaintenanceHistory(token, item.id);
                                cost = maintenanceDetail.cost;
                                description = maintenanceDetail.description;
                            }

                            if (item.employeeId) {
                                try {
                                    const employeeData = await getEmployee(token, item.employeeId);
                                    return { ...item, employee: `${employeeData.name} ${employeeData.surname}`, cost, description };
                                } catch (error) {
                                    console.error(`Error fetching employee data for ID ${item.employeeId}:`, error);
                                    return { ...item, employee: 'N/A', cost, description };
                                }
                            }
                            return { ...item, employee: 'N/A', cost, description };
                        })
                    );

                    setTableData(dataWithDetails);
                    setFilteredTableData(dataWithDetails);
                }
            } catch (error) {
                console.error('Error fetching history data:', error);
            }
        }
        fetchData();
    }, [token]);

    useEffect(() => {
        const filteredData = tableData.filter(
            (item) =>
                item.employee.toLowerCase().includes(searchText.toLowerCase()) || item.date.includes(searchText)
        );
        setFilteredTableData(filteredData);
    }, [searchText, tableData]);

    const isValidDate = (dateString: string | undefined | null) => {
        const date = dateString ? new Date(dateString) : NaN;
        return date instanceof Date && !isNaN(date.getTime());
    };

    const handleItemClick = (item: TableData) => {
        setSelectedItem(item);
        setIsModalOpen(true);
        setDownloadDisabled(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleMarkAsProcessed = () => {
        console.log('Marqué comme traité');
    };

    const handleMarkAsInProgress = () => {
        console.log('Marqué comme en cours');
    };

    const handleDownload = () => {
        console.log('Téléchargement');
    };

    return (
        <IonPage>
            <HeaderAdmin />
            <IonBreadcrumbs style={{ marginTop: '2em', marginLeft: '10px' }}>
                <IonBreadcrumb href="/homepage-admin">Home</IonBreadcrumb>
                <IonBreadcrumb href="/invoices">Mes factures</IonBreadcrumb>
            </IonBreadcrumbs>
            <IonCard color="success">
                <IonCardHeader>
                    <IonCardSubtitle>Cliquez sur une ligne pour affiche plus de détails.💡</IonCardSubtitle>
                </IonCardHeader>
            </IonCard>
            <IonContent>
                <IonSearchbar
                    value={searchText}
                    onIonChange={(e) => setSearchText(e.detail.value!)}
                    debounce={300}
                    placeholder="Rechercher par employé ou date"
                    autocapitalize="off"
                />
                <div className="ion-padding table-container">
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Employé</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTableData.map((item, index) => (
                                    <tr key={item.id + '-' + index} onClick={() => handleItemClick(item)}>
                                        <td>{item.type}</td>
                                        <td>{item.employee}</td>
                                        <td>{item.status}</td>
                                        <td>{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </IonContent>

            <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Détails</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={closeModal}>Fermer</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonCard color="warning">
                    <IonCardHeader>
                        <IonCardSubtitle>Les fonctions MarkAsResolved, MarkAsInProgress et la fonction téléchargement sont en cours de développement. 🚧</IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>
                <IonContent>
                    {selectedItem && (
                        <div className="modal-content">
                            <p>
                                <strong>Type:</strong> {selectedItem.type}
                            </p>
                            <p>
                                <strong>Employé:</strong> {selectedItem.employee}
                            </p>
                            <p>
                                <strong>Status:</strong> {selectedItem.status}
                            </p>
                            <p>
                                <strong>Date:</strong> {selectedItem.date}
                            </p>
                            <p>
                                <strong>Prix:</strong> {selectedItem.cost}
                            </p>
                            <p>
                                <strong>Description:</strong> {selectedItem.description}
                            </p>
                            <div className='btn-modal-section'>
                                <IonButton className='btn-modal' disabled={downloadDisabled} onClick={handleMarkAsProcessed}>Marqué comme traité</IonButton>
                                <IonButton className='btn-modal' disabled={downloadDisabled} onClick={handleMarkAsInProgress}>Marqué comme en cours</IonButton>
                                <IonButton className='btn-modal' disabled={downloadDisabled} onClick={handleDownload}>
                                    Télécharger
                                </IonButton>
                            </div>
                        </div>
                    )}
                </IonContent>
            </IonModal>
        </IonPage>
    );
};

export default InvoicesPage;
