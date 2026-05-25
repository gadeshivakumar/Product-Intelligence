function PricingCard({
  title,
  value,
  subtitle,
  color,
}) {
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
      <p
        className="
          text-sm
          text-gray-500
        "
      >
        {title}
      </p>

      <h2
        className={`
          text-4xl
          font-bold
          mt-4
          ${color}
        `}
      >
        {value}
      </h2>

      {subtitle && (
        <p
          className="
            text-sm
            text-gray-400
            mt-2
          "
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PricingCard;