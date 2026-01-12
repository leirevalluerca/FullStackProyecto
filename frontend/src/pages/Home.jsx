import { useTranslation } from "react-i18next";
import PropertiesList from "./PropertyList";

function Home() {
  const { t } = useTranslation();

  return(
    <div>
      {/* 
      <h1>{t("welcome")}</h1> */}
      <PropertiesList/>
    </div>

    
  );
};

export default Home;