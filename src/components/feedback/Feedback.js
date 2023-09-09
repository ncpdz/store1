import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { FetchAll } from "../../Services/FeedbackService";
import "./Feedback.scss";
import { debounce } from "lodash";

const Feedback = () => {
  const [listFeedback, setListFeedback] = useState([]);
  const [originalListFeedback, setOriginalListFeedback] = useState([]); // Thêm biến tạm thời

  const handleSearch = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let searchEmail = originalListFeedback.filter((item) =>
        item.email_fb.includes(term)
      );
      setListFeedback(searchEmail);
    } else {
      setListFeedback(originalListFeedback); // Sử dụng dữ liệu gốc khi không có từ khóa tìm kiếm
    }
  }, 1000);

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    try {
      let res = await FetchAll();
      if (res && res.data) {
        setListFeedback(res.data);
        setOriginalListFeedback(res.data); // Lưu trữ dữ liệu gốc
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  return (
    <>
      <div className="container my-4">
        <div className="col-4 my-3">
          <input
            className="form-control"
            placeholder="search Customer by email"
            //  value={keyWord}
            onChange={(event) => handleSearch(event)}
          ></input>
        </div>
        {listFeedback &&
          listFeedback.length > 0 &&
          listFeedback.map((item, index) => {
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
};

export default Feedback;