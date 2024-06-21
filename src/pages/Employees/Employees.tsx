import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import HeaderEmployee from '../../components/Header/Employee/HeaderEmployee';
import './Employees.scss';
import { jwtDecode } from 'jwt-decode';
import HeaderAdmin from '../../components/Header/Admin/HeaderAdmin';

const Employees: React.FC = () => {
 

  return (
    <IonPage>
      <HeaderAdmin />
      <IonContent>
        <div>
          hello
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Employees;
