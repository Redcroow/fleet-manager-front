import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonBreadcrumbs,
  IonBreadcrumb,
  IonIcon,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonProgressBar,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonAlert,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonToast,
} from '@ionic/react';
import HeaderAdmin from '../../components/Header/Admin/HeaderAdmin';
import { personOutline } from 'ionicons/icons';
import './DetailsCar.scss';
import { getEmployeeAll } from '../../api/employee/getEmployeeAll';
import { patchUserCar } from '../../api/car/patchUserCar';
import { getCarAll } from '../../api/car/getCarAll';

interface CarDetailPageProps {}

const CarDetailPage: React.FC<CarDetailPageProps> = () => {
  const location = useLocation<{ carDetails: any }>();
  const history = useHistory();
  const { carDetails } = location.state;
  const [showAttributionModal, setShowAttributionModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('Veuillez choisir une nouvelle attribution');
  const [originalOption, setOriginalOption] = useState<string>('');
  const [employees, setEmployees] = useState<any[]>([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [cars, setCars] = useState<any[]>([]);
  const [currentAttribution, setCurrentAttribution] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('access_token');
      try {
        if (token) {
          const [employeeData, carData] = await Promise.all([
            getEmployeeAll(token),
            getCarAll(token),
          ]);

          setEmployees(employeeData);
          setCars(carData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const initialOption = carDetails.assignedEmployee
      ? `${carDetails.assignedEmployee.name} ${carDetails.assignedEmployee.surname}`
      : 'Véhicule non attribué';
    setSelectedOption('Veuillez choisir une nouvelle attribution');
    setOriginalOption(initialOption);
    setCurrentAttribution(initialOption); // Set initial current attribution
  }, [carDetails]);

  const handleAttributionModal = () => {
    setShowAttributionModal(true);
    setCurrentAttribution(
      carDetails.assignedEmployee
        ? `${carDetails.assignedEmployee.name} ${carDetails.assignedEmployee.surname}`
        : 'Véhicule non attribué'
    );
  };

  const handleCloseAttributionModal = () => setShowAttributionModal(false);
  const handleDeleteVehicle = () => setShowDeleteAlert(true);
  const handleCancelDelete = () => setShowDeleteAlert(false);

  const handleSaveAttribution = async () => {
    const token = localStorage.getItem('access_token');
    const selectedEmployee = employees.find(
      (employee) =>
        `${employee.name} ${employee.surname}` === selectedOption
    );

    if (token && selectedEmployee) {
      try {
        const assignedIdData = { assignedEmployeeId: selectedEmployee.id };
        await patchUserCar(token, carDetails.id, assignedIdData);
        setOriginalOption(selectedOption);
        setShowToast(true);

        setTimeout(() => {
          history.push('/my-fleet');
          window.location.reload();
        }, 4000);
      } catch (error) {
        console.error('Failed to save new attribution:', error);
      }
    }
  };

  const closeModal = () => {
    setSelectedOption(originalOption);
    setShowAttributionModal(false);
  };

  const handleConfirmDelete = () => {
    // Logic to delete vehicle
    setShowDeleteAlert(false);
  };

  const filteredEmployees = employees.filter((employee) => {
    const isAssigned = cars.some(
      (car) => car.assignedEmployeeId === employee.id
    );
    return !isAssigned;
  });

  return (
    <IonPage>
      <HeaderAdmin />
      <IonBreadcrumbs style={{ marginTop: '2em', marginLeft: '10px' }}>
        <IonBreadcrumb href="/homepage-admin">Home</IonBreadcrumb>
        <IonBreadcrumb href="/my-fleet">Ma flotte</IonBreadcrumb>
        <IonBreadcrumb href="/detail-car">Détail du véhicule</IonBreadcrumb>
      </IonBreadcrumbs>
      <IonCard color="warning">
        <IonCardHeader>
          <IonCardSubtitle>
            La fonctionnalité d'envoi d'alerte n'est pas encore disponible 🚧
          </IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
      <IonContent>
        {carDetails ? (
          <div className="fiche-tech">
            <div className="section-fiche-tech">
              <div className="fiche-tech-tp">
                <p>Puissance Fiscale : 47ch</p>
                <p>Immat : {carDetails.registrationPlate}</p>
                <p>Consommation : 10 L/100</p>
              </div>
              <div className="img-fiche-tech">
                <img
                  src="src/assets/images/fiche-tech.png"
                  alt="Car Icon"
                  className="car-fiche-tech"
                />
              </div>
              <div className="fiche-tech-bt">
                <p>Marque : {carDetails.brand}</p>
                <p>Modèle : {carDetails.model}</p>
                <p>Type de carburant : {carDetails.fuelType}</p>
                <p>Places : 4</p>
              </div>
            </div>
            <div className="section-separation"></div>
            <div className="section-attribution">
              <div className="attribution-input-wrapper">
                <IonIcon
                  icon={personOutline}
                  className="icon-user-fiche-tech"
                ></IonIcon>
                <IonInput
                  type="text"
                  placeholder="Véhicule non attribué"
                  className="attribution-input"
                  value={
                    carDetails.assignedEmployee
                      ? `${carDetails.assignedEmployee.name} ${carDetails.assignedEmployee.surname}`
                      : 'Véhicule non attribué'
                  }
                  disabled
                ></IonInput>
            </div>
                <IonButton
                  color="tertiary"
                  size="small"
                  className="attribution-button"
                  onClick={handleAttributionModal}
                >
                  Gérez l'attribution
                </IonButton>
            </div>
            <div className="section-maintenance">
              <IonCard style={{ marginTop: '2em' }}>
                <IonCardHeader>
                  <IonCardTitle>Maintenance</IonCardTitle>
                  <IonCardSubtitle>
                    Prochain entretien le : 🚧/🚧/🚧
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonProgressBar value={80 / 100} color="danger"></IonProgressBar>
                </IonCardContent>
              </IonCard>
              <div className="btn-maintenance">
                <IonButton
                  disabled
                  color="tertiary"
                  size="small"
                  className="maintenance-button"
                >
                  Envoyer une alerte
                </IonButton>
              </div>
            </div>
            <div className="section-delete">
              <IonButton
                size="default"
                color="danger"
                onClick={handleDeleteVehicle}
              >
                Supprimer ce véhicule
              </IonButton>
            </div>
          </div>
        ) : (
          <h1>
            Les détails pour ce véhicule ne sont pas disponibles pour le moment.
          </h1>
        )}
      </IonContent>

      <IonModal
        isOpen={showAttributionModal}
        onDidDismiss={handleCloseAttributionModal}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Gérer l'attribution</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={closeModal}>Fermer</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonCard color="success">
            <IonCardHeader>
                <IonCardSubtitle>
                    Vous avez accès à tout les employers n'ayant pas de véhicule attribué.
                </IonCardSubtitle>
            </IonCardHeader>
        </IonCard>
            <div className='modal-attribution-opened'>
                <h2>Attribution actuelle : {currentAttribution}</h2>
                <IonSelect
                    interface="action-sheet"
                    value={selectedOption}
                    onIonChange={(e) => setSelectedOption(e.detail.value)}
                >
                    <IonSelectOption value="Veuillez choisir une nouvelle attribution">
                        Veuillez choisir une nouvelle attribution
                    </IonSelectOption>
                    {filteredEmployees.map((employee) => (
                        <IonSelectOption
                            key={employee.id}
                            value={`${employee.name} ${employee.surname}`}
                        >
                            {employee.name} {employee.surname}
                        </IonSelectOption>
                    ))}
                </IonSelect>
                <IonButton
                    onClick={handleSaveAttribution}
                    disabled={selectedOption === originalOption}
                >
                    Save
                </IonButton>
            </div>

        </IonContent>
      </IonModal>

      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={'Confirmation'}
        message={`Êtes-vous sûr de vouloir supprimer ce véhicule ?`}
        buttons={[
          {
            text: 'Non',
            role: 'cancel',
            cssClass: 'secondary',
            handler: handleCancelDelete,
          },
          {
            text: 'Oui',
            cssClass: 'danger',
            handler: handleConfirmDelete,
          },
        ]}
      />

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Attribution modifié avec succès, veuillez patienter nous allons vous rediriger... 🎉"
        color="success"
        duration={4000}
        position="bottom"
      />
    </IonPage>
  );
};

export default CarDetailPage;

