import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setActiveChat } from "../../store/activeConversation";
import { postReadMessages } from "../../store/utils/thunkCreators";
import { theme } from "../../themes/theme";

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
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1),
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
  const otherUser = conversation.otherUser;

  const handleClick = async (conversation) => {
    await setActiveChat(conversation.otherUser.username);
    if(conversation.unread > 0){
      const body = {
        senderId: otherUser.id,
        recipientId: user.id,
        conversationId: conversation.id,
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
      <ChatContent conversation={conversation} unread={conversation.unread > 0} />
      {
        conversation.unread > 0 && 
        <Box className={classes.notification}>{conversation.unread}</Box>
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
