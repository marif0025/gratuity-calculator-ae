"use client"

export default function FooterCopyright() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="text-center md:text-left">
      <p className="text-gray-400 text-sm mb-2">
        © {currentYear} UAE Gratuity Calculator. Free tool for calculating end-of-service benefits.
      </p>
      <p className="text-xs text-gray-500">
        This calculator is based on UAE Labour Law {currentYear} and MOHRE guidelines.
      </p>
    </div>
  )
}

