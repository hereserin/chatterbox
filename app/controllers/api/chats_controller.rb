class Api::ChatsController < ApplicationController

  def index
    @chats = Chat.order(:created_at)
    render 'api/chats/index'
  end

  def show
    @chat = Chat.find(params[:id])
    render 'api/chats/show'
  end

  def create
    new_chat_input = {
      user_id: current_user.id,
      chatroom_name: chat_params[:name]
    }
    @chat = Chat.new(new_chat_input)

    if @chat.save
      render 'api/chats/show'
    else
      render json: @chat.errors.full_messages, status: 422
    end
  end

  private
  def chat_params
    params.require(:chat).permit(:name)
  end

end
