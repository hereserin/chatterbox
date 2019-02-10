json.messages do
  @chat.chat_messages.each do |message|
    json.set! message.id do
      json.partial! 'message', message: message
    end
  end
end

json.order @chat.chat_messages.pluck(:id)

json.users do
  @chat.chat_messages.each do |message|
    json.set! message.user.id do
      json.extract! message.user, :id, :username
    end
  end
end
