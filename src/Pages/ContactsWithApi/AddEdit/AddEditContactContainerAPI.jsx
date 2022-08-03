import React, { useEffect, useState } from "react";
import AddEditContact from "./AddEditContact";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { db } from "../../../config/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { CONTACTS_COLLECTION } from "../../../config/DbCollections";
import {
  createContactQuery,
  getContactDetailQuery,
  updateContactQuery,
} from "../../../Services/Contacts";
import { checkResponse } from "../../../config/Common";

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

const AddEditContactContainerAPI = () => {
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
        const res = await createContactQuery(data);
        const response = await checkResponse(res);
        if (response.success) {
          toast.success("Contact added successfully.");
          navigate(`/contact-with-api`);
        }
        setLoader(false);
      } else {
        const res = await updateContactQuery(id, data);
        const response = await checkResponse(res);
        if (response.success) {
          toast.success("Contact updated successfully.");
          navigate(`/contact-with-api`);
        }
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
    const res = await getContactDetailQuery(contactId);
    const response = await checkResponse(res);
    if (response.success) {
      reset(response.data);
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

export default AddEditContactContainerAPI;
