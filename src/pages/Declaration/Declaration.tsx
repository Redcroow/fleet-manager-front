import React, { useState } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonTextarea, IonIcon, IonButton, IonBreadcrumbs, IonBreadcrumb, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import HeaderEmployee from '../../components/Header/Employee/HeaderEmployee';
import { calendar, checkmarkCircle, cloudDownloadOutline } from 'ionicons/icons';
import './Declaration.scss';
import jsPDF from 'jspdf';

const DeclarationPage: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

    const getTodayDate = (): string => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const newFiles = Array.from(e.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = e.target.files;
        if (newFiles) {
            const filesArray = Array.from(newFiles);
            setFiles((prevFiles) => [...prevFiles, ...filesArray]);
        }
    };

    const isButtonDisabled = () => {
        if (selectedOption === 'facture') {
            return !title || files.length === 0;
        } else if (selectedOption === 'sinistre') {
            return (!title || !description) || files.length === 0;
        }
        return true;
    };    

    const generatePDF = () => {
        const doc = new jsPDF();
        const maxLineWidth = 180;
        let formattedDescription = description;
        const textLines = doc.splitTextToSize(description, maxLineWidth);
        formattedDescription = textLines.join('\n');
    
        if (selectedOption === 'facture') {
            doc.text(`Titre: ${title}`, 10, 10);
            doc.text(`Date: ${getTodayDate()}`, 10, 20);
        } else if (selectedOption === 'sinistre') {
            doc.text(`Titre: ${title}`, 10, 10);
            doc.text(`Date: ${getTodayDate()}`, 10, 20);
            doc.text(`Description:`, 10, 30);
            doc.text(formattedDescription, 20, 40);
        }
        files.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result as string;
                if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
                    doc.addImage(dataUrl, 'JPEG', 10, 40 + index * 100, 180, 90);
                }
                if (index === files.length - 1) {
                    doc.save('declaration.pdf');
                    setPdfGenerated(true);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const clearInputs = () => {
        setTitle('');
        setDescription('');
        setFiles([]);
        setPdfGenerated(false);
    };

    return (
        <IonPage>
            <HeaderEmployee />
            <IonContent>
                <IonBreadcrumbs style={{marginTop:'2em', marginLeft: '10px'}}>
                    <IonBreadcrumb href="/homepage-employee">Home</IonBreadcrumb>
                    <IonBreadcrumb href="/declaration">Declaration</IonBreadcrumb>
                </IonBreadcrumbs>
                <IonCard color="success">
                    <IonCardHeader>
                        <IonCardSubtitle>Sélectionnez un type de déclaration et suivez les étapes afin de générer le PDF</IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>
                <IonCard color="warning">
                    <IonCardHeader>
                        <IonCardSubtitle>Nous ne prenons pas encore de fichier pdf externe, rapprochez-vous de votre RH</IonCardSubtitle>
                    </IonCardHeader>
                </IonCard>
                <div className='input-profile-group' style={{ marginTop: '2em' }}>
                    <IonSelect
                        value={selectedOption}
                        placeholder="Type de déclaration"
                        className='profile-input'
                        onIonChange={(e) => {
                            setSelectedOption(e.detail.value);
                            clearInputs();
                        }}
                    >
                        <IonSelectOption value="facture">Facture</IonSelectOption>
                        <IonSelectOption value="sinistre">Sinistre</IonSelectOption>
                    </IonSelect>
                </div>

                {selectedOption === 'facture' && (
                    <>
                        <IonItem>
                            <IonLabel position="floating">Titre</IonLabel>
                            <IonInput type="text" placeholder="Essence" value={title} onIonChange={(e) => setTitle(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Date</IonLabel>
                            <IonInput type="date" value={getTodayDate()} disabled></IonInput>
                            <IonIcon icon={calendar} slot="end"></IonIcon>
                        </IonItem>
                    </>
                )}

                {selectedOption === 'sinistre' && (
                    <>
                        <IonItem>
                            <IonLabel position="floating">Titre</IonLabel>
                            <IonInput type="text" placeholder="Accident" value={title} onIonChange={(e) => setTitle(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Date</IonLabel>
                            <IonInput type="date" value={getTodayDate()} disabled></IonInput>
                            <IonIcon icon={calendar} slot="end"></IonIcon>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Description</IonLabel>
                            <IonTextarea placeholder="Décrivez en quelques lignes le sinistre ..." rows={5} style={{ minHeight: '300px' }} value={description} onIonChange={(e) => setDescription(e.detail.value!)}></IonTextarea>
                        </IonItem>
                    </>
                )}
                {selectedOption && (
                    <div style={{display:'flex', justifyContent: 'center'}}>
                        <div className="file-upload-section" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
                            <IonIcon icon={cloudDownloadOutline} className="file-icon" size="large" />
                            <label htmlFor="fileInput" className="file-input-label">
                                <input id="fileInput" type="file" onChange={handleFileInput} accept=".jpg,.jpeg,.png" multiple />
                                <span className="file-input-text">Faites glisser un fichier ici ou cliquez pour sélectionner un fichier.</span>
                            </label>
                        </div>
                    </div>
                )}
                {files.length > 0 && (
                    <div className="file-info">
                        {files.map((file, index) => (
                            <div key={index} className="file-item">
                                <IonIcon icon={checkmarkCircle} className="checkmark-icon" />
                                <p>{file.name}</p>
                            </div>
                        ))}
                    </div>
                )}
                {selectedOption && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em', marginBottom: '2em' }}>
                            <IonButton disabled={isButtonDisabled()} onClick={generatePDF}>Générer le PDF</IonButton>
                        </div>

                        {pdfGenerated && (
                            <>
                                <IonCard color="success">
                                    <IonCardHeader>
                                        <IonCardSubtitle>Une fois le PDF généré, veuillez l'envoyer à votre RH grâce au bouton ci-dessous</IonCardSubtitle>
                                    </IonCardHeader>
                                </IonCard>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em', marginBottom: '2em' }}>
                                    <IonButton>Envoyer le PDF</IonButton>
                                </div>
                            </>
                        )}
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default DeclarationPage;
