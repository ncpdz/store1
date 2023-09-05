import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Footer = () => {
  const location = useLocation();
  const { pathname } = location;
  const { user } = useContext(UserContext);
  return (
    <footer className="bg-gray-400 text-center">
      {((user && user.auth )&&!(pathname === "/login" || pathname === "/register")) && (
        <>
          <div className="">
            <div className="f">
              <h2>Logo</h2>
              <div className="">
                <p>
                  <span>Call. </span>
                  <b>(+84) 0365160470</b>
                </p>
                <p>
                  <span>Email. </span>
                  <b>a@gmail.com</b>
                </p>
              </div>
              <div className="">
                Đ. Nam Kỳ Khởi Nghĩa, Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng
              </div>
            </div>
            <div className="">
              <ul>
                <li>About Us</li>
                <li>Work Here</li>
                <li>Team</li>
                <li>Happenings</li>
              </ul>
              <ul>
                <li>Support</li>
                <li>FAQs</li>
                <li>Warranty</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </footer>
  );
};

export default Footer;
