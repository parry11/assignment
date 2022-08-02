import React, { useEffect, useState } from "react";
import AddEditContact from "./AddEditContact";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { db } from "../../../config/firestore";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore/lite";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { CONTACTS_COLLECTION } from "../../../config/DbCollections";

// Contact Form Validation
const validation = yup
  .object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
    phoneNumber: yup.string().required("Phone Number is required"),
    address: yup.string().required("Address is required"),
  })
  .required();

const AddEditContactContainer = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(validation),
    defaultValues: {},
  });

  /**
   * Handle contacts form submit event
   * @param {Object} data
   * @returns
   */
  const onSubmit = async (data) => {
    try {
      setLoader(true);
      if (!id) {
        const params = {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const res = await collection(db, CONTACTS_COLLECTION);
        const collectionQuery = await query(
          res,
          where("email", "==", params.email)
        );
        const isDataExist = await getDocs(collectionQuery);
        if (isDataExist.empty) {
          await addDoc(res, params);
          toast.success("Contact added successfully.");
          navigate(`/`);
          setLoader(false);
        } else {
          toast.warning("This email is already exist.");
          setLoader(false);
        }
      } else {
        const params = {
          ...data,
          updatedAt: new Date(),
        };
        const docRef = await doc(db, `${CONTACTS_COLLECTION}/${id}`);
        await updateDoc(docRef, params);
        toast.success("Contact updated successfully.");
        navigate(`/`);
        setLoader(false);
      }
    } catch (error) {
      toast.error("Somthing went wrong, Please try again later!");
      console.error(error);
      setLoader(false);
    }
  };

  /**
   * Get contact detail from db
   * @param {string} contactId
   */
  const getContactDetail = async (contactId) => {
    setLoader(true);
    const docRef = await doc(db, `${CONTACTS_COLLECTION}/${contactId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      reset(docSnap.data());
    }
    setLoader(false);
  };

  useEffect(() => {
    if (id) {
      getContactDetail(id);
    }
  }, [id]);

  return (
    <AddEditContact
      isEdit={!!id}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      formState={formState}
      loader={loader}
    />
  );
};

export default AddEditContactContainer;
