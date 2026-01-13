import { Linkedin, Instagram, Mail, MapPin } from 'lucide-react';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-32">
      <div className="max-w-screen-2xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-sm font-light tracking-wider mb-4">zlg design</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              crafting timeless spaces through innovative and sustainable architecture.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-wider mb-4 font-light">contact</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center space-x-2">
                <Mail size={14} />
                <a href="mailto:info@zlgdesign.com" className="hover:text-black transition-colors">
                  info@zlgdesign.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-wider mb-4 font-light">follow us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/zlg-sdn-bhd/about/"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/zlgdesign/?hl=en"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-wider mb-4 font-light">locate us</h4>
            <div className="flex items-start space-x-2 text-xs text-gray-600 lowercase mb-4">
              <a
                href="https://maps.app.goo.gl/XU8fK6RHEw2pYWqD6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-2 hover:text-black transition-colors group"
              >
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <address className="not-italic leading-relaxed">
                  1-8, Bangunan Perdagangan D7, 800<br />
                  Jln Sentul, Sentul, 51000 Kuala Lumpur,<br />
                  Federal Territory of Kuala Lumpur
                </address>
              </a>
            </div>

            {/* Embedded Google Map – compact & responsive */}
            <div className="w-full h-48 sm:h-56 md:h-64 rounded-md overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.671222744767!2d101.68941977497126!3d3.1809137967943784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4811d78394db%3A0xc0145d4ec764b998!2sZLG%20Design!5e0!3m2!1sen!2smy!4v1768297314380!5m2!1sen!2smy"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="zlg design location - Bangunan Perdagangan D7, Sentul"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-300 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} zlg design. all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}