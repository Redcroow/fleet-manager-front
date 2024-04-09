import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg } from '@ionic/react';

interface HomepageCardProps {
  imageSrc: string;
  alt: string;
  subtitle: string;
  title: string;
  onClick: () => void;
}

const HomepageCard: React.FC<HomepageCardProps> = ({ imageSrc, alt, subtitle, title, onClick }) => {
  return (
    <IonCard className="homepage-card" onClick={onClick}>
      <IonImg src={imageSrc} alt={alt} />
      <IonCardHeader>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default HomepageCard;
