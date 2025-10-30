"use client";
import React, { useEffect, useState } from "react";
import TabsHeader from "../tabsHeader/TabsHeader";
import {
  DELETE_MODAL_TITLE,
  MODAL_TITLES,
  SUPPLIER_KEYMAP,
  TABHEADER,
  TOAST_MESSAGES,
} from "../../constants";
import ListViewComponent from "../appointmentsTab/listViewComponent/ListViewComponent";
import {
  addNewSupplierData,
  suppliersSearchFields,
  suppliersTableHeader,
} from "../../utils/data";
import useFetchData from "../../hooks/useFetchData";
import {
  addSupplier,
  listBrands,
  listSuppliers,
  softDeleteSupplier,
} from "../../service/api";
import useForm from "../../hooks/useForm";
import ModalComponent from "../modalComponent/ModalComponent";
import toast from "react-hot-toast";
import { useSearch } from "../../hooks/useSearch";

const SuppliersTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: brands } = useFetchData(listBrands);
  const [suppliersData, setSuppliersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const { filteredData, setSearchTerm } = useSearch(
    suppliersData,
    suppliersSearchFields
  );

  const initialValues = {
    name: "",
    brands: "",
    mobile: "",
    address: "",
  };

  const keyMap = {
    1: SUPPLIER_KEYMAP.NAME,
    2: SUPPLIER_KEYMAP.BRANDS,
    3: SUPPLIER_KEYMAP.MOBILE,
    4: SUPPLIER_KEYMAP.ADDRESS,
  };

  const fetchSuppliers = async (page = 1) => {
    try {
      setLoading(true);
      const result = await listSuppliers({
        page,
        limit: paginationInfo.limit,
      });

      setSuppliersData(result.data);
      setPaginationInfo(result.pagination);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      toast.error("Error fetching suppliers");
      setSuppliersData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers(1);
  }, []);

  const { formData, handleInputChange, resetForm } = useForm(
    initialValues,
    keyMap
  );

  const addNewSupplier = async () => {
    try {
      setLoading(true);
      const newSupplier = await addSupplier(formData);
      setSuppliersData(newSupplier);
      const updatedSuppliers = await listSuppliers();
      setSuppliersData(updatedSuppliers);
      toast.success(TOAST_MESSAGES.SUPPLIER_ADDED);
    } catch (error) {
      console.error("Error adding new supplier:");
      toast.error(TOAST_MESSAGES.ERROR_ADDING_SUPPLIER);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      resetForm();
    }
  };

  const handleAddNewModal = () => {
    setIsModalOpen(true);
  };

  const handleSelectSupplier = (id) => {
    setSelectedSupplier(id);
    setShowDeleteModal(true);
  };

  const handleDeleteSupplier = async () => {
    if (selectedSupplier) {
      try {
        setLoading(true);
        await softDeleteSupplier(selectedSupplier);
        console.log("supplier ", selectedSupplier);
        const updatedSupplierData = await listSuppliers();
        setSuppliersData(updatedSupplierData);
        toast.success(TOAST_MESSAGES.SUPPLIER_DELETED);
      } catch (error) {
        console.error("Error deleting supplier:", error);
        toast.error(TOAST_MESSAGES.ERROR_DELETING_SUPPLIER);
      } finally {
        setShowDeleteModal(false);
        setLoading(false);
      }
    } else {
      console.log("No supplier selected");
      toast.error(TOAST_MESSAGES.NO_SUPPLIER_FOUND);
    }
  };

  console.log("supppliers", suppliersData);
  return (
    <div className="tabContainer">
      {isModalOpen && (
        <ModalComponent
          title={MODAL_TITLES.ADD_NEW_SUPPLIER}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalData={addNewSupplierData}
          formData={formData}
          handleInputChange={handleInputChange}
          brands={brands.data}
          onSave={addNewSupplier}
        />
      )}
      {showDeleteModal && (
        <ModalComponent
          title={DELETE_MODAL_TITLE.DELETE_SUPPLIER}
          deleteModal={true}
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          handleDeleteData={handleDeleteSupplier}
        />
      )}
      <TabsHeader
        heading={TABHEADER.ALL_SUPPLIERS}
        handleAddNewButton={handleAddNewModal}
        setSearchTerm={setSearchTerm}
      />
      <ListViewComponent
        bodyData={filteredData}
        headerData={suppliersTableHeader}
        idColoring={true}
        onDelete={handleSelectSupplier}
        isLoading={loading}
        fetchData={fetchSuppliers}
        paginationInfo={paginationInfo}
      />
    </div>
  );
};
export default SuppliersTab;
