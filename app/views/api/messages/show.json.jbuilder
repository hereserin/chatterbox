
json.message do
      json.extract! @message, :id, :created_at, :body, :user_id
end

json.user do
    json.extract! @message.user, :id, :username
end


json.order do
  json.extract! @message, :id
end
