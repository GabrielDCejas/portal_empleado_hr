import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../configs/firebaseConfig';



//constantes
const dataInicial = {
  fotosUsuario: [],
};

const USUARIO_FOTOS_LOADING = "USUARIO_FOTOS_LOADING";
const USUARIO_FOTOS_EXITO = "USUARIO_FOTOS_EXITO";
const USUARIO_FOTOS_ERROR = "USUARIO_FOTOS_ERROR";

export default function usuariosFirebaseReducer(state = dataInicial, action) {
  switch (action?.type) {
    case USUARIO_FOTOS_LOADING:
      return {
        ...state,
      };
    case USUARIO_FOTOS_EXITO:
      return {
        ...state,
        fotosUsuario: action.payload,
      };
    case USUARIO_FOTOS_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}



// Acción para obtener la lista de usuarios y sus URL de fotos de perfil
export const obtenerUsuariosFirebase = () => async (dispatch) => {
  dispatch({
    type: USUARIO_FOTOS_LOADING,
  });
  try {
    const usuariosRef = collection(firestore, "usuarios");
    const snapshot = await getDocs(usuariosRef);
    
    const usuarios = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      usuarios.push({
        uid: doc.id,
        empleadoid: data.empleadoid,
        photoURL: data.photoURL,
      });
    });
    dispatch({
      type: USUARIO_FOTOS_EXITO,
      payload: usuarios,
    });
  } catch (error) {
    console.error(error);
    console.log(error.message);
    dispatch({
      type: USUARIO_FOTOS_ERROR,
    });
  }
};
