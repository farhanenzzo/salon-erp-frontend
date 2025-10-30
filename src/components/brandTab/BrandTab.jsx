"use client";
import React, { useEffect, useState } from "react";
import TabsHeader from "../tabsHeader/TabsHeader";
import { BRAND_KEYMAP, MODAL_TITLES, TABHEADER } from "../../constants";
import ListViewComponent from "../appointmentsTab/listViewComponent/ListViewComponent";
import {
  addBrandModalData,
  brandSearchFields,
  brandTableHeader,
} from "../../utils/data";
import {
  addNewBrand,
  listBrands,
  listSuppliers,
  softDeleteBrand,
} from "../../service/api";
import useForm from "../../hooks/useForm";
import toast from "react-hot-toast";
import ModalComponent from "../modalComponent/ModalComponent";
import useFetchData from "../../hooks/useFetchData";
import { useSearch } from "../../hooks/useSearch";

const BrandTab = () => {
  const [brandList, setBrandList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showBrandDeleteModal, setShowBrandDeleteModal] = useState(false);
  const { data: suppliers } = useFetchData(listSuppliers);

  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const { filteredData, setSearchTerm } = useSearch(
    brandList,
    brandSearchFields
  );

  const initialValues = {
    name: "",
    suppliers: "",
    description: "",
  };

  const keyMap = {
    1: BRAND_KEYMAP.NAME,
    2: BRAND_KEYMAP.SUPPLIERS,
    3: BRAND_KEYMAP.DESCRIPTION,
  };

  const { formData, handleInputChange, resetForm } = useForm(
    initialValues,
    keyMap
  );

  // useEffect(() => {
  //   const fetchBrands = async () => {
  //     try {
  //       const brandData = await listBrands();
  //       setBrandList(brandData);
  //     } catch (error) {
  //       console.log("Error fetching brands");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchBrands();
  // }, []);

  const fetchBrands = async (page = 1) => {
    try {
      setLoading(true);
      const result = await listBrands({
        page,
        limit: paginationInfo.limit,
      });

      setBrandList(result.data);
      setPaginationInfo(result.pagination);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      toast.error("Error fetching suppliers");
      setBrandList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands(1);
  }, []);

  const addBrand = async () => {
    try {
      const brand = await addNewBrand(formData);
      setBrandList([...brandList, brand]);
      setLoading(true);
      const updatedBrand = await listBrands();
      setBrandList(updatedBrand);
      setIsModalOpen(false);
      toast.success("Brand added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error while adding brand");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const deleteBrand = async () => {
    if (selectedBrand) {
      try {
        await softDeleteBrand(selectedBrand);
        const updatedBrand = await listBrands();
        setBrandList(updatedBrand);
        toast.success("Brand deleted successfully");
      } catch (error) {
        console.log(error);
        toast.error("Error while deleting brand");
      } finally {
        setShowBrandDeleteModal(false);
        setSelectedBrand(null);
      }
    }
  };

  const handleBrandDelete = (id) => {
    setSelectedBrand(id);
    setShowBrandDeleteModal(true);
  };

  return (
    <div className="tabContainer">
      {isModalOpen && (
        <ModalComponent
          title={MODAL_TITLES.ADD_BRAND}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          modalData={addBrandModalData}
          formData={formData}
          onSave={addBrand}
          handleInputChange={handleInputChange}
          suppliers={suppliers.data}
        />
      )}
      {showBrandDeleteModal && (
        <ModalComponent
          isOpen={showBrandDeleteModal}
          onClose={() => setShowBrandDeleteModal(false)}
          deleteModal={true}
          title="Delete brand"
          handleDeleteData={deleteBrand}
        />
      )}
      <TabsHeader
        heading={TABHEADER.ALL_BRANDS}
        handleAddNewButton={() => setIsModalOpen(true)}
        setSearchTerm={setSearchTerm}
      />
      <ListViewComponent
        headerData={brandTableHeader}
        bodyData={filteredData}
        idColoring={true}
        isLoading={loading}
        onDelete={handleBrandDelete}
        fetchData={fetchBrands}
        paginationInfo={paginationInfo}
      />
    </div>
  );
};

export default BrandTab;
