import { useEffect, useState } from "react";
import ModalComponent from "../uiComponents/ModalComponet";
import { Link } from "react-router-dom";


const Dashboard = () => {
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        setOpenModal(true)
    }, [])

    return (
        <div>
            {/* MODAL COMPONENT */}
      {openModal && <ModalComponent />}
            Dashboard
        </div>
    )
}

export default Dashboard;