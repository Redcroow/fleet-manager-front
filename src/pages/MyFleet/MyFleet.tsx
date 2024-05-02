import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import { getCarAll } from '../../api/car/getCar';
import HeaderAdmin from '../../components/Header/Admin/HeaderAdmin';

const MyFleetPage: React.FC = () => {
    const [carData, setCarData] = useState<any[]>([]);
    const [sortBy, setSortBy] = useState<string>('');
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (token) {
            fetchCarData();
        }
    }, [token]);

    const fetchCarData = async () => {
        try {
            const cars = await getCarAll(token!);
            setCarData(cars);
        } catch (error) {
            console.error('Error fetching car data:', error);
        }
    };

    const handleSortBy = (column: string) => {
        setSortBy(column);
    };

    const sortedCars = sortBy ? carData.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
    }) : carData;

    return (
        <IonPage>
            <HeaderAdmin />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol onClick={() => handleSortBy('brand')}>Car</IonCol>
                        <IonCol onClick={() => handleSortBy('registrationPlate')}>Immatriculation</IonCol>
                        <IonCol>Attribution</IonCol>
                    </IonRow>

                    {sortedCars.map((car, index) => (
                        <IonRow key={index}>
                            <IonCol>{car.brand} {car.model}</IonCol>
                            <IonCol>{car.registrationPlate}</IonCol>
                            <IonCol></IonCol>
                        </IonRow>
                    ))}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default MyFleetPage;
