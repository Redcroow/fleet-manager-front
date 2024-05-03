import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import HeaderEmployee from '../../components/Header/Employee/HeaderEmployee';
import './HomepageEmployee.scss';

const HomepageEmployee: React.FC = () => {
  const [isVideoPlayed, setIsVideoPlayed] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

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
          <HeaderEmployee />
        </IonContent>
      )}
    </IonPage>
  );
};

export default HomepageEmployee;
