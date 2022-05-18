import React, { useState } from "react";
import { Header, Modal, Button } from "semantic-ui-react";
import PostForm from "./PostForm";
import EventForm from "./EventForm";

const ActivityButtons = (props) => {
  const [showModalPost, setShowModalPost] = useState(false);
  const [showModalEvent, setShowModalEvent] = useState(false);

  function closeModalPost() {
    setShowModalPost(false);
  }
  function closeModalEvent() {
    setShowModalEvent(false);
  }

  return (
    <div className="create-action">
      <Button.Group size="large">
        <Modal
          closeIcon
          onClose={() => closeModalPost()}
          open={showModalPost}
          trigger={
            <Button color="brown" onClick={() => setShowModalPost(true)}>
              Write as your character
            </Button>
          }
        >
          <Header content="Write as your character" />
          <Modal.Content>
            <PostForm
              world={props.world}
              myCharacterId={props.myCharacterId}
              closeModal={closeModalPost}
            />
          </Modal.Content>
        </Modal>
        <Button.Or />
        <Modal
          trigger={
            <Button color="brown" onClick={() => setShowModalEvent(true)}>
              Write a world timeline
            </Button>
          }
          closeIcon
          onClose={() => closeModalEvent()}
          open={showModalEvent}
        >
          <Header content="Write a world timeline" />
          <Modal.Content>
            <EventForm
              world={props.world}
              myCharacterId={props.myCharacterId}
              closeModal={closeModalEvent}
            />
          </Modal.Content>
        </Modal>
      </Button.Group>
    </div>
  );
};

export default ActivityButtons;
