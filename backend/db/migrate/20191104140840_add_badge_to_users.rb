class AddBadgeToUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :badge, foreign_key: true
  end
end
