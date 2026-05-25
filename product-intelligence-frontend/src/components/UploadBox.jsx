import {
  UploadCloud,
} from "lucide-react";

import {
  useDropzone,
} from "react-dropzone";

function UploadBox({
  title,
  description,
  accept,
  onDrop,
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept,

    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2
        border-dashed
        rounded-3xl
        p-10
        transition-all
        cursor-pointer

        ${
          isDragActive
            ? "border-[#4CBB17] bg-[#F5F7F4]"
            : "border-gray-300 bg-white"
        }
      `}
    >
      <input
        {...getInputProps()}
      />

      <div
        className="
          flex
          flex-col
          items-center
          text-center
        "
      >
        <div
          className="
            w-20
            h-20
            rounded-full
            bg-[#F5F7F4]
            flex
            items-center
            justify-center
            mb-6
          "
        >
          <UploadCloud
            size={38}
            color="#4CBB17"
          />
        </div>

        <h2
          className="
            text-2xl
            font-semibold
            text-gray-900
          "
        >
          {title}
        </h2>

        <p
          className="
            text-gray-500
            mt-3
            max-w-[400px]
          "
        >
          {description}
        </p>

        <button
          className="
            mt-8
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
          Browse Files
        </button>
      </div>
    </div>
  );
}

export default UploadBox;