import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Header.module.css";
import NotificationIcon from "../../assets/svg/notificationBing.svg";
import Image from "next/image";
import ArrowIMG from "../../assets/svg/arrowDown.svg";
import { useAuth } from "../../app/AuthContext";
import { Skeleton } from "primereact/skeleton";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import {
  DEFAULT_PROFILE_IMAGE_URL,
  HEADER_DROPDOWN_OPTIONS,
  HEADER_KEYMAP,
  HEADER_TOAST,
  IMAGE_UPLOAD_FIELDS,
  IMG_ALT,
  LOGIN_SCREEN,
  LOGOUT,
  MODAL_TITLES,
  TOAST_MESSAGES,
} from "../../constants";
import { profileSettingsModalData } from "../../utils/data";
import useForm from "../../hooks/useForm";
import {
  getUserById,
  handleSignOut,
  updateUserProfile,
  listNotifications,
  updateReadStatus,
  showCompanyDetails,
} from "../../service/api";
import { useDispatch, useSelector } from "react-redux";
import { resetNotificationCount } from "../../redux/slices/notificationSlice";
import { setUser } from "../../redux/slices/userSlice";
import getFormattedPath from "../../utils/getFormattedPath";
import dynamic from "next/dynamic";
import { formatString } from "../../utils/formatString";
import { selectCompany, setCompanyDetails } from "../../redux/slices/company";

const NotificationPopup = dynamic(
  () => import("../notificationPopup/NotificationPopup"),
  { ssr: false }
);

const ModalComponent = dynamic(
  () => import("../modalComponent/ModalComponent"),
  {
    ssr: false,
  }
);

