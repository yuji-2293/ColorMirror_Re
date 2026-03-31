class AddColorIdToResponses < ActiveRecord::Migration[8.0]
  def change
    add_reference :responses, :color, null: false, foreign_key: true
  end
end
