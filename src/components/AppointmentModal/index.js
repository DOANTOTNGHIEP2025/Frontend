import React, { useState } from "react";
import classNames from "classnames/bind";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./AppointmentModal.module.scss";
import Button from "../Button";

const cx = classNames.bind(styles);

export default function AppointmentModal({ children, data = [], onSubmit, disabled = false }) {
  const [modal, setModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const dayName = Object.keys(dayToIndexMap).find(
      (key) => dayToIndexMap[key] === date.getDay()
    );

    // Format date as YYYY-MM-DD for comparison
    const formattedDate = date.toLocaleDateString("en-CA");

    // Kiểm tra xem có dữ liệu 'data' không và đảm bảo rằng nó là một mảng
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      setAvailableTimes([]);
      return;
    }

    console.log('Full data:', data);
    
    // Filter based on both day of week and specific date
    const filteredItems = data.filter((item) => {
      // If item has a specific date, it must match exactly
      if (item.date) {
        return item.date === formattedDate;
      }
      // Otherwise fall back to day of week match
      return item.day === dayName;
    });
    
    console.log('Filtered items:', filteredItems);
    
    const filteredTimes = filteredItems.map((item) => `${item.start_time} - ${item.end_time}`);
    setAvailableTimes(filteredTimes);
    setSelectedTime(""); 
    
    // Log for debugging
    console.log('Selected day:', dayName);
    console.log('Date object:', date);
    console.log('Day of week:', date.getDay());
    console.log('Formatted date:', formattedDate);
    console.log('Available times:', filteredTimes);
  };
  
  // Get available times for a specific day and date
  const getAvailableTimesForDay = (dayName, dateStr) => {
    if (!Array.isArray(data)) return [];
    
    return data
      .filter((item) => {
        // If item has a specific date, it must match exactly
        if (item.date) {
          return item.date === dateStr;
        }
        // Otherwise fall back to day of week match
        return item.day === dayName;
      })
      .map((item) => `${item.start_time} - ${item.end_time}`);
  };
  
  // Custom day content to display available times
  const dayContent = ({date, view}) => {
    if (view === 'month') {
      const dayName = Object.keys(dayToIndexMap).find(
        (key) => dayToIndexMap[key] === date.getDay()
      );
      
      // Log để debug
      console.log("Rendering content for day:", dayName, "Date:", date);
      
      // Đảm bảo rằng data là một mảng hợp lệ
      if (!Array.isArray(data)) {
        console.error("Invalid data format:", data);
        return (
          <div className={cx("calendar-day-content")}>
            <span className={cx("day-number")}>{date.getDate()}</span>
            <div className={cx("day-available-times")}>
              <span className={cx("no-time")}>Lỗi dữ liệu</span>
            </div>
          </div>
        );
      }
        // Format date for comparison with specific dates in data
      const formattedDate = date.toLocaleDateString("en-CA"); // YYYY-MM-DD format
        // Get times for this day, considering both day of week and specific dates
      const filteredItems = data.filter((item) => {
        // If item has a specific date, it must match exactly
        if (item.date) {
          return item.date === formattedDate;
        }
        // Otherwise fall back to day of week match
        return item.day === dayName;
      });
      
      console.log("Filtered items for day:", filteredItems, "Date:", formattedDate);
      
      // Separate specific date items from regular weekly items
      const specificDateItems = filteredItems.filter(item => item.date);
      const regularItems = filteredItems.filter(item => !item.date);
      
      console.log("Specific date items:", specificDateItems);
      console.log("Regular weekly items:", regularItems);
      
      // Generate display strings and raw time values - prioritize specific date items
      const times = [
        // First show specific date items with a special marker
        ...specificDateItems.map(item => 
          `${item.start_time} - ${item.end_time} ⭐ (Giới hạn: ${item.appointment_limit || 'N/A'})`
        ),
        // Then show regular items
        ...regularItems.map(item => 
          `${item.start_time} - ${item.end_time} (Giới hạn: ${item.appointment_limit || 'N/A'})`
        )
      ];
      
      const rawTimes = filteredItems.map((item) => `${item.start_time} - ${item.end_time}`);
      
      // Click handler for time slots
      const handleTimeClick = (e, timeIndex) => {
        e.stopPropagation(); // Prevent calendar date selection
        setSelectedDate(date);
        setSelectedTime(rawTimes[timeIndex]);
        console.log("Selected time slot:", rawTimes[timeIndex], "for date:", date);
      };
      
      // Always return structured content for consistent layout
      return (
        <div className={cx("calendar-day-content")}>
          <span className={cx("day-number")}>{date.getDate()}</span>
          <div className={cx("day-available-times")}>
            {times.length > 0 ? (
              times.map((time, index) => (
                <span 
                  key={index} 
                  className={cx("day-time", { 'selected-time': date.toDateString() === selectedDate.toDateString() && rawTimes[index] === selectedTime })}
                  onClick={(e) => handleTimeClick(e, index)}
                >                  {time.includes('⭐') ? (
                    <>
                      <span className={cx("specific-marker")} data-specific-date="true">★</span>
                      {time.replace('⭐', '').trim()}
                    </>
                  ) : time}
                </span>
              ))
            ) : (
              <span className={cx("no-time")}>Không có giờ khám</span>
            )}
          </div>
        </div>
      );
    }
    return null;
  };  const handleSubmitActiveHour = async () => {
    try {
      // Kiểm tra ngày và khung giờ
      if (!selectedDate) {
        alert("Vui lòng chọn ngày!");
        return;
      }

      const formattedDate = selectedDate.toLocaleDateString("en-CA"); 
      const dayIndex = selectedDate.getDay();
      const dayName = Object.keys(dayToIndexMap).find(
        (key) => dayToIndexMap[key] === dayIndex
      );

      // Kiểm tra đã chọn khung giờ hay chưa
      if (!selectedTime || typeof selectedTime !== 'string') {
        alert("Vui lòng chọn khung giờ!");
        return;
      }
        
      // Phân tích khung giờ an toàn
      let startTime, endTime;
      
      try {
        // Chia chuỗi thời gian theo định dạng "HH:MM - HH:MM"
        const timeParts = selectedTime.split(" - ");
        
        // Đảm bảo định dạng hợp lệ
        if (timeParts.length !== 2) {
          throw new Error("Định dạng thời gian không hợp lệ");
        }
        
        [startTime, endTime] = timeParts;
        
        // Kiểm tra giá trị rỗng
        if (!startTime || !endTime) {
          throw new Error("Thời gian không hợp lệ");
        }
      } catch (error) {
        console.error("Lỗi phân tích thời gian:", error, "selectedTime:", selectedTime);
        alert("Lỗi: " + (error.message || "Định dạng thời gian không hợp lệ!"));
        return;
      }
      
      // Tìm khung giờ hoạt động phù hợp
      const matchingActiveHours = Array.isArray(data) ? data.filter(item => {
        // Kiểm tra khung giờ cụ thể cho ngày
        if (item.date === formattedDate && 
            item.start_time === startTime && 
            item.end_time === endTime) {
          return true;
        }
        // Kiểm tra khung giờ theo lịch hàng tuần
        else if (!item.date && 
                 item.day === dayName && 
                 item.start_time === startTime && 
                 item.end_time === endTime) {
          return true;
        }
        return false;
      }) : [];      // Log dữ liệu để kiểm tra lỗi
      console.log("Dữ liệu lịch hẹn đã chọn:", {
        formattedDate,
        dayName,
        selectedTime,
        startTime,
        endTime,
        fullDate: selectedDate,
        matchingActiveHours
      });
      
      // Kiểm tra xem có phải là lịch khám ngày cụ thể
      const hasSpecificDateSchedule = matchingActiveHours.some(hour => hour.date === formattedDate);
      
      // Tạo định dạng ngày đúng chuẩn cho frontend hiển thị
      // Format: "Monday 2024-05-20" với 2024-05-20 là ngày cụ thể (hoặc chỉ "Monday" nếu là lịch định kỳ)
      const appointmentDay = hasSpecificDateSchedule 
        ? `${dayName} ${formattedDate}` // Nếu có lịch ngày cụ thể, đánh dấu là lịch cụ thể
        : dayName; // Nếu không, là lịch định kỳ hàng tuần
        
      console.log("Ngày lịch hẹn được gửi:", appointmentDay, "Định dạng lịch:", hasSpecificDateSchedule ? "Ngày cụ thể" : "Hàng tuần");
      
      // Gọi hàm callback với đúng định dạng ngày
      onSubmit(appointmentDay, startTime, endTime);

      // Đóng modal sau khi hoàn tất
      setModal(!modal);
    } catch (error) {
      // Xử lý lỗi tổng thể
      console.error("Lỗi trong handleSubmitActiveHour:", error);
      alert("Có lỗi xảy ra: " + (error.message || "Không thể tạo lịch hẹn"));
    }
  };

  const dayToIndexMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  const getHighlightedDates = () => {
    if (!Array.isArray(data)) return []; 
    return data
      .map((item) => dayToIndexMap[item.day])
      .filter((dayIndex) => dayIndex !== undefined);
  };
    // Sửa hàm tileClassName để hiển thị ngày đúng
  const tileClassName = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const highlightedDays = getHighlightedDates();
    
    // Format date for comparison with specific dates in data
    const formattedDate = date.toLocaleDateString("en-CA"); // YYYY-MM-DD format
    
    // Check if this date has specific date schedules
    const hasSpecificDateSchedule = Array.isArray(data) && 
      data.some(item => item.date === formattedDate);
      
    // Build class names array
    const classNames = [];
    
    if (date.toDateString() === selectedDate.toDateString()) {
      classNames.push(cx("selected-day"));
    }

    if (date.toDateString() === today.toDateString()) {
      classNames.push(cx("today"));
    }
    
    // Special styling for dates with specific schedules
    if (hasSpecificDateSchedule) {
      classNames.push(cx("specific-date-day"));
    }
    // Regular styling for days that have recurring schedules
    else if (highlightedDays.includes(date.getDay()) && date >= today) {
      classNames.push(cx("highlighted-day"));
    }
    
    return classNames.join(" ");
  };
  
  // Cải thiện hàm tileDisabled để hiển thị đúng các ngày trong lịch
  const tileDisabled = ({ date }) => {
    // Log date info for debugging
    console.log("Checking date:", date, "day:", date.getDay());
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const highlightedDays = getHighlightedDates();
    console.log("Highlighted days:", highlightedDays);

    // Chỉ disable ngày trong quá khứ
    if (date < today) {
      return true;
    }
    
    // Nếu không có dữ liệu thì cho phép chọn tất cả ngày trong tương lai
    if (!Array.isArray(data) || data.length === 0) {
      return false;
    }
    
    // Kiểm tra xem ngày hiện tại có nằm trong danh sách ngày có lịch khám không
    const isDisabled = !highlightedDays.includes(date.getDay());
    return isDisabled;
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button type="button" className={cx('modal-button')} disabled={disabled} onClick={toggleModal}>
        {children}
      </button>

      {modal && (
        <div className={cx("modal")}>
          <div onClick={toggleModal} className={cx("overlay")}></div>
          <div className={cx("modal-content")}>
            <h1 className={cx("title")}>Chọn ngày và giờ làm việc</h1>

            <div className={cx("calendar-container")}>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileClassName={tileClassName}
                tileDisabled={tileDisabled}
                tileContent={dayContent}
                showNeighboringMonth={true}
                next2Label={null}
                prev2Label={null}
                maxDetail="month"
                minDetail="month"
                defaultView="month"
                defaultActiveStartDate={new Date()}
                showFixedNumberOfWeeks={true}
              />
            </div>
              <div className={cx("field-container")}>
              <div className={cx('selected-info')}>
                {selectedTime && <span>Đã chọn khung giờ: {selectedTime}</span>}
              </div>
                <select
                id="time-select"
                value={selectedTime}
                className={cx('timePicker')}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Chọn giờ</option>
                {availableTimes.length > 0 ? (
                  availableTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>Không có khung giờ khả dụng</option>
                )}
              </select>
            </div>

            <div className={cx("button-container")}>
              <Button type='button' submitTwo onClick={handleSubmitActiveHour}>
                Thêm giờ khám
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