const Header = ({ isCollapsed, setIsCollapsed }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const notificationCount = useSelector((state) => state.notifications.count);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [isSignedOut, setIsSignedOut] = useState(false);
  const [notifications, setNotifications] = useState({
    notifications: [],
    loading: false,
    page: 1,
    totalPages: 1,
  });

  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [isSignoutLoading, setIsSignoutLoading] = useState(false);
  const menu = useRef(null);
  const router = useRouter();
  const user = useAuth();
  const auth = getAuth();

  const dispatch = useDispatch();

  const pathname = usePathname();
  const formattedPath = getFormattedPath(pathname);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const companyData = await showCompanyDetails();
        dispatch(setCompanyDetails(companyData));
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompanyDetails();
  }, [dispatch]);

  const company = useSelector(selectCompany);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const [currentUser, setCurrentUser] = useState(null);

  const getUserDetails = async () => {
    setIsLoading(true);
    if (user) {
      try {
        const response = await getUserById(user.uid);
        setCurrentUser(response);
        console.log("response in user det", response);
        // dispatch(setUser({ profilePicture: response.userProfile }));
      } catch (error) {
        console.log("Error fetching user details", error);
      } finally {
        setIsLoading(false);
      }
    } else if (!user && !isSignedOut) {
      toast.error("No user found");
    }
  };

  console.log("currentUser", currentUser);

  useEffect(() => {
    if (user) {
      getUserDetails();
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && currentUser) {
      console.log("Fetched user data:", currentUser);
      // Dispatch the user data to Redux
      dispatch(
        setUser({
          user: currentUser?.name,
          role: currentUser?.role?.roleName,
          roleId: currentUser?.role?._id,
          profilePicture:
            formData.userProfile instanceof File
              ? URL.createObjectURL(formData.userProfile)
              : currentUser?.userProfile,

          // token: data.token,
        })
      );
    }
  }, [currentUser, isLoading, dispatch]);

  const {
    user: name,
    role,
    profilePicture,
  } = useSelector((state) => state.auth);
  const stateInRed = useSelector((state) => state.auth);

  const userName = currentUser?.name || "User";
  const userImage = profilePicture || DEFAULT_PROFILE_IMAGE_URL;

  const fetchNotifications = async () => {
    setNotifications((prev) => ({ ...prev, loading: true }));
    try {
      const notificationsData = await listNotifications(notifications.page, 10);

      setNotifications({
        notifications: notificationsData,
        loading: false,
      });

      if (notificationsData && notificationsData.length > 0) {
        const ids = notificationsData.map((notification) => notification._id);

        await updateReadStatus(ids);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to fetch notifications. Please try again.");
      setNotifications((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleNotificationClick = useCallback(() => {
    setShowNotificationPopup((prev) => !prev);
    if (!showNotificationPopup) {
      fetchNotifications();
    }
  }, [showNotificationPopup]);

  const signOutUser = async () => {
    setIsSignoutLoading(true);
    try {
      await handleSignOut();
      if (auth.currentUser) {
        await signOut(auth);
      }
      setIsSignoutLoading(false);
      toast.success(HEADER_TOAST.SUCCESS_SIGNOUT);
      router.replace(LOGIN_SCREEN.LOGIN_SCREEN_ROUTE);
    } catch (error) {
      toast.error(HEADER_TOAST.ERROR_SIGNOUT);
      console.error("Error signing out: ", error);
    } finally {
      setIsSignedOut(true);
      setIsSignoutLoading(false);
    }
  };

  const handleSignOutModal = () => {
    setShowSignOutModal(true);
  };

  const handleProfileSettings = () => {
    setShowModal(true);
  };

  const items = [
    {
      label: "Options",
      items: [
        {
          label: HEADER_DROPDOWN_OPTIONS.PROFILE_SETTINGS,
          icon: HEADER_DROPDOWN_OPTIONS.PROFILE_SETTINGS_ICON,
          command: handleProfileSettings,
        },
        {
          label: HEADER_DROPDOWN_OPTIONS.LOGOUT,
          icon: HEADER_DROPDOWN_OPTIONS.LOGOUT_ICON,
          command: handleSignOutModal,
        },
      ],
    },
  ];

  const initialFormData = {
    userProfile: profilePicture || "",
    name: user?.displayName || "",
  };

  const keyMap = {
    1: HEADER_KEYMAP.PROFILE_PICTURE,
    2: HEADER_KEYMAP.NAME,
  };

  const { formData, resetForm, handleInputChange, handleFileChange, fileName } =
    useForm(initialFormData, keyMap);

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    const formDataToSubmit = new FormData();

    // Add updated fields to FormData
    if (formData.userProfile instanceof File) {
      formDataToSubmit.append("userProfile", formData.userProfile);
    }

    formDataToSubmit.append("username", formData.name);
    formDataToSubmit.append("email", formData.email);

    try {
      const result = await updateUserProfile(user?.uid, formDataToSubmit);

      // Update the user profile in Firebase
      if (user) {
        const photoURL = formData.userProfile
          ? result.updatedUser.userProfile
          : user.photoURL;
        await updateProfile(user, {
          displayName: formData.name,
          photoURL,
        });

        // Dispatch updated user information to Redux
        dispatch(
          setUser({
            user: formData?.name, // Update name in Redux
            role: currentUser?.role?.roleName,
            roleId: currentUser?.role?._id,
            profilePicture: photoURL,
          })
        );
      }

      await getUserDetails();
      toast.success(TOAST_MESSAGES.PROFILE_UPDATES_SUCCESS);
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error(TOAST_MESSAGES.PROFILE_UPDATES_FAILED);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const handlePopupClose = () => {
    dispatch(resetNotificationCount());
    setShowNotificationPopup(false);
    setNotifications((prev) => ({
      ...prev,
      notifications: [],
    }));
  };

  return (
    <header
      className={`fixed top-4 ${
        isCollapsed ? "left-24" : "left-[300px]"
      } right-8 h-22 bg-white z-50 rounded-lg transition-all duration-300 ease-in-out`}
    >
      {showModal && (
        <ModalComponent
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            resetForm();
          }}
          modalData={profileSettingsModalData}
          title={MODAL_TITLES.PROFILE_SETTINGS}
          formData={formData}
          onSave={handleUpdateProfile}
          currentImageUrl={profilePicture}
          handleInputChange={handleInputChange}
          fileName={fileName}
          handleFileUpload={(e) =>
            handleFileChange(e, IMAGE_UPLOAD_FIELDS.PROFILE_PICTURE)
          }
          canEdit={true}
          isLoading={isLoading}
        />
      )}
      {showSignOutModal && (
        <ModalComponent
          isOpen={showSignOutModal}
          onClose={() => setShowSignOutModal(false)}
          title={MODAL_TITLES.CONFIRM_LOGOUT}
          confirmModal={true}
          confirmText={LOGOUT}
          confirmButtonClick={signOutUser}
          isLoading={isSignoutLoading}
        />
      )}
      {showNotificationPopup && (
        <NotificationPopup
          onClose={handlePopupClose}
          notifications={notifications.notifications}
          loading={notifications.loading}
        />
      )}
      <div className="flex justify-between items-center px-8 py-4 w-full">
        {/* Left section */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="bg-gray-100 px-2 py-1 rounded shadow-md hover:shadow-lg transition-shadow"
          >
            <i className="pi pi-bars"></i>
          </button>
          <p className="ml-5 capitalize text-xl">{formattedPath}</p>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className={`${styles.notificationIcon} flex items-center justify-center h-[40px] w-[40px]`}
            onClick={handleNotificationClick}
          >
            <Image
              src={NotificationIcon}
              alt={IMG_ALT.NOTIFICATIONS}
              width={24}
              height={24}
            />
            {notificationCount > 0 && (
              <span className={styles.notificationCount}>
                {notificationCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-5">
            {isLoading ? (
              <Skeleton size="3rem" />
            ) : (
              <Image
                src={userImage || DEFAULT_PROFILE_IMAGE_URL}
                alt={IMG_ALT.PROFILE_IMG}
                width={50}
                height={35}
                className="rounded-md"
                objectFit="contain"
              />
            )}

            <div className={styles.userDetails}>
              <h5>
                {isLoading ? (
                  <Skeleton width="100px" height="20px" className="mb-2" />
                ) : (
                  userName
                )}
              </h5>
              <p>
                {isLoading ? (
                  <Skeleton width="5rem" height="20px" />
                ) : role ? (
                  <>
                    {formatString(role)} <strong>({company.name})</strong>
                  </>
                ) : null}
              </p>
            </div>
            <div className="card flex justify-content-center">
              <Menu model={items} popup ref={menu} id="popup_menu" />
              <Button
                icon={
                  <Image
                    src={ArrowIMG}
                    alt={IMG_ALT.HEADER_DROPDOWN_ARROW}
                    width={24}
                    height={24}
                  />
                }
                onClick={(event) => menu.current.toggle(event)}
                aria-controls="popup_menu"
                aria-haspopup
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
