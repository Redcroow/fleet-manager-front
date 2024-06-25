import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonBreadcrumb, IonBreadcrumbs, IonButton, IonContent, IonPage, IonSearchbar } from '@ionic/react';
import HeaderAdmin from '../../components/Header/Admin/HeaderAdmin';
import './Employees.scss';
import { getEmployeeAll } from '../../api/employee/getEmployeeAll';
import { jwtDecode } from 'jwt-decode';
import { getEmployee } from '../../api/employee/getEmployee';
import { getCar } from '../../api/car/getCar';

interface Employee {
  name: string;
  surname: string;
  phone_number: string;
  [key: string]: any;
}

const Employees: React.FC = () => {
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchText, setSearchText] = useState('');
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);
  const [employeeDetails, setEmployeeDetails] = useState<{ [key: number]: any }>({});
  const [employeeCars, setEmployeeCars] = useState<{ [key: number]: any }>({});



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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const employeeData = await getEmployeeAll(token) as Employee[];
          const sortedData = employeeData.sort((a, b) => {
            const nameA = `${a.name} ${a.surname}`.toLowerCase();
            const nameB = `${b.name} ${b.surname}`.toLowerCase();
            return nameA.localeCompare(nameB);
          });
          setEmployees(sortedData);
          setFilteredEmployees(sortedData);
        } else {
          history.push('/auth');
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    if (isAdmin) {
      fetchEmployees();
    }
  }, [isAdmin, history]);

  useEffect(() => {
    const filteredData = employees.filter(employee =>
      `${employee.name} ${employee.surname}`.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredEmployees(filteredData);
  }, [searchText, employees]);

  const handleRowClick = async (index: number, employeeId: number) => {
    if (expandedRowIndex === index) {
      setExpandedRowIndex(null);
    } else {
      setExpandedRowIndex(index);
      if (!employeeDetails[employeeId]) {
        try {
          const token = localStorage.getItem('access_token');
          if (token) {
            const data = await getEmployee(token, employeeId);
            setEmployeeDetails(prevDetails => ({
              ...prevDetails,
              [employeeId]: data,
            }));
            
            const carData = await getCar(token, employeeId);
            setEmployeeCars(prevCars => ({
              ...prevCars,
              [employeeId]: carData,
            }));
          } else {
            history.push('/auth');
          }
        } catch (error) {
          console.error('Error fetching employee details:', error);
        }
      }
    }
  };
  
  

  return (
    <IonPage>
      <HeaderAdmin />
      <IonBreadcrumbs style={{ marginTop: '2em', marginLeft: '10px' }}>
        <IonBreadcrumb href="/homepage-admin">Home</IonBreadcrumb>
        <IonBreadcrumb href="/employees">Mes employées</IonBreadcrumb>
      </IonBreadcrumbs>
      <IonContent>
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          debounce={300}
          placeholder="Rechercher par nom ou prénom"
          autocapitalize="off"
        />
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Téléphone</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <React.Fragment key={index}>
                  <tr onClick={() => handleRowClick(index, employee.id)} className={expandedRowIndex === index ? 'expanded' : ''}>
                    <td>{employee.name}</td>
                    <td>{employee.surname}</td>
                    <td>{employee.phone_number}</td>
                  </tr>
                  {expandedRowIndex === index && (
                    <tr className="accordion-content">
                      <td colSpan={3}>
                      <div>
                      {employeeDetails[employee.id] ? (
                        <div>
                          {/* Afficher ici les détails supplémentaires */}
                          <p>Email: {employeeDetails[employee.id].email}</p>
                          <p>
                            Attribution: {employeeCars[employee.id] ? `${employeeCars[employee.id].brand} ${employeeCars[employee.id].model}` : "Pas de voiture attitrée"}
                            <br />
                            {employeeCars[employee.id] && (
                              <span>Immatriculation : {employeeCars[employee.id].registrationPlate}</span>
                            )}
                          </p>
                          {/* Ajoutez d'autres détails que vous souhaitez afficher */}
                        </div>
                      ) : (
                        <p>Chargement des détails...</p>
                      )}
                    </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <IonButton className="add-employee-button" onClick={() => history.push('/add-employee')}>
          Ajout Employé
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Employees;
