import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import HomePage from "./pages/homePage/HomePage";

import "./_app.scss";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WatchPage from "./pages/watchPage/WatchPage";
import SearchPage from "./pages/SearchPage";
import subscriptionPage from "./pages/subscriptionPage/SubscriptionPage";
import ChannelPage from "./pages/channelPage/channelPage";
import { login } from "./store/actions/authAction";

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  return (
    <>
      <Navbar handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main ">
          {children}
        </Container>
      </div>
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const { oauth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (!oauth) {
      navigate("/login");
      dispatch(login());
    }
  }, [oauth]);
  return <>{children}</>;
};
function App() {
  const error = useSelector((state) => state.video.error);
  const quoata_error =
    error?.response?.data?.error?.errors[0].reason === "quotaExceeded";

  return quoata_error === true ? (
    <Layout>
      <HomePage error={true} />
    </Layout>
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      ></Route>
      <Route
        path="/watch/:id"
        element={
          <Layout>
            <WatchPage />
          </Layout>
        }
      ></Route>
      <Route
        path="/search/:query"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/subscriptions"
        element={
          <Layout>
            <ProtectedRoute>
              <SearchPage channel />
            </ProtectedRoute>
          </Layout>
        }
      />

      <Route
        path="/channel/:channelId"
        element={
          <Layout>
            <ChannelPage />
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
