import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AuthPage from './pages/Auth/Auth';
import ForgotPage from './pages/ForgotPassword/ForgotPassword'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SignupPage from './pages/Signup/Signup';
import InfosPage from './pages/Infos/Infos';
import HomepageAdmin from './pages/HomepageAdmin/HomepageAdmin';
import HomepageEmployee from './pages/HompeageEmployee/HomepageEmployee';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/auth">
          <AuthPage />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        <Route exact path="/infos">
          <InfosPage />
        </Route>
        <Route exact path="/homepage-admin">
          <HomepageAdmin />
        </Route>
        <Route exact path="/homepage-employee">
          <HomepageEmployee />
        </Route>
        <Route exact path="/">
          <Redirect to="/auth" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;