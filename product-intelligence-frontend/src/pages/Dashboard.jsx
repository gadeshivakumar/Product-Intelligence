import { useEffect, useState } from "react";

import api from "../api/api";

import StatCard from "../components/StatCard";

import IssueChart from "../components/IssueChart";

import QualityChart from "../components/QualityChart";

function Dashboard() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard/quality-summary");

      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
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
    );
  }

  const issueData = [
    {
      name: "High",
      value: data.issues.highSeverity,
    },

    {
      name: "Medium",
      value: data.issues.mediumSeverity,
    },

    {
      name: "Low",
      value: data.issues.lowSeverity,
    },
  ];

  const qualityData = [
    {
      name: "Missing Images",
      value: data.issues.missingImages,
    },

    {
      name: "Invalid Prices",
      value: data.issues.invalidPrices,
    },

    {
      name: "Duplicate SKU",
      value: data.issues.duplicateSKUs,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1
          className="
            text-4xl
            font-bold
            text-gray-900
          "
        >
          Dashboard
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Product intelligence overview
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          mb-8
        "
      >
        <StatCard
          title="Products"
          value={data.products.total}
          color="text-black"
        />

        <StatCard
          title="Unread Alerts"
          value={data.alerts.unread}
          color="text-red-500"
        />

        <StatCard
          title="Quality Score"
          value={`${data.quality.averageScore}%`}
          color="text-[#4CBB17]"
        />

        <StatCard
          title="Market Difference"
          value={`${data.pricing.averageMarketDifference}%`}
          color="text-[#39542C]"
        />
      </div>

      <div
        className="
          grid
          grid-cols-1
            xl:grid-cols-2
          gap-6
          mb-8
        "
      >
        <IssueChart data={issueData} />

        <QualityChart data={qualityData} />
      </div>

      <div
        className="
          bg-white
          rounded-3xl
          p-8
          border
          border-gray-100
          shadow-sm
        "
      >
        <div
          className="
            flex
            justify-between
            items-center
            mb-8
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-semibold
              "
            >
              Quick Insights
            </h2>

            <p
              className="
                text-sm
                text-gray-500
                mt-1
              "
            >
              Real-time platform analytics
            </p>
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-4
            gap-6
          "
        >
          <div
            className="
              p-5
              rounded-2xl
              bg-[#F5F7F4]
            "
          >
            <p
              className="
                text-sm
                text-gray-500
              "
            >
              High Severity Issues
            </p>

            <h3
              className="
                text-3xl
                font-bold
                mt-4
              "
            >
              {data.issues.highSeverity}
            </h3>
          </div>

          <div
            className="
              p-5
              rounded-2xl
              bg-[#F5F7F4]
            "
          >
            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Missing Images
            </p>

            <h3
              className="
                text-3xl
                font-bold
                mt-4
              "
            >
              {data.issues.missingImages}
            </h3>
          </div>

          <div
            className="
              p-5
              rounded-2xl
              bg-[#F5F7F4]
            "
          >
            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Invalid Prices
            </p>

            <h3
              className="
                text-3xl
                font-bold
                mt-4
              "
            >
              {data.issues.invalidPrices}
            </h3>
          </div>

          <div
            className="
              p-5
              rounded-2xl
              bg-[#F5F7F4]
            "
          >
            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Out of Stock
            </p>

            <h3
              className="
                text-3xl
                font-bold
                mt-4
              "
            >
              {data.products.outOfStock}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
