import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonCard, IonCardHeader, IonCardSubtitle, IonContent, IonPage } from '@ionic/react';
import HeaderEmployee from '../../components/Header/Employee/HeaderEmployee';
import './HomepageEmployee.scss';
import ScrollDown from '../../components/ScrollDown/Scrolldown';
import { jwtDecode } from 'jwt-decode';

const HomepageEmployee: React.FC = () => {
  const history = useHistory();
  const [isVideoPlayed, setIsVideoPlayed] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false)
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.position === "Employee") {
        setIsEmployee(true);
      } else {
        history.push('/auth');
      }
    } else {
      history.push('/auth');
    }
  }, [history]);
  
  useEffect(() => {
    const isVideoPlayedInSession = sessionStorage.getItem('isVideoPlayed');

    if (isVideoPlayedInSession === 'true') {
      setIsVideoPlayed(true);

    } else {
      const videoElement = document.getElementById('presentation-video') as HTMLVideoElement;

      const handleVideoEnd = () => {
        setFadeOut(true);
        setTimeout(() => {
          setIsVideoPlayed(true);
          sessionStorage.setItem('isVideoPlayed', 'true');
        }, 1500);
      };
      

      if (videoElement) {
        videoElement.play().catch(error => console.error('Error playing video:', error));
        videoElement.addEventListener('ended', handleVideoEnd);
      }

      return () => {
        if (videoElement) {
          videoElement.removeEventListener('ended', handleVideoEnd);
        }
      };
    }
  }, []);

  return (
    <IonPage className='employee-page'>
      <video
        id="presentation-video"
        className={fadeOut ? 'fade-out-employee' : ''}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
        }}
        autoPlay
        muted
      >
        <source src="src/assets/video/homepage-employee-pres.mp4" type="video/mp4" />
      </video>
      {isVideoPlayed && (
        <IonContent>
          <ScrollDown />
          <HeaderEmployee />
          <div className='section-video'>
            <video
              id="background-video"
              style={{
                width: '100%',
                height: 'auto',
                marginTop: '4em',
                objectFit: 'cover',
                transform: 'scale(1.8)'
              }}
              autoPlay
              muted
              loop
            >
              <source src="src/assets/video/presentation_test.mp4" type="video/mp4" />
            </video>
          </div>
          <IonCard color="warning">
            <IonCardHeader>
              <IonCardSubtitle>Les données et la vidéos sont un exemple. <br></br>La présentation pour un véhicule précis est en cours de développement. 🚧</IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
          <div className='section-infos'>
            <div className='car-info-pp'>
              <div className='car-img'>
                <img src="src/assets/images/BMW-PNG.png" />
              </div>
              <div className='car-info'>
                <span>Marques: BMW</span>
                <span>Modèle: M4 Coupé</span>
                <span>Immatriculation: AZ-974-BD</span>
                <span>Origine: <img src="src/assets/images/de.png" /></span>
              </div>
            </div>
          </div>
          <div className='car-info-tech'>
            <img className='icon-info' src="src/assets/images/bmw-fiche-tech.png"/>
            <div className='caracteristique'>
              <div className='div1'>
                <div className='div2'>
                  <img className='icon-cara' src="src/assets/images/pmeca.png" />
                  <span>4 places</span>
                </div>
                <div className='div2'>
                  <img className='icon-cara' src="src/assets/images/cmeca.png" />
                  <span>445 l / NC</span>
                </div>
              </div>
              <div className='div1'>
                <div className='div2'>
                  <img className='icon-cara' src="src/assets/images/emeca.png" />
                  <span>Essence SP98</span>
                </div>
                <div className='div2'>
                  <img className='icon-cara' src="src/assets/images/bmeca.png" />
                  <span>Mécanique à 6 rapports</span>
                </div>
              </div>
            </div>
          </div>
          <div className='car-info-perf'>
            <img className='icon-performance' src="src/assets/images/perf.png"/>
            <div className='performances'>
              <div className='div1'>
                <div className='div2'>
                  <img className='icon-perf' src="src/assets/images/pperf.png" />
                  <span>32 CV | 431ch</span>
                </div>
                <div className='div2'>
                  <img className='icon-perf' src="src/assets/images/vperf.png" />
                  <span>250 km/h</span>
                </div>
              </div>
            </div>
          </div>
        </IonContent>
      )}
    </IonPage>
  );
};

export default HomepageEmployee;
