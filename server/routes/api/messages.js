const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { Op } = require("sequelize");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      //check if sender belongs in conversation
      const { user1Id, user2Id } = await Conversation.findByPk(conversationId);
      if (user1Id !== senderId && user2Id !== senderId) {
        res.sendStatus(403);
      }

      const message = await Message.create({ senderId, text, conversationId, recipientRead: false });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      recipientRead: false,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});
router.patch('/read', async (req, res, next) => {
  try {
    const {conversationId, senderId} = req.body;
    const messages = await Message.findAll({
      where:{
        [Op.and]: {
          conversationId: conversationId,
          senderId: senderId,
          recipientRead: false,
        },
      },
      attributes: ["id"],
    });
    if ((Object.keys(messages).length > 0) && (messages.length > 0)) {
      await messages.map(async message => {
        const updatedMessage = {
          id: message.id,
          recipientRead: true,
        }
        await Message.update(updatedMessage, {
          where: {
            id: message.id
          }
        })
      })
    }
    res.json({ messages });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
