export const makeChat = chat =>
  $.ajax({
    method: "POST",
    url: `/api/chats`,
    data: { chat }
  });

export const fetchChats = () =>
  $.ajax({
    method: "GET",
    url: `/api/chats`
  });

export const fetchChat = id =>
  $.ajax({
    method: "GET",
    url: `/api/chats/${id}`
  });
