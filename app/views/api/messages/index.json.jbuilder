json.messages do
  @chat.messages.each do |message|
    json.set! message.id do
      json.partial! 'message', message: message
    end
  end
end

json.order @chat.messages.pluck(:id)

json.users do
  @chat.messages.each do |message|
    json.set! message.user.id do
      json.extract! message.user, :id, :username
    end
  end
end
