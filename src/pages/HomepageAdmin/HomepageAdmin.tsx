import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './HomepageAdmin.scss';
import HeaderAdmin from '../../components/Header/Admin/HeaderAdmin';
import HomepageCard from '../../components/HomepageCard/HomepageCard';
import { jwtDecode } from 'jwt-decode';

const HomepageAdmin: React.FC = () => {
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);

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
  
  const navigateToPage = (page: string) => {
    history.push(`/${page}`);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <IonPage>
      <HeaderAdmin />
      <IonContent>
        <div className="homepage-admin-container">
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="4">
                <HomepageCard
                  imageSrc="src/assets/images/ma-flotte.png"
                  alt="Ma flotte"
                  subtitle="Explorez"
                  title="Ma flotte"
                  onClick={() => navigateToPage('my-fleet')}
                />
              </IonCol>
              <IonCol size="12" size-md="4">
                <HomepageCard
                  imageSrc="src/assets/images/mes-employers.png"
                  alt="Les employers"
                  subtitle="Gérez"
                  title="Les employers"
                  onClick={() => navigateToPage('employees')}
                />
              </IonCol>
              <IonCol size="12" size-md="4">
                <HomepageCard
                  imageSrc="src/assets/images/mes-factures.png"
                  alt="Les factures"
                  subtitle="Gérez"
                  title="Les factures"
                  onClick={() => navigateToPage('invoices')}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomepageAdmin;
