import axios from 'axios';

// ส่งข้อมูลการชำระเงิน
export const handlePaymentSubmit = async (authtoken, paymentData) => {
    return await axios.post(process.env.REACT_APP_API + "/payment", 
        paymentData, 
        {
            headers: {
                authtoken,  // ใช้ token เพื่อระบุผู้ใช้ที่กำลังชำระเงิน
            }
        }
    );
};

export const updatePaymentStatus = async (authtoken, orderId, paymentStatus) =>
    await axios.put(process.env.REACT_APP_API + "/admin/payment-status",
        { orderId, paymentStatus },
        {
            headers: {
                authtoken,
            },
        });
