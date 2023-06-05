import React, {useEffect} from "react";
import "./App.css";
import {Route, Routes, useLocation} from "react-router-dom";
import Header from "./components/Header/Header";
import Gallery from "./components/Gallery/Gallery";
import Authorization from "./components/Auth/Authorization/Authorization";
import Registration from "./components/Auth/Registration/Registration";
import Landing from "./components/Landing/Landing";
import ClearHeader from "./components/Header/ClearHeader";
import AddCart from "./components/ProileUser/AddCart/AddCart";
import TestDow from "./components/testDow";
import {useUserStore} from "./store/UserStore";
import {check} from "./api/UserApi";
import {fetchCategories, fetchFormats, fetchLicenses} from "./api/ModelApi";
import {useModelStore} from "./store/ModelStore";
import ProfileUser from "./components/ProileUser/ProfileUser";
import ShopBasket from "./components/ShopBasket/ShopBasket";
import Confirm from "./components/admin/confirm/Confirm";

const App = () => {

    document.body.style.overflow="auto";

    const userStore = useUserStore();
    const modelStore = useModelStore()

    const location = useLocation();

    useEffect(()=> {
        async function checkAuth() {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const user = await check();
                    userStore.setUser(user);
                } catch (e) {
                    console.log(e)
                }
            }
        }
        checkAuth()
    },[])

    useEffect(()=> {
        fetchLicenses().then(data => modelStore.setLicenses(data))
        fetchFormats().then(data => modelStore.setFormats(data))
        fetchCategories().then(data => modelStore.setCategories(data))
    },[])

  return (
    <div className="App">
        {
            (location.pathname==("/authorization") || (location.pathname==("/registration"))) ?
            <ClearHeader />:
            <Header  />
        }

      <div className="app-wrapper-content">
        <Routes>
            <Route path="/landing/" element={<Landing />} />
            <Route path="/registration"  element={<Registration />}  />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/authorization"  element={<Authorization />}  />
            <Route path="/upl"  element={<TestDow />}  />
            <Route path="/confirm"  element={<Confirm />}  />
            {/*{userStore.user.id && (*/}
            {/*    <Route path="/shopbasket" element={<ShopBasket />} />*/}
            {/*)}*/}
            <Route path="/shopbasket" element={<ShopBasket />} />

            <Route path="/user/:id" element={<ProfileUser  />} />
            <Route path="/add" element={<AddCart />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
