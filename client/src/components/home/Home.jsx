import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/* import Portada from "../portada/Portada.jsx"; */
import Bot from "../bot/Bot.jsx";
import Filters from "../filters/Filters.jsx";
import CardsTriple from "../infoCards/InfoCards";
import CardHistory from "../cardHistory/CardHistory";
import OurPlans from "../ourPlans/OurPlans.jsx";
import Footer from "../footer/Footer.jsx";
import styles from "./Home.module.css";
// import { useAuth0 } from '@auth0/auth0-react';
import HomePatients from "../homePatients/HomePatients.jsx";
import HomeProfessional from "../homeProfessionals/HomeProfessionals.jsx";
import { getUserDetail } from "../../redux/actions/index.js";
import Cookies from "universal-cookie";
import Sidebar from "../admin/Admin.jsx";

export default function Home() {
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const globalUser = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUserDetail(cookie.get("userEmail")));
  }, []);

  return (
    <>
      {globalUser && globalUser.rolUser && <Sidebar />}
      {globalUser && globalUser.document && <HomePatients />}
      {globalUser && globalUser.license && (
        <HomeProfessional globalUser={globalUser} />
      )}
      {!globalUser || (globalUser && !globalUser.name) ? (
        <div className={`${styles.container}`}>
          <Bot />
          <Filters />
          <CardsTriple />
          <OurPlans />
          <CardHistory />
          <Footer />
        </div>
      ) : null}
    </>
  );
}
