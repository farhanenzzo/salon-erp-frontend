"use client";
import React, { useEffect, useState } from "react";
import styles from "./DashboardTab.module.css";
import { dashboardDetailsSection, selectOptions } from "../../utils/data";
import Image from "next/image";
import PieChart from "../dashboardPieChart/PieChart";
import SelectOptions from "../selectOptions/SelectOptions";
import {
  fetchAppointmentCount,
  fetchAppointmentCountByGender,
  getClientCount,
  getServicesCount,
  fetchRevenueStats,
  getProductCount,
  getAppointmentStats,
} from "../../service/api";
import Calender from "../calender/Calender";
import BarChart from "../barchart/BarChart";
import Employees from "../employees/Employees";
import UpcomingAppointments from "../upcomingAppointmentsComponent/UpcomingAppointments";
import DoughnutChart from "../doughnutChart/DoughnutChart";
import { Skeleton } from "primereact/skeleton";
import {
  APPOINTMENT_STATUS,
  DASHBOARD_COUNT_TITLES,
  DASHBOARD_HEADING,
  EMPLOYEES,
  GENDER,
  REVENUE,
} from "../../constants";
import useFetchData from "../../hooks/useFetchData";
import { formatPrice } from "../../helpers/formatPrice";
import { Tooltip } from "primereact/tooltip";

