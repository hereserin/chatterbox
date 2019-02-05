export const makeMessage = message =>
  $.ajax({
    method: "POST",
    url: `/api/messages`,
    data: { message }
  });

export const fetchMessages = chat_id => {
  return $.ajax({
    method: "GET",
    url: `/api/chats/${chat_id}/messages`
  });
};

export const fetchMessage = id =>
  $.ajax({
    method: "GET",
    url: `/api/messages/${id}`
  });
