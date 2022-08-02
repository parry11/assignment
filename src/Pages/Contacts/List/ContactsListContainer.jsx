import React, { useState, useEffect } from "react";
import ContactsList from "./ContactsList";

import { db } from "../../../config/firestore";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore/lite";
import { CONTACTS_COLLECTION } from "../../../config/DbCollections";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ContactsListContainer = () => {
  const [loader, setLoader] = useState(false);
  const [contactsList, setContactsList] = useState([]);

  /**
   * Get contacts list from db
   */
  const getContents = async () => {
    setLoader(true);
    try {
      const contactsCol = collection(db, CONTACTS_COLLECTION);
      const contactsColQuery = await query(
        contactsCol,
        orderBy("createdAt", "desc")
      );
      const contactSnapshot = await getDocs(contactsColQuery);
      const contactList = contactSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setContactsList(contactList);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  /**
   * Delete contact from db
   * @param {string} id
   */
  const deleteContact = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this record?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoader(true);
          const docRef = await doc(db, `${CONTACTS_COLLECTION}/${id}`);
          await deleteDoc(docRef);
          getContents();
          toast.success("Contact deleted successfully.");
          setLoader(false);
        } catch (error) {
          toast.error("Somthing went wrong, Please try again later!");
          console.error(error);
          setLoader(false);
        }
      }
    });
  };

  useEffect(() => {
    getContents();
  }, []);

  return (
    <ContactsList
      loader={loader}
      contactList={contactsList}
      deleteContact={deleteContact}
    />
  );
};

export default ContactsListContainer;
