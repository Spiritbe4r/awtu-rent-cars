// MapModal.tsx
import React, { useEffect } from "react";
import { Modal, Header, Button } from "semantic-ui-react";
import Map from "./Map";

interface MapModalProps {
    open: boolean;
    onClose: () => void;
    position: any;
}

const MapModal: React.FC<MapModalProps> = ({ open, onClose, position }) => {


    return (
        <Modal open={open} onClose={onClose} >
            <Header>Mapa en un Modal</Header>
            <Modal.Content>
                <Map position={position} />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={onClose}>Cerrar</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default MapModal;