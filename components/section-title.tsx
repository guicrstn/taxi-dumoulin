interface SectionTitleProps {
    title: string
    description?: string
    className?: string
    textColor?: string
    align?: "left" | "center" | "right"
  }
  
  export default function SectionTitle({
    title,
    description,
    className = "",
    textColor = "text-gray-900",
    align = "center",
  }: SectionTitleProps) {
    const alignClass = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[align]
  
    return (
      <div className={`mb-12 ${alignClass} ${className}`}>
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${textColor}`}>{title}</h2>
        {description && <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">{description}</p>}
      </div>
    )
  }
  