import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CFormInput,
} from "@coreui/react";
import { Link } from "react-router-dom";
import { cilArrowCircleLeft } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
const AddEditContact = ({
  handleSubmit,
  onSubmit,
  register,
  formState: { errors },
  loader,
  isEdit,
}) => {
  return (
    <CContainer>
      <CCard className={`mb-3 border-top-primary  border-top-3`}>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <CCardTitle className="mb-0">
            {isEdit ? "Edit" : "Add"} Contact With Api
          </CCardTitle>
          <Link to="/contact-with-api">
            <CButton color="primary">
              <CIcon icon={cilArrowCircleLeft} size="sm" /> Back
            </CButton>
          </Link>
        </CCardHeader>
        <CCardBody style={{ filter: loader ? "blur(1px)" : "blur(0px)" }}>
          <CForm className="row g-3" onSubmit={handleSubmit(onSubmit)}>
            <CCol md={6}>
              <CFormInput
                id="firstName"
                label="First Name"
                disabled={loader}
                feedback={errors.firstName ? errors.firstName.message : ""}
                invalid={errors.firstName ? true : false}
                {...register("firstName", { required: true, maxLength: 80 })}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                id="lastName"
                label="Last Name"
                disabled={loader}
                feedback={errors.lastName ? errors.lastName.message : ""}
                invalid={errors.lastName ? true : false}
                {...register("lastName", { required: true, maxLength: 80 })}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="email"
                id="email"
                label="Email"
                disabled={loader}
                feedback={errors.email ? errors.email.message : ""}
                invalid={errors.email ? true : false}
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="tel"
                id="phoneNumber"
                label="Phone Number"
                disabled={loader}
                feedback={errors.phoneNumber ? errors.phoneNumber.message : ""}
                invalid={errors.phoneNumber ? true : false}
                {...register("phoneNumber", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                id="inputAddress"
                label="Address"
                disabled={loader}
                feedback={errors.address ? errors.address.message : ""}
                invalid={errors.address ? true : false}
                placeholder="1234 Main St"
                {...register("address", { required: true, maxLength: 200 })}
              />
            </CCol>

            <CCol xs={12}>
              <CButton type="submit" disabled={loader}>
                {isEdit ? "Update" : "Save"}
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default AddEditContact;
