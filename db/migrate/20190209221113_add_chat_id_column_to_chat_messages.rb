class AddChatIdColumnToChatMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :chat_messages, :chat_id, :integer
  end
end
