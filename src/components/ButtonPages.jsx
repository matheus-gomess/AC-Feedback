import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useNavigate, useLocation, matchPath } from "react-router-dom";

export default function ButtonPages({ title, navigate, isActualRoute }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const nav = useNavigate();
    const location = useLocation();

    const navNewPage = () => {
        if (matchPath("/rate-participant/:participant", location.pathname)) {
            setIsModalOpen(true);
        } else {
            nav(navigate);
        }
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleModalConfirm = () => {
        setIsModalOpen(false);
        nav(navigate);
    }

    return (
        <>
            <Button
                bg="transparent"
                onClick={navNewPage}
                _hover={{}}
                _active={{ bg: "rgba(0, 0, 0, 0.473)" }}
                css={{
                    color: isActualRoute ? "#BA303B" : "#ffffff",
                    textDecoration: "none",
                    padding: "0px",
                    fontSize: "14pt",
                    fontFamily: "Montserrat",
                    fontWeight: "700",
                    "&:hover::after": {
                        width: isActualRoute ? "0%" : "110%",
                    },
                    "&::after": {
                        content: '" "',
                        width: "0%",
                        height: "4px",
                        backgroundColor: "#BA303B",
                        position: "absolute",
                        bottom: "4px",
                        left: "0px",
                        transition: "0.4s ease-in-out",
                    },
                }}>
                {title}
            </Button>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleModalClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Aviso!</ModalHeader>
                        <ModalBody>
                            <Button onClick={handleModalConfirm}>
                                Sim
                            </Button>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}
