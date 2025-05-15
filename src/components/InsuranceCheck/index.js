import { useEffect, useState } from "react";
import useAppointment from "../../hook/useAppointment";

/**
 * A utility component to check if a user has insurance information
 * either in localStorage or in their appointments
 */
const InsuranceCheck = ({ userId, onInsuranceCheck }) => {
  const [hasChecked, setHasChecked] = useState(false);
  const [ , , , getAllAppointmentByUserID] = useAppointment();

  useEffect(() => {
    const checkInsurance = async () => {
      if (!userId) return;

      // Check localStorage first
      const localStorageInsurance = localStorage.getItem('userInsurance');
      if (localStorageInsurance) {
        try {
          const parsedInsurance = JSON.parse(localStorageInsurance);
          if (Array.isArray(parsedInsurance) && parsedInsurance.length > 0) {
            onInsuranceCheck(true);
            setHasChecked(true);
            return;
          }
        } catch (error) {
          console.error('Error parsing insurance from localStorage:', error);
        }
      }

      // If no valid data in localStorage, check appointments
      try {
        const userAppointments = await getAllAppointmentByUserID(userId);
        if (userAppointments && userAppointments.length > 0) {
          // Find appointment with insurance info
          const appointmentWithInsurance = userAppointments.find(app => app.insurance && app.insurance.length > 0);
          const hasInsurance = !!appointmentWithInsurance;
          
          // Store in localStorage if found
          if (appointmentWithInsurance && appointmentWithInsurance.insurance) {
            localStorage.setItem('userInsurance', JSON.stringify(appointmentWithInsurance.insurance));
          }
          
          onInsuranceCheck(hasInsurance);
        } else {
          onInsuranceCheck(false);
        }
      } catch (error) {
        console.error('Error checking insurance:', error);
        onInsuranceCheck(false);
      }
      
      setHasChecked(true);
    };

    if (!hasChecked && userId) {
      checkInsurance();
    }
  }, [userId, hasChecked, onInsuranceCheck, getAllAppointmentByUserID]);

  // This is a utility component that doesn't render anything
  return null;
};

export default InsuranceCheck;
