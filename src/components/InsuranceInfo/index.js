import React, { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import styles from './InsuranceInfo.module.scss';
import Button from "../Button";
import useAppointment from "../../hook/useAppointment";
import CustomToast from '../../components/CustomToast'; // hoặc đường dẫn phù hợp
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const InsuranceInfo = ({ userInfo }) => {
  const [insuranceName, setInsuranceName] = useState('');
  const [insuranceID, setInsuranceID] = useState('');
  const [location, setLocation] = useState('');
  const [expiredDate, setExpiredDate] = useState(null);
  const [insuranceList, setInsuranceList] = useState([]);
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [ , , , getAllAppointmentByUserID, , , addInsurance ] = useAppointment();
  const [editingInsurance, setEditingInsurance] = useState(null);

  useEffect(() => {
    const fetchInsurance = async () => {
      const localStorageInsurance = localStorage.getItem('userInsurance');
      
      if (localStorageInsurance) {
        try {
          const parsedInsurance = JSON.parse(localStorageInsurance);
          if (Array.isArray(parsedInsurance) && parsedInsurance.length > 0) {
            setInsuranceList(parsedInsurance);
            return;
          }
        } catch (error) {
          console.error('Error parsing insurance from localStorage:', error);
        }
      }
      
      if (userInfo?._id) {
        const appointments = await getAllAppointmentByUserID(userInfo?._id);
        if (appointments && appointments.length > 0) {
          const appointment = appointments.find(app => app.insurance && app.insurance.length > 0);
          if (appointment) {
            setAppointmentInfo(appointment);
            setInsuranceList(appointment.insurance || []);
            localStorage.setItem('userInsurance', JSON.stringify(appointment.insurance));
          }
        }
      }
    };

    fetchInsurance();
  }, [userInfo]);

  const toDateInputFormat = (date) => {
    if (!date) return '';
    try {
      const parts = date.split('-');
      if (parts.length === 3) {
        return date;
      }
      return '';
    } catch (e) {
      return '';
    }
  };

  
  const handleExpiredDateChange = (e) => {
    const date = new Date(e.target.value);
    if (!isNaN(date)) {
      setExpiredDate(toDateInputFormat(e.target.value));
    }
  };
  
  
  const handleAddInsurance = async () => {
    if (!insuranceName || !insuranceID || !location || !expiredDate) {
      toast(<CustomToast message="Bạn chưa nhập đủ thông tin bảo hiểm" type="error" />);
      return;
    }

    const newInsurance = {
      _id: Date.now().toString(),
      name: insuranceName,
      number: insuranceID,
      location: location,
      exp_date: expiredDate
    };

    let currentInsurance = [];
    try {
      const localStorageInsurance = localStorage.getItem('userInsurance');
      if (localStorageInsurance) {
        currentInsurance = JSON.parse(localStorageInsurance);
        currentInsurance.push(newInsurance);
      } else {
        currentInsurance = [newInsurance];
      }
      
      localStorage.setItem('userInsurance', JSON.stringify(currentInsurance));
      setInsuranceList(currentInsurance);
    } catch (error) {
      console.error('Error updating insurance in localStorage:', error);
    }

    if (!appointmentInfo) {
      try {
        const appointments = await getAllAppointmentByUserID(userInfo?._id);
        if (appointments && appointments.length > 0) {
          const appointment = appointments[0];
          setAppointmentInfo(appointment);
          await addInsurance(appointment._id, insuranceName, insuranceID, location, expiredDate);

          const updatedAppointments = await getAllAppointmentByUserID(userInfo?._id);
          if (updatedAppointments && updatedAppointments.length > 0) {
            const updatedAppointment = updatedAppointments.find(app => app.insurance && app.insurance.length > 0) || updatedAppointments[0];
            setInsuranceList(updatedAppointment.insurance || []);
            setAppointmentInfo(updatedAppointment);
          }
        } else {
          toast(<CustomToast message="Thông tin bảo hiểm của bạn đã được lưu và sẽ được sử dụng cho các lần đặt lịch khám sau này." type="error" />);
        }
      } catch (error) {
        toast(<CustomToast message="Có lỗi xảy ra khi thêm thông tin bảo hiểm!" type="error" />);
        console.error(error);
        return;
      }
    }

    setInsuranceName('');
    setInsuranceID('');
    setLocation('');
    setExpiredDate(null);

    toast(<CustomToast message="Thêm bảo hiểm thành công!" type="success" />);
  };

  return (
    <div className={cx('insurance-info-container')}>
      <h3 className={cx('title')}>THÔNG TIN BẢO HIỂM Y TẾ</h3>
      <div className={cx('separator')}></div>
      
      {insuranceList.length > 0 ? (
        <div className={cx('insurance-list')}>
          <h4>Thẻ bảo hiểm đã đăng ký:</h4>
          <div className={cx('table-container')}>
            <table className={cx('insurance-table')}>
              <thead>
                <tr>
                  <th>Tên bảo hiểm</th>
                  <th>Mã số</th>
                  <th>Nơi cấp</th>
                  <th>Ngày hết hạn</th>
                </tr>
              </thead>
              <tbody>
                {insuranceList.map((insurance, index) => (
                  <tr key={insurance._id || index}>
                    <td>{insurance.name}</td>
                    <td>{insurance.number}</td>
                    <td>{insurance.location}</td>
                    <td>{insurance.exp_date}</td>
                    {/* <td>
                      <button onClick={() => handleDeleteInsurance(insurance._id)}>Xóa</button>
                    </td> */}
                    {/* <td>
                      <button onClick={() => handleEditInsurance(insurance._id)}>Chỉnh sửa</button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className={cx('no-insurance')}>
          <p>Bạn chưa đăng ký thông tin bảo hiểm y tế nào.</p>
          <p>Vui lòng thêm thông tin bảo hiểm để sử dụng khi đặt lịch khám.</p>
        </div>
      )}

      {/* Add Insurance Form */}
      <div className={cx('insurance-form')}>
        <h4>Thêm thông tin bảo hiểm mới</h4>
        <div className={cx('form-content')}>
          <div className={cx('form-field')}>
            <label>Tên bảo hiểm</label>
            <input
              type="text"
              value={insuranceName}
              placeholder="Nhập tên bảo hiểm"
              onChange={(e) => setInsuranceName(e.target.value)}
            />
          </div>
          
          <div className={cx('form-field')}>
            <label>Mã số</label>
            <input
              type="text"
              placeholder="Nhập mã số bảo hiểm"
              value={insuranceID}
              onChange={(e) => setInsuranceID(e.target.value)}
            />
          </div>
          
          <div className={cx('form-field')}>
            <label>Nơi cấp</label>
            <input
              type="text"
              placeholder="Nhập nơi cấp bảo hiểm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className={cx('form-field')}>
            <label>Ngày hết hạn</label>
            <input
              type="date"
              placeholder="Chọn ngày hết hạn bảo hiểm"
              value={expiredDate || ''}
              onChange={handleExpiredDateChange}
            />
          </div>
          
          <div className={cx('form-actions')}>
          <Button primary onClick={handleAddInsurance}>
            Thêm mới
          </Button>
            {/* <Button primary onClick={handleAddInsurance}>
              Thêm mới
            </Button> */}
          </div>
        </div>
      </div>
      
      <div className={cx('insurance-note')}>
        <p><strong>Lưu ý:</strong> Thông tin bảo hiểm y tế sẽ được sử dụng khi đặt lịch khám.</p>
        <p>Hãy đảm bảo thông tin bảo hiểm của bạn luôn được cập nhật.</p>
      </div>
    </div>
  );
};

export default InsuranceInfo;
