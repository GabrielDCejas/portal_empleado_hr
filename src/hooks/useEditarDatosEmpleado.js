
import { AuthContext } from '@/context/AuthContext';
import { getEmpleado, setDatosEmpleado } from '@/redux/empleados';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';

const useEditarDatosEmpleado = () => {
    const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const editarDatosEmpleado = (datos) => {
    return dispatch(setDatosEmpleado(user?.empleadoid, token, datos))
      .then((id) => {
        dispatch(getEmpleado(user?.empleadoid, token));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return editarDatosEmpleado;
};

export default useEditarDatosEmpleado;
