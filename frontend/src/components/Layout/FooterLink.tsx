import { Link } from 'react-router-dom';
import { useTheme } from '../theme/theme-provider';

const footerSections = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'News', href: '/news' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Safety Center', href: '/safety' },
      { label: 'Community', href: '/community' },
      { label: 'Trust & Safety', href: '/trust' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' }
    ]
  },
  {
    title: 'Install App',
    links: [
      { label: 'iOS App', href: '/ios' },
      { label: 'Android App', href: '/android' },
      { label: 'Desktop App', href: '/desktop' }
    ]
  }
];

const FooterLinks = () => {
  const {theme} = useTheme()
  return (
    <div className="md:col-span-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:border-s-2 ps-0 md:ps-10">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4 text-sm md:text-base">
              <h4 className={`text-lg font-normal ${theme==='dark'?'text-white':'text-[#5b4baed7]'} `}>{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.href} 
                      className="text-gray-400 hover:text-[#5b4baed7] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
  );
};

export default FooterLinks;