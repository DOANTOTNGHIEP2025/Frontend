import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './DateModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPen } from '@fortawesome/free-solid-svg-icons';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CustomToast from '../../components/CustomToast'; // hoặc đường dẫn phù hợp
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

export default function DateModal({children , disabled = false, data = [], onAddActiveHour, onUpdateActiveHour, type = "add", hourData = ""}) {
  const [modal, setModal] = useState(false);
  const [
    , 
    , 
    , 
    , 
    , 
    , 
    , 
    , 
    , 
    , 
    , 
    addDoctorActiveHour, 
    , 
    , 
    , 
    , 
    , 
    , 
    updateDoctorActiveHour
    ] = useAccount();
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [appointmentLimit, setAppointmentLimit] = useState('');
  const [startTimeValue, setStartTimeValue] = useState(null);
  const [endTimeValue, setEndTimeValue] = useState(null);

  const [isDisabled, setIsDisabled] = useState(false);
  const [originalStartTime, setOriginalStartTime] = useState('');
  const [originalEndTime, setOriginalEndTime] = useState('');
  const [originalDate, setOriginalDate] = useState('');
  const [originalAppointmentLimit, setOriginalAppointmentLimit] = useState('');
  const [hourType, setHourType] = useState('appointment');
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(true);
  const [activeHours, setActiveHours] = useState([]);
  const [showTimeInputs, setShowTimeInputs] = useState(false); // State để kiểm soát hiển thị nhập thời gian

  // Map weekday names to numbers
  const dayToIndexMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  const toggleModal = () => {
    if (disabled) return;
    setModal(!modal);

    // If opening modal, fetch active hours
    if (!modal) {
      if (data && data.active_hours) {
        setActiveHours(data.active_hours);
      }
      
      // Reset showTimeInputs khi mở modal
      if (type === "add") {
        setShowTimeInputs(false);
      } else {
        // Nếu là update, luôn hiển thị phần nhập thời gian
        setShowTimeInputs(true);
      }
    }
  };
  // Get active hours for a specific day
  const getActiveHoursForDay = (dayName) => {
    if (!data || !Array.isArray(data.active_hours)) return [];
    
    return data.active_hours
      .filter(hour => hour.day === dayName)
      .map(hour => ({
        startTime: hour.start_time,
        endTime: hour.end_time,
        limit: hour.appointment_limit
      }));
  };  // Handle calendar date change
  const handleCalendarChange = (date) => {
    // Lưu lại tháng hiện tại trước khi cập nhật giá trị
    const previousMonth = calendarValue ? calendarValue.getMonth() : new Date().getMonth();
    const previousYear = calendarValue ? calendarValue.getFullYear() : new Date().getFullYear();
    
    setCalendarValue(date);
    
    const dayName = Object.keys(dayToIndexMap).find(
      key => dayToIndexMap[key] === date.getDay()
    );
    
    setSelectedDate(dayName);
    
    // Nếu người dùng chọn một ngày trong tháng khác với tháng hiện tại
    // hoặc năm khác với năm hiện tại
    if (date.getMonth() !== previousMonth || date.getFullYear() !== previousYear) {
      // Đây là trường hợp chuyển tháng/năm
      console.log(`Đã chuyển sang: Tháng ${date.getMonth() + 1}, Năm ${date.getFullYear()}`);
      
      // Thêm hiệu ứng chuyển đổi tháng
      const calendarContainer = document.querySelector(`.${cx('calendar-container')}`);
      if (calendarContainer) {
        calendarContainer.classList.add(cx('month-transition'));
        setTimeout(() => {
          calendarContainer.classList.remove(cx('month-transition'));
        }, 500);
      }
    } else {
      // Nếu chỉ chọn ngày trong tháng hiện tại, thì áp dụng hiệu ứng pulse
      const calendarContainer = document.querySelector(`.${cx('calendar-container')}`);
      if (calendarContainer) {
        calendarContainer.classList.add(cx('pulse-animation'));
        setTimeout(() => {
          calendarContainer.classList.remove(cx('pulse-animation'));
        }, 500);
      }
    }
    
    // Hiển thị phần nhập thời gian sau khi chọn ngày
    setShowTimeInputs(true);
  };
  
  // Custom tile content to display active hours
  const dayContent = ({date, view}) => {
    if (view === 'month') {
      const dayName = Object.keys(dayToIndexMap).find(
        key => dayToIndexMap[key] === date.getDay()
      );
      
      const hours = getActiveHoursForDay(dayName);
      
      // Click handler for selecting a time slot directly
      const handleHourClick = (e, hour) => {
        e.stopPropagation(); // Prevent calendar date selection
        setSelectedDate(dayName);
        setStartTime(hour.startTime);
        setEndTime(hour.endTime);
        setAppointmentLimit(hour.limit);
        
        // Create time objects for display
        const startTimeObj = new Date();
        const [startHours, startMinutes] = hour.startTime.split(":").map(Number);
        startTimeObj.setHours(startHours, startMinutes, 0);
        setStartTimeValue(startTimeObj);
  
        const endTimeObj = new Date();
        const [endHours, endMinutes] = hour.endTime.split(":").map(Number);
        endTimeObj.setHours(endHours, endMinutes, 0);
        setEndTimeValue(endTimeObj);
      };
      
      // Always return structured content for consistent layout
      return (
        <div className={cx("calendar-day-content")}>
          <span className={cx("day-number")}>{date.getDate()}</span>
          <div className={cx("day-available-times")}>
            {hours.length > 0 ? (
              hours.map((hour, index) => (
                <span 
                  key={index} 
                  className={cx("day-time", { 'selected-time': selectedDate === dayName && startTime === hour.startTime && endTime === hour.endTime })}
                  onClick={(e) => handleHourClick(e, hour)}
                >
                  {hour.startTime} - {hour.endTime} (Giới hạn: {hour.limit})
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
  };
  // Existing code for handling date modal functionality
  useEffect(() => {
    if (type === "update" && hourData) {
      try {
        if (!hourData || typeof hourData !== 'string') {
          console.error("Invalid hourData:", hourData);
          return;
        }
        
        const parts = hourData.split(" ");
        if (parts.length < 5) {
          console.error("Invalid hourData format:", hourData);
          return;
        }
        
        const day = parts[0];
        const start_time = parts[1];
        const end_time = parts[2];
        const appointment_limit = parts[4];
        const hour_type = parts.length > 5 ? parts[5] : "appointment";
        
        // Check if there's a date part in the format "Date: YYYY-MM-DD"
        let specificDate = null;
        const dateIndex = parts.indexOf("Date:");
        if (dateIndex !== -1 && dateIndex + 1 < parts.length) {
          specificDate = parts[dateIndex + 1];
        }
        
        console.log("Parsed schedule data:", {
          day,
          start_time,
          end_time,
          appointment_limit,
          hour_type,
          specificDate
        });
  
        setSelectedDate(day);
        setStartTime(start_time);
        setEndTime(end_time);
        setAppointmentLimit(appointment_limit);
        setHourType(hour_type);
        setOriginalDate(day);
        setOriginalStartTime(start_time);
        setOriginalEndTime(end_time);
        setOriginalAppointmentLimit(appointment_limit);
        
        // If we found a specific date, update the calendar
        if (specificDate) {
          try {
            const dateObj = new Date(specificDate);
            if (!isNaN(dateObj.getTime())) {
              setCalendarValue(dateObj);
            } else {
              console.error("Invalid date format:", specificDate);
            }
          } catch (err) {
            console.error("Error parsing date:", err);
          }
        }

        // Luôn hiển thị phần nhập thời gian khi là chế độ cập nhật
        setShowTimeInputs(true);

        try {
          // Only attempt to parse time if it's a valid format
          if (start_time && typeof start_time === 'string' && start_time.includes(":")) {
            const startTimeObj = new Date();        
            const [startHours, startMinutes] = start_time.split(":").map(Number);
            if (!isNaN(startHours) && !isNaN(startMinutes)) {
              startTimeObj.setHours(startHours, startMinutes, 0);
              setStartTimeValue(startTimeObj);
            }
          }
          
          if (end_time && typeof end_time === 'string' && end_time.includes(":")) {
            const endTimeObj = new Date();
            const [endHours, endMinutes] = end_time.split(":").map(Number);
            if (!isNaN(endHours) && !isNaN(endMinutes)) {
              endTimeObj.setHours(endHours, endMinutes, 0);
              setEndTimeValue(endTimeObj);
            }
          }
        } catch (err) {
          console.error("Error parsing time values:", err);
        }
      } catch (err) {
        console.error("Error parsing hourData:", err, hourData);
      }
    }
  }, [type, hourData]);
  useEffect(() => {
    if (type === "update") {
      if (selectedDate === originalDate) {
        setIsDisabled(true);
      }
      else {
        setIsDisabled(false);
      }
    }
  },[selectedDate, originalDate, type]);

  useEffect(() => {
    if (type === "update") {
      if (startTime === originalStartTime) {
        setIsDisabled(true);
      }
      else {
        setIsDisabled(false);
      }
    }
  },[startTime, originalStartTime, type]);
  useEffect(() => {
    if (type === "update") {
      if (endTime === originalEndTime) {
        setIsDisabled(true);
      }
      else {
        setIsDisabled(false);
      }
    }
  },[endTime, originalEndTime, type]);

  useEffect(() => {
    if (type === "update") {
      if (appointmentLimit === originalAppointmentLimit) {
        setIsDisabled(true);
      }
      else {
        setIsDisabled(false);
      }
    }
  },[appointmentLimit, originalAppointmentLimit, type]);

  // Helper function to create active hour object
  const generateActiveHourObject = (day, startTime, endTime, appointmentLimit, date = null) => {
    return {
      day,
      start_time: startTime,
      end_time: endTime,
      appointment_limit: appointmentLimit,
      hour_type: "appointment",
      date: date
    };
  };
  const handleStartTimeChange = (newDateTime) => {
     setStartTimeValue(newDateTime);
     if (newDateTime && typeof newDateTime.format === 'function') {
      const formattedTime = newDateTime.format("HH:mm"); 
      setStartTime(formattedTime); 
     }
     else{
      setStartTime('');
     }
  }

  const handleEndTimeChange = (newDateTime) => {
    setEndTimeValue(newDateTime);
    if (newDateTime && typeof newDateTime.format === 'function') {
     const formattedTime = newDateTime.format("HH:mm"); 
     setEndTime(formattedTime); 
    }
    else {
     setEndTime('');
    }
  };
  
  const handleSubmitActiveHour = async () => {
    try {
      if (!selectedDate) {
        toast(<CustomToast message="Vui lòng chọn thứ!" type="error" />);
        return;
      }

      if (!startTime) {
        toast(<CustomToast message="Vui lòng chọn thời gian bắt đầu!" type="error" />);
        return;
      }

      if (!endTime) {
        toast(<CustomToast message="Vui lòng chọn thời gian kết thúc!" type="error" />);
        return;
      }

      if (!appointmentLimit) {
        toast(<CustomToast message="Vui lòng nhập giới hạn số lượng!" type="error" />);
        return;
      }

      const limit = Number(appointmentLimit);
      if (isNaN(limit) || limit <= 0) {
        toast(<CustomToast message="Giới hạn số lượng phải lớn hơn 0" type="error" />);
        return;
      }

      if (startTimeValue && endTimeValue && startTimeValue >= endTimeValue) {
        toast(<CustomToast message="Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc" type="error" />);
        return;
      }
        
      // Get specific date for this active hour (in YYYY-MM-DD format)
      let specificDate = null;
      if (calendarValue && calendarValue instanceof Date && !isNaN(calendarValue.getTime())) {
        specificDate = calendarValue.toLocaleDateString('en-CA');
      }
      
      // Make sure the selected date's day matches the selected weekday
      if (calendarValue && calendarValue instanceof Date && !isNaN(calendarValue.getTime())) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[calendarValue.getDay()];
        
        if (dayOfWeek !== selectedDate) {
          toast(<CustomToast message={`Ngày bạn đã chọn (${calendarValue.toLocaleDateString()}) là ${dayOfWeek}, không phải ${selectedDate}. Vui lòng chọn lại.`} />);
          return;
        }
      }
        
      // Format the date nicely for the confirmation dialog
      let formattedDate = null;
      if (calendarValue && calendarValue instanceof Date && !isNaN(calendarValue.getTime())) {
        formattedDate = calendarValue.toLocaleDateString('vi-VN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      
      let useSpecificDate = false;
      
      if (calendarValue && calendarValue instanceof Date && !isNaN(calendarValue.getTime())) {
        // Ask user if they want to create a schedule for just this specific date
        useSpecificDate = window.confirm(
          "🗓️ XÁC NHẬN LỊCH LÀM VIỆC\n\n" +
          "Bạn muốn tạo lịch khám cho:\n\n" +
          "✅ Chọn OK để tạo lịch cho riêng ngày " + (formattedDate || "đã chọn") + " (Khuyến nghị)\n\n" +
          "❌ Chọn Cancel để tạo lịch cho tất cả các ngày " + selectedDate + " trong tương lai (Không khuyến nghị)"
        );
      } else {
        // If no specific date is selected, confirm they want a recurring schedule
        const confirmRecurring = window.confirm(
          "⚠️ Xác nhận tạo lịch khám định kỳ\n\n" +
          "Bạn đang tạo lịch khám định kỳ cho tất cả các ngày " + selectedDate + " trong tương lai.\n\n" +
          "Nhấn OK để tiếp tục hoặc Cancel để hủy và chọn một ngày cụ thể."
        );
        
        if (!confirmRecurring) return;
        useSpecificDate = false; // No specific date, create recurring schedule
      }
      
      if (!data || !data._id) {
        console.error("Missing doctor ID", data);
        toast(<CustomToast message="Thiếu thông tin bác sĩ. Vui lòng thử lại." type="error" />);
        return;
      }
      
      const newActiveHour = await addDoctorActiveHour(
        data._id,
        selectedDate,
        startTime,
        endTime,
        "appointment",
        appointmentLimit,
        useSpecificDate ? specificDate : null // Include specific date only if user confirmed
      );
      
      if (newActiveHour && typeof newActiveHour === 'object') {
        // Create local object with additional date info for display
        const activeHourWithDisplay = Array.isArray(newActiveHour) ? newActiveHour.map(hour => {
          if (hour.date) {
            // Format to display specific date info
            return {
              ...hour,
              displayName: `${hour.day} (${hour.date}) ${hour.start_time}-${hour.end_time}`
            };
          }
          return hour;
        }) : [];
        
        // Call the callback function if provided
        if (typeof onAddActiveHour === 'function') {
          onAddActiveHour(activeHourWithDisplay);
        }
        
        setModal(!modal);
        setStartTime('');
        setEndTime('');
        setAppointmentLimit('');
        setStartTimeValue(null);
        setEndTimeValue(null);
        setSelectedDate('');
        toast(<CustomToast message="Thêm giờ làm việc thành công!" type="error" />);
      } else if (newActiveHour && typeof newActiveHour !== 'object') {
        toast(<CustomToast message={newActiveHour} type="success" />);

      } else {      toast(<CustomToast message="Có lỗi xảy ra, vui lòng thử lại sau!" type="error" />);
      }
    } catch (err) {
      console.error("Error submitting active hour:", err);
      toast(<CustomToast message="Có lỗi xảy ra khi thêm giờ làm việc. Vui lòng thử lại." type="error" />);
    }
  };
  
  const handleUpdateActiveHour = async () => {
    try {
      if (!selectedDate) {
        toast(<CustomToast message="Vui lòng chọn thứ!" type="error" />);
        return;
      }
    
      if (!startTime) {
        toast(<CustomToast message="Vui lòng chọn thời gian bắt đầu!" type="error" />);
        return;
      }
    
      if (!endTime) {
       
        toast(<CustomToast message="Vui lòng chọn thời gian kết thúc" type="error" />);
        return;
      }
    
      const limit = Number(appointmentLimit);
      if (isNaN(limit) || limit <= 0) {
     
        toast(<CustomToast message="Giới hạn số lượng phải lớn hơn 0" type="error" />);
        return;
      }
    
      if (startTimeValue && endTimeValue && startTimeValue >= endTimeValue) {
    
        toast(<CustomToast message="Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc" type="error" />);
        return;
      }
      
      // Get specific date for the active hour (in YYYY-MM-DD format)
      let specificDate = null;
      if (calendarValue && calendarValue instanceof Date && !isNaN(calendarValue.getTime())) {
        specificDate = calendarValue.toLocaleDateString('en-CA');
      }
      
      // Format the date nicely for the confirmation dialog
      let formattedDate = null;
      if (calendarValue && calendarValue instanceof Date && !isNaN(calendarValue.getTime())) {
        formattedDate = calendarValue.toLocaleDateString('vi-VN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      
      const userConfirmed = window.confirm(
        "🔄 XÁC NHẬN CẬP NHẬT\n\n" +
        "Bạn có chắc chắn muốn chỉnh sửa giờ khám này?\n\n" +
        `Ngày: ${formattedDate || selectedDate}\n` +
        `Thời gian: ${startTime} - ${endTime}\n` +
        `Giới hạn lượt khám: ${appointmentLimit}`
      );
      
      if (userConfirmed) {
        // Extract original date from hourData if it exists (using Date: format)
        let originalSpecificDate = null;
        if (hourData && typeof hourData === 'string') {
          const parts = hourData.split(" ");
          const dateIndex = parts.indexOf("Date:");
          if (dateIndex !== -1 && dateIndex + 1 < parts.length) {
            originalSpecificDate = parts[dateIndex + 1];
          }
        }
        
        if (!data || !data._id) {
          console.error("Missing doctor ID", data);
          toast(<CustomToast message="Thiếu thông tin bác sĩ. Vui lòng thử lại." type="error" />);
          return;
        }
        
        const editedActiveHour = await updateDoctorActiveHour(
          data._id, 
          selectedDate, 
          startTime, 
          endTime, 
          hourType, 
          appointmentLimit, 
          originalDate, 
          originalStartTime, 
          originalEndTime, 
          hourType,
          specificDate,  // Add the specific date
          originalSpecificDate  // Add the original specific date
        );
    
        if (editedActiveHour && typeof editedActiveHour === 'object') {
          toast(<CustomToast message="Cập nhật giờ làm việc thành công!" type="error" />);
          const newActiveHour = generateActiveHourObject(selectedDate, startTime, endTime, appointmentLimit, specificDate);
          const oldActiveHour = generateActiveHourObject(originalDate, originalStartTime, originalEndTime, originalAppointmentLimit, originalSpecificDate);
          setOriginalDate(selectedDate);
          setOriginalStartTime(startTime);
          setOriginalEndTime(endTime);
          setOriginalAppointmentLimit(appointmentLimit);
          setIsDisabled(true);
          
          // Call the callback function if provided
          if (typeof onUpdateActiveHour === 'function') {
            onUpdateActiveHour(newActiveHour, oldActiveHour);
          }
          
          return;
        }
        else if (editedActiveHour && typeof editedActiveHour !== 'object') {
          toast(<CustomToast message={editedActiveHour} type="success" />);

          return;
        }
        else {
          toast(<CustomToast message="Có lỗi xảy ra, vui lòng thử lại sau!" type="error" />);
          return;
        }      }
    } catch (err) {
      console.error("Error updating active hour:", err);
      toast(<CustomToast message="Có lỗi xảy ra khi cập nhật giờ làm việc. Vui lòng thử lại." type="error" />);
    }
  };


  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  const toggleCalendarView = () => {
    // Always show calendar by default (make it true)
    setShowCalendar(true);
  };

  return (
    <>
      <Button type={type === "add" ? "submit" : "update"} disabled={disabled} leftIcon={type === "add" ? <FontAwesomeIcon icon={faCirclePlus} /> : <FontAwesomeIcon icon={faPen} />} onClick={toggleModal}>
        {children}
      </Button>

      {modal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
          <div className={cx('modal-content')}>
            <div className={cx('modal-field-container')}>
              <div className={cx('field-container')}>
                <div className={cx('field-name')}>
                  <span>Chọn thứ</span>
                </div>
                <div className={cx('date-selection-container')}>
                  <select 
                    className={cx('field-input', { 'hidden': showCalendar })} 
                    value={selectedDate} 
                    onChange={(e) => {setSelectedDate(e.target.value)}}
                  >
                    <option value=''>Chọn thứ</option>
                    <option value='Monday'>Monday</option>
                    <option value='Tuesday'>Tuesday</option>
                    <option value='Wednesday'>Wednesday</option>
                    <option value='Thursday'>Thursday</option>
                    <option value='Friday'>Friday</option>
                    <option value='Saturday'>Saturday</option>
                    <option value='Sunday'>Sunday</option>
                  </select>
                  <div className={cx('selected-info')}>
                    {selectedDate && (
                      <span>
                        <strong>Đã chọn:</strong> {selectedDate} - {calendarValue?.toLocaleDateString('vi-VN', {
                          day: 'numeric', 
                          month: 'numeric', 
                          year: 'numeric',
                          weekday: 'long'
                        }).replace(/thứ /i, 'Thứ ')} 
                        {startTime && endTime ? (
                          <span className={cx('time-badge')}>
                            {startTime} - {endTime}
                          </span>
                        ) : ''}
                      </span>
                    )}
                  </div>
                  
                  {showCalendar && (
                    <div className={cx('calendar-container')}>
                      <Calendar
                        onChange={handleCalendarChange}
                        value={calendarValue}
                        tileContent={dayContent}
                        showNeighboringMonth={false}
                        next2Label={null}
                        prev2Label={null}
                        maxDetail="month"
                        minDetail="month"
                        defaultView="month"
                        defaultActiveStartDate={new Date()}
                        showFixedNumberOfWeeks={false}
                        tileClassName={({ date, view }) => {
                          // Chỉ hiển thị các ngày của tháng hiện tại
                          if (view === 'month') {
                            // Lấy tháng hiện tại từ calendarValue
                            const currentMonth = calendarValue.getMonth();
                            // Kiểm tra nếu ngày không thuộc tháng hiện tại
                            if (date.getMonth() !== currentMonth) {
                              return cx('hidden-date-tile');
                            }
                            // Nếu là ngày đang được chọn
                            if (calendarValue && date.toDateString() === calendarValue.toDateString()) {
                              return cx('selected-date-tile');
                            }
                          }
                          return null;
                        }}
                        tileDisabled={({ date, view }) => {
                          // Vô hiệu hóa các ngày không thuộc tháng hiện tại
                          if (view === 'month') {
                            const currentMonth = calendarValue.getMonth();
                            return date.getMonth() !== currentMonth;
                          }
                          return false;
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Chỉ hiển thị phần nhập thời gian khi đã chọn ngày */}
              {showTimeInputs && (
                <div className={cx('time-fields-container')}>
                  <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                      <span>Nhập thời gian bắt đầu</span>
                    </div>
                    <DatePicker
                      disableDayPicker
                      value={startTimeValue}
                      onChange={handleStartTimeChange}
                      placeholder="Chọn thời gian bắt đầu"
                      format="HH:mm"
                      plugins={[<TimePicker position="bottom" hideSeconds={true} hideAMPM={true} />]}
                      style={{
                        width: '100%',
                        height: '36px',
                        borderRadius: '10px',
                        marginBottom: '10px',
                      }}
                    />
                  </div>
                  <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                      <span>Nhập thời gian kết thúc</span>
                    </div>
                    <DatePicker
                      disableDayPicker
                      value={endTimeValue}
                      onChange={handleEndTimeChange}
                      placeholder="Chọn thời gian kết thúc"
                      format="HH:mm"
                      plugins={[<TimePicker position="bottom" hideSeconds={true} hideAMPM={true} />]}
                      style={{
                        width: '100%',
                        height: '36px',
                        borderRadius: '10px',
                        marginBottom: '10px',
                      }}
                    />
                  </div>
                  <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                      <span>Nhập giới hạn số lượng</span>
                    </div>
                    <input 
                      type="number" 
                      placeholder="Nhập giới hạn số lượng" 
                      className={cx('field-input')} 
                      value={appointmentLimit} 
                      onChange={(e)=>{setAppointmentLimit(e.target.value)}}
                    />
                  </div>
                  {
                    type === "add" ? (
                      <Button submitTwo onClick={handleSubmitActiveHour} className={cx('action-button')}>
                        {startTime && endTime ? `Thêm giờ khám (${startTime} - ${endTime})` : 'Thêm giờ khám'}
                      </Button>
                    ) : (
                      <Button submitTwo onClick={handleUpdateActiveHour} disabled={isDisabled} className={cx('action-button')}>
                        {startTime && endTime ? `Sửa giờ khám (${startTime} - ${endTime})` : 'Sửa giờ khám'}
                      </Button>
                    )
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
