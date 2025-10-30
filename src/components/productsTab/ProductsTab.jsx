"use client";
import React, { useEffect, useState } from "react";
import TabsHeader from "../tabsHeader/TabsHeader";
import ListViewComponent from "../appointmentsTab/listViewComponent/ListViewComponent";
import {
  addNewStockModalData,
  stockSearchFields,
  stocksTableHeaderData,
} from "../../utils/data";
import ModalComponent from "../modalComponent/ModalComponent";
import {
  addStock,
  deleteStockById,
  getCategories,
  listCategoryDropdown,
  listStocks,
  updateProduct,
} from "../../service/api";
import useForm from "../../hooks/useForm";
import toast from "react-hot-toast";
import GridView from "../gridView/GridView";
import {
  DELETE_MODAL_TITLE,
  MODAL_TITLES,
  ROUTES,
  TAB_VIEW,
  TABHEADER,
  TOAST_MESSAGES,
} from "../../constants";
import { useSearch } from "../../hooks/useSearch";
import useModulePermissions from "../../hooks/useModulePermissions";
import { useRouter } from "next/navigation";
import { validateProductInput } from "../../validators/products";

const ProductsTab = () => {
  const [tabView, setTabView] = useState("List");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const [deleteModalPopup, setDeleteModalPopup] = useState(false);
  const [selectedStockId, setSelectedStockId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProductIMG, setSelectedProductIMG] = useState("");
  const [isAddProductLoading, setIsAddProductLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const { filteredData, setSearchTerm } = useSearch(stocks, stockSearchFields);

  const { canEdit } = useModulePermissions();

  const router = useRouter();

  const initialFormData = {
    stockName: "",
    stockCategory: "",
    price: "",
    stockQuantity: "",
    stockMFGDate: "",
    stockEXPDate: "",
    stockImage: "",
    stockDescription: "",
    reorderQuantity: "",
  };

  const keyMap = {
    1: "stockName",
    2: "stockCategory",
    3: "price",
    4: "stockQuantity",
    5: "stockEXPDate",
    6: "stockMFGDate",
    7: "stockImage",
    8: "stockDescription",
    9: "reorderQuantity",
  };

  const {
    formData,
    setFormData,
    handleDateChange,
    fileName,
    handleFileChange,
    handleInputChange,
    resetForm,
  } = useForm(initialFormData, keyMap);

  const handleTabView = (view) => {
    setTabView(view);
  };

  const handleModalPopup = () => {
    listCategory();
    setIsModalOpen(true);
  };

  const listCategory = async () => {
    try {
      const response = await listCategoryDropdown();
      if (response.status === "success") {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.log("Error fetching categories", error);
      toast.error("Error fetching categories");
    }
  };

  const fetchStocks = async (page = 1) => {
    try {
      setIsLoading(true);
      const result = await listStocks({
        page,
        limit: paginationInfo.limit,
      });
      setStocks(result.data);
      setPaginationInfo(result.pagination);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      toast.error("Error fetching suppliers");
      setStocks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks(1);
  }, []);

  const addNewProduct = async () => {
    setIsAddProductLoading(true);

    if (formData) {
      try {
        const { error } = validateProductInput(formData);

        if (error) {
          // Get the first error message and display it
          const firstErrorMessage = error.details[0].message;
          toast.error(firstErrorMessage);
          setIsAddProductLoading(false);
          return;
        }

        const formDataToSubmit = new FormData();

        for (const key in formData) {
          formDataToSubmit.append(key, formData[key]);
        }
        await addStock(formDataToSubmit);
        await fetchStocks();
        setIsModalOpen(false);
        resetForm();
        setIsAddProductLoading(false);

        toast.success(TOAST_MESSAGES.PRODUCT_ADDED_SUCCESSFULLY);
      } catch (error) {
        toast.error(TOAST_MESSAGES.ERROR_ADDING_PRODUCT);
        console.log("Error adding product:", error);
      } finally {
        setIsAddProductLoading(false);
      }
    }
  };

  const handleDeleteModalPopup = (id) => {
    setDeleteModalPopup(true);
    setSelectedStockId(id);
  };

  const handleStockDelete = async () => {
    try {
      await deleteStockById(selectedStockId);
      await fetchStocks();
      setDeleteModalPopup(false);
      toast.success(TOAST_MESSAGES.STOCK_DELETED_SUCCESSFULLY);
    } catch (error) {
      toast.error(TOAST_MESSAGES.ERROR_DELETING_STOCK);
      console.log("Error deleting stock:", error);
    }
  };

  const handleModalClose = () => {
    resetForm();
    setIsModalOpen(false);
    setSelectedProductIMG("");
    setIsEditMode(false);
  };

  const handleEditMode = async (productId) => {
    const updateProduct = stocks.find((stock) => stock._id === productId);
    await listCategory();
    const categoryId = updateProduct.stockCategory.id;

    setSelectedProductIMG(updateProduct.stockImage);

    console.log("updated service", updateProduct);
    if (updateProduct) {
      // Map all necessary fields from the employee object to formData
      setFormData({
        stockName: updateProduct.stockName || "",
        stockCategory: categoryId, // Just passing the ID instead of the whole object
        price: updateProduct.price || "",
        stockQuantity: updateProduct.stockQuantity || "",
        stockMFGDate: updateProduct.stockMFGDate || "",
        stockEXPDate: updateProduct.stockEXPDate || "",
        reorderQuantity: updateProduct.reorderQuantity || "",
        stockImage: updateProduct.stockImage || "",
        stockDescription: updateProduct.stockDescription || "",
      });
    }

    setSelectedStockId(updateProduct._id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const udpateProductData = async () => {
    setIsAddProductLoading(true);

    const { error } = validateProductInput(formData);

    if (error) {
      // Get the first error message and display it
      const firstErrorMessage = error.details[0].message;
      toast.error(firstErrorMessage);
      setIsAddProductLoading(false);
      return;
    }

    const formDataToSubmit = new FormData();

    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      const product = await updateProduct(selectedStockId, formDataToSubmit);
      if (product) {
        await fetchStocks();
        setIsModalOpen(false);
        toast.success(TOAST_MESSAGES.PRODUCT_UPDATED_SUCCESSFULLY);
        setIsEditMode(false);
        resetForm();
        setIsAddProductLoading(false);
      }
    } catch (error) {
      console.log("Error updating products", error);
      toast.error(TOAST_MESSAGES.ERROR_UPDATING_PRODUCTS);
    } finally {
      setIsAddProductLoading(false);
    }
  };

  const handleOnSave = () => {
    if (isEditMode) {
      udpateProductData();
    } else {
      addNewProduct();
    }
  };

  const handleRowClick = (product) => {
    router.push(`/${ROUTES.PRODUCTS}/${product._id}`);
  };

  return (
    <div className="tabs_container">
      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title={
            isEditMode
              ? MODAL_TITLES.EDIT_PRODUCT
              : MODAL_TITLES.ADD_NEW_PRODUCT
          }
          formData={formData}
          onSave={handleOnSave}
          modalData={addNewStockModalData}
          categories={categoryData}
          handleDateChange={handleDateChange}
          handleInputChange={handleInputChange}
          currentImageUrl={isEditMode ? selectedProductIMG : ""}
          fileName={fileName}
          handleFileUpload={(e) => handleFileChange(e, "stockImage")}
          suppliers={suppliers}
          canEdit={canEdit}
          isLoading={isAddProductLoading}
        />
      )}
      {deleteModalPopup && (
        <ModalComponent
          isOpen={deleteModalPopup}
          onClose={() => setDeleteModalPopup(false)}
          deleteModal={true}
          title={DELETE_MODAL_TITLE.DELETE_PRODUCT}
          handleDeleteData={handleStockDelete}
          canEdit={canEdit}
        />
      )}
      <div className="table">
        <TabsHeader
          heading={TABHEADER.ALL_PRODUCTS}
          tabView={tabView}
          setTabView={handleTabView}
          handleAddNewButton={handleModalPopup}
          stockTab={true}
          setSearchTerm={setSearchTerm}
          canEdit={canEdit}
        />
        {tabView === TAB_VIEW.LIST_VIEW ? (
          <ListViewComponent
            headerData={stocksTableHeaderData}
            bodyData={filteredData}
            idColoring={true}
            isLoading={isLoading}
            onDelete={handleDeleteModalPopup}
            fetchData={fetchStocks}
            paginationInfo={paginationInfo}
            isRowClickable={true}
            onRowSelect={handleRowClick}
            onEdit={handleEditMode}
            canEdit={canEdit}
          />
        ) : (
          <GridView
            gridData={filteredData}
            gridLayout="fullImage"
            onDelete={handleDeleteModalPopup}
            isLoading={isLoading}
            canEdit={canEdit}
            onEdit={handleEditMode}
            onGridSelection={handleRowClick}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsTab;
