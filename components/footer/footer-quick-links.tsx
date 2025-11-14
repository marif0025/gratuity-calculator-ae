export default function FooterQuickLinks() {
  return (
    <div>
      <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
      <ul className="space-y-2 text-sm text-gray-400">
        <li>
          <a href="#calculator" className="hover:text-white transition-colors">
            Gratuity Calculator
          </a>
        </li>
        <li>
          <a href="#guide" className="hover:text-white transition-colors">
            Complete Guide
          </a>
        </li>
        <li>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </li>
        <li>
          <span className="text-gray-500">UAE Labour Law 2025</span>
        </li>
        <li>
          <span className="text-gray-500">MOHRE Guidelines</span>
        </li>
      </ul>
    </div>
  )
}