const DashboardTab = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [barCharttimeFrame, setBarChartTimeFrame] = useState("monthly");
  const [pieCharttimeFrame, setPieChartTimeFrame] = useState("month");
  const [revenueData, setRevenueData] = useState([]);
  const [isRevenueLoading, setIsRevenueLoading] = useState(true);

  const [servicesCount, setServicesCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [
    isAppointmentCountByGenderLoading,
    setIsAppointmentCountByGenderLoading,
  ] = useState(true);
  const [isClientCountLoading, setIsClientCountLoading] = useState(true);
  const [isServiceCountLoading, setIsServiceCountLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stockCount, setStockCount] = useState(0);
  const [isStockCountLoading, setIsStockCountLoading] = useState(true);
  const [appointmentStats, setAppointmentStats] = useState(null);
  const [isAppointmentStatsLoading, setIsAppointmentStatsLoading] =
    useState(true);

  const handleBarChartTimelineChange = (event) => {
    setBarChartTimeFrame(event.target.value);
  };

  const handlePieChartTimelineChange = (event) => {
    setPieChartTimeFrame(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchClientCount = async () => {
      try {
        const clientCount = await getClientCount();
        setClientCount(clientCount);
      } catch (error) {
        console.log("Error fetching client count:");
      } finally {
        setIsClientCountLoading(false);
      }
    };
    fetchClientCount();
  }, []);

  useEffect(() => {
    const fetchFilteredAppointments = async () => {
      try {
        const genderData =
          await fetchAppointmentCountByGender(pieCharttimeFrame);

        console.log("gender data ", genderData);
        const labels = genderData.map((item) => item._id);
        const data = genderData.map((item) => item.count);
        setChartData({ labels, data });
        console.log("chart data", chartData);
      } catch (error) {
        console.log("Error fetching appointments by gender", error);
      } finally {
        setIsAppointmentCountByGenderLoading(false);
      }
    };
    fetchFilteredAppointments();
  }, [pieCharttimeFrame]);

  const { data: appointmentsCount, loading } = useFetchData(
    fetchAppointmentCount
  );

  useEffect(() => {
    const fetchServicesCount = async () => {
      try {
        const response = await getServicesCount();
        setServicesCount(response);
      } catch (error) {
        console.log("Error fetching services count", error);
      } finally {
        setIsServiceCountLoading(false);
      }
    };
    fetchServicesCount();
  }, []);

  useEffect(() => {
    const returnStockCount = async () => {
      setIsStockCountLoading(true);
      try {
        const response = await getProductCount();
        console.log("response from stock count", response);
        if (response.success) {
          setStockCount(response.data);
        }
      } catch (error) {
        console.log("Error fetching return stock count", error);
      } finally {
        setIsStockCountLoading(false);
      }
    };

    returnStockCount();
  }, []);

  useEffect(() => {
    const fetchAppointmentStats = async () => {
      setIsAppointmentStatsLoading(true);
      try {
        const response = await getAppointmentStats();
        console.log("response from appointment stats", response);
        if (response.success) {
          setAppointmentStats(response);
          setIsAppointmentStatsLoading(false);
        }
      } catch (error) {
        console.log("Error fetching appointment stats", error);
      } finally {
      }
      setIsAppointmentStatsLoading(false);
    };
    fetchAppointmentStats();
  }, []);

  console.log("appointment stats in dashboard", appointmentStats);

  useEffect(() => {
    const getRevenueData = async () => {
      setIsRevenueLoading(true);
      try {
        const data = await fetchRevenueStats(barCharttimeFrame);
        setRevenueData(data);
      } catch (error) {
        console.error("Error fetching revenue data", error);
      } finally {
        setIsRevenueLoading(false);
      }
    };

    getRevenueData();
  }, [barCharttimeFrame]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.leftSection}>
        {/* First line  */}
        <div className={styles.lineContain}>
          <div className={styles.detailSection}>
            {dashboardDetailsSection.map((data) => (
              <div className={styles.commonContainerWithIMG} key={data.id}>
                <Image
                  src={data.icon}
                  alt="Section IMG"
                  width={80}
                  height={80}
                />
                <div>
                  <p>{data.title}</p>

                  <h1>
                    {data.title === DASHBOARD_COUNT_TITLES.APPOINTMENTS ? (
                      loading ? (
                        <Skeleton
                          width="100%"
                          height="30px"
                          borderRadius="5px"
                        />
                      ) : (
                        formatPrice(appointmentsCount) || 0
                      )
                    ) : data.title === DASHBOARD_COUNT_TITLES.SERVICES ? (
                      isServiceCountLoading ? (
                        <Skeleton
                          width="100%"
                          height="30px"
                          borderRadius="5px"
                        />
                      ) : (
                        formatPrice(servicesCount)
                      )
                    ) : data.title === DASHBOARD_COUNT_TITLES.PRODUCTS ? (
                      isStockCountLoading ? (
                        <Skeleton
                          width="100%"
                          height="30px"
                          borderRadius="5px"
                        />
                      ) : (
                        formatPrice(stockCount) || 0
                      )
                    ) : data.title === DASHBOARD_COUNT_TITLES.CUSTOMERS ? (
                      isClientCountLoading ? (
                        <Skeleton
                          width="100%"
                          height="30px"
                          borderRadius="5px"
                        />
                      ) : (
                        formatPrice(clientCount) || 0
                      )
                    ) : (
                      0
                    )}
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`${styles.commonContainerWithoutIMG} ${styles.pieChart}`}
            style={{
              alignItems: "flex-start",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <div className={styles.headAndSelect}>
              <div className="flex items-baseline gap-2">
                <h2>{GENDER}</h2>
                <Tooltip
                  target=".info-icon"
                  content="Gender distribution of appointments in the selected period."
                  position="top"
                />
                <i
                  className="pi pi-info-circle info-icon"
                  style={{ fontSize: "15px", color: "gray" }}
                ></i>
              </div>

              {/* <div className={styles.dropdownContain}> */}
              <SelectOptions
                options={selectOptions}
                timeFrame={pieCharttimeFrame}
                handleChange={handlePieChartTimelineChange}
              />
              {/* </div> */}
            </div>
            <div className={styles.pieChartContainer}>
              {isAppointmentCountByGenderLoading ? (
                <Skeleton shape="circle" size="10rem" />
              ) : (
                <PieChart chartData={chartData} />
              )}
            </div>
          </div>
        </div>
        {/* Second line  */}
        <div
          className={styles.commonContainerWithoutIMG}
          style={{
            paddingTop: "30px",
            width: "100%",
            height: "auto",
          }}
        >
          <div className={styles.headAndSelect}>
            <h2>{REVENUE}</h2>
            <div className={styles.dropdownContain}>
              <SelectOptions
                options={selectOptions}
                timeFrame={barCharttimeFrame}
                handleChange={handleBarChartTimelineChange}
              />
            </div>
          </div>
          {isRevenueLoading ? (
            <Skeleton
              width="100%"
              height="300px"
              shape="square"
              borderRadius="8px"
              className={styles.barchartSkeleton}
            />
          ) : (
            <BarChart data={revenueData} isLoading={isRevenueLoading} />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={styles.commonContainerWithoutIMG}>
            <h2 className="mb-3">{EMPLOYEES}</h2>
            <Employees />
          </div>
          <div className={styles.commonContainerWithoutIMG}>
            <h2>{APPOINTMENT_STATUS}</h2>
            <div className="w-full h-[90%]">
              <DoughnutChart
                statsData={appointmentStats}
                isLoading={isAppointmentStatsLoading}
              />
            </div>
          </div>
        </div>

        {/* Second line end  */}
      </div>

      <div className={styles.rightSection}>
        <div className={styles.commonContainerWithoutIMG}>
          <h2>{DASHBOARD_HEADING.UPCOMING_APPOINTMENTS}</h2>
          <Calender onDateChange={handleDateChange} />
          <UpcomingAppointments filterDate={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
