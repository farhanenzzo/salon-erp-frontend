import React, { useEffect, useState } from "react";
import { listServiceBasedEmployee } from "../service/api";

export const useFetchStylists = (serviceId) => {
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        if (serviceId) {
          const stylistData = await listServiceBasedEmployee(serviceId);
          console.log("stylistData", stylistData);
          setStylists(
            stylistData.map((data) => ({
              id: data._id,
              name: data.employeeName,
            }))
          );
        } else {
          setStylists([]);
        }
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };

    fetchStylists();
  }, [serviceId]);

  return stylists;
};
