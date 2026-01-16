import { useTranslation } from "react-i18next";
import PropertiesList from "./PropertyList";

function Home() {
  const { t } = useTranslation();

  return(
    <div>
      <PropertiesList/>
    </div>

    
  );
};

export default Home;