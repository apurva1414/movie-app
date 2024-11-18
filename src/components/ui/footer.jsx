import { IoIosArrowDown } from "react-icons/io";
import { FiGlobe } from "react-icons/fi";
import {
  TiSocialFacebookCircular,
  TiSocialLinkedinCircular,
  TiSocialTwitterCircular,
} from "react-icons/ti";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 font-montserrat">
      {/* Footer Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center md:justify-between gap-8">
          {/* Language Selector */}
          <div className="flex justify-center md:justify-start">
            <button className="flex items-center bg-gray-800 text-sm px-4 py-2 rounded-md h-max">
              <FiGlobe size={18} className="mr-2" />
              English
              <IoIosArrowDown size={18} className="ml-2" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-20">
            <div>
              <h3 className="font-bold text-lg mb-4 uppercase">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Investor Relation
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 uppercase">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Cookie Preferences
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Corporate Information
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 uppercase">Talk to Us</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="mailto:support@ercom.com"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    support@ercom.com
                  </Link>
                </li>
                <li>
                  <Link
                    to="tel:+6623991145"
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    +66 2399 1145
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 uppercase">Follow Us</h3>
              <div className="flex space-x-4">
                <TiSocialFacebookCircular
                  size={39}
                  className="text-gray-400 hover:text-white"
                />
                <TiSocialLinkedinCircular
                  size={39}
                  className="text-gray-400 hover:text-white"
                />
                <TiSocialTwitterCircular
                  size={39}
                  className="text-gray-400 hover:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center ">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Dramatic. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
