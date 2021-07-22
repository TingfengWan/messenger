import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setActiveChat } from "../../store/activeConversation";
import { postReadMessages } from "../../store/utils/thunkCreators";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
};

const Chat = (props) => {

  const { classes, conversation, user, setActiveChat, postReadMessages } = props;
  const otherUser = props.conversation.otherUser;

  const handleClick = async (conversation) => {
    await setActiveChat(conversation.otherUser.username);
    if(conversation.unreadMessages.length > 0){
      const body = {
        readMessages: conversation.unreadMessages,
        sender: user,
        recipientId: otherUser.id,
        conversationId: conversation.id
      };
      await postReadMessages(body);
    }
  };
  return (
    <Box
      onClick={() => handleClick(conversation)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent unread={conversation.unreadMessages?.length || null} conversation={conversation} />
      {
        conversation.unreadMessages.length > 0 && 
        <Box className={classes.notification}>{conversation.unreadMessages.length}</Box>
      }
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    postReadMessages: (message) => {
      dispatch(postReadMessages(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
