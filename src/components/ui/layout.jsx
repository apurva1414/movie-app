import PropTypes from "prop-types";
import Navbar from "./navbar";
import Footer from "./footer";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#010101]">
      {/*  <div className=""> */}
      <Navbar />
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
