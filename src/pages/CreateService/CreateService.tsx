import ServiceCreationForm from '../../components/ServiceFormEditor/ServiceFormEditor';
import { ServiceCreationFormData } from '../../classes/service/formField';
import { useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { createService } from '../../services/apiServices';

export default function CreateService() {
  const { loggedInUserID, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || loggedInUserID === null) {
      return
    }
  }, [isLoggedIn, loggedInUserID]);

  async function onCommit(serviceForm: ServiceCreationFormData) {
    await createService(serviceForm);
    navigate(`/${loggedInUserID}/services/`);
  }

  return <ServiceCreationForm onCommit={onCommit} />;
}
