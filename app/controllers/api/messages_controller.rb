class Api::MessagesController < ApplicationController

  def index
    id = params[:chat_id]
    @chat = Chat.includes(:messages).includes(:users).order(:created_at).find(id)
    @messages = @chat.messages
    render 'api/messages/index'
  end

  def show
    @message = Message.includes(:user).find(params[:id])
    render 'api/messages/show'
  end

  def create
    new_message_input = {
      user_id: current_user.id,
      chat_id: message_params[:chat_id].to_i,
      body: message_params[:body]
    }

    @message = Message.new(new_message_input)
    chat = Chat.find(params[:message][:chat_id].to_i)
    chat_id = chat.id

    if @message.save
      render 'api/messages/show'
    else
      render json: @message.errors.full_messages, status: 422
    end
  end



  private
  def message_params
    params.require(:message).permit(:chat_id, :body)
  end

end
