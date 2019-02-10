class Chat < ApplicationRecord
  has_many :chat_messages, dependent: :destroy

  has_many :users, through: :chat_memberships




end
