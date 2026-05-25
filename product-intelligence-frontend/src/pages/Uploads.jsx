import {
  useState,
} from "react";

import api from "../api/api";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";

function Uploads() {
  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  const uploadVideo =
    async (files) => {

      const file =
        files[0];

      if (!file) return;

      try {

        setLoading(true);

        setMessage("");

        const formData =
          new FormData();

        formData.append(
          "video",
          file
        );

        const response =
          await api.post(
            "/upload-video",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        toast.success(
        "Video uploaded successfully"
        );

        console.log(
          response.data
        );

      } catch (error) {

        console.log(error);

        toast.error(
        "Video upload failed"
        );

      } finally {

        setLoading(false);
      }
    };

  const uploadCSV =
    async (files) => {

      const file =
        files[0];

      if (!file) return;

      try {

        setLoading(true);

        setMessage("");

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const response =
          await api.post(
            "/upload-products-csv",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        toast.success(
  "CSV uploaded successfully"
);

        console.log(
          response.data
        );

      } catch (error) {

        console.log(error);

        toast.error(
  "CSV upload failed"
);

      } finally {

        setLoading(false);
      }
    };

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
          Upload Center
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Upload videos and CSV
          product feeds
        </p>
      </div>

      {message && (
        <div
          className="
            mb-6
            px-5
            py-4
            rounded-2xl
            bg-[#E8F6E1]
            text-[#39542C]
            font-medium
          "
        >
          {message}
        </div>
      )}

      {loading && (
        <div
          className="
            mb-6
            bg-white
            rounded-2xl
            p-5
            border
            border-gray-100
          "
        >
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
                w-full
                bg-[#4CBB17]
                animate-pulse
              "
            />
          </div>

          <p
            className="
              text-sm
              text-gray-500
              mt-3
            "
          >
            Uploading...
          </p>
        </div>
      )}

      <div
        className="
          grid
          grid-cols-2
          gap-6
        "
      >
        <UploadBox
          title="Upload Product Video"
          description="
            Upload product videos for AI extraction,
            validation and title enhancement
          "
          accept={{
            "video/*": [],
          }}
          onDrop={
            uploadVideo
          }
        />

        <UploadBox
          title="Upload CSV Feed"
          description="
            Upload CSV product feeds
            for bulk ingestion
          "
          accept={{
            "text/csv": [],
          }}
          onDrop={
            uploadCSV
          }
        />
      </div>
    </div>
  );
}

export default Uploads;