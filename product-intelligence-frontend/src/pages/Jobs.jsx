import {
  useEffect,
  useState,
} from "react";

import {
  RefreshCcw,
} from "lucide-react";

import api from "../api/api";

import JobCard from "../components/JobCard";

function Jobs() {
  const [
    jobs,
    setJobs,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const fetchJobs =
    async () => {
      try {

        const response =
          await api.get(
            "/jobs"
          );

        setJobs(
          response.data.data
            .jobs || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchJobs();

    const interval =
      setInterval(() => {
        fetchJobs();
      }, 10000);

    return () =>
      clearInterval(
        interval
      );
  }, []);

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
            Jobs Monitoring
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Track background
            workflows and jobs
          </p>
        </div>

        <button
          onClick={
            fetchJobs
          }
          className="
            flex
            items-center
            gap-3
            px-6
            py-3
            rounded-2xl
            bg-[#4CBB17]
            hover:bg-[#48872B]
            text-white
            font-semibold
            transition
          "
        >
          <RefreshCcw
            size={18}
          />

          Refresh
        </button>
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
          {jobs.map(
            (job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Jobs;