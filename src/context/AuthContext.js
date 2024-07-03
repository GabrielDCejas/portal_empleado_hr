// ** React Imports
import { createContext, useEffect, useState } from "react";
import axios from "axios";

// ** Next Import
import { useRouter } from "next/router";

import { auth, firestore, firebase, storage, provider } from "../configs/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, collection, addDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { sendPasswordResetEmail } from "firebase/auth";
import { loginToken } from "@/redux/token";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { UrlApi } from "@/keys";

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};
const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const tokenSelector = useSelector((store) => store.token.token);
  // ** States
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const [token, setToken] = useState("");

  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(tokenSelector).length !== 0) {
      setToken(tokenSelector.token);
    }
  }, [tokenSelector]);

  useEffect(() => {
    dispatch(loginToken());
  }, []);

  useEffect(() => {
    let refreshInterval;

    const refreshToken = () => {
      dispatch(loginToken());
    };

    const startRefreshTimer = () => {
      refreshInterval = setInterval(refreshToken, 1800000); // Llamada cada 30 minutos
    };

    const stopRefreshTimer = () => {
      clearInterval(refreshInterval);
    };

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;

        // Obtener el documento del usuario desde Firestore
        const usuariosCollection = collection(firestore, "usuarios"); // Acceder a la colección
        const usuarioDoc = query(usuariosCollection, where("uid", "==", uid)); // Crear una consulta

        const querySnapshot = await getDocs(usuarioDoc);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const { email, empleadoid, uid, ownerid, fullname, photoURL, photoPORTADA } = userData;

          setUser({
            email,
            empleadoid,
            uid,
            ownerid,
            fullname,
            photoURL,
            photoPORTADA
          });
        }
        dispatch(loginToken()); // Dispatch de logintoken() para obtener el token
        startRefreshTimer(); // Inicia el temporizador de actualización
      } else {
        setUser(null);
        setToken(null);
        stopRefreshTimer(); // Detiene el temporizador de actualización si el usuario no está autenticado
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRegister = async (params) => {
    try {
      let responseContac = null;
      const entidad = "new_empleados";
      const fetch = `
        <entity name='new_empleado'>
          <attribute name='new_name' />
          <attribute name='new_correoelectronico' />
          <attribute name='new_empleadoid' />
          <attribute name='ownerid' />
          <order attribute='new_numerolegajo' descending='false' />
          <filter type='and'>
            <condition attribute='new_correoelectronico' operator='eq' value='${params.email}' />
          </filter>
        </entity>
      `;
      try {
        responseContac = await axios.post(
          `${UrlApi}api/consultafetchs`,
          {
            entidad: entidad,
            fetch: fetch,
          },
          {
            headers: {
              Authorization: `Bearer ${tokenSelector.token}`,
            },
          }
        );
      } catch (error) {
        // Manejar errores de la solicitud de contacto aquí
      }

      if (responseContac && responseContac?.data.length > 0) {
        let datosContacto = responseContac.data[0];
        let empleadoid = datosContacto.new_empleadoid;
        let ownerid = datosContacto["_ownerid_value"];
        let fullname = datosContacto.new_name;

        // Crea un nuevo usuario en Firebase con correo y contraseña
        const response = await createUserWithEmailAndPassword(auth, params.email, params.password);
        const uid = response.user.uid;

        // Guarda datos en el local storage
        window.localStorage.setItem("userData", JSON.stringify(response.user));
        // Agrega un registro en la colección 'usuarios' en Firestore
        const usersCollection = collection(firestore, "usuarios"); // Utiliza la función collection de firestore
        await addDoc(usersCollection, {
          email: params.email,
          empleadoid,
          ownerid,
          uid,
          fullname,
        });
        router.replace("/");
      } else {
        throw new Error("No existe una cuenta con ese correo en nuestro sistema");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (params) => {
    try {
      let responseContac = null;
      const entidad = "new_empleados";
      const fetch = `
        <entity name='new_empleado'>
          <attribute name='new_name' />
          <attribute name='new_correoelectronico' />
          <attribute name='new_empleadoid' />
          <attribute name='ownerid' />
          <order attribute='new_numerolegajo' descending='false' />
          <filter type='and'>
            <condition attribute='new_correoelectronico' operator='eq' value='${params.email}' />
          </filter>
        </entity>
      `;

      try {
        responseContac = await axios.post(
          `${UrlApi}api/consultafetchs`,
          {
            entidad: entidad,
            fetch: fetch,
          },
          {
            headers: {
              Authorization: `Bearer ${tokenSelector.token}`,
            },
          }
        );
      } catch (error) {
        throw error
      }

      // Esperar a que responseContac responda
      if (responseContac && responseContac?.data.length > 0) {
        let datosContacto = responseContac.data[0];
        const response = await signInWithEmailAndPassword(auth, params.email, params.password);

        // Guardar datos en el local storage si rememberMe es verdadero
        if (params.recordar) {
          window.localStorage.setItem("userData", JSON.stringify(response.user));
        }
        // Obtener el UID del usuario actual
        const uid = response.user.uid;

        // Obtener el documento del usuario desde Firestore
        const usuariosCollection = collection(firestore, "usuarios");
        const usuarioDoc = query(usuariosCollection, where("uid", "==", uid));

        const querySnapshot = await getDocs(usuarioDoc);

        if (!querySnapshot.empty && responseContac.data.length > 0) {
          const userData = querySnapshot.docs[0].data();
          const { email, uid, empleadoid, ownerid, fullname, photoURL, photoPORTADA} = userData;

          setUser({
            email,
            empleadoid,
            uid,
            ownerid,
            fullname,
            photoURL,
            photoPORTADA
          });
        }
      } else {
        throw new Error("No existe una cuenta con ese correo en nuestro sistema");
      }
      router.replace("/");
    } catch (error) {
      throw error;
      // Manejar el error aquí
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      // Envia un correo electrónico de recuperación de contraseña
      await sendPasswordResetEmail(auth, email);
      // Puedes mostrar un mensaje al usuario indicando que se ha enviado un correo electrónico de recuperación de contraseña
      console.log("Se ha enviado un correo electrónico de recuperación de contraseña.");
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    window.localStorage.removeItem("userData");
    router.push("/");
  };

  const actualizarFotoPerfil = async (imgEditada) => {
    // Mostrar una notificación de carga
    const toastLoading = toast.loading("Loading...");

    try {
      // Referencia a Storage
      const storageRef = ref(storage, `${user.uid}/foto perfil`);

      // Subir la imagen editada a Storage
      await uploadBytes(storageRef, imgEditada);

      // Obtener la URL directa de la imagen
      const imgURL = await getDownloadURL(storageRef);

      if (user.uid) {
        // Referencia a Firestore
        const usuariosRef = collection(firestore, "usuarios");
        const userQuery = query(usuariosRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.docs.length > 0) {
          const userDoc = querySnapshot.docs[0];
          const userRef = doc(usuariosRef, userDoc.id);

          // Actualizar la propiedad 'photoURL' en Firestore
          await updateDoc(userRef, { photoURL: imgURL });

          // Actualizar solo la propiedad photoURL en el estado del componente
          setUser((prevUser) => ({
            ...prevUser,
            photoURL: imgURL,
          }));
          toast.dismiss(toastLoading);
          // Mostrar una notificación de éxito
          toast.success("Tu foto se ha cargado correctamente.");
        } else {
          // Mostrar una notificación de error
          toast.error("Usuario no encontrado.");
        }
      } else {
        // Mostrar una notificación de error
        toast.error("UID de usuario no definido.");
      }
    } catch (error) {
      // Mostrar una notificación de error en caso de excepción
      console.error(error);
      toast.error("Error al actualizar la foto de perfil");
    }
  };

  const actualizarFotoPortada = async (imgEditada) => {
    // Referencia a Storage
    const storageRef = ref(storage, `${user.uid}/foto portada`);
    const toastLoading = toast.loading("Cargando...");
    // Subir la imagen editada a Storage
    await uploadBytes(storageRef, imgEditada);

    // Obtener la URL directa de la imagen
    const imgURL = await getDownloadURL(storageRef);

    // Asegúrate de que user.uid tenga un valor definido
    if (user.uid) {
      // Referencia a Firestore
      const usuariosRef = collection(firestore, "usuarios");
      const userQuery = query(usuariosRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.docs.length > 0) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(usuariosRef, userDoc.id);

        // Actualizar la propiedad 'photoURL' en Firestore
        await updateDoc(userRef, { photoPORTADA: imgURL });

        // Actualizar solo la propiedad photoURL en el estado del componente
        setUser((prevUser) => ({
          ...prevUser,
          photoPORTADA: imgURL,
        }));

        toast.dismiss(toastLoading);
        toast.success("Tu foto se ha cargado correctamente.");
      } else {
        toast.error("Usuario no encontrado.");
      }
    } else {
      toast.error("UID de usuario no definido.");
    }
  };

  const values = {
    user,
    loading,
    token, // Agregamos el token aquí
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    forgotPassword: handleForgotPassword,
    actualizarFotoPerfil,
    actualizarFotoPortada,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
