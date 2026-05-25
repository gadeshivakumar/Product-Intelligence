function EmptyState({
  title,
  description,
}) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-100
        shadow-sm
        p-16
        text-center
      "
    >
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
        "
      >
        {description}
      </p>
    </div>
  );
}

export default EmptyState;