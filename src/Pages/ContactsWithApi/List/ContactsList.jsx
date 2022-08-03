import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CContainer,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { cilPlus, cilTrash, cilPencil } from "@coreui/icons";
import React from "react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";

const ContactsList = ({ contactList, loader, deleteContact }) => {
  return (
    <CContainer>
      <CCard className={`mb-3 border-top-primary  border-top-3`}>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <CCardTitle className="mb-0">Contacts List With API</CCardTitle>
          <Link to="/contact-with-api/add">
            <CButton color="primary">
              <CIcon icon={cilPlus} size="sm" /> Add Contact
            </CButton>
          </Link>
        </CCardHeader>
        <CCardBody style={{ filter: loader ? "blur(1px)" : "blur(0px)" }}>
          <CCardText>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-center">
                    Action
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {contactList && contactList.length > 0
                  ? contactList.map((item) => (
                      <CTableRow color="light" key={item.id}>
                        <CTableHeaderCell scope="row">
                          {item.firstName}
                        </CTableHeaderCell>
                        <CTableDataCell>{item.lastName}</CTableDataCell>
                        <CTableDataCell>{item.address}</CTableDataCell>
                        <CTableDataCell>{item.email}</CTableDataCell>
                        <CTableDataCell>{item.phoneNumber}</CTableDataCell>
                        <CTableDataCell className="text-center">
                          <Link to={`/contact-with-api/${item.id}/edit`}>
                            <CButton className="me-2" color="primary">
                              <CIcon icon={cilPencil} size="sm" />
                            </CButton>
                          </Link>
                          <CButton
                            color="danger"
                            onClick={() => deleteContact(item.id)}
                          >
                            <CIcon icon={cilTrash} size="sm" />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  : ""}
                {!loader && contactList && contactList.length === 0 ? (
                  <CTableRow color="light">
                    <CTableHeaderCell
                      scope="row"
                      colSpan={6}
                      className="text-center"
                    >
                      No data found
                    </CTableHeaderCell>
                  </CTableRow>
                ) : (
                  ""
                )}
              </CTableBody>
            </CTable>
          </CCardText>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default ContactsList;
