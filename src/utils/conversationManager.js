const conversations = {}; // Em memória, para desenvolvimento

const getConversation = (phoneNumber) => conversations[phoneNumber] || null;

const updateConversation = (phoneNumber, status) => {
  conversations[phoneNumber] = { ...status, lastMessageTime: new Date() };
};

const hasConversationExpired = (phoneNumber) => {
  const conversation = getConversation(phoneNumber);
  if (!conversation) return true;

  // Defina o tempo de expiração conforme necessário (por exemplo, 1 hora)
  const expirationTime = 60 * 60 * 1000; 
  return new Date() - new Date(conversation.lastMessageTime) > expirationTime;
};

module.exports = { getConversation, updateConversation, hasConversationExpired };
