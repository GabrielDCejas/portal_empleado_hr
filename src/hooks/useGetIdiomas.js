import { AuthContext } from "@/context/AuthContext";
import { getIdiomas } from "@/redux/dataVarios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetIdiomas = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const idiomasRedux = useSelector((store) => store.dataVarios.idiomas);
  const [idiomas, setIdiomas] = useState([]);

  useEffect(() => {
    dispatch(getIdiomas(token));
  }, []);

  useEffect(() => {
    if (idiomasRedux?.length > 0) {
      const idiomas = [];
      idiomasRedux.forEach((items) => {
        let item = {
          value: items.new_idiomaid,
          label: items.new_name,
        };
        idiomas.push(item);
      });
      setIdiomas(idiomas);
    }
  }, [idiomasRedux]);

  return { idiomas };
};

export default useGetIdiomas;
