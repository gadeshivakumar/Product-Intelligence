function JobCard({
  job,
}) {
  const getStatusStyle =
    (status) => {

      if (
        status ===
        "COMPLETED"
      ) {

        return "bg-green-100 text-green-700";
      }

      if (
        status ===
        "FAILED"
      ) {

        return "bg-red-100 text-red-700";
      }

      return "bg-yellow-100 text-yellow-700";
    };

  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-6
        border
        border-gray-100
        shadow-sm
      "
    >
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
            "
          >
            Job ID:
            {" "}
            {job.id}
          </p>
        </div>

        <span
          className={`
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            ${getStatusStyle(
              job.status
            )}
          `}
        >
          {job.status}
        </span>
      </div>

      <div className="mb-5">
        <div
          className="
            flex
            justify-between
            text-sm
            mb-2
          "
        >
          <span>
            Progress
          </span>

          <span>
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
            className="
              h-full
              bg-[#4CBB17]
              rounded-full
              transition-all
              duration-500
            "
            style={{
              width: `${job.progress}%`,
            }}
          />
        </div>
      </div>

      <div
        className="
          flex
          justify-between
          items-center
          text-sm
          text-gray-500
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

        <span>
          {
            job.status ===
            "RUNNING"
              ? "Processing..."
              : "Finished"
          }
        </span>
      </div>
    </div>
  );
}

export default JobCard;