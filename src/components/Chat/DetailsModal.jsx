import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button,Text } from '@chakra-ui/react';

const DetailsModal = ({ isOpen, onClose, postDetails }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Item Details</ModalHeader>
        <ModalBody>
          <img src={postDetails.imageURL} alt="" />
          <Text fontWeight="bold" marginTop={5}>Title: {postDetails.title}</Text>
          {postDetails.description &&
            <Text><span style={{fontWeight:'bold'}}>Description: </span>{postDetails.description}</Text>
           }
          {postDetails.price && <Text><span style={{fontWeight:'bold'}}>Price: </span> ${postDetails.price}</Text>}
          {<Text><span style={{fontWeight:'bold'}}>Username: </span> {postDetails.username}</Text>}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailsModal;