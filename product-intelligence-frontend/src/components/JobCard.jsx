import {
  CheckCircle2,
  Loader2,
  XCircle,
  Clock3,
} from "lucide-react";

function JobCard({
  job,
}) {

  const getStatusConfig =
    (status) => {

      if (
        status ===
        "COMPLETED"
      ) {

        return {
          badge:
            "bg-green-100 text-green-700",

          icon:
            <CheckCircle2
              size={18}
            />,

          progress:
            "bg-green-500",

          text:
            "Processing completed successfully",
        };
      }

      if (
        status ===
        "FAILED"
      ) {

        return {
          badge:
            "bg-red-100 text-red-700",

          icon:
            <XCircle
              size={18}
            />,

          progress:
            "bg-red-500",

          text:
            "Processing failed",
        };
      }

      if (
        status ===
        "RUNNING"
      ) {

        return {
          badge:
            "bg-yellow-100 text-yellow-700",

          icon:
            <Loader2
              size={18}
              className="
                animate-spin
              "
            />,

          progress:
            "bg-[#4CBB17]",

          text:
            "Workflow currently running",
        };
      }

      return {
        badge:
          "bg-gray-100 text-gray-700",

        icon:
          <Clock3
            size={18}
          />,

        progress:
          "bg-gray-400",

        text:
          "Waiting in queue",
      };
    };

  const config =
    getStatusConfig(
      job.status
    );

  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-6
        border
        border-gray-100
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          justify-between
          items-start
          mb-6
        "
      >
        <div>
          <h2
            className="
              text-xl
              font-semibold
              text-gray-900
            "
          >
            {job.jobType}
          </h2>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
              break-all
            "
          >
            Job ID:
            {" "}
            {job.id}
          </p>
        </div>

        <div
          className={`
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            ${config.badge}
          `}
        >
          {config.icon}

          {job.status}
        </div>
      </div>

      {/* PROGRESS */}
      <div className="mb-6">

        <div
          className="
            flex
            justify-between
            items-center
            mb-2
          "
        >
          <span
            className="
              text-sm
              text-gray-500
            "
          >
            Workflow Progress
          </span>

          <span
            className="
              text-sm
              font-semibold
            "
          >
            {
              job.progress
            }
            %
          </span>
        </div>

        <div
          className="
            h-3
            bg-gray-100
            rounded-full
            overflow-hidden
          "
        >
          <div
            className={`
              h-full
              rounded-full
              transition-all
              duration-700
              ${config.progress}
            `}
            style={{
              width:
                `${job.progress}%`,
            }}
          />
        </div>

        {/* LIVE STATUS */}
        <div
          className="
            flex
            items-center
            gap-2
            mt-3
          "
        >
          {job.status ===
            "RUNNING" && (
            <div
              className="
                w-2
                h-2
                rounded-full
                bg-[#4CBB17]
                animate-pulse
              "
            />
          )}

          <p
            className="
              text-sm
              text-gray-500
            "
          >
            {config.text}
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:justify-between
          lg:items-center
          gap-3
          text-sm
          text-gray-500
          pt-4
          border-t
          border-gray-100
        "
      >
        <span>
          Created:
          {" "}
          {
            new Date(
              job.createdAt
            ).toLocaleString()
          }
        </span>

        <span
          className="
            font-medium
          "
        >
          {
            job.status ===
            "RUNNING"
              ? "Actively processing..."
              : job.status ===
                "COMPLETED"
              ? "Ready for review"
              : job.status ===
                "FAILED"
              ? "Requires attention"
              : "Queued"
          }
        </span>
      </div>
    </div>
  );
}

export default JobCard;