class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_channel'
  end

  def unsubscribed; end

  def create(opts)
    # debugger
    # ChatMessage.create(
    #   content: opts.fetch('content')
    # )
    new_message_input = {
      user_id: opts.fetch('user_id'),
      chat_id: opts.fetch('chat_id').to_i,
      content: opts.fetch('content')
    }

    message = ChatMessage.new(new_message_input)

    if message.save
      # render 'api/chat_messages/show'
    else
      # render json: message.errors.full_messages, status: 422
    end
  end

end
