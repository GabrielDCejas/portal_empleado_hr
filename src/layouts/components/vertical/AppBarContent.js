// ** MUI Imports
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// ** Icon Imports
import Icon from "../../../@core/components/icon/index";

// ** Components
import ModeToggler from "../../../@core/layouts/components/shared-components/ModeToggler";
import UserDropdown from "../../../@core/layouts/components/shared-components/UserDropdown";
import Image from "next/image";
import hero from "../../../../public/images/Logo-Human-Blanco.png";

const AppBarContent = (props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props;

  return (
    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Box className="actions-left" sx={{ mr: 2, display: "flex", alignItems: "center" }}>
        {hidden ? (
          <IconButton color="inherit" sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon="mdi:menu" />
          </IconButton>
        ) : null}
         <ModeToggler settings={settings} saveSettings={saveSettings} />
      </Box>
      <Box className="actions-right" sx={{ display: "flex", alignItems: "center" }}>
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  );
};

export default AppBarContent;
