import { useState, useEffect } from "react";
import { getServices } from "../service/api";

export const useFetchServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const serviceData = await getServices();

        console.log("services data ", serviceData);

        // Filter out inactive services
        const activeServices = serviceData.data.filter(
          (data) => data.serviceStatus === "Active"
        );

        setServices(
          activeServices.map((data) => ({
            id: data._id,
            name: data.serviceName,
          }))
        );
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);
  console.log("services in hook ", services);
  return services;
};
