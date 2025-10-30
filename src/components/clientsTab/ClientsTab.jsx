"use client";
import React, { useEffect, useState } from "react";
import {
  addNewClient,
  deleteClientById,
  listAllClients,
  listEmployees,
  updateClient,
} from "../../service/api";
import {
  addNewClientModalData,
  clientsSearchFields,
  clientsTableHeaderData,
  customerRequiredFields,
} from "../../utils/data";
import TabsHeader from "../tabsHeader/TabsHeader";
import toast from "react-hot-toast";
import useForm from "../../hooks/useForm";
import {
  DELETE_MODAL_TITLE,
  MODAL_TITLES,
  TABHEADER,
  TOAST_MESSAGES,
} from "../../constants";
import { useRouter } from "next/navigation";
import { useSearch } from "../../hooks/useSearch";
import useModulePermissions from "../../hooks/useModulePermissions";
import dynamic from "next/dynamic";
import Loading from "../../app/loading";
import { validateInput } from "../../validators/validateInputs";
import { validateAddCustomerInput } from "../../validators/customer";

const ListViewComponent = dynamic(
  () => import("../appointmentsTab/listViewComponent/ListViewComponent"),
  { ssr: false, loading: () => <Loading /> }
);

const ModalComponent = dynamic(
  () => import("../modalComponent/ModalComponent"),
  { ssr: false }
);

const GridView = dynamic(() => import("../gridView/GridView"), { ssr: false });

