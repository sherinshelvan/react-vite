import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SideNavigation from './SideNavigation';
import TopBar from './TopBar';

const Layout = ({ children }) => {
  return (
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <SideNavigation />
            {/* <!-- Layout container --> */}
            <div className="layout-page">
              <TopBar />
              <div className="content-wrapper">
                {children}
                <Footer />
                <div className="content-backdrop fade"></div>
              </div>
            </div>
            {/* <!-- / Layout page --> */}
          </div>
          {/* <!-- Overlay --> */}
          <div className="layout-overlay layout-menu-toggle"></div>
        </div>
  );
};

export default Layout;
