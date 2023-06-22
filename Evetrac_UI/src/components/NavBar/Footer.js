import React ,{useState} from "react";
import Modal from 'react-modal';
import ChatRoom  from "../ChatRoom";

const Footer = () => {
    const [modalIsOpen, setModalIsOpen]=useState(false);

    return(
    <>
        <button className="footChat" onClick={()=>setModalIsOpen(true)}
         style={{                       
            verticalAlign: "Middle",
          }}
        >
        <span class="material-symbols-outlined"
         style={{
            color: "#d58c2c",
            fontWeight: "bold",
            fontSize: "25px",
            verticalAlign: "Middle",
          }}
        >chat</span>
            Chat</button>
        <Modal isOpen={modalIsOpen} className="Modal" overlayClassName="Overlay">  
            <button onClick={()=>setModalIsOpen(false)}
            style={{
                background:"none",
                border:"none",
                marginLeft:"450px",
                marginTop:"5px"               
            }}
            >
                <span class="material-symbols-outlined"
                    style={{   
                            color:"#ff3434",
                            fontSize: "30px",         
                    }}>
                cancel
                </span></button>
            <div><ChatRoom/></div>
        </Modal>
        <div className="footer"></div>
    </>
)
}

export default Footer;