const ClientsTab = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [stylists, setStylists] = useState([]);
  const [tabView, setTabView] = useState("List");
  const [clientDeleteModal, setClientDeleteModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [showDetailTab, setShowDetailTab] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [addCustomerLoading, setAddCustomerLoading] = useState(false);
  const [clientCurrentImage, setClientCurrentImage] = useState("");
  const [isClientEditLoading, setIsClientEditLoading] = useState(false);

  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const router = useRouter();

  const { canEdit } = useModulePermissions();

  console.log("canEdit in client", canEdit);

  const { filteredData, setSearchTerm } = useSearch(
    clients,
    clientsSearchFields
  );

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    photo: "",
    notes: "",
    address: "",
  };

  const keyMap = {
    1: "firstName",
    2: "lastName",
    3: "email",
    4: "phone",
    5: "dob",
    6: "gender",
    7: "photo",
    8: "notes",
    9: "address",
  };

  const {
    formData,
    setFormData,
    selectedDate,
    handleDateChange,
    handleInputChange,
    resetForm,
    handleFileChange,
    fileName,
    // handleFileUpload,
  } = useForm(initialFormData, keyMap);

  const fetchClients = async (page = 1) => {
    try {
      setLoading(true);
      const result = await listAllClients({
        page,
        limit: paginationInfo.limit,
      });

      if (result.success) {
        setClients(result.data);
        setPaginationInfo(result.pagination);
      } else {
        setClients([]);
      }
    } catch (error) {
      console.log("Can't fetch client data");
      toast.error("Error fetching client data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients(1);
  }, []);

  useEffect(() => {
    const getStylists = async () => {
      try {
        const response = await listEmployees();
        setStylists(response?.data);
      } catch (error) {
        console.log("Error fetching stylists");
      }
    };
    getStylists();
  }, []);

  const handleAddNewCustomer = async () => {
    setAddCustomerLoading(true);
    if (formData) {
      const { error } = validateAddCustomerInput(formData);

      if (error) {
        // Get the first error message and display it
        const firstErrorMessage = error.details[0].message;
        toast.error(firstErrorMessage); // Show only the first error
        setAddCustomerLoading(false);
        return;
      }

      try {
        const formDataToSubmit = new FormData();
        for (const key in formData) {
          formDataToSubmit.append(key, formData[key]);
        }

        // Add new client
        await addNewClient(formDataToSubmit);
        // Re-fetch the clients to ensure data is up-to-date
        const updatedClients = await listAllClients({
          page: paginationInfo.page,
          limit: paginationInfo.limit,
        });

        setClients(updatedClients.data);
        setAddCustomerLoading(false);
        toast.success(TOAST_MESSAGES.CLIENT_ADDED_SUCCESSFULLY);
      } catch (error) {
        toast.error(TOAST_MESSAGES.ERROR_ADDING_CLIENT);
      } finally {
        setAddCustomerLoading(false);
        setModalOpen(false);
        resetForm();
      }
    } else {
      toast.error(TOAST_MESSAGES.FILL_ALL_FIELDS);
    }
  };

  const handleEditClient = async (clientId) => {
    const client = clients.find((client) => client._id === clientId);
    if (client) {
      setFormData({
        firstName: client.name.split(" ")[0] || "",
        lastName: client.name.split(" ")[1] || "",
        email: client.email || "",
        phone: client.phone || "",
        dob: client.dob || "",
        gender: client.gender || "",
        photo: client.photo || "",
        notes: client.notes || "",
        address: client.address || "",
      });
    }
    setClientCurrentImage(client.photo);
    setSelectedClientId(client._id);
    setModalOpen(true);
    setEditMode(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditMode(false);
    resetForm();
  };

  console.log("formdata", formData);
  const handleModal = () => {
    setModalOpen(true);
  };

  const handleDeleteModal = async (id) => {
    setClientToDelete(id);
    setClientDeleteModal(true);
  };

  const handleDeleteClient = async () => {
    if (clientToDelete) {
      try {
        await deleteClientById(clientToDelete);
        // setClients((prevClients) => {
        //   prevClients.filter((client) => client._id !== clientToDelete);
        // });
        const updatedClients = await listAllClients({
          page: paginationInfo.page,
          limit: paginationInfo.limit,
        });
        setClients(updatedClients.data);
        setClientDeleteModal(false);
        setClientToDelete(null);

        toast.success("Client deleted successfully");
      } catch (error) {
        console.log("Error deleting client");
        toast.error("Error deleting client");
      }
    }
  };

  const handleRowSelect = (client) => {
    setSelectedClientId(client._id);
    router.push(`/customers/${client._id}`);
  };

  const handleClientDataEdit = async (selectedClientId, updateData) => {
    setIsClientEditLoading(true);
    const { error } = validateInput(formData, customerRequiredFields);

    if (error) {
      toast.error(error);
      setIsClientEditLoading(false);
      return;
    }

    const formDataToSubmit = new FormData();
    for (const key in updateData) {
      formDataToSubmit.append(key, updateData[key]);
    }

    // Now, update the client using the updated form data
    try {
      const updatedClient = await updateClient(
        selectedClientId,
        formDataToSubmit
      );

      console.log("updatedClient", updatedClient);

      if (updatedClient) {
        await fetchClients();

        setModalOpen(false);
        setEditMode(false);
        setIsClientEditLoading(false);
        resetForm();
        toast.success("Client updated successfully");
      }
    } catch (error) {
      console.error("Error updating client", error.message);
      toast.error("Error updating detailsclient ");
    } finally {
      setIsClientEditLoading(false);
    }
  };

  return (
    <div>
      {modalOpen && (
        <ModalComponent
          isOpen={modalOpen}
          title={
            editMode
              ? MODAL_TITLES.EDIT_CUSTOMER_DETAILS
              : MODAL_TITLES.ADD_NEW_CUSTOMER
          }
          onClose={handleModalClose}
          modalData={addNewClientModalData}
          onSave={() =>
            editMode
              ? handleClientDataEdit(selectedClientId, formData)
              : handleAddNewCustomer()
          }
          formData={formData}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
          currentImageUrl={clientCurrentImage}
          fileName={fileName}
          handleFileUpload={(event) => handleFileChange(event, "photo")}
          canEdit={canEdit}
          isLoading={editMode ? isClientEditLoading : addCustomerLoading}
        />
      )}
      {clientDeleteModal && (
        <ModalComponent
          isOpen={clientDeleteModal}
          onClose={() => setClientDeleteModal(false)}
          deleteModal={true}
          title={DELETE_MODAL_TITLE.CONFIRM_DELETE}
          handleDeleteData={handleDeleteClient}
          canEdit={canEdit}
        />
      )}

      <div className="table">
        <TabsHeader
          heading={TABHEADER.ALL_CUSTOMERS}
          listAndCalenderView={false}
          handleAddNewButton={handleModal}
          tabView={tabView}
          setTabView={setTabView}
          setSearchTerm={setSearchTerm}
          canEdit={canEdit}
        />
        {tabView === "List" ? (
          <ListViewComponent
            bodyData={filteredData}
            isLoading={loading}
            headerData={clientsTableHeaderData}
            idColoring={true}
            onDelete={handleDeleteModal}
            onRowSelect={handleRowSelect}
            isRowClickable={true}
            onEdit={handleEditClient}
            handleEdit={handleClientDataEdit}
            fetchData={fetchClients}
            paginationInfo={paginationInfo}
            canEdit={canEdit}
          />
        ) : (
          <GridView
            gridData={filteredData}
            isLoading={loading}
            clientDetail={true}
            onDelete={handleDeleteModal}
            onEdit={handleEditClient}
            onGridSelection={handleRowSelect}
          />
        )}
      </div>
    </div>
  );
};

export default ClientsTab;
