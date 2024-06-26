import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonBreadcrumb, IonBreadcrumbs, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonContent, IonPage, IonSearchbar } from '@ionic/react';
import HeaderAdmin from '../../components/Header/Admin/HeaderAdmin';
import './MyFleet.scss';
import { getCarAll } from '../../api/car/getCarAll';
import { getCar } from '../../api/car/getCar';
import { jwtDecode } from 'jwt-decode';

interface Car {
  id: number;
  brand: string;
  model: string;
  registrationPlate: string;
  fiscalPower: number;
  assignedEmployee: {
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    [key: string]: any;
  };
  [key: string]: any;
}

const MyFleetPage: React.FC = () => {
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchText, setSearchText] = useState('');
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);
  const [carDetails, setCarDetails] = useState<{ [key: number]: any }>({});

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.position === "RH") {
        setIsAdmin(true);
      } else {
        history.push('/auth');
      }
    } else {
      history.push('/auth');
    }
  }, [history]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const carData = await getCarAll(token);
          const sortedData = carData.sort((a: { brand: any; model: any; }, b: { brand: any; model: any; }) => {
            const nameA = `${a.brand} ${a.model}`.toLowerCase();
            const nameB = `${b.brand} ${b.model}`.toLowerCase();
            return nameA.localeCompare(nameB);
          });
          setCars(sortedData);
          setFilteredCars(sortedData);
        } else {
          history.push('/auth');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    if (isAdmin) {
      fetchCars();
    }
  }, [isAdmin, history]);

  useEffect(() => {
    const filteredData = cars.filter(car =>
      `${car.brand} ${car.model}`.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCars(filteredData);
  }, [searchText, cars]);

  const handleRowClick = async (index: number, carId: number) => {
    if (expandedRowIndex === index) {
      setExpandedRowIndex(null);
    } else {
      setExpandedRowIndex(index);
      if (!carDetails[carId]) {
        try {
          const token = localStorage.getItem('access_token');
          if (token) {
            const data = await getCar(token, carId);
            setCarDetails(prevDetails => ({
              ...prevDetails,
              [carId]: data,
            }));
          } else {
            history.push('/auth');
          }
        } catch (error) {
          console.error('Error fetching car details:', error);
        }
      }
    }
  };

  const handleDetailsClick = (car: Car) => {
    history.push({
      pathname: '/detail-car',
      state: { carDetails: car }
    });
  };

  return (
    <IonPage>
      <HeaderAdmin />
      <IonBreadcrumbs style={{ marginTop: '2em', marginLeft: '10px' }}>
        <IonBreadcrumb href="/homepage-admin">Home</IonBreadcrumb>
        <IonBreadcrumb href="/vehicles">Ma flotte</IonBreadcrumb>
      </IonBreadcrumbs>
      <IonCard color="success">
        <IonCardHeader>
          <IonCardSubtitle>Cliquez sur une ligne pour affiche plus de détails.💡</IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
      <IonCard color="warning">
        <IonCardHeader>
          <IonCardSubtitle>La fonction création de véhicule n'est pas encore disponible. 🚧</IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
      <IonContent>
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          debounce={300}
          placeholder="Rechercher par marque ou modèle"
          autocapitalize="off"
        />
        <div className="ion-padding table-container">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Voiture</th>
                  <th>Immatriculation</th>
                  <th>Attribution</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.map((car, index) => (
                  <React.Fragment key={index}>
                    <tr onClick={() => handleRowClick(index, car.id)} className={expandedRowIndex === index ? 'expanded' : ''}>
                      <td>{car.brand} {car.model}</td>
                      <td>{car.registrationPlate}</td>
                      <td>{car.assignedEmployee ? `${car.assignedEmployee.name} ${car.assignedEmployee.surname}` : "Pas d'attribution"}</td>
                    </tr>
                    {expandedRowIndex === index && (
                      <tr className="accordion-content">
                        <td colSpan={4}>
                          <div className="car-details-card">
                            {carDetails[car.id] ? (
                              <div>
                                <div className='car-header-expended'>
                                  <img src="src/assets/images/bmw-fiche-tech.png" alt="Car Icon" className="car-icon" />
                                  <h2>{carDetails[car.id].brand} {carDetails[car.id].model}</h2>
                                </div>
                                <div className='car-body-expended'>
                                  <div className="left-column">
                                    <p><strong>Attribution: </strong> {car.assignedEmployee ? `${car.assignedEmployee.name} ${car.assignedEmployee.surname}` : "Pas d'attribution"}</p>
                                    <p><strong>Immatriculation:</strong> {carDetails[car.id].registrationPlate}</p>
                                    <p><strong>Type de carburant:</strong> {carDetails[car.id].fuelType}</p>
                                  </div>
                                  <div className="right-column">
                                    <IonButton className="details-button" onClick={() => handleDetailsClick(car)}>Voir les détails</IonButton>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <p>Les détails pour ce véhicule ne sont pas disponible pour le moment.</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <IonButton disabled className="add-vehicle-button" onClick={() => history.push('/add-vehicle')}>
          Ajouter un véhicule
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MyFleetPage;
