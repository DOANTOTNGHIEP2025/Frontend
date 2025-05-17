// This is a fix for the DateModal component's handleSubmitActiveHour function

// First, let's fix the time handlers
const handleStartTimeChange = (newDateTime) => {
  setStartTimeValue(newDateTime);
  if (newDateTime && typeof newDateTime.format === 'function') {
    const formattedTime = newDateTime.format("HH:mm"); 
    setStartTime(formattedTime); 
  } else {
    setStartTime('');
  }
};

const handleEndTimeChange = (newDateTime) => {
  setEndTimeValue(newDateTime);
  if (newDateTime && typeof newDateTime.format === 'function') {
    const formattedTime = newDateTime.format("HH:mm"); 
    setEndTime(formattedTime); 
  } else {
    setEndTime('');
  }
};

// Fix the useEffect hook for parsing hourData
useEffect(() => {
  if (type === "update" && hourData) {
    try {
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

      // Always show time inputs in update mode
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

// Fix the handleSubmitActiveHour function
const handleSubmitActiveHour = async () => {
  if (!selectedDate) {
    alert("Vui lòng chọn thứ!");
    return;
  }

  if (!startTime) {
    alert("Vui lòng chọn thời gian bắt đầu!");
    return;
  }

  if (!endTime) {
    alert("Vui lòng chọn thời gian kết thúc!");
    return;
  }

  if (!appointmentLimit) {
    alert("Vui lòng nhập giới hạn số lượng!");
    return;
  }

  const limit = Number(appointmentLimit);
  if (isNaN(limit) || limit <= 0) {
    alert("Giới hạn số lượng phải lớn hơn 0");
    return;
  }

  if (startTimeValue && endTimeValue && startTimeValue >= endTimeValue) {
    alert("Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc");
    return;
  }
    
  // Get specific date for this active hour (in YYYY-MM-DD format)
  let specificDate = null;
  
  try {
    if (calendarValue && calendarValue instanceof Date && !isNaN(calendarValue.getTime())) {
      specificDate = calendarValue.toLocaleDateString('en-CA');
    }
  } catch (err) {
    console.error("Error formatting date:", err);
    alert("Có lỗi với định dạng ngày. Vui lòng thử lại.");
    return;
  }
  
  // Make sure the selected date's day matches the selected weekday
  if (calendarValue && calendarValue instanceof Date && !isNaN(calendarValue.getTime())) {
    try {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = daysOfWeek[calendarValue.getDay()];
      
      if (dayOfWeek !== selectedDate) {
        alert(`Ngày bạn đã chọn (${calendarValue.toLocaleDateString()}) là ${dayOfWeek}, không phải ${selectedDate}. Vui lòng chọn lại.`);
        return;
      }
    } catch (err) {
      console.error("Error validating date:", err);
      alert("Có lỗi với ngày đã chọn. Vui lòng thử lại.");
      return;
    }
  }
    
  // Format the date nicely for the confirmation dialog
  let formattedDate = null;
  try {
    formattedDate = calendarValue ? calendarValue.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : null;
  } catch (err) {
    console.error("Error formatting date for display:", err);
  }
  
  let useSpecificDate = false;
  
  if (calendarValue) {
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
  
  // Make sure we have a valid _id
  if (!data || !data._id) {
    console.error("Missing doctor ID");
    alert("Thiếu thông tin bác sĩ. Vui lòng thử lại.");
    return;
  }
  
  try {
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
      const activeHourWithDisplay = newActiveHour.map(hour => {
        if (hour.date) {
          // Format to display specific date info
          return {
            ...hour,
            displayName: `${hour.day} (${hour.date}) ${hour.start_time}-${hour.end_time}`
          };
        }
        return hour;
      });
      
      onAddActiveHour(activeHourWithDisplay);
      setModal(!modal);
      setStartTime('');
      setEndTime('');
      setAppointmentLimit('');
      setStartTimeValue(null);
      setEndTimeValue(null);
      setSelectedDate('');
      alert("Thêm giờ làm việc thành công!");
    } else if (newActiveHour && typeof newActiveHour !== 'object') {
      alert(newActiveHour);
    } else {
      alert("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  } catch (err) {
    console.error("Error submitting active hour:", err);
    alert("Có lỗi xảy ra khi thêm giờ làm việc. Vui lòng thử lại.");
  }
};
