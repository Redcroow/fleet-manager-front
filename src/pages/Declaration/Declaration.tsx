import React, { useState } from 'react';
import {
    IonContent, IonPage, IonItem, IonLabel, IonSelect, IonSelectOption,
    IonInput, IonTextarea, IonIcon, IonButton, IonBreadcrumbs, IonBreadcrumb,
    IonCard, IonCardHeader, IonCardSubtitle, IonModal, IonHeader, IonToolbar,
    IonButtons, IonTitle
} from '@ionic/react';
import HeaderEmployee from '../../components/Header/Employee/HeaderEmployee';
import { calendar, checkmarkCircle, cloudDownloadOutline, constructOutline } from 'ionicons/icons';
import './Declaration.scss';
import jsPDF from 'jspdf';
import { useHistory } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { postFuelHistory } from '../../api/fuel-history/postFuelHistory';
import { postMaintenanceHistory } from '../../api/maintenance-history/postMaintenanceHistory';
import { postAccidentHistory } from '../../api/accident-history/postAccidentHistory';

const DeclarationPage: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const [modalFiles, setModalFiles] = useState<File[]>([]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [prixSinistre, setPrixSinistre] = useState<number | undefined>(undefined);
    const [insuranceClaimNumber, setInsuranceClaimNumber] = useState<string>('');
    const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showLoadingIcon, setShowLoadingIcon] = useState<boolean>(false);
    const [prix, setPrix] = useState<number | undefined>(undefined);
    const [litre, setLitre] = useState<number | undefined>(undefined);
    const [typeCarburant, setTypeCarburant] = useState<string>('');
    const [lieu, setLieu] = useState<string>('');
    const [prixEntretien, setPrixEntretien] = useState<number | undefined>(undefined);
    const [mechanicName, setMechanicName] = useState<string>('');
    const [descriptionEntretien, setDescriptionEntretien] = useState<string>('');
    const [mileage, setMileage] = useState<number | undefined>(undefined);
    const token = localStorage.getItem('access_token');

    const history = useHistory();

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

    const handleModalFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const newFileModal = Array.from(e.dataTransfer.files);
        const pdfModalFile = newFileModal.filter((modalFile) => modalFile.type === 'application/pdf');
        if (pdfModalFile.length > 0) {
            setModalFiles([pdfModalFile[0]]);
        }
    };

    const handleModalFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFileModal = e.target.files;
        if (newFileModal && newFileModal.length > 0) {
            const pdfModalFile = Array.from(newFileModal).filter((modalFile) => modalFile.type === 'application/pdf');
            if (pdfModalFile.length > 0) {
                setModalFiles([pdfModalFile[0]]);
            }
        }
    };

    const isButtonDisabled = () => {
        if (selectedOption === 'facture') {
            return !title || files.length === 0 || (title === 'Essence' && (prix === undefined || litre === undefined || typeCarburant === '' || lieu === ''));
        } else if (selectedOption === 'sinistre') {
            return !title || !description || files.length === 0;
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
            if (title === 'Essence') {
                doc.text(`Prix: ${prix}`, 10, 30);
                doc.text(`Litres: ${litre}`, 10, 40);
                doc.text(`Type de carburant: ${typeCarburant}`, 10, 50);
                doc.text(`Lieu: ${lieu}`, 10, 60);
            }else if (title === 'Entretiens') {
                doc.text(`Coût de l'entretien: ${prixEntretien}`, 10, 30);
                doc.text(`Nom du mécanicien: ${mechanicName}`, 10, 40);
                doc.text(`Description de l'entretien:`, 10, 50);
                doc.text(descriptionEntretien, 20, 60);
                doc.text(`Kilométrage: ${mileage}`, 10, 80);
            }
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

    const sendPDF = async () => {
        setShowLoadingIcon(true);
        if(token) {
            const decodedToken: any = jwtDecode(token);
            if (selectedOption === 'facture') {
                if (title === 'Essence') {
                    const fuelData = {
                        carId: decodedToken.carIds[0],
                        description: lieu,
                        cost: prix,
                        fuelType: typeCarburant,
                        quantity: litre,
                        fuelDate: getTodayDate()
                    };
                    await postFuelHistory(token, fuelData);
                } else if (title === 'Entretiens') {
                    const maintenanceData = {
                        carId: decodedToken.carIds[0],
                        mechanicName: mechanicName,
                        maintenanceDate: getTodayDate(),
                        description: descriptionEntretien,
                        cost: prixEntretien,
                        mileage: mileage
                    };
                    await postMaintenanceHistory(token, maintenanceData);
                }
            } else if (selectedOption === 'sinistre') {
                const accidentData = {
                    carId: decodedToken.carIds[0],
                    title: title,
                    accidentDate: getTodayDate(),
                    description: description,
                    cost: prixSinistre,
                    insuranceClaimNumber: insuranceClaimNumber,
                };
                await postAccidentHistory(token, accidentData)
            }
        }

        console.log("faire le système d'envoi ...");
        console.log("faire une progress bar pendant l'envoi...");

        setTimeout(() => {
            clearInputs();
            setShowLoadingIcon(false);
            setShowModal(false);
            history.push('/homepage-employee');
        }, 4000);
    };

    const clearInputs = () => {
        setTitle('');
        setDescription('');
        setFiles([]);
        setPdfGenerated(false);
        setPrix(undefined);
        setLitre(undefined);
        setTypeCarburant('');
        setLieu('');
        setPrixEntretien(undefined);
        setMechanicName('');
        setDescriptionEntretien('');
        setPrixSinistre(undefined);
        setInsuranceClaimNumber('');
        setMileage(undefined);
    };

    return (
        <IonPage>
            <HeaderEmployee />
            <IonContent>
                <IonBreadcrumbs style={{ marginTop: '2em', marginLeft: '10px' }}>
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
                            <IonLabel position="floating">Catégorie</IonLabel>
                            <IonSelect
                                value={title}
                                placeholder="Choisir une catégorie"
                                onIonChange={(e) => setTitle(e.detail.value)}
                            >
                                <IonSelectOption value="Essence">Essence</IonSelectOption>
                                <IonSelectOption value="Entretiens">Entretiens</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Date</IonLabel>
                            <IonInput type="date" value={getTodayDate()} disabled></IonInput>
                            <IonIcon icon={calendar} slot="end"></IonIcon>
                        </IonItem>

                        {title === 'Essence' && (
                            <>
                                <IonItem>
                                    <IonLabel position="floating">Prix</IonLabel>
                                    <IonInput type="number" value={prix} onIonChange={(e) => setPrix(parseFloat(e.detail.value!))}></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Litres</IonLabel>
                                    <IonInput type="number" value={litre} onIonChange={(e) => setLitre(parseFloat(e.detail.value!))}></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Type de carburant</IonLabel>
                                    <IonInput type="text" value={typeCarburant} onIonChange={(e) => setTypeCarburant(e.detail.value!)}></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Lieu</IonLabel>
                                    <IonInput type="text" value={lieu} onIonChange={(e) => setLieu(e.detail.value!)}></IonInput>
                                </IonItem>
                            </>
                        )}
                        {title === 'Entretiens' && (
                            <>
                                <IonItem>
                                    <IonLabel position="floating">Coût de l'entretien</IonLabel>
                                    <IonInput type="number" value={prixEntretien} onIonChange={(e) => setPrixEntretien(parseFloat(e.detail.value!))}></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Nom du mécanicien</IonLabel>
                                    <IonInput type="text" value={mechanicName} onIonChange={(e) => setMechanicName(e.detail.value!)}></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Kilométrage</IonLabel>
                                    <IonInput type="number" value={mileage} onIonChange={(e) => setMileage(parseFloat(e.detail.value!))}></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Description de l'entretien</IonLabel>
                                    <IonTextarea
                                        placeholder="Décrivez en quelques lignes l'entretien ..."
                                        rows={5}
                                        style={{ minHeight: '300px' }}
                                        value={descriptionEntretien}
                                        onIonChange={(e) => setDescriptionEntretien(e.detail.value!)}
                                    ></IonTextarea>
                                </IonItem>
                            </>
                        )}
                    </>
                )}

                {selectedOption === 'sinistre' && (
                    <>
                        <IonItem>
                            <IonLabel position="floating">Titre</IonLabel>
                            <IonInput type="text" placeholder="Accident" value={title} onIonChange={(e) => setTitle(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Prix</IonLabel>
                            <IonInput type="number" value={prixSinistre} onIonChange={(e) => setPrixSinistre(parseFloat(e.detail.value!))}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Numéros d'assurance</IonLabel>
                            <IonInput type="text" placeholder="ICN123456" value={insuranceClaimNumber} onIonChange={(e) => setInsuranceClaimNumber(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Date</IonLabel>
                            <IonInput type="date" value={getTodayDate()} disabled></IonInput>
                            <IonIcon icon={calendar} slot="end"></IonIcon>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Description</IonLabel>
                            <IonTextarea
                                placeholder="Décrivez en quelques lignes le sinistre ..."
                                rows={5}
                                style={{ minHeight: '300px' }}
                                value={description}
                                onIonChange={(e) => setDescription(e.detail.value!)}
                            ></IonTextarea>
                        </IonItem>
                    </>
                )}

                {selectedOption && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="file-upload-section" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
                            <IonIcon icon={cloudDownloadOutline} className="file-icon" size="large" />
                            <label htmlFor="fileInput" className="file-input-label">
                                <input id="fileInput" type="file" onChange={handleFileInput} accept=".jpg,.jpeg,.png" multiple />
                                <span className="file-input-text">
                                    Faites glisser un fichier ici ou cliquez pour sélectionner un fichier.
                                </span>
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
                            <IonButton disabled={isButtonDisabled()} onClick={generatePDF}>
                                Générer le PDF
                            </IonButton>
                        </div>

                        {pdfGenerated && (
                            <>
                                <IonCard color="success">
                                    <IonCardHeader>
                                        <IonCardSubtitle>
                                            Une fois le PDF généré, veuillez l'envoyer à votre RH grâce au bouton ci-dessous
                                        </IonCardSubtitle>
                                    </IonCardHeader>
                                </IonCard>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em', marginBottom: '2em' }}>
                                    <IonButton onClick={() => setShowModal(true)}>Envoyer le PDF</IonButton>
                                </div>
                            </>
                        )}
                    </>
                )}

                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton onClick={() => setShowModal(false)}>Cancel</IonButton>
                            </IonButtons>
                            <IonTitle>Envoyer votre PDF</IonTitle>
                            <IonButtons slot="end">
                                <IonButton strong={true} onClick={sendPDF}>
                                    Confirm
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        {showLoadingIcon ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <IonIcon icon={constructOutline} size="large" />
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div
                                        className="file-upload-section"
                                        onDrop={handleModalFileDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                    >
                                        <IonIcon icon={cloudDownloadOutline} className="file-icon" size="large" />
                                        <label htmlFor="modalFileInput" className="file-input-label">
                                            <input
                                                id="modalFileInput"
                                                type="file"
                                                onChange={handleModalFileInput}
                                                accept=".pdf"
                                            />
                                            <span className="file-input-text">
                                                Faites glisser un fichier PDF ici ou cliquez pour sélectionner un fichier.
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                {modalFiles.length > 0 && (
                                    <div className="file-info">
                                        {modalFiles.map((modalFile, index) => (
                                            <div key={index} className="file-item">
                                                <IonIcon icon={checkmarkCircle} className="checkmark-icon" />
                                                <p>{modalFile.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default DeclarationPage;
