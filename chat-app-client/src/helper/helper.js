export const convertMessages = (messages, members) => {
  const cloneMessages = JSON.parse(JSON.stringify(messages));

  const convertedMessages = cloneMessages.map((message) => {
    const matchedMember = members.find(
      (member) => member._id === message.author
    );

    if (matchedMember) {
      message.author = matchedMember.username;
      message.avatarUrl = matchedMember.avatarUrl;

      if (message.type === 'image') {
        message.imgUrl = message.content;
        message.content = `${message.author} sent a photo`;
      }

      return message;
    }

    return message;
  });

  return convertedMessages;
};

export const getLastMessage = (messages) => {
  return messages[messages.length - 1];
};
