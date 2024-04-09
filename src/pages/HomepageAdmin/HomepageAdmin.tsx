import React from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './HomepageAdmin.scss';
import HeaderAdmin from '../../components/Header/Admin/HeaderAdmin';
import HomepageCard from '../../components/HomepageCard/HomepageCard';

const HomepageAdmin: React.FC = () => {
  const history = useHistory();

  const navigateToPage = (page: string) => {
    history.push(`/${page}`);
  };

  return (
    <IonPage>
      <HeaderAdmin />
      <IonContent>
        <div className="homepage-container">
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="4">
                <HomepageCard
                  imageSrc="src/assets/images/ma-flotte.png"
                  alt="Ma flotte"
                  subtitle="Explorez"
                  title="Ma flotte"
                  onClick={() => navigateToPage('flotte')}
                />
              </IonCol>
              <IonCol size="12" size-md="4">
                <HomepageCard
                  imageSrc="src/assets/images/mes-employers.png"
                  alt="Les employers"
                  subtitle="Gérez"
                  title="Les employers"
                  onClick={() => navigateToPage('employers')}
                />
              </IonCol>
              <IonCol size="12" size-md="4">
                <HomepageCard
                  imageSrc="src/assets/images/mes-factures.png"
                  alt="Les factures"
                  subtitle="Gérez"
                  title="Les factures"
                  onClick={() => navigateToPage('factures')}
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
