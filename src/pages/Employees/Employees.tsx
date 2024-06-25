import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonBreadcrumb, IonBreadcrumbs, IonContent, IonPage, IonSearchbar } from '@ionic/react';
import HeaderAdmin from '../../components/Header/Admin/HeaderAdmin';
import './Employees.scss';
import { getEmployeeAll } from '../../api/employee/getEmployeeAll';
import { jwtDecode } from 'jwt-decode';

interface Employee {
  name: string;
  surname: string;
  [key: string]: any; 
}

const Employees: React.FC = () => {
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchText, setSearchText] = useState('');

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
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.surname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Employees;
