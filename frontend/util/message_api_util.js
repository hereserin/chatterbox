export const makeMessage = message =>
  $.ajax({
    method: "POST",
    url: `/api/chat_messages`,
    data: { message }
  });

export const fetchMessages = chat_id => {
  return $.ajax({
    method: "GET",
    url: `/api/chats/${chat_id}/chat_messages`
  });
};

export const fetchMessage = id =>
  $.ajax({
    method: "GET",
    url: `/api/chat_messages/${id}`
  });
