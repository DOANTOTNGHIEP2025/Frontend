import React, {useEffect, useState} from 'react';
import {AContainer, AHeader, ALayout, ALeftSide, ARightSide, ARSItem, ASpace, AUnderline} from "./appointment.element";
import useRegion from '../../hook/useRegion';
import useSpeciality from '../../hook/useSpeciality';
import useAccount from '../../hook/useAccount';
import AppointmentModal from '../../components/AppointmentModal';
import useAppointment from '../../hook/useAppointment';
import { useAppContext } from '../../context/AppContext';
import LoadingAnimation from '../../components/LoadingAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import InsuranceCheck from '../../components/InsuranceCheck';
import { toast } from 'react-toastify';
import CustomToast from '../../components/CustomToast'; // hoặc đúng path của bạn


const Appointment = () => {
    const navigate = useNavigate();
    const [regionLoading, regionHook] = useRegion();
    const [specialityLoading, specialityHook] = useSpeciality();
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [filteredDoctor, setFilterDoctor] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [healthIssues, setHealthIssues] = useState('');
    const [typeService, setTypeService] = useState('appointment');
    const [
        , 
        , 
        loadingAccount, 
        , 
        , 
        filterDoctorList, 
        getAccountByEmail, 
        , 
        , 
        , 
        getDoctorActiveList, 
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
        getAccountStatus
        ] = useAccount();
    const [appointmentLoading, , addAppointment, getAllAppointmentByUserID, , , addInsurance] = useAppointment();
    const [doctorActiveHour, setDoctorActiveHour] = useState([]);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentDay, setAppointmentDay] = useState('');
    const [appointmentTimeStart, setAppointmentTimeStart] = useState('');    const [appointmentTimeEnd, setAppointmentTimeEnd] = useState('');
    const [selectedDoctorID, setSelectedDoctorID] = useState('');
    const [userID, setUserID] = useState('');
    const [appointmentInfo, setAppointmentInfo] = useState({});
    const {sharedData, setSharedData} = useAppContext();
    const [userInfo, setUserInfo] = useState({});
    const [hasInsurance, setHasInsurance] = useState(false);
    let intervalId;    
    
    // Handle insurance check result
    const handleInsuranceCheck = (hasInsuranceData) => {
        setHasInsurance(hasInsuranceData);
    };
    
    useEffect(() => {
        const fetchAccount = async () => {
            let item = localStorage.getItem('isLoginSuccess');
            
            if (item) {
                let obj = JSON.parse(item);
                const AccountInfo = await getAccountByEmail(obj?.email);
                setUserID(AccountInfo?._id); 
                setUserInfo(AccountInfo);
            }
        };
        const fetchSharedData = () => {
            if (sharedData) {
                setSelectedRegion(sharedData?.region_id?.name);
                setSelectedSpeciality(sharedData?.speciality_id?.name);
                setSelectedDoctor(sharedData?.username);
                setSelectedDoctorID(sharedData?._id);
                setDoctorActiveHour(sharedData?.active_hours);
            }
        }
        fetchAccount();
        fetchSharedData();
    }, []);

    useEffect(() => {
       const fetchFilterDoctor = async() => {
            const FilteredDoctors = await filterDoctorList(selectedSpeciality, selectedRegion);
            setFilterDoctor(FilteredDoctors);
       }
       if (selectedSpeciality !== '') {
            fetchFilterDoctor();
       }
       
    }, [selectedRegion, selectedSpeciality]);

    useEffect(() => {
        if (filteredDoctor.length === 1) {
            setSelectedDoctor(filteredDoctor[0].username);
        }
    }, [filteredDoctor]);

    useEffect(() => {
        const doctor = filteredDoctor.find(item => item.username === selectedDoctor);
        const fetchActiveHour = async() => {
            if (doctor) {
                const activeHourList = await getDoctorActiveList(doctor?._id);
                setDoctorActiveHour(activeHourList?.active_hours);
                setSelectedDoctorID(doctor?._id);
            } else {
                
                setDoctorActiveHour([]);
                setSelectedDoctorID('');
            }
        }
        if (!sharedData) {
            fetchActiveHour();
        }

        const checkDoctorExistancePeriodically = async () => {
            const status = await getAccountStatus(doctor?.email || "");
            if (status && typeof status === 'object') {
                if (status?.is_deleted) {
                    toast(<CustomToast message="Tài khoản bác sĩ đã bị vô hiệu hóa, vui lòng thử lại sau!" type="error" />);
                    window.location.reload();
                }
            }
            else if (status && typeof status !== 'object') {
                if (status === "No user found") {
                    toast(<CustomToast message="Không tìm thấy tài khoản bác sĩ, vui lòng thử lại sau!" type="error" />);
                    window.location.reload();
                }
            }
        };
        
        if (selectedDoctor !== "") {
            intervalId = setInterval(() => {
                checkDoctorExistancePeriodically();
            }, 5000);
        }

        return () => {
            clearInterval(intervalId);
        };
          }, [selectedDoctor]);      
    
    // Hàm xử lý khi chọn khung giờ từ AppointmentModal
    const handleSubmitActiveHour = (appointmentDay, startTime, endTime) => {
         try {
           console.log("Received appointment data:", { appointmentDay, startTime, endTime });
           
           // Kiểm tra xem có đủ dữ liệu không
           if (!appointmentDay || !startTime || !endTime) {
             console.error("Dữ liệu thời gian không hợp lệ:", appointmentDay);
         
             toast(<CustomToast message="Lỗi: Dữ liệu thời gian không hợp lệ hoặc chưa được chọn!" type="error" />);
             return;
           }
           
           // Set the display value for the appointment date input field
           setAppointmentDate(`${appointmentDay} ${startTime} - ${endTime}`);
             // Set the appointment day value that will be sent to the backend
           setAppointmentDay(appointmentDay);
             // Set start and end times
           setAppointmentTimeStart(startTime); 
           setAppointmentTimeEnd(endTime);
             // Log the selection for debugging
           console.log("Selected appointment:", {
             day: appointmentDay,
             startTime,
             endTime
           });
         } catch (error) {
           console.error("Lỗi trong handleSubmitActiveHour:", error);
           toast(<CustomToast message="Có lỗi xảy ra khi chọn thời gian. Vui lòng thử lại!" type="error" />);
         }
      };const handleSubmitAppointment = async() => {
        if (!healthIssues || !selectedDoctor || !appointmentDate)
        {
        
            toast(<CustomToast message="Bạn chưa chọn đủ trường" type="error" />);

            return;
        }
        
        let item = localStorage.getItem('isLoginSuccess');
            
        if (userInfo?.__t){
            toast(<CustomToast message="Bác sĩ không thể đặt lịch khám!" type="error" />);
            return;
        }
        else{
            if (item) {
                // Check if user has insurance information
                if (!hasInsurance) {
                    const goToProfile = window.confirm("Bạn cần nhập thông tin bảo hiểm y tế trước khi đặt lịch khám. Bạn có muốn chuyển đến trang Hồ sơ để nhập thông tin không?");
                    if (goToProfile) {
                        navigate('/profile');
                    }
                    return;
                }
                console.log("Date", appointmentDate);
                const appointment = await addAppointment(userID, selectedDoctorID, appointmentDate, appointmentTimeStart, appointmentTimeEnd, healthIssues, typeService);
                if (appointment && typeof appointment === 'object') {
                    // Add insurance information from localStorage if available
                    const localStorageInsurance = localStorage.getItem('userInsurance');
                    if (localStorageInsurance && appointment?._id) {
                        try {
                            const insuranceData = JSON.parse(localStorageInsurance);
                            // Only add if there's no insurance already in the appointment
                            if (!appointment.insurance || appointment.insurance.length === 0) {
                                for (const insurance of insuranceData) {
                                    await addInsurance(appointment._id, insurance.name, insurance.number, insurance.location, insurance.exp_date);
                                }
                            }
                        } catch (error) {
                            console.error('Failed to add insurance to appointment:', error);
                        }
                    }
                    
                    setAppointmentInfo(appointment);
                    if (sharedData) setSharedData(null);
                    toast(<CustomToast message="Thêm cuộc hẹn thành công!" type="error" />);
                    window.location.reload();
                }
                else if (appointment && typeof appointment !== 'object'){
                    
                    toast(<CustomToast message={appointment} type="success" />);

                }
                else {
                    toast(<CustomToast message="Có lỗi xảy ra, vui lòng thử lại sau!" type="error" />);
                }
            }
            else {     toast(<CustomToast message="Bạn cần đăng nhập để đặt lịch khám!" type="error" />);
                ;
            }
        }
     }
     
     if (loadingAccount || specialityLoading || regionLoading || appointmentLoading)
         return (
             <LoadingAnimation></LoadingAnimation>
         )

    return (
        <form>
            {/* This invisible component checks insurance status */}
            {userID && <InsuranceCheck userId={userID} onInsuranceCheck={handleInsuranceCheck} />}
            <ALayout>
                <ASpace/>
                <AContainer>
                    <AHeader>
                        <p>ĐĂNG KÍ KHÁM BỆNH</p>
                        <AUnderline/>
                    </AHeader>
                    <ALeftSide>
                        <h3>LƯU Ý:</h3>
                        <p className='text-p'>Lịch hẹn có hiệu lực sau khi <br/> có xác nhận chính thức từ <br/> Phòng khám Bệnh viện
                            Đại <br/> học Y Dược 1.</p>
                        <p className='text-p'>Quý khách sử dụng dịch vụ <br/> đặt hẹn trực tuyến, xin vui <br/> lòng đặt trước ít nhất là
                            <br/> 24 giờ trước khi đến khám.</p>

                        <p className='text-p'>
                            Trong trường hợp khẩn cấp <br/> hoặc nghi ngờ có các triệu <br/> chứng nguy hiểm,
                            quý <br/> khách vui lòng <strong> ĐẾN
                            TRỰC <br/> TIẾP </strong> Phòng khám hoặc các <br/>trung tâm y tế gần nhất để <br/> kịp thời
                            xử lý.
                        </p>

                        <ARightSide>
                        <ARSItem>
                            <p className='title-text'>Chọn địa điểm khám</p>
                            <select 
                                value={selectedRegion} 
                                onChange={(e) => setSelectedRegion(e.target.value)}
                            >
                                <option value="">Chọn địa điểm</option>
                                {regionHook.map((item, index) => (
                                    <option key={index} value={item?.name}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                        </ARSItem>

                        <ARSItem>
                            <p className='title-text'>Chọn chuyên khoa</p>
                            <select 
                                value={selectedSpeciality} 
                                onChange={(e) => setSelectedSpeciality(e.target.value)}
                                disabled={!selectedRegion}
                            >
                                <option value="">Chọn chuyên khoa</option>
                                {specialityHook.map((item, index) => (
                                    <option key={index} value={item?.name}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                        </ARSItem>

                        <ARSItem>
                            <p className='title-text'>Chọn bác sĩ</p>
                            <select 
                                value={selectedDoctor} 
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                                disabled={!selectedSpeciality}
                            >
                                <option value="">Chọn bác sĩ</option>
                                {(filteredDoctor || []).map((item) => (
                                    <option key={item?._id} value={item?.username}>
                                        {item?.username}
                                    </option>
                                ))}
                            </select>
                        </ARSItem>

                        <ARSItem>
                            <p className='title-text'>Chọn ngày - khung giờ muốn khám</p>
                            <input type='text' placeholder='Chọn ngày - khung giờ muốn khám' value={appointmentDate} readOnly />
                            <AppointmentModal 
                                data={doctorActiveHour} 
                                onSubmit={handleSubmitActiveHour} 
                                disabled={!selectedDoctor}
                            >
                                <FontAwesomeIcon icon={faCalendar} className={`calendar-icon ${!selectedDoctor ? 'disabled' : ''}`} disabled={!selectedDoctor}></FontAwesomeIcon>
                            </AppointmentModal>
                        </ARSItem>                        <ARSItem>
                            <p className='title-text'>Nhập vấn đề về sức khoẻ</p>
                            <textarea 
                                rows="10" 
                                cols="50" 
                                value={healthIssues} 
                                onChange={(e) => setHealthIssues(e.target.value)} 
                                disabled={!appointmentDate}
                            ></textarea>
                        </ARSItem>
                        
                        {!hasInsurance && userID && (
                            <ARSItem>
                                <div style={{ padding: '10px', backgroundColor: '#ffe9e9', borderRadius: '5px', marginBottom: '15px', borderLeft: '4px solid #f44336' }}>
                                    <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>Lưu ý:</p>
                                    <p>Bạn cần nhập thông tin bảo hiểm y tế trước khi đặt lịch khám.</p>
                                    <p>Vui lòng vào trang Hồ sơ để thêm thông tin bảo hiểm.</p>
                                </div>
                            </ARSItem>
                        )}
                        
                        <ARSItem>
                            <button 
                                type = "button"
                                onClick={handleSubmitAppointment} 
                                className="next-button"
                            >
                                TIẾP THEO
                            </button>
                        </ARSItem>
                        
                    </ARightSide>



                    </ALeftSide>


                </AContainer>
                <ASpace/>
            </ALayout>


        </form>
    );
};

export default Appointment;
