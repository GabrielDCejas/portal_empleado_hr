// ** React Imports
import { useState } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Components
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import MuiFormControlLabel from "@mui/material/FormControlLabel";

// ** Icon Imports
import Icon from "../../@core/components/icon";

// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Hooks
import { useAuth } from "../../hooks/useAuth";
import { useSettings } from "../../@core/hooks/useSettings";

// ** Configs
import themeConfig from "../../configs/themeConfig";

// ** Layout Import
import BlankLayout from "../../@core/layouts/BlankLayout";

import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

const LoginIllustration = styled("img")(({ theme }) => ({
  maxWidth: "28rem",
  backgroundSize: "cover",
  [theme.breakpoints.down("lg")]: {
    maxWidth: "15rem",
    backgroundSize: "cover",
  },
}));

const RightWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 450,
  },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { mt: theme.spacing(8) },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

const styles = {
  background: {
    flex: 1,
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url(/images/fondo_login.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover", // Utiliza 'cover' para que la imagen se ajuste al tamaño del Box
    height: "100vh", // Ajusta la altura al 100% de la altura de la ventana (viewport)
  },
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresa una dirección de correo electrónico válida")
    .required("El campo de correo electrónico es requerido"),
  password: yup.string().min(5).required("El campo de contraseña es requerido"),
});

const defaultValues = {
  password: "",
  email: "",
};

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // ** Hooks
  const auth = useAuth();
  const theme = useTheme();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  // ** Vars
  const { skin } = settings;

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [loading, setloading] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;
    const recordar = rememberMe;
    setloading(true); // Establece loading en true antes de la llamada a auth.login

    try {
      // Realiza la operación asincrónica (auth.login)
      await auth.login({ email, password, recordar });

      // Si el inicio de sesión fue exitoso, puedes establecer loading en false
      setloading(false);
    } catch (error) {
      console.log("error", error);
      // En caso de error, también debes establecer loading en false
      setloading(false);

      // Resto del manejo de errores
      if (error?.message === "No existe una cuenta con ese correo en nuestro sistema") {
        setError("email", {
          type: "manual",
          message: "No existe una cuenta con ese correo en nuestro sistema",
        });
      }
      if (
        (error?.code && error.code === "auth/user-not-found") ||
        error.code === "email is not defined" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-login-credentials"
      ) {
        setError("email", {
          type: "manual",
          message: "El correo electrónico o la contraseña no son válidos",
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Box className="content-right">
      {!hidden ? <Box sx={styles.background}>{/* Tu contenido aquí */}</Box> : null}
      <RightWrapper sx={skin === "bordered" && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 10,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper",
          }}
        >
          <BoxWrapper>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant="h6">Bienvenido al {themeConfig.templateName}👋🏻</TypographyStyled>
              <Typography variant="body2">Te invitamos a iniciar sesión y comenzar tu día.</Typography>
            </Box>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label="Correo Electrónico"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder="admin@materio.com"
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: "error.main" }}>{errors.email.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="auth-login-v2-password" error={Boolean(errors.password)}>
                  Contraseña
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label="Password"
                      onChange={onChange}
                      id="auth-login-v2-password"
                      error={Boolean(errors.password)}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: "error.main" }} id="">
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{ mb: 4, display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}
              >
                <FormControlLabel
                  label="Recuerdame"
                  control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                />
                <LinkStyled href="/olvidaste-contrasena">Olvidaste la contraseña?</LinkStyled>
              </Box>
              <Box sx={{ mt: 3, mb: 2, position: "relative" }}>
                <Button fullWidth size="large" type="submit" variant="contained" sx={{ mb: 7 }} disabled={loading}>
                  Login
                </Button>
                {loading && (
                  <CircularProgress
                    size={30}
                    sx={{
                      color: "green",
                      position: "absolute",
                      top: "30%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Nuevo en nuestro portal?
                </Typography>
                <Typography variant="body2">
                  <LinkStyled href="/registro">Crea una cuenta</LinkStyled>
                </Typography>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  );
};
LoginPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default LoginPage;
