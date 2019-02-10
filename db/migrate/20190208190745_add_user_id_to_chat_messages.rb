class AddUserIdToChatMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :chat_messages, :user_id, :integer 
  end
end
