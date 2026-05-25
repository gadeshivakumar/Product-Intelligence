function AlertCard({
  alert,
  onRead,
}) {
  const getSeverityStyle =
    (severity) => {

      if (
        severity === "HIGH"
      ) {

        return "bg-red-100 text-red-700";
      }

      if (
        severity ===
        "MEDIUM"
      ) {

        return "bg-yellow-100 text-yellow-700";
      }

      return "bg-green-100 text-green-700";
    };

  return (
    <div
      className={`
        bg-white
        rounded-3xl
        p-6
        border
        shadow-sm
        transition

        ${
          alert.readStatus ===
          "UNREAD"
            ? "border-[#4CBB17]"
            : "border-gray-100"
        }
      `}
    >
      <div
        className="
          flex
          justify-between
          items-start
          mb-5
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-gray-900
            "
          >
            {alert.alertType}
          </h2>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            Product:
            {" "}
            {
              alert.product
                ?.productTitle
            }
          </p>
        </div>

        <span
          className={`
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            ${getSeverityStyle(
              alert.severity
            )}
          `}
        >
          {alert.severity}
        </span>
      </div>

      <p
        className="
          text-gray-600
          leading-relaxed
        "
      >
        {alert.message}
      </p>

      <div
        className="
          flex
          justify-between
          items-center
          mt-6
        "
      >
        <span
          className={`
            text-sm
            font-medium

            ${
              alert.readStatus ===
              "UNREAD"
                ? "text-[#4CBB17]"
                : "text-gray-400"
            }
          `}
        >
          {alert.readStatus}
        </span>

        {alert.readStatus ===
          "UNREAD" && (
          <button
            onClick={() =>
              onRead(
                alert.id
              )
            }
            className="
              px-5
              py-2
              rounded-xl
              bg-[#4CBB17]
              hover:bg-[#48872B]
              text-white
              text-sm
              font-semibold
              transition
            "
          >
            Mark as Read
          </button>
        )}
      </div>
    </div>
  );
}

export default AlertCard;