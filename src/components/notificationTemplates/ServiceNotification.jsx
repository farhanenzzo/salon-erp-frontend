import { Image } from "next/image";

const ServiceNotification = ({ notification }) => {
  const { serviceName, status, updateTime } = notification.details;

  return (
    <div className="flex items-center gap-4 mb-2">
      <Image src={ServiceIcon} alt={IMG_ALT.SERVICE_ICON} />
      <div>
        <p className="font-semibold">{serviceName}</p>
        <p className="text-sm text-gray-600">
          Status: <span className="font-medium">{status}</span>
        </p>
        <p className="text-xs text-gray-500">{updateTime}</p>
      </div>
    </div>
  );
};

export default ServiceNotification;
