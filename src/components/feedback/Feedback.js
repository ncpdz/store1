import React, { useContext, useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { FetchAll } from "../../Services/FeedbackService";
import "./Feedback.scss";
import { debounce } from "lodash";
import { UserContext } from "../../context/UserContext";

const Feedback = () => {
  const { user } = useContext(UserContext);
  const [listFeedback, setListFeedback] = useState([]);
  const [originalListFeedback, setOriginalListFeedback] = useState([]); // Thêm biến tạm thời

  const handleViewCustomer = (Customer1) => {
    // console.log(Customer1)
    setDataCustomerView(Customer1);
    SetIsShowModalView(true);
  };
  const handleClose = () => {
    SetIsShowModalView(false);
    getCustomers();
  };
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    const sortedCustomers = _.orderBy(listCustomers, [sortField], [sortBy]);
    setListCustomers(sortedCustomers);
    // console.log(sortedCustomers);
  };
  const handleSearch = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let searchEmail = originalListFeedback.filter((item) =>
        item.mess_fb.includes(term)
      );
      setListCustomers(searchEmail);
    } else {
      setListCustomers(originalListCustomers); // Sử dụng dữ liệu gốc khi không có từ khóa tìm kiếm
    }
  }, 1000);
  // Function để cắt chuỗi và thêm "..."
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  useEffect(() => {
    getCustomers();
    // Đặt một khoảng thời gian để gọi lại getCustomers sau mỗi 5 phút (300000ms)
    const intervalId = setInterval(getCustomers, 300000);

    // Trong useEffect, chúng ta cần trả về một hàm để xử lý khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getCustomers = async () => {
    try {
      let res = await FetchAll();
      if (res && res.data) {
        setListCustomers(res.data);
        setOriginalListCustomers(res.data); // Lưu trữ dữ liệu gốc
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  // //mặc định theo chièu giảm dần
  // const getCustomers = async () => {
  //   try {
  //     let res = await FetchAll();
  //     if (res && res.data) {
  //       const sortedCustomers = _.orderBy(res.data, ["id"], ["desc"]); // Sắp xếp giảm dần theo trường "id"
  //       setListCustomers(sortedCustomers);
  //       setOriginalListCustomers(sortedCustomers); // Lưu trữ dữ liệu gốc
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   }
  // };
  // console.log("check sort: ", sortBy, sortField)
  return (
    <>
      <div className="container">
        <div className="col-4 my-3">
          <input
            className="form-control"
            placeholder="search message"
            //  value={keyWord}
            onChange={(event) => handleSearch(event)}
          ></input>
        </div>
        {listFeedback &&
          listFeedback.length > 0 &&
          listFeedback
            .filter(item => item.email_fb === user.email) // Lọc mảng dựa trên điều kiện
            .map((item, index) => {
              return (
                <div key={`Feedback-${index}`}>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item>
                      <Accordion.Header>{item.email_fb}</Accordion.Header>
                      <Accordion.Body>
                        <div>
                          <h6>Message from: {item.user_fb}</h6>
                        </div>
                        <div className="mess_feed">{item.mess_fb}</div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              );
            })}
        

      </div>
    </>
  );
}

export default Customer;