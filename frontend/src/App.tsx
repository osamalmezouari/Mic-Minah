import "./styles/App.css";
import Landing from "./pages/Landing.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/register.tsx";
import Login from "./pages/login.tsx";
import SousActivitieDetails from "./pages/SousActivitieDetails.tsx";
import Marriage from "./component/forms/marriage.tsx";
import Retrait from "./component/forms/retrait.tsx";
import Naissance from "./component/forms/naissance.tsx";
import Pelerinage from "./component/forms/pelerinage.tsx";
import Condoleance from "./component/forms/condoleance.tsx";
import Maladies from "./component/forms/Maladies.tsx";
import Prets from "./component/forms/Prets.tsx";
import RentreeScolaire from "./component/forms/rentreeScolaire.tsx";
import Lang from "./component/forms/lang.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Landing />} path="AOS" />
          <Route element={<Login />} path="AOS/SeConecter" />
          <Route element={<Register />} path="AOS/Inscreption" />
          <Route
            element={<SousActivitieDetails />}
            path="AOS/SousActivitie/:id"
          />
          <Route
            element={<Marriage />}
            path="AOS/SousActivitie/DemandeMriage"
          />
          <Route
            element={<Retrait />}
            path="AOS/SousActivitie/DemandeRetrait"
          />
          <Route
            element={<Naissance />}
            path={"AOS/SousActivitie/DemandeNaissance"}
          />
          <Route
            element={<Pelerinage />}
            path="AOS/SousActivitie/Pelerinage"
          />
          <Route
              element={<Condoleance />}
            path={'AOS/SousActivitie/Condoleance'}
          />
          <Route
              element={<Maladies />}
              path={'AOS/SousActivitie/Maladies'}
          />
          <Route element={<RentreeScolaire />} path={'/AOS/SousActivitie/rentree-scolaire'}/>
          <Route element={<Prets />} path={'/AOS/SousActivitie/Prets'}/>
          <Route element={<Lang />} path={'/AOS/SousActivitie/Lang'}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
