import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import HeaderEmployee from '../../components/Header/Employee/HeaderEmployee';

const HomepageEmployee: React.FC = () => {
  const [isVideoPlayed, setIsVideoPlayed] = useState(false);

  useEffect(() => {
    const isVideoPlayedInSession = sessionStorage.getItem('isVideoPlayed');
    if (isVideoPlayedInSession === 'true') {
      setIsVideoPlayed(true);
    } else {
      const videoElement = document.getElementById('presentation-video') as HTMLVideoElement;

      const handleVideoEnd = () => {
        setIsVideoPlayed(true);
        sessionStorage.setItem('isVideoPlayed', 'true');
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
    <IonPage>
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        {!isVideoPlayed && (
          <video
            id="presentation-video"
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
            <source src="src/assets/video/homepage-pres.mp4" type="video/mp4" />
          </video>
        )}
        {isVideoPlayed && (
          <IonContent>
            <HeaderEmployee />
          </IonContent>
        )}
      </div>
    </IonPage>
  );
};

export default HomepageEmployee;
