import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactsListContainer from "./Pages/Contacts/List/ContactsListContainer";
import AddEditContactContainer from "./Pages/Contacts/AddEdit/AddEditContactContainer";

import ContactsListContainerAPI from "./Pages/ContactsWithApi/List/ContactsListContainerAPI";
import AddEditContactContainerAPI from "./Pages/ContactsWithApi/AddEdit/AddEditContactContainerAPI";
import { ToastContainer } from "react-toastify";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactsListContainer />} />
        <Route path="/add" element={<AddEditContactContainer />} />
        <Route path="/:id/edit" element={<AddEditContactContainer />} />

        {/* Contact CURD with firebase api's */}
        <Route
          path="/contact-with-api"
          element={<ContactsListContainerAPI />}
        />
        <Route
          path="/contact-with-api/add"
          element={<AddEditContactContainerAPI />}
        />
        <Route
          path="/contact-with-api/:id/edit"
          element={<AddEditContactContainerAPI />}
        />
      </Routes>
      <ToastContainer position="bottom-right" hideProgressBar={true} />
    </BrowserRouter>
  );
};
export default App;
