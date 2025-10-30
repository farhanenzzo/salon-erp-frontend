import { useCallback, useState } from "react";
import { format } from "date-fns";
import { DATE_FORMAT } from "../constants";
import { City, Country } from "country-state-city";
import { uploadImage } from "../service/api";
import toast from "react-hot-toast";

const useForm = (initialFormData, keyMap = {}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [cities, setCities] = useState([]);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedStylist, setSelectedStylist] = useState(null);

  const handleDateChange = useCallback((field, e) => {
    const date = e.target.value;
    const formattedDate = format(new Date(date), DATE_FORMAT); // Assuming you are using `date-fns` or a similar library
    setSelectedDate(formattedDate);
    // Update only the specific field that was changed
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: formattedDate, // Dynamically set the field based on the key passed
    }));
  }, []);

  const fetchCities = (countryCode) => {
    setIsCitiesLoading(true);
    const fetchedCities = City.getCitiesOfCountry(countryCode);
    setCities(fetchedCities || []);
    setIsCitiesLoading(false);
  };

  const handleCountryChange = (countryCode) => {
    const countries = Country.getAllCountries();
    const selected = countries.find((c) => c.isoCode === countryCode);
    setSelectedCountry(selected);
    setSelectedCity(null); // Reset the city
    setCities([]); // Clear existing cities
    fetchCities(countryCode);
    setFormData({ ...formData, country: selected.name });
  };

  const handleCityChange = (cityName) => {
    const city = cities.find((c) => c.name === cityName);
    setSelectedCity(city);
    setFormData({ ...formData, city: cityName });
  };

  const handleTimeChange = useCallback((e) => {
    const selectedTime = e.value;
    if (selectedTime) {
      // const formattedTime = format(selectedTime, TIME_FORMAT);
      setSelectedTime(selectedTime);
      setFormData((prevFormData) => ({
        ...prevFormData,
        time: selectedTime,
      }));
    }
  }, []);

  const handleFileChange = useCallback((e, fieldName) => {
    const file = e.target.files[0];
    console.log("Selected file:", file); // Should log the selected file
    if (file) {
      setFileName(file.name);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: file, // Dynamically set the file field
      }));
    }
  }, []);

  const handleFileUpload = async (event, fieldName) => {
    // Ensure the function receives the key for form data
    if (!fieldName) {
      console.error("Field name is required for file upload.");
      toast.error("Internal error: Missing field name");
      return;
    }

    // PrimeReact's FileUpload passes the event differently
    const file = event.files ? event.files[0] : event;

    if (!file) {
      toast.error("No file selected");
      return;
    }

    try {
      // Log the file to verify its contents
      console.log("File to upload:", file);

      const uploadResponse = await uploadImage(file);

      // Verify the response structure
      if (
        !uploadResponse ||
        !uploadResponse.image ||
        !uploadResponse.image.imageUrl
      ) {
        toast.error("Invalid upload response");
        return;
      }

      // Dynamically update the specific form field
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: uploadResponse.image.imageUrl,
      }));

      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Detailed error uploading image:", error);

      // More detailed error logging
      if (error.response) {
        console.error("Server error response:", error.response.data);
        toast.error(
          `Upload failed: ${error.response.data.message || "Server error"}`
        );
      } else if (error.request) {
        toast.error("No response received from server");
      } else {
        toast.error("Error setting up image upload");
      }
    }
  };

  const handleServiceChange = useCallback((event) => {
    const service = event.target.value;
    setSelectedService(service);
    setFormData((prevFormData) => ({
      ...prevFormData,
      service: service,
    }));
  }, []);

  const handleStylistChange = useCallback((event) => {
    const stylistId = event.target.value;
    setSelectedStylist(stylistId);
    setFormData((prevFormData) => ({
      ...prevFormData,
      stylistId: stylistId,
    }));
  }, []);

  const handleBrandChange = useCallback((event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    setFormData((prevFormData) => ({
      ...prevFormData,
      brand,
    }));
  }, []);

  const handleProductChange = useCallback((event) => {
    const product = event.target.value;
    setSelectedProduct(product);
    setFormData((prevFormData) => ({
      ...prevFormData,
      product,
    }));
  }, []);

  const handleSupplierChange = useCallback((event) => {
    const supplier = event.target.value;
    setSelectedSupplier(supplier);
    setFormData((prevFormData) => ({
      ...prevFormData,
      supplier,
    }));
  }, []);

  const handleDateRangeChange = useCallback((range) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateRange: range,
    }));
  }, []);

  const handleInputChange = useCallback((id, value) => {
    const key = keyMap[id] || id;
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
  }, []);

  const handleClientIdChange = useCallback((value) => {
    setFormData((prevFormData) => ({ ...prevFormData, clientId: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedService("");
    setSelectedStylist("");
    setSelectedBrand("");
    setSelectedProduct("");
    setSelectedSupplier("");
    setFileName("");
    setSelectedCountry(null);
    setSelectedCity(null);
    setCities([]);
  }, [initialFormData]);

  return {
    formData,
    setFormData,
    selectedDate,
    selectedTime,
    selectedService,
    selectedCountry,
    selectedCity,
    selectedBrand,
    selectedProduct,
    selectedSupplier,
    fileName,
    selectedStylist,
    setSelectedStylist,
    handleStylistChange,
    handleDateChange,
    setSelectedCity,
    setSelectedCountry,
    handleFileChange,
    handleTimeChange,
    handleServiceChange,
    handleCountryChange,
    fetchCities,
    handleCityChange,
    handleBrandChange,
    handleSupplierChange,
    handleFileUpload,
    handleProductChange,
    handleInputChange,
    handleDateRangeChange,
    setSelectedService,
    handleClientIdChange,
    resetForm,
  };
};

export default useForm;
