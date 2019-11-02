class AddHpToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :hp, :integer
  end
end
