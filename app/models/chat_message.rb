class ChatMessage < ApplicationRecord
  validates :content, presence: true

  belongs_to :chat,
  class_name: :Chat

  belongs_to :user,
  class_name: :User

  after_create_commit do
  ChatMessageCreationEventBroadcastJob.perform_later(self)
  end

  def formatted_time
    self.created_at.strftime('%H:%M')
  end
end
