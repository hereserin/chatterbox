json.chats do
  @chats.each do |chat|
    json.set! chat.id do
      json.partial! 'chat', chat: chat
    end
  end
end

json.order @chats.pluck(:id)
