import {
  useEffect,
  useState,
} from "react";

import api from "../api/api";

import AlertCard from "../components/AlertCard";

function Alerts() {
  const [
    alerts,
    setAlerts,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    filter,
    setFilter,
  ] = useState("ALL");

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts =
    async () => {
      try {

        const response =
          await api.get(
            "/alerts"
          );

        setAlerts(
          response.data.data
            .alerts || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  const markAsRead =
    async (alertId) => {
      try {

        await api.patch(
          `/alerts/${alertId}/read`
        );

        setAlerts(
          alerts.map(
            (alert) =>
              alert.id ===
              alertId
                ? {
                    ...alert,

                    readStatus:
                      "READ",
                  }
                : alert
          )
        );

      } catch (error) {

        console.log(error);
      }
    };

  const filteredAlerts =
    filter === "ALL"
      ? alerts
      : alerts.filter(
          (alert) =>
            alert.severity ===
            filter
        );

  return (
    <div>
      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >
        <div>
          <h1
            className="
              text-4xl
              font-bold
              text-gray-900
            "
          >
            Alerts
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Monitor product issues
            and pricing alerts
          </p>
        </div>

        <div
          className="
            flex
            gap-3
          "
        >
          {[
            "ALL",
            "HIGH",
            "MEDIUM",
            "LOW",
          ].map((item) => (
            <button
              key={item}
              onClick={() =>
                setFilter(
                  item
                )
              }
              className={`
                px-5
                py-3
                rounded-2xl
                font-medium
                transition

                ${
                  filter === item
                    ? "bg-[#4CBB17] text-white"
                    : "bg-white border border-gray-200"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div
          className="
            flex
            justify-center
            items-center
            h-[70vh]
          "
        >
          <div
            className="
              w-14
              h-14
              border-4
              border-[#4CBB17]
              border-t-transparent
              rounded-full
              animate-spin
            "
          />
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-2
            gap-6
          "
        >
          {filteredAlerts.map(
            (alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onRead={
                  markAsRead
                }
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Alerts;