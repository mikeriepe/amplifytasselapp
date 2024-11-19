/* src/App.js */
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import Landing from "./pages/Landing";
import NavBarLoggedOut from "./components/NavBarLoggedOut";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Approvals from "./pages/Approvals";
import UpdateProfile from "./pages/UpdateProfile";
import NavBarLoggedIn from "./components/NavBarLoggedIn";
import Settings from "./pages/Settings";
import Socials from "./pages/Social";
import ViewMessages from "./pages/ViewMessages";
import "./stylesheets/App.css";
import "react-toastify/dist/ReactToastify.css";
import ViewOpportunity from "./pages/ViewOpportunity";
import Opportunities from "./pages/Opportunities";
import MyProfile from "./pages/MyProfile";
import ViewProfile from "./pages/ViewProfile";
import AnimationStarFlying from "./components/AnimationStarFlying";
import AnimationConfetti from "./components/AnimationConfetti";
import Progress from "./components/Progress";
import { Auth } from "aws-amplify";
import { TabIndexProvider } from "./context/TabIndexContext";
import { RecommendationsProvider } from "./context/RecommendationsContext";

import useAuth from "./util/AuthContext";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
import useAnimation from "./util/AnimationContext";

import { Navigate, Outlet } from "react-router-dom";

Amplify.configure(awsExports);

/**
 * Admin Routes - Only accessible by Admin accounts.
 *  1) If user auth is loading, return a loading icon.
 *  2) If the user is not logged in, redirect to the login page.
 *  3) If the user is an admin, permit them to access the route.
 *  4) Otherwise, redirect to the profile page.
 */
const AdminLayout = (props) => {
  const { loadingAuth, user, userProfile } = props;
  if (loadingAuth) return <Progress />;
  if (!user) return <Navigate to="/login" replace />;
  if (userProfile?.status === "ADMIN") return <Outlet />;
  return <Navigate to="/dashboard" replace />;
};

/**
 * Approved Layout Routes - Only accessible by Approved accounts.
 * 1) If user auth is loading, return a loading icon.
 * 2) If the user is not logged in, redirect to the login page.
 * 3) If the user is authorized, permit them to access the route.
 * 4) Otherwise, redirect to the profile page.
 */
const ApprovedLayout = (props) => {
  const { loadingAuth, user, userProfile } = props;
  if (loadingAuth) return <Progress />;
  if (!user) return <Navigate to="/login" replace />;
  if (userProfile?.status === "ADMIN" || userProfile?.status === "APPROVED")
    return <Outlet />;
  return <Navigate to="/dashboard" replace />;
};

/**
 * Logged-In Routes - Accessible by logged-in users.
 * 1) If the user auth is loading, return a loading icon.
 * 2) If the user is not logged in, redirect to the login page.
 * 3) Otherwise, permit them to access the route.
 */
const LoggedInLayout = (props) => {
  const { loadingAuth, user } = props;
  if (loadingAuth) return <Progress />;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

/**
 * Logged-Out Routes - Accessible by users who are not logged in.
 * 1) If the user is logged in, redirect to the profile page.
 * 2) Otherwise, permit them to access the route.
 */
const LoggedOutLayout = (props) => {
  const { user } = props;
  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};

const App = () => {
  const { loadingAuth, user, userProfile } = useAuth();
  const {
    showStarAnimation,
    showConfettiAnimation,
    setShowConfettiAnimation,
    setShowStarAnimation,
  } = useAnimation();

  const signOut = async () => {
    try {
      await Auth.signOut();
      // Optionally, you can redirect the user to a logout page or the homepage.
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Get the 'keepLoggedIn' state from localStorage
      const keepLoggedIn = localStorage.getItem("keepLoggedIn") === "true";

      if (!keepLoggedIn) {
        // If 'keepLoggedIn' is not true, prompt the user and sign out
        event.returnValue = "You are about to log out. Are you sure?";
        signOut();
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <TabIndexProvider>
        <RecommendationsProvider>
          <ToastContainer />
          {!loadingAuth && user ? <NavBarLoggedIn /> : <NavBarLoggedOut />}
          <Box component="main" sx={{ flexGrow: 1, marginTop: "70px" }}>
            <Routes>
              {/* Routes only accessible if you are logged out */}
              <Route element={<LoggedOutLayout user={user} />}>
                <Route path="/" element={<Landing />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              {/* Routes only accessible if you are logged in */}
              <Route
                element={
                  <LoggedInLayout loadingAuth={loadingAuth} user={user} />
                }
              >
                <Route path="/myprofile" element={<MyProfile />} />
                <Route path="/updateprofile" element={<UpdateProfile />} />
                <Route path="/social" element={<Socials />} />
                <Route path="/social/:chatroomid" element={<ViewMessages />} />
              </Route>
              {/* Routes only accessible if you are approved or an admin */}
              <Route
                element={
                  <ApprovedLayout
                    loadingAuth={loadingAuth}
                    user={user}
                    userProfile={userProfile}
                  />
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/opportunities" element={<Opportunities />} />
                <Route
                  path="/opportunity/:opportunityid"
                  element={<ViewOpportunity />}
                />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile/:profileid" element={<ViewProfile />} />
              </Route>
              {/* Routes only accessible if you are an admin */}
              <Route
                element={
                  <AdminLayout
                    loadingAuth={loadingAuth}
                    user={user}
                    userProfile={userProfile}
                  />
                }
              >
                <Route path="/approvals" element={<Approvals />} />
              </Route>
            </Routes>
          </Box>
          {showStarAnimation && (
            <AnimationStarFlying setVisible={setShowStarAnimation} />
          )}
          {showConfettiAnimation && (
            <AnimationConfetti setVisible={setShowConfettiAnimation} />
          )}
        </RecommendationsProvider>
      </TabIndexProvider>
    </Box>
  );
};

export default App;
