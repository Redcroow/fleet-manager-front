import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const HomepageEmployee: React.FC = () => {
  const history = useHistory();
  const [isEmployee, setIsEmployee] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.position === "Employee") {
        setIsEmployee(true);
      } else {
        history.push('/');
      }
    } else {
      history.push('/auth');
    }
  }, [history]);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/auth');
  };

  if (!isEmployee) {
    return null;
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={handleLogout}>Déconnexion</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HomepageEmployee;
