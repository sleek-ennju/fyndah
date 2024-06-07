// DateRangePicker.js
import axios from 'axios';
import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaAngleDown } from "react-icons/fa";
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ImSpinner9 } from 'react-icons/im';
import BalanceToDateModal from './BalanceToDateModal';

const DateRangePicker = () => {

    const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { authToken } = useContext(AuthContext);
    const { id } = useParams()
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenModal = () => {
        setIsOpenModal(true);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };


    const handleClose = () => {
        setIsOpen(false)
    }

    const url = "https://api.fyndah.com/api/v1/organization/wallet/balance_at_date"
    const body = {
        org_id: id,
        date: startDate
    };
    const handleBalanceToDate = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(url, body, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
            setData(response.data.balance)
            console.log(response.data.balance);
        } catch (error) {
            if (error.response ? error.response.data : error.message) {
                Swal.fire({
                    icon: "error",
                    title: "Oops! Something went wrong",
                    text: "Seems your token has expired or network issues, try to login again.",
                    timer: 4000,
                    timerProgressBar: true,
                });

                setIsLoading(false);

            }
        } finally {
            setIsLoading(false);
        }
    }
    const handleConfirm = () => {
        if (!handleOpenModal()) {
            setIsOpen(false);
        }
        // Handle date range confirmation (e.g., send data to backend)
        console.log(`Start Date: ${startDate}`);
        handleBalanceToDate();
        if (handleBalanceToDate()) {
            handleOpenModal()
        }
    };



    return (
        <div className="relative">
            <div className="mt-4 flex sm:flex-row justify-left sm:space-y-0 ">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex flex-col mr-3  items-center">
                    <FaAngleDown className="p-2 bg-blue-500 hover:text-blue-800 text-white rounded text-4xl" />
                    <span className="text-sm mt-1">Check Balance</span>
                </button>
            </div>
            {isOpen && (
                <div className="absolute bg-white p-4 shadow-lg rounded mt-2 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium">Select Date</span>
                        <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                            X
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="YYYY-MM-d"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            onClick={handleConfirm}
                            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            {isLoading ? (
                                <div className="flex justify-center items-center">
                                    <p> <ImSpinner9 className="animate-spin text-white hover:text-gray-300" size={15} /> </p>
                                </div>
                            ) : (
                                <div>
                                    {null}
                                </div>
                            )}
                            Confirm
                        </button>
                    </div>
                </div>
            )}
            <div className=" flex items-center justify-center ">
                <BalanceToDateModal isOpenModal={isOpenModal} startDate={startDate} data={data} isLoading={isLoading} handleCloseModal={handleCloseModal} />
            </div>
        </div>
    );
};

export default DateRangePicker